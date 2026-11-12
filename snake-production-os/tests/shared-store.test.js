// Chạy: node --test snake-production-os/tests/shared-store.test.js
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const S = require('../shared-store.js');

test('parseRpcError nhận diện mã lỗi từ thông điệp PostgreSQL', () => {
  const r = S.parseRpcError({ message: 'REVISION_CONFLICT', details: '4' });
  assert.equal(r.code, 'REVISION_CONFLICT');
  assert.equal(r.serverRevision, 4);
  assert.match(r.message, /Có người khác/);
  assert.equal(S.parseRpcError({ message: 'QC_GATE_NOT_MET' }).code, 'QC_GATE_NOT_MET');
});

test('lỗi lạ trả về thông điệp gốc, không đoán mã', () => {
  const r = S.parseRpcError({ message: 'connection reset' });
  assert.equal(r.code, null);
  assert.equal(r.message, 'connection reset');
});

test('toPayload bỏ các trường chỉ thuộc máy này', () => {
  const p = { id: 'prj_1', title: 'A', remoteRevision: 3, checkpointsCount: 2, scenes: [] };
  const out = S.toPayload(p);
  assert.equal(out.remoteRevision, undefined);
  assert.equal(out.checkpointsCount, undefined);
  assert.equal(out.id, 'prj_1');
  assert.equal(p.remoteRevision, 3, 'không làm đổi đối tượng gốc');
});

test('fromRemote giữ revision làm base cho lần lưu sau', () => {
  const p = S.fromRemote({ payload: { id: 'prj_1', title: 'B', script: 'x' }, revision: 7, updated_at: '2026-11-12T00:00:00Z' });
  assert.equal(p.remoteRevision, 7);
  assert.equal(p.title, 'B');
});

test('planPush: dự án mới tạo, dự án đã có thì lưu với base revision', () => {
  assert.deepEqual(S.planPush({ id: 'prj_1' }), { action: 'create', baseRevision: null });
  assert.deepEqual(S.planPush({ id: 'prj_1', remoteRevision: 5 }), { action: 'save', baseRevision: 5 });
});

test('conflictCheckpoint giữ nguyên bản local để không mất công việc', () => {
  const local = { id: 'prj_1', title: 'Local', revision: 9, remoteRevision: 4, checkpointsCount: 1 };
  const cp = S.conflictCheckpoint(local, { remoteRevision: 6 }, 'now');
  assert.equal(cp.revision, 9);
  assert.equal(cp.serverRevision, 6);
  const snap = JSON.parse(cp.snapshot);
  assert.equal(snap.title, 'Local');
  assert.equal(snap.remoteRevision, undefined);
});

test('syncStatus: local_only, synced, behind', () => {
  assert.equal(S.syncStatus({ id: 'a' }, undefined), 'local_only');
  assert.equal(S.syncStatus({ id: 'a', remoteRevision: 2 }, 2), 'synced');
  assert.equal(S.syncStatus({ id: 'a', remoteRevision: 2 }, 3), 'behind');
});
