#!/usr/bin/env bash
# Chạy kiểm thử RLS/RPC trên PostgreSQL cục bộ có môi trường giả lập Supabase.
# KHÔNG chạy trên project Supabase thật. Biến môi trường:
#   PGHOST (mặc định 127.0.0.1), PGPORT (mặc định 5432), PGUSER (mặc định postgres)
#   OPS_REPO: thư mục gốc SNAKE OPS chứa supabase/sql/001_ops_core.sql
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
SPS="$HERE/../sql"
OPS_SQL="${OPS_REPO:?Đặt OPS_REPO trỏ tới thư mục snake-control-center}/supabase/sql/001_ops_core.sql"
DB="${PG_TEST_DB:-pop_test_$RANDOM}"
PSQL=(psql -X -q -v ON_ERROR_STOP=1 -h "${PGHOST:-127.0.0.1}" -p "${PGPORT:-5432}" -U "${PGUSER:-postgres}")
"${PSQL[@]}" -d postgres -c "create database \"$DB\";"
trap '"${PSQL[@]}" -d postgres -c "drop database \"$DB\";" >/dev/null' EXIT
"${PSQL[@]}" -d "$DB" -f "$HERE/stub-supabase.sql"
"${PSQL[@]}" -d "$DB" -f "$OPS_SQL" >/dev/null
"${PSQL[@]}" -d "$DB" -f "$SPS/004_pop_shared_projects.sql"
"${PSQL[@]}" -d "$DB" -f "$HERE/pop-rls-local.sql"
echo "PASS: mọi kiểm thử RLS/RPC đã đạt trên database tạm $DB (đã xóa sau khi chạy)."
