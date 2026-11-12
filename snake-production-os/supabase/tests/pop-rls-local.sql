-- Kiểm thử RLS và RPC của SNAKE Production OS (004_pop_shared_projects.sql).
-- Chạy trên PostgreSQL có môi trường giả lập Supabase (xem run-local-db.sh).
-- Mỗi khẳng định lỗi kiểm tra đúng thông báo lỗi; thất bại sẽ dừng với RAISE EXCEPTION.

\set ON_ERROR_STOP on

-- ---------- Tiện ích kiểm thử (tạm thời trong phiên) ----------
create function pg_temp.as_user(p_uid uuid) returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claim.sub', coalesce(p_uid::text, ''), false);
  execute 'set role authenticated';
end $$;

create function pg_temp.as_anon() returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claim.sub', '', false);
  execute 'set role anon';
end $$;

create function pg_temp.as_admin() returns void language plpgsql as $$
begin
  perform set_config('request.jwt.claim.sub', '', false);
  execute 'reset role';
end $$;

-- Kỳ vọng một lỗi có chứa p_msg. Không có lỗi hoặc lỗi khác là thất bại.
create function pg_temp.expect_error(p_sql text, p_msg text) returns void language plpgsql as $$
declare v_err text := null;
begin
  begin
    execute p_sql;
  exception when others then
    v_err := sqlerrm;
  end;
  if v_err is null then
    raise exception 'FAIL: không có lỗi (kỳ vọng %): %', p_msg, p_sql;
  end if;
  if v_err not like '%' || p_msg || '%' then
    raise exception 'FAIL: kỳ vọng %, nhận "%": %', p_msg, v_err, p_sql;
  end if;
  raise notice 'ok  (lỗi đúng: %)', p_msg;
end $$;

create function pg_temp.expect_count(p_uid uuid, p_expected integer) returns void language plpgsql as $$
declare v_n integer;
begin
  perform pg_temp.as_user(p_uid);
  select count(*) into v_n from public.pop_projects;
  perform pg_temp.as_admin();
  if v_n <> p_expected then
    raise exception 'FAIL: đọc được % dòng, kỳ vọng %', v_n, p_expected;
  end if;
  raise notice 'ok  (đọc % dòng)', v_n;
end $$;

create function pg_temp.pl(p_id text, p_status text default 'draft', p_title text default 'Dự án thử')
returns jsonb language sql as $$
  select jsonb_build_object(
    'id', p_id, 'title', p_title, 'script', 'Nguồn thử.', 'sourceLocked', true,
    'bible', '{"version":1,"characters":[],"locations":[]}'::jsonb,
    'scenes', jsonb_build_array(jsonb_build_object(
      'id', 'S001', 'status', p_status,
      'qc', jsonb_build_object('technical','pass','factual','pass','visual','pass','continuity','pass','audio','pass'),
      'chosen', '{"0":"t1"}'::jsonb,
      'takes', '[{"id":"t1","status":"pass"}]'::jsonb)));
$$;

-- ---------- Dữ liệu nền (quyền superuser) ----------
\set ORG_A '''00000000-0000-4000-8000-00000000000a'''
\set ORG_B '''00000000-0000-4000-8000-00000000000b'''
\set U_EX  '''00000000-0000-4000-8000-000000000001'''
\set U_MEM '''00000000-0000-4000-8000-000000000002'''
\set U_VIE '''00000000-0000-4000-8000-000000000003'''
\set U_QA  '''00000000-0000-4000-8000-000000000004'''
\set U_OUT '''00000000-0000-4000-8000-000000000005'''
\set U_MEB '''00000000-0000-4000-8000-000000000006'''

insert into auth.users (id, email) values
  (:U_EX, 'ex@test'), (:U_MEM, 'mem@test'), (:U_VIE, 'vie@test'),
  (:U_QA, 'qa@test'), (:U_OUT, 'out@test'), (:U_MEB, 'meb@test');
insert into public.organizations (id, name, slug) values
  (:ORG_A, 'Org A', 'org-a'), (:ORG_B, 'Org B', 'org-b');
