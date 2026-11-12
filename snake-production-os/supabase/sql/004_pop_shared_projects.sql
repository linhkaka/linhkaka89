-- SNAKE Production OS: kho dự án dùng chung trên Supabase của SNAKE OPS.
--
-- BẢN NHÁP ĐÃ REVIEW, CHƯA ÁP DỤNG VÀO PROJECT NÀO.
-- Theo docs/SUPABASE_DEV_GATE.md của OPS: chỉ áp dụng sau khi project DEV riêng của
-- SNAKE OPS được xác nhận. Khi đó tạo migration bằng `supabase migration new pop_shared_projects`
-- rồi copy nội dung này vào; không tự đặt timestamp migration.
--
-- Phụ thuộc: supabase/sql/001_ops_core.sql (organizations, organization_members,
-- schema private: is_org_member, org_role, can_manage_org, can_review_org).
--
-- Nguyên tắc (theo AGENTS.md của OPS):
--  - RLS bật cho mọi bảng; không tắt RLS.
--  - Không có quyền ghi trực tiếp cho authenticated/anon; mọi thay đổi qua RPC.
--  - Quyền lấy từ organization_members, không từ user_metadata.
--  - Bảng sự kiện là append-only.
--  - Không có khóa service trong mã trình duyệt.
--
-- Giới hạn đã biết: kiểm tra server chỉ bao quát các luật có thể diễn đạt bằng SQL
-- (xem ghi chú tại pop_save_project). Toàn bộ luật nghiệp vụ đầy đủ vẫn nằm ở core.js.

-- ---------------------------------------------------------------
-- 1. Bảng
-- ---------------------------------------------------------------
create table if not exists public.pop_projects (
  organization_id uuid not null references public.organizations(id) on delete cascade,
  id text not null,
  title text not null,
  payload jsonb not null,
  revision integer not null default 1 check (revision >= 1),
  created_by uuid references auth.users(id),
  updated_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (organization_id, id),
  check (jsonb_typeof(payload) = 'object'),
  check (octet_length(payload::text) <= 4000000)
);

create table if not exists public.pop_project_events (
  id bigint generated always as identity primary key,
  organization_id uuid not null references public.organizations(id) on delete cascade,
  project_id text not null,
  actor_user_id uuid references auth.users(id),
  action text not null check (action in ('CREATE', 'SAVE', 'DELETE')),
  revision integer not null,
  created_at timestamptz not null default now()
);

create index if not exists idx_pop_events_project on public.pop_project_events(organization_id, project_id, created_at desc);

-- ---------------------------------------------------------------
-- 2. Hàm quyền (dùng schema private của OPS)
-- ---------------------------------------------------------------
-- Ghi được: mọi vai trò thành viên trừ VIEWER.
create or replace function private.pop_can_write(target_org uuid)
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  select coalesce(private.org_role(target_org) in ('EXECUTIVE','OPS_MANAGER','TEAM_LEAD','QA','MEMBER'), false);
$$;

-- Kiểm tra cấu trúc payload tối thiểu. Không thay thế validate phía client.
create or replace function private.pop_validate_payload(p_id text, p_payload jsonb)
returns void
language plpgsql
immutable
set search_path = pg_catalog, public
as $$
begin
  if p_id is null or length(p_id) < 4 or length(p_id) > 80 then
    raise exception 'INVALID_ID' using errcode = '22023';
  end if;
  if p_payload->>'id' is distinct from p_id then
    raise exception 'ID_MISMATCH' using errcode = '22023';
  end if;
  if jsonb_typeof(p_payload->'scenes') is distinct from 'array' then
    raise exception 'INVALID_PAYLOAD_SCENES' using errcode = '22023';
  end if;
  if jsonb_typeof(p_payload->'bible') is distinct from 'object' then
    raise exception 'INVALID_PAYLOAD_BIBLE' using errcode = '22023';
  end if;
  if jsonb_typeof(p_payload->'script') is distinct from 'string' then
    raise exception 'INVALID_PAYLOAD_SCRIPT' using errcode = '22023';
  end if;
end;
$$;

revoke all on function private.pop_can_write(uuid) from public, anon;
revoke all on function private.pop_validate_payload(text, jsonb) from public, anon, authenticated;
grant execute on function private.pop_can_write(uuid) to authenticated;

-- ---------------------------------------------------------------
-- 3. RLS và quyền bảng
-- ---------------------------------------------------------------
alter table public.pop_projects enable row level security;
alter table public.pop_project_events enable row level security;

revoke all on public.pop_projects from anon, authenticated;
revoke all on public.pop_project_events from anon, authenticated;
grant select on public.pop_projects, public.pop_project_events to authenticated;

create policy pop_projects_read_member on public.pop_projects
  for select to authenticated
  using (private.is_org_member(organization_id));

create policy pop_events_read_member on public.pop_project_events
  for select to authenticated
  using (private.is_org_member(organization_id));

-- Sự kiện chỉ thêm: chặn sửa và xóa ngay cả với quyền cao hơn authenticated.
create or replace function private.pop_events_append_only()
returns trigger
language plpgsql
set search_path = pg_catalog, public
as $$
begin
  raise exception 'EVENTS_APPEND_ONLY' using errcode = '42501';
end;
$$;

create trigger trg_pop_events_no_update
  before update or delete on public.pop_project_events
  for each row execute function private.pop_events_append_only();

-- ---------------------------------------------------------------
-- 4. RPC ghi dữ liệu
-- ---------------------------------------------------------------
create or replace function public.pop_create_project(p_org uuid, p_id text, p_payload jsonb)
returns integer
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_uid uuid := auth.uid();
  v_rev integer;
