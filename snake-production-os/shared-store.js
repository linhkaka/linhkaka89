/*
 * Lớp thuần cho đồng bộ nhóm qua Supabase (không gọi mạng, không đụng DOM).
 * Được kiểm thử bằng Node trong tests/shared-store.test.js.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SharedStore = api;
}(typeof self !== 'undefined' ? self : globalThis, function () {
  'use strict';

  // Các mã lỗi mà RPC trong 004_pop_shared_projects.sql trả về (thông điệp chứa mã này).
  const ERROR_CODES = [
    'NOT_AUTHENTICATED', 'FORBIDDEN', 'NOT_FOUND', 'REVISION_CONFLICT', 'REVIEW_REQUIRED',
    'QC_GATE_NOT_MET', 'MANAGER_REQUIRED', 'ID_MISMATCH', 'INVALID_ID',
    'INVALID_PAYLOAD_SCENES', 'INVALID_PAYLOAD_BIBLE', 'INVALID_PAYLOAD_SCRIPT', 'EVENTS_APPEND_ONLY'
  ];

  const MESSAGES = {
    NOT_AUTHENTICATED: 'Bạn chưa đăng nhập.',
    FORBIDDEN: 'Vai trò của bạn không được phép thực hiện thao tác này trong tổ chức.',
    NOT_FOUND: 'Không tìm thấy dự án trên máy chủ.',
    REVISION_CONFLICT: 'Có người khác vừa lưu dự án này. Hãy tải bản mới nhất; bản trên máy bạn sẽ được giữ lại thành checkpoint.',
    REVIEW_REQUIRED: 'Chỉ QA hoặc quản lý mới được chuyển cảnh sang “Đã duyệt”.',
    QC_GATE_NOT_MET: 'Cảnh chưa đủ QC (5 hạng mục đạt, có take đã chọn và take đạt) nên máy chủ từ chối duyệt.',
    MANAGER_REQUIRED: 'Chỉ quản lý mới được mở khóa nội dung gốc.',
    ID_MISMATCH: 'Mã dự án không khớp dữ liệu gửi lên.',
    INVALID_ID: 'Mã dự án không hợp lệ.',
    INVALID_PAYLOAD_SCENES: 'Dữ liệu cảnh không đúng cấu trúc.',
    INVALID_PAYLOAD_BIBLE: 'Dữ liệu Bible không đúng cấu trúc.',
    INVALID_PAYLOAD_SCRIPT: 'Dữ liệu kịch bản không đúng cấu trúc.',
    EVENTS_APPEND_ONLY: 'Nhật ký sự kiện không được sửa hoặc xóa.'
  };

  // Trích mã lỗi từ thông điệp PostgreSQL/PostgREST. Trả về null nếu không nhận ra.
  function parseRpcError(err) {
    const text = [err && err.message, err && err.details, err && err.hint].filter(Boolean).join(' ');
    const code = ERROR_CODES.find(c => text.includes(c)) || null;
    const conflictRev = code === 'REVISION_CONFLICT' && err && err.details ? Number(String(err.details).match(/\d+/)?.[0]) : null;
    return {
      code,
      message: code ? MESSAGES[code] : (text || 'Lỗi không xác định khi đồng bộ.'),
      serverRevision: Number.isFinite(conflictRev) ? conflictRev : null,
      raw: text
    };
  }

  // Đưa dự án local thành payload gửi lên. Bỏ các trường chỉ thuộc về máy này.
  const LOCAL_ONLY = ['remoteRevision', 'checkpointsCount'];
  function toPayload(project) {
    const copy = JSON.parse(JSON.stringify(project));
    LOCAL_ONLY.forEach(k => { delete copy[k]; });
    return copy;
  }

  // Dự án lấy từ máy chủ: giữ revision để dùng làm base cho lần lưu sau.
  function fromRemote(row) {
    const project = JSON.parse(JSON.stringify(row.payload));
    project.remoteRevision = Number(row.revision);
    project.remoteUpdatedAt = row.updated_at || null;
    return project;
  }

  // Quyết định hành động đồng bộ cho một dự án local.
  // hasRemote: dự án đã có trên máy chủ chưa. Trả về 'create' hoặc 'save'.
  function planPush(project) {
    if (project.remoteRevision === undefined || project.remoteRevision === null) {
      return { action: 'create', baseRevision: null };
    }
    return { action: 'save', baseRevision: Number(project.remoteRevision) };
  }

  // Khi xung đột: giữ bản local làm checkpoint trước khi thay bằng bản máy chủ.
  function conflictCheckpoint(localProject, serverProject, at) {
    return {
      name: `Bản local trước khi tải bản nhóm (${at})`,
      snapshot: JSON.stringify(toPayload(localProject)),
      revision: localProject.revision || 0,
      serverRevision: serverProject ? Number(serverProject.remoteRevision) : null
    };
  }

  // Dự án đang mở có phải bản mới nhất không (so với revision đã biết).
  function syncStatus(project, knownRemoteRevision) {
    if (project.remoteRevision === undefined || project.remoteRevision === null) return 'local_only';
    if (knownRemoteRevision !== undefined && knownRemoteRevision !== null && knownRemoteRevision !== project.remoteRevision) return 'behind';
    return 'synced';
  }

  return { ERROR_CODES, MESSAGES, parseRpcError, toPayload, fromRemote, planPush, conflictCheckpoint, syncStatus };
}));