insert into public.organization_members (organization_id, user_id, role) values
  (:ORG_A, :U_EX, 'EXECUTIVE'), (:ORG_A, :U_MEM, 'MEMBER'), (:ORG_A, :U_VIE, 'VIEWER'),
  (:ORG_A, :U_QA, 'QA'), (:ORG_B, :U_MEB, 'MEMBER');

\echo '--- 1. Ghi: quyền theo vai trò'
select pg_temp.as_user(:U_MEM);
select public.pop_create_project(:ORG_A, 'prj_test1', pg_temp.pl('prj_test1')) as rev_create;
select pg_temp.expect_error($$select public.pop_create_project('00000000-0000-4000-8000-00000000000a', 'prj_bad2', jsonb_build_object('id','prj_other','scenes','[]','bible','{}','script',''))$$, 'ID_MISMATCH');
select pg_temp.expect_error($$select public.pop_create_project('00000000-0000-4000-8000-00000000000a', 'prj_bad3', jsonb_build_object('id','prj_bad3','scenes','{}','bible','{}','script',''))$$, 'INVALID_PAYLOAD_SCENES');
select pg_temp.as_user(:U_VIE);
select pg_temp.expect_error($$select public.pop_create_project('00000000-0000-4000-8000-00000000000a', 'prj_vie1', pg_temp.pl('prj_vie1'))$$, 'FORBIDDEN');
select pg_temp.as_user(:U_OUT);
select pg_temp.expect_error($$select public.pop_create_project('00000000-0000-4000-8000-00000000000a', 'prj_out1', pg_temp.pl('prj_out1'))$$, 'FORBIDDEN');
select pg_temp.as_anon();
select pg_temp.expect_error($$select public.pop_create_project('00000000-0000-4000-8000-00000000000a', 'prj_anon', pg_temp.pl('prj_anon'))$$, 'permission denied');

\echo '--- 2. Đọc: cô lập theo tổ chức'
select pg_temp.expect_count(:U_MEM, 1);
select pg_temp.expect_count(:U_VIE, 1);
select pg_temp.expect_count(:U_OUT, 0);
select pg_temp.expect_count(:U_MEB, 0);
select pg_temp.as_anon();
select pg_temp.expect_error($$select count(*) from public.pop_projects$$, 'permission denied');

\echo '--- 3. Chặn ghi trực tiếp'
select pg_temp.as_user(:U_MEM);
select pg_temp.expect_error($$update public.pop_projects set title = 'hack' where id = 'prj_test1'$$, 'permission denied');
select pg_temp.expect_error($$delete from public.pop_projects where id = 'prj_test1'$$, 'permission denied');
select pg_temp.expect_error($$insert into public.pop_projects (organization_id, id, title, payload) values ('00000000-0000-4000-8000-00000000000a','prj_x','x','{}')$$, 'permission denied');

\echo '--- 4. Lưu có revision và cô lập tổ chức'
select public.pop_save_project(:ORG_A, 'prj_test1', 1, pg_temp.pl('prj_test1', 'draft', 'Đổi tên 1')) as rev_save1;
select pg_temp.expect_error($$select public.pop_save_project('00000000-0000-4000-8000-00000000000a', 'prj_test1', 1, pg_temp.pl('prj_test1', 'draft', 'Ghi đè cũ'))$$, 'REVISION_CONFLICT');
select pg_temp.as_user(:U_VIE);
select pg_temp.expect_error($$select public.pop_save_project('00000000-0000-4000-8000-00000000000a', 'prj_test1', 2, pg_temp.pl('prj_test1'))$$, 'FORBIDDEN');
select pg_temp.as_user(:U_OUT);
select pg_temp.expect_error($$select public.pop_save_project('00000000-0000-4000-8000-00000000000a', 'prj_test1', 2, pg_temp.pl('prj_test1'))$$, 'FORBIDDEN');
select pg_temp.as_user(:U_MEB);
select pg_temp.expect_error($$select public.pop_save_project('00000000-0000-4000-8000-00000000000a', 'prj_test1', 2, pg_temp.pl('prj_test1'))$$, 'FORBIDDEN');
select pg_temp.expect_error($$select public.pop_save_project('00000000-0000-4000-8000-00000000000b', 'prj_test1', 2, pg_temp.pl('prj_test1'))$$, 'NOT_FOUND');

