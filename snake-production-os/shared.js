/* Kết nối Supabase cho đồng bộ nhóm. Chỉ tải SDK khi đã cấu hình. */
(function () {
  'use strict';
  const SS = window.SharedStore;
  const cfg = window.POP_CONFIG || {};
  // Phiên bản SDK cố định, đã phát hành từ trước.
  const SDK_URL = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js';
  let client = null;

  function configured() { return !!(cfg.supabaseUrl && cfg.supabaseAnonKey); }

  function loadSdk() {
    if (window.supabase && window.supabase.createClient) return Promise.resolve();
    return new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = SDK_URL;
      s.onload = () => resolve();
      s.onerror = () => reject(new Error('Không tải được SDK Supabase. Kiểm tra kết nối mạng.'));
      document.head.appendChild(s);
    });
  }

  async function init() {
    if (!configured()) throw new Error('Chưa cấu hình Supabase (config.js).');
    if (!client) {
      await loadSdk();
      client = window.supabase.createClient(cfg.supabaseUrl, cfg.supabaseAnonKey, { auth: { persistSession: true } });
    }
    return client;
  }

  async function signIn(email) {
    const c = await init();
    const { error } = await c.auth.signInWithOtp({ email, options: { emailRedirectTo: location.href.split('#')[0] } });
    if (error) throw error;
  }

  async function session() {
    const c = await init();
    const { data } = await c.auth.getSession();
    return data.session;
  }

  async function signOut() {
    const c = await init();
    await c.auth.signOut();
  }

  async function myOrgs() {
    const c = await init();
    const { data, error } = await c.from('organization_members')
      .select('organization_id, role, organizations(id, name)')
      .eq('active', true);
    if (error) throw error;
    return data.map(r => ({ id: r.organization_id, role: r.role, name: (r.organizations && r.organizations.name) || r.organization_id }));
  }

  async function pull(orgId) {
    const c = await init();
    const { data, error } = await c.from('pop_projects')
      .select('id, title, payload, revision, updated_at')
      .eq('organization_id', orgId);
    if (error) throw error;
    return data;
  }

  // Tạo hoặc lưu có revision. Trả về revision mới trên máy chủ.
  async function push(orgId, project) {
    const c = await init();
    const plan = SS.planPush(project);
    const payload = SS.toPayload(project);
    const res = plan.action === 'create'
      ? await c.rpc('pop_create_project', { p_org: orgId, p_id: project.id, p_payload: payload })
      : await c.rpc('pop_save_project', { p_org: orgId, p_id: project.id, p_base_revision: plan.baseRevision, p_payload: payload });
    if (res.error) throw res.error;
    return Number(res.data);
  }

  window.SharedClient = { configured, signIn, session, signOut, myOrgs, pull, push };
})();