begin
  if v_uid is null then
    raise exception 'NOT_AUTHENTICATED' using errcode = '28000';
  end if;
  if not private.pop_can_write(p_org) then
    raise exception 'FORBIDDEN' using errcode = '42501';
  end if;
  perform private.pop_validate_payload(p_id, p_payload);

  insert into public.pop_projects (organization_id, id, title, payload, revision, created_by, updated_by)
  values (p_org, p_id, left(coalesce(p_payload->>'title', ''), 200), p_payload, 1, v_uid, v_uid)
  returning revision into v_rev;

  insert into public.pop_project_events (organization_id, project_id, actor_user_id, action, revision)
  values (p_org, p_id, v_uid, 'CREATE', v_rev);

  return v_rev;
end;
$$;

-- Lưu có kiểm revision: base phải khớp revision hiện tại, nếu không trả lỗi REVISION_CONFLICT.
--
-- Luật bổ sung ở server (diễn đạt được bằng SQL):
--  a) Chỉ người duyệt (QA, TEAM_LEAD, OPS_MANAGER, EXECUTIVE) được chuyển cảnh sang "approved".
--  b) Cảnh được chuyển sang "approved" phải có qc.* đều "pass", có chosen và có ít nhất một take "pass".
--  c) Chỉ người quản lý được mở khóa nguồn (sourceLocked: true -> false).
create or replace function public.pop_save_project(
  p_org uuid,
  p_id text,
  p_base_revision integer,
  p_payload jsonb
)
returns integer
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_uid uuid := auth.uid();
  v_old public.pop_projects%rowtype;
  v_rev integer;
begin
  if v_uid is null then
    raise exception 'NOT_AUTHENTICATED' using errcode = '28000';
  end if;

  select * into v_old from public.pop_projects
   where organization_id = p_org and id = p_id
   for update;
  if not found then
    raise exception 'NOT_FOUND' using errcode = 'P0002';
  end if;

  if not private.pop_can_write(p_org) then
    raise exception 'FORBIDDEN' using errcode = '42501';
  end if;

  if v_old.revision <> p_base_revision then
    raise exception 'REVISION_CONFLICT' using errcode = 'P0409', detail = v_old.revision::text;
  end if;

  perform private.pop_validate_payload(p_id, p_payload);

  -- a) + b) Cảnh vừa được chuyển sang approved.
  if exists (
    select 1
      from jsonb_array_elements(p_payload->'scenes') n
     where n->>'status' = 'approved'
       and not exists (
         select 1 from jsonb_array_elements(v_old.payload->'scenes') o
          where o->>'id' = n->>'id' and o->>'status' = 'approved')
  ) then
    if not private.can_review_org(p_org) then
      raise exception 'REVIEW_REQUIRED' using errcode = '42501';
    end if;
    if exists (
      select 1
        from jsonb_array_elements(p_payload->'scenes') n
       where n->>'status' = 'approved'
         and not exists (
           select 1 from jsonb_array_elements(v_old.payload->'scenes') o
            where o->>'id' = n->>'id' and o->>'status' = 'approved')
         and (
           coalesce(n->'qc'->>'technical', '') <> 'pass'
           or coalesce(n->'qc'->>'factual', '') <> 'pass'
           or coalesce(n->'qc'->>'visual', '') <> 'pass'
           or coalesce(n->'qc'->>'continuity', '') <> 'pass'
           or coalesce(n->'qc'->>'audio', '') <> 'pass'
           or coalesce(n->'chosen', '{}'::jsonb) = '{}'::jsonb
           or not exists (
             select 1 from jsonb_array_elements(coalesce(n->'takes', '[]'::jsonb)) t
              where t->>'status' = 'pass')
         )
    ) then
      raise exception 'QC_GATE_NOT_MET' using errcode = '23514';
    end if;
  end if;

  -- c) Mở khóa nguồn.
  if coalesce(v_old.payload->>'sourceLocked', 'false') = 'true'
     and coalesce(p_payload->>'sourceLocked', 'false') = 'false'
     and not private.can_manage_org(p_org) then
    raise exception 'MANAGER_REQUIRED' using errcode = '42501';
  end if;

  update public.pop_projects
     set payload = p_payload,
         title = left(coalesce(p_payload->>'title', ''), 200),
         revision = revision + 1,
         updated_by = v_uid,
         updated_at = now()
   where organization_id = p_org and id = p_id
  returning revision into v_rev;

  insert into public.pop_project_events (organization_id, project_id, actor_user_id, action, revision)
  values (p_org, p_id, v_uid, 'SAVE', v_rev);

  return v_rev;
end;
$$;

create or replace function public.pop_delete_project(p_org uuid, p_id text)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  v_uid uuid := auth.uid();
  v_rev integer;
begin
  if v_uid is null then
    raise exception 'NOT_AUTHENTICATED' using errcode = '28000';
  end if;
  if not private.can_manage_org(p_org) then
    raise exception 'FORBIDDEN' using errcode = '42501';
  end if;

  delete from public.pop_projects
   where organization_id = p_org and id = p_id
  returning revision into v_rev;
  if v_rev is null then
    raise exception 'NOT_FOUND' using errcode = 'P0002';
  end if;

  insert into public.pop_project_events (organization_id, project_id, actor_user_id, action, revision)
  values (p_org, p_id, v_uid, 'DELETE', v_rev);
end;
$$;

revoke all on function public.pop_create_project(uuid, text, jsonb) from public, anon;
revoke all on function public.pop_save_project(uuid, text, integer, jsonb) from public, anon;
revoke all on function public.pop_delete_project(uuid, text) from public, anon;
grant execute on function public.pop_create_project(uuid, text, jsonb) to authenticated;
grant execute on function public.pop_save_project(uuid, text, integer, jsonb) to authenticated;
grant execute on function public.pop_delete_project(uuid, text) to authenticated;