\echo '--- 5. Luật duyệt: cảnh approved cần người duyệt và QC đủ'
select pg_temp.as_user(:U_MEM);
select pg_temp.expect_error($$select public.pop_save_project('00000000-0000-4000-8000-00000000000a', 'prj_test1', 2, pg_temp.pl('prj_test1', 'approved'))$$, 'REVIEW_REQUIRED');
select pg_temp.as_user(:U_QA);
select pg_temp.expect_error($$select public.pop_save_project('00000000-0000-4000-8000-00000000000a', 'prj_test1', 2, jsonb_set(pg_temp.pl('prj_test1', 'approved'), '{scenes,0,qc,audio}', '"pending"'))$$, 'QC_GATE_NOT_MET');
select pg_temp.expect_error($$select public.pop_save_project('00000000-0000-4000-8000-00000000000a', 'prj_test1', 2, jsonb_set(pg_temp.pl('prj_test1', 'approved'), '{scenes,0,takes}', '[{"id":"t1","status":"received"}]'))$$, 'QC_GATE_NOT_MET');
select public.pop_save_project(:ORG_A, 'prj_test1', 2, pg_temp.pl('prj_test1', 'approved', 'Đã duyệt')) as rev_approve;

\echo '--- 6. Thành viên giữ nguyên cảnh đã duyệt vẫn được sửa phần khác'
select pg_temp.as_user(:U_MEM);
select public.pop_save_project(:ORG_A, 'prj_test1', 3, pg_temp.pl('prj_test1', 'approved', 'Sửa tiêu đề')) as rev_keep;

\echo '--- 7. Mở khóa nguồn cần quản lý'
select pg_temp.expect_error($$select public.pop_save_project('00000000-0000-4000-8000-00000000000a', 'prj_test1', 4, jsonb_set(pg_temp.pl('prj_test1'), '{sourceLocked}', 'false'))$$, 'MANAGER_REQUIRED');
select pg_temp.as_user(:U_EX);
select public.pop_save_project(:ORG_A, 'prj_test1', 4, jsonb_set(pg_temp.pl('prj_test1'), '{sourceLocked}', 'false')) as rev_unlock;

\echo '--- 8. Sự kiện chỉ thêm'
select pg_temp.as_user(:U_MEM);
select pg_temp.expect_error($$update public.pop_project_events set action = 'SAVE'$$, 'permission denied');
select pg_temp.as_admin();
select pg_temp.expect_error($$update public.pop_project_events set action = 'SAVE'$$, 'EVENTS_APPEND_ONLY');
select pg_temp.expect_error($$delete from public.pop_project_events$$, 'EVENTS_APPEND_ONLY');
select count(*) >= 5 as events_ok from public.pop_project_events where project_id = 'prj_test1';

\echo '--- 9. Xóa cần quản lý'
select pg_temp.as_user(:U_MEM);
select pg_temp.expect_error($$select public.pop_delete_project('00000000-0000-4000-8000-00000000000a', 'prj_test1')$$, 'FORBIDDEN');
select pg_temp.as_user(:U_EX);
select public.pop_delete_project(:ORG_A, 'prj_test1');
select pg_temp.expect_error($$select public.pop_delete_project('00000000-0000-4000-8000-00000000000a', 'prj_test1')$$, 'NOT_FOUND');
select pg_temp.as_admin();
select count(*) = 0 as deleted_ok from public.pop_projects where id = 'prj_test1';
select count(*) >= 1 as delete_event_ok from public.pop_project_events where project_id = 'prj_test1' and action = 'DELETE';

\echo '--- KẾT THÚC: tất cả khẳng định đều đạt'
