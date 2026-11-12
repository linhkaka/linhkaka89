// Kiểm tra tĩnh các bất biến bảo mật (không cần kết nối database).
// Chạy: node --test snake-production-os/supabase/tests/pop-static.test.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..', '..');
const sql = readFileSync(join(ROOT, 'supabase/sql/004_pop_shared_projects.sql'), 'utf8');
const clientFiles = ['app.js', 'shared-store.js', 'shared.js', 'config.js', 'index.html'].map(f => join(ROOT, f));

test('mọi bảng pop_ bật RLS và không bị tắt', () => {
  const tables = [...sql.matchAll(/create table if not exists public\.(pop_\w+)/g)].map(m => m[1]);
  assert.ok(tables.length >= 2);
  for (const t of tables) {
    assert.match(sql, new RegExp(`alter table public\\.${t} enable row level security`));
    assert.doesNotMatch(sql, new RegExp(`disable row level security[^;]*${t}`));
  }
});

test('không cấp quyền ghi trực tiếp cho authenticated hoặc anon trên bảng pop_', () => {
  assert.doesNotMatch(sql, /grant\s+(insert|update|delete|all)[^;]*pop_/i);
  assert.match(sql, /revoke all on public\.pop_projects from anon, authenticated/);
});

test('mọi hàm SECURITY DEFINER đều đặt search_path', () => {
  const fns = sql.split(/create or replace function/).slice(1);
  const definers = fns.filter(f => /security definer/.test(f.split('$$')[0]));
  assert.equal(definers.length, 4, 'số hàm SECURITY DEFINER phải khớp danh sách đã review');
  for (const f of definers) assert.match(f.split('$$')[0], /set search_path/);
});

test('RPC ghi chỉ cấp cho authenticated, không cấp cho anon', () => {
  for (const fn of ['pop_create_project', 'pop_save_project', 'pop_delete_project']) {
    assert.match(sql, new RegExp(`grant execute on function public\\.${fn}\\([^)]*\\) to authenticated`));
    assert.match(sql, new RegExp(`revoke all on function public\\.${fn}\\([^)]*\\) from public, anon`));
  }
});

test('quyền không lấy từ user_metadata', () => {
  const code = sql.split('\n').filter(l => !l.trim().startsWith('--')).join('\n');
  assert.doesNotMatch(code, /user_metadata/);
});

test('bảng sự kiện có trigger chặn sửa và xóa', () => {
  assert.match(sql, /before update or delete on public\.pop_project_events/);
});

test('mã trình duyệt không chứa khóa service_role hoặc khóa bí mật', () => {
  for (const f of clientFiles) {
    let text = '';
    try { text = readFileSync(f, 'utf8'); } catch { continue; }
    // Chỉ kiểm tra mã thực thi, bỏ qua comment cảnh báo.
    const code = text.split('\n').filter(l => !/^\s*(\/\/|\*|\/\*)/.test(l)).join('\n');
    assert.doesNotMatch(code, /service_role/i, f);
    assert.doesNotMatch(code, /sb_secret_|eyJhbGciOi[^"']{0,40}service/, f);
    assert.doesNotMatch(code, /supabaseServiceKey|SERVICE_ROLE/, f);
  }
});

test('thư mục supabase/sql chỉ có file đánh số và không ghi đè file OPS', () => {
  const files = readdirSync(join(ROOT, 'supabase/sql'));
  assert.deepEqual(files.sort(), ['004_pop_shared_projects.sql']);
});
