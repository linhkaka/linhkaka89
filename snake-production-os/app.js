/* SNAKE Production OS — giao diện. Logic nằm trong core.js (window.SnakeCore). */
(function () {
  'use strict';
  const C = window.SnakeCore;
  const KEY = 'snakeOS.v1';
  const PAGE = 40;

  const SCREENS = [
    { id: 'dashboard', label: 'Tổng quan', group: 'Chung', project: false, title: 'Tổng quan', intro: 'Xem các dự án đang có, trạng thái cổng sản xuất và các cảnh báo cần xử lý. Dữ liệu chỉ lưu trên trình duyệt này; dùng Xuất/Nhập JSON để chuyển cho người khác.' },
    { id: 'templates', label: 'Mẫu dự án', group: 'Chung', project: false, title: 'Mẫu dự án', intro: 'Mẫu chỉ chứa cấu hình (thể loại, thời lượng, model, chế độ âm thanh). Mẫu không chứa kịch bản. Bạn có thể sửa mẫu do mình tạo; mẫu có sẵn thì nhân bản để sửa.' },
    { id: 'script', label: 'Kịch bản & Blueprint', group: 'Dự án', project: true, title: 'Kịch bản & Blueprint', intro: 'Dán hoặc nạp file .txt, rồi khóa nội dung. Sau khi khóa, không ai sửa chữ trong nguồn; muốn sửa phải mở khóa có lý do. Sau đó phân cảnh tự động.' },
    { id: 'scenes', label: 'Bảng cảnh', group: 'Dự án', project: true, title: 'Bảng cảnh', intro: 'Mỗi cảnh biên tập dài 10–20 giây. Nguyên văn đoạn nguồn hiển thị ở đầu mỗi cảnh và không sửa được. Hãy nhập hành động nhìn thấy, trạng thái đầu/cuối và thoại (nguyên văn trong đoạn nguồn).' },
    { id: 'bible', label: 'Bible nhân vật & bối cảnh', group: 'Dự án', project: true, title: 'Character & Location Bible', intro: 'Khóa mô tả nhân vật và bối cảnh để giữ nhất quán. Khóa mô tả không đảm bảo video giữ đúng khuôn mặt; cần QC bằng mắt trên video thật.' },
    { id: 'continuity', label: 'Continuity', group: 'Dự án', project: true, title: 'Continuity', intro: 'Danh sách lỗi chặn duyệt (đỏ) và cảnh báo cần người xem (vàng). Đối chiếu trạng thái cuối của cảnh trước với trạng thái đầu của cảnh sau.' },
    { id: 'router', label: 'Prompt Router', group: 'Sản xuất', project: true, title: 'Prompt Router', intro: 'Chọn model cho từng cảnh (định tuyến hybrid). Prompt chỉ mô tả hình ảnh và diễn xuất; tỷ lệ, thời lượng và tham chiếu nằm trong phần cài đặt. Mọi prompt là BẢN NHÁP.' },
    { id: 'voice', label: 'Voice & âm thanh', group: 'Sản xuất', project: true, title: 'Voice & Sound', intro: 'Lời đọc sạch là đúng nguyên văn kịch bản, không thêm bớt. Nhập thời lượng đo thật (ví dụ từ ffprobe) rồi khóa voice. Thời lượng ước tính chỉ để tham khảo.' },
    { id: 'budget', label: 'Ngân sách', group: 'Sản xuất', project: true, title: 'Ngân sách', intro: 'Mỗi tiền tệ được tính riêng, không cộng VND với USD. Chi phí thất bại và từ chối vẫn được ghi. Chi phí trên mỗi cảnh đã duyệt chỉ có khi đã có cảnh duyệt.' },
    { id: 'assign', label: 'Phân công', group: 'Sản xuất', project: true, title: 'Phân công', intro: 'Ghi người phụ trách và hạn cho từng cảnh. Tên trong danh sách chỉ là ghi chú; ứng dụng này không mời tài khoản và không gửi thông báo.' },
    { id: 'qc', label: 'QC', group: 'Sản xuất', project: true, title: 'QC & duyệt', intro: 'Chấm từng hạng mục QC, chọn take đạt, rồi duyệt. Nút duyệt chỉ mở khi đủ điều kiện. Máy không duyệt thay người; mọi lần từ chối đều được lưu lý do.' },
    { id: 'checkpoints', label: 'Checkpoints', group: 'Sản xuất', project: true, title: 'Checkpoints', intro: 'Ảnh chụp dự án tại một thời điểm để có thể khôi phục. Tự động tạo khi khóa nguồn và khi phân cảnh lại. Tối đa 10 checkpoint mỗi dự án (giới hạn bộ nhớ trình duyệt).' },
    { id: 'queue', label: 'Hàng đợi', group: 'Sản xuất', project: true, title: 'Hàng đợi (thủ công)', intro: 'Ứng dụng KHÔNG gửi job đi đâu. Bạn gửi prompt bằng tay rồi ghi lại trạng thái ở đây. Mỗi job có khóa idempotency gồm hash prompt để tránh ghi trùng.' },
    { id: 'os', label: 'Production OS', group: 'Sản xuất', project: true, title: 'Production OS', intro: 'Các cổng sản xuất theo thứ tự. Nhãn đầu ra chỉ nâng cấp khi đủ cổng: DRAFT → APPROVED KIT → FINISHED. Không gọi gói prompt là phim hoàn tất.' },
    { id: 'export', label: 'Xuất file', group: 'Sản xuất', project: true, title: 'Xuất file', intro: 'Tên file có kèm nhãn đầu ra (DRAFT/APPROVED/FINISHED) để không nhầm bản nháp với bản đã duyệt.' }
  ];
  const SCREEN_BY = Object.fromEntries(SCREENS.map(s => [s.id, s]));

  const CFG_FIELDS = [
    { key: 'channel', label: 'Tên kênh', type: 'text' },
    { key: 'market', label: 'Thị trường đích', type: 'select', options: C.MARKETS.map(m => [m.code, `${m.name} (${m.code})`]) },
    { key: 'genre', label: 'Thể loại', type: 'select', options: C.GENRES },
    { key: 'narrativeStyle', label: 'Phong cách kể chuyện', type: 'select', options: C.NARRATIVE_STYLES },
    { key: 'visualStyle', label: 'Phong cách hình ảnh', type: 'select', options: C.VISUAL_STYLES },
    { key: 'minutes', label: 'Thời lượng (phút, 20–120)', type: 'number', min: 20, max: 120 },
    { key: 'ratio', label: 'Tỷ lệ khung hình', type: 'select', options: C.RATIOS },
    { key: 'audioMode', label: 'Chế độ âm thanh', type: 'select', options: Object.entries(C.AUDIO_MODES) },
    { key: 'defaultModel', label: 'Model mặc định', type: 'select', options: C.MODEL_IDS.map(id => [id, C.MODELS[id].name]) },
    { key: 'routing', label: 'Định tuyến', type: 'select', options: [['hybrid', 'Hybrid · chọn model theo từng cảnh'], ['single', 'Một model cho toàn dự án']] },
    { key: 'sceneSeconds', label: 'Độ dài cảnh mong muốn (10–20 giây)', type: 'number', min: 10, max: 20 },
    { key: 'voiceRate', label: 'Tốc độ đọc (đơn vị/phút)', type: 'number', min: 50, max: 600 }
  ];
  const TPL_FIELDS = CFG_FIELDS.filter(f => !['market', 'channel'].includes(f.key));
  const CFG_KEYS = CFG_FIELDS.map(f => f.key);
  const GATE_SHORT = { draft: 'DRAFT', approved_kit: 'APPROVED', finished: 'FINISHED' };

  // ---------- Trạng thái ----------
  let S = load();
  const UI = { page: 0, viewScene: '', viewClip: 0, viewModel: '', queueFilter: 'all', assignFilter: '', contFilter: 'all' };

  function defaults() {
    return { projects: {}, order: [], templates: [], checkpoints: {}, currentId: '', screen: 'dashboard', tplDraft: '' };
  }
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) return Object.assign(defaults(), JSON.parse(raw));
    } catch (e) { /* trình duyệt chặn bộ nhớ hoặc dữ liệu hỏng: dùng trạng thái mới */ }
    return defaults();
  }
  function save() {
    try { localStorage.setItem(KEY, JSON.stringify(S)); }
    catch (e) { toast('Không lưu được trên trình duyệt này (có thể đang ở chế độ riêng tư hoặc bộ nhớ đầy). Hãy xuất JSON để sao lưu.', 'warn'); }
  }
  const cur = () => S.projects[S.currentId] || null;
  const now = () => new Date().toISOString();

  // ---------- Tiện ích ----------
  const esc = s => String(s === undefined || s === null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = iso => { try { return new Date(iso).toLocaleString('vi-VN'); } catch (e) { return iso || ''; } };
  const money = (n, cur) => { try { return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: cur, maximumFractionDigits: cur === 'VND' || cur === 'JPY' || cur === 'KRW' ? 0 : 2 }).format(n); } catch (e) { return `${n} ${cur}`; } };
  const slug = s => String(s).normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').replace(/[^a-zA-Z0-9]+/g, '_').replace(/^_|_$/g, '').slice(0, 40) || 'project';
  const gateShort = p => GATE_SHORT[C.gateOf(p).level];
  const pill = (text, cls) => `<span class="pill ${cls || ''}">${esc(text)}</span>`;

  function toast(msg, kind) {
    const el = document.getElementById('toast');
    el.className = `toast show ${kind || ''}`;
    el.textContent = msg;
    clearTimeout(toast.t);
    toast.t = setTimeout(() => { el.className = 'toast'; }, 4200);
  }

  function download(name, content, type) {
    const blob = new Blob([content], { type: type || 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = name;
    document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 1000);
  }

  function valueOf(el) {
    if (el.type === 'checkbox') return el.checked;
    if (el.dataset.num !== undefined || el.type === 'number') return el.value === '' ? 0 : Number(el.value);
    return el.value;
  }

  function fieldHtml(f, value, attrs) {
    const label = `<span>${esc(f.label)}</span>`;
    if (f.type === 'select') {
      const opts = f.options.map(o => {
        const [v, l] = Array.isArray(o) ? o : [o, o];
        return `<option value="${esc(v)}" ${String(v) === String(value) ? 'selected' : ''}>${esc(l)}</option>`;
      }).join('');
      return `<label class="field">${label}<select ${attrs}>${opts}</select></label>`;
    }
    const lim = (f.min !== undefined ? ` min="${f.min}"` : '') + (f.max !== undefined ? ` max="${f.max}"` : '');
    return `<label class="field">${label}<input type="${f.type || 'text'}"${lim} value="${esc(value)}" ${attrs}></label>`;
  }

  function pager(total, page, act) {
    const pages = Math.max(1, Math.ceil(total / PAGE));
    if (pages <= 1) return '';
    return `<div class="pager"><button data-act="${act}" data-dir="-1" ${page <= 0 ? 'disabled' : ''}>← Trước</button><span>Trang ${page + 1}/${pages} · ${total} mục</span><button data-act="${act}" data-dir="1" ${page >= pages - 1 ? 'disabled' : ''}>Sau →</button></div>`;
  }

  function parseDialogue(text) {
    return String(text).split(/\r?\n/).filter(l => l.trim()).map(l => {
      const m = l.match(/^([^:：]{1,40})[:：]\s?(.*)$/);
      return m ? { speaker: m[1].trim(), line: m[2].replace(/\s+$/, '') } : { speaker: 'Không rõ', line: l.trim() };
    });
  }
  const dialogueText = sc => (sc.dialogue || []).map(d => `${d.speaker}: ${d.line}`).join('\n');

  // ---------- Thay đổi dữ liệu ----------
  function mutate(note, fn) {
    const p = cur();
    if (!p) return;
    fn(p);
    p.revision = (p.revision || 0) + 1;
    p.updatedAt = now();
    if (note) p.activity = [{ at: p.updatedAt, text: note }, ...(p.activity || [])].slice(0, 100);
    save();
    render();
  }

  function autoCheckpoint(p, name) {
    const list = S.checkpoints[p.id] || [];
    list.unshift({ id: C.uid('cp'), name, at: now(), revision: p.revision, snapshot: JSON.stringify(p) });
    S.checkpoints[p.id] = list.slice(0, 10);
    p.checkpointsCount = S.checkpoints[p.id].length;
  }

  function makeTitle(text) {
    const words = text.trim().split(/\s+/).filter(Boolean);
    return words.length ? words.slice(0, 8).join(' ') + (words.length > 8 ? '…' : '') : 'Cảnh';
  }

  function applySplit(p) {
    const r = C.splitScenes(p.script, { minutes: p.minutes, sceneSeconds: p.sceneSeconds, market: p.market });
    p.scenes = r.scenes.map((s, i) => Object.assign(s, {
      title: makeTitle(p.script.slice(s.start, s.end)),
      action: '', opening: '', ending: '', camera: C.CAMERAS[i % C.CAMERAS.length], lighting: '',
      characterIds: [], locationId: '', dialogue: [], ambient: '', music: '', model: '',
      status: 'draft', assignee: '', due: '', notes: '', takes: [], chosen: {},
      qc: C.emptyQc(), continuityChecked: false, rejections: [],
      bibleVersion: p.bible.version, sourceHash: p.sourceHash
    }));
    p.splitParams = { minutes: p.minutes, sceneSeconds: p.sceneSeconds, market: p.market };
    p.splitWarnings = r.warnings;
    return r;
  }

  // ---------- Điều hướng ----------
  function go(screen) {
    S.screen = screen;
    UI.page = 0;
    save();
    render();
    window.scrollTo(0, 0);
  }

  function renderNav() {
    const p = cur();
    const groups = {};
    SCREENS.forEach(s => { (groups[s.group] = groups[s.group] || []).push(s); });
    let html = '';
    Object.keys(groups).forEach(g => {
      html += `<div class="navgroup">${esc(g)}</div>`;
      groups[g].forEach(s => {
        const disabled = s.project && !p;
        html += `<button class="navbtn ${S.screen === s.id ? 'on' : ''}" data-act="nav" data-screen="${s.id}" ${disabled ? 'disabled' : ''}>${esc(s.label)}</button>`;
      });
    });
    document.getElementById('nav').innerHTML = html;
  }

  function renderHeader() {
    const ids = S.order.filter(id => S.projects[id]);
    const sel = document.getElementById('projSel');
    sel.innerHTML = ids.length
      ? ids.map(id => `<option value="${esc(id)}" ${id === S.currentId ? 'selected' : ''}>${esc(S.projects[id].title)}</option>`).join('')
      : '<option value="">Chưa có dự án</option>';
    const p = cur();
    document.getElementById('gate').innerHTML = p
      ? `<span class="gate gate-${C.gateOf(p).level}">${esc(C.gateOf(p).label)}</span>`
      : '';
  }

  function render() {
    const openSet = new Set([...document.querySelectorAll('details.scene[open][data-sid]')].map(d => d.dataset.sid));
    renderNav();
    renderHeader();
    const meta = SCREEN_BY[S.screen] || SCREEN_BY.dashboard;
    const p = cur();
    let body;
    if (S.screen === 'new') body = vNew();
    else if (meta.project && !p) {
      body = `<div class="empty"><h2>Chưa có dự án đang mở</h2><p>Hãy tạo dự án mới hoặc quay về Tổng quan để chọn dự án có sẵn.</p><button class="primary" data-act="newProject">+ Dự án mới</button></div>`;
    } else {
      const fn = VIEWS[S.screen] || VIEWS.dashboard;
      body = fn(p);
    }
    const title = S.screen === 'new' ? 'Dự án mới' : meta.title;
    const intro = S.screen === 'new' ? 'Chọn mẫu, thị trường và cấu hình. Kịch bản có thể dán ngay hoặc thêm sau.' : meta.intro;
    const main = document.getElementById('main');
    main.innerHTML = `<h1>${esc(title)}</h1><p class="intro">${esc(intro)}</p>${body}`;
    // Giữ trạng thái mở của các cảnh sau khi vẽ lại.
    main.querySelectorAll('details.scene[data-sid]').forEach(d => { if (openSet.has(d.dataset.sid)) d.open = true; });
  }

  // ---------- Đồng bộ nhóm (Supabase của SNAKE OPS) ----------
  const SS = window.SharedStore;
  const SH = { session: null, orgs: [], orgId: '', busy: false, msg: '' };
  const hasShared = () => !!(window.SharedClient && window.SharedClient.configured());

  function viewSharing() {
    if (!hasShared()) {
      return `<section class="card"><h2>Đồng bộ nhóm</h2><p class="muted">Chưa bật. Dự án chỉ lưu trên trình duyệt này. Khi project Supabase DEV của SNAKE OPS được xác nhận, điền <code>config.js</code> (xem README, mục “Đồng bộ nhóm”).</p></section>`;
    }
    const orgOpts = SH.orgs.map(o => `<option value="${esc(o.id)}" ${o.id === SH.orgId ? 'selected' : ''}>${esc(o.name)} (${esc(o.role)})</option>`).join('');
    const controls = SH.session
      ? `<div class="row gap wrap">
          <label class="field inline"><span>Tổ chức</span><select data-chg="sharedOrg"><option value="">— chọn —</option>${orgOpts}</select></label>
          <button data-act="sharedOrgs">Làm mới danh sách</button>
          <button class="primary" data-act="sharedPullAll" ${SH.orgId ? '' : 'disabled'}>Tải tất cả dự án từ nhóm</button>
          <button data-act="sharedPushCurrent" ${SH.orgId && cur() ? '' : 'disabled'}>Lưu dự án đang mở lên nhóm</button>
          <button data-act="sharedSignOut">Đăng xuất</button>
        </div>`
      : `<div class="row gap wrap">
          <label class="field inline"><span>Email</span><input type="email" id="shEmail" placeholder="ten@cong-ty.com"></label>
          <button class="primary" data-act="sharedSignIn">Gửi liên kết đăng nhập</button>
        </div>`;
    return `<section class="card"><h2>Đồng bộ nhóm (Supabase SNAKE OPS)</h2>
      ${controls}
      ${SH.busy ? '<p class="muted small">Đang xử lý…</p>' : ''}
      ${SH.msg ? `<p class="small">${esc(SH.msg)}</p>` : ''}
      <p class="muted small">Nếu người khác đã lưu sau bạn, máy chủ từ chối (xung đột). Khi tải bản nhóm, bản trên máy bạn được lưu thành checkpoint trước, nên không mất công việc.</p>
    </section>`;
  }

  async function sharedRun(fn, onError) {
    SH.busy = true; render();
    try { await fn(); }
    catch (err) { if (onError) onError(err); else SH.msg = (err && err.message) || 'Lỗi đồng bộ.'; }
    SH.busy = false; render();
  }

  function keepCheckpoint(id, name, snapshot, revision) {
    const list = S.checkpoints[id] || [];
    list.unshift({ id: C.uid('cp'), name, at: now(), revision, snapshot });
    S.checkpoints[id] = list.slice(0, 10);
  }

  // ---------- Tổng quan ----------
  function viewDashboard() {
    const sums = S.order.filter(id => S.projects[id]).map(id => C.projectSummary(S.projects[id]));
    const total = sums.reduce((a, s) => a + s.sceneCount, 0);
    const approved = sums.reduce((a, s) => a + s.approved, 0);
    const stale = sums.reduce((a, s) => a + s.stale, 0);
    const errors = sums.reduce((a, s) => a + s.errors, 0);
    const cards = sums.map(s => `
      <article class="card proj">
        <div class="row between"><h3>${esc(s.title)}</h3><span class="gate gate-${C.gateOf(S.projects[s.id]).level}">${esc(gateShort(S.projects[s.id]))}</span></div>
        <p class="muted">Thị trường ${esc(s.market)} · ${s.minutes} phút · ${s.sceneCount} cảnh · đã duyệt ${s.approved}/${s.sceneCount}</p>
        <p class="muted small">${s.stale ? pill(`${s.stale} cảnh stale`, 'warn') : ''} ${s.errors ? pill(`${s.errors} lỗi chặn`, 'bad') : ''} ${s.warnings ? pill(`${s.warnings} cảnh báo`, 'info') : ''} Cập nhật ${esc(fmt(s.updatedAt))}</p>
        <div class="row gap">
          <button class="primary" data-act="open" data-id="${esc(s.id)}">Mở dự án</button>
          <button data-act="cloneProj" data-id="${esc(s.id)}">Nhân bản</button>
          <button data-act="saveTplFrom" data-id="${esc(s.id)}">Lưu thành mẫu</button>
          <button class="danger" data-act="delProj" data-id="${esc(s.id)}">Xóa</button>
        </div>
      </article>`).join('');
    const verify = `
      <section class="card">
        <h2>Trạng thái xác minh</h2>
        <div class="grid2">
          <div><h4>Đã kiểm trong ứng dụng này</h4><ul class="list">
            <li>Phân cảnh bao phủ 100% nguồn, không mất và không lặp ký tự (kiểm thử tự động)</li>
            <li>Unicode: emoji ZWJ, tiếng Việt tổ hợp, tiếng Nhật, CRLF được giữ nguyên</li>
            <li>Định tuyến hybrid, clip theo giới hạn từng model, thoại không lặp</li>
            <li>Cổng duyệt: không duyệt khi QC, take hoặc nối cảnh chưa đạt</li>
            <li>Ngân sách tách theo tiền tệ; xuất JSON/CSV/Markdown</li>
          </ul></div>
          <div><h4>CHƯA xác minh / chưa có</h4><ul class="list warnlist">
            <li>Google Flow, Muse.ai, Seedance: chưa kiểm tài khoản; không có API trong ứng dụng</li>
            <li>Thời lượng voice thật: chưa có TTS; chỉ nhập số đo thủ công</li>
            <li>Chia sẻ đa người dùng theo thời gian thực: không có máy chủ, chỉ lưu trên trình duyệt</li>
            <li>Kiểm hình ảnh bằng AI: không triển khai; QC là người duyệt</li>
            <li>Tỷ giá tiền tệ: không quy đổi; mỗi tiền tệ tính riêng</li>
          </ul></div>
        </div>
      </section>`;
    return `
      <section class="stats">
        <div class="stat"><b>${sums.length}</b><span>Dự án</span></div>
        <div class="stat"><b>${total}</b><span>Cảnh</span></div>
        <div class="stat"><b>${approved}</b><span>Đã duyệt</span></div>
        <div class="stat ${stale ? 'warn' : ''}"><b>${stale}</b><span>Cảnh stale</span></div>
        <div class="stat ${errors ? 'bad' : ''}"><b>${errors}</b><span>Lỗi chặn</span></div>
      </section>
      <div class="row gap wrap">
        <button class="primary" data-act="newProject">+ Dự án mới</button>
        <button data-act="pickJson">Nhập JSON dự án</button>
        <button data-act="go" data-screen="templates">Quản lý mẫu</button>
      </div>
      <section class="cards">${cards || '<div class="empty"><p>Chưa có dự án. Bấm “+ Dự án mới” để bắt đầu.</p></div>'}</section>
      ${viewSharing()}
      ${verify}`;
  }

  // ---------- Mẫu ----------
  function viewTemplates() {
    const builtin = C.BUILTIN_TEMPLATES.map(t => `
      <article class="card">
        <h3>${esc(t.name)}</h3>
        <p class="muted small">${esc(t.config.genre)} · ${t.config.minutes} phút · ${esc(C.AUDIO_MODES[t.config.audioMode])} · mặc định ${esc(C.MODELS[t.config.defaultModel].name)}</p>
        <div class="row gap">
          <button class="primary" data-act="useTpl" data-id="${esc(t.id)}">Dùng để tạo dự án</button>
          <button data-act="copyBuiltin" data-id="${esc(t.id)}">Sao chép để sửa</button>
        </div>
      </article>`).join('');
    const mine = S.templates.map(t => `
      <article class="card">
        <div class="row between"><input class="grow" value="${esc(t.name)}" data-chg="tplname" data-id="${esc(t.id)}" aria-label="Tên mẫu"></div>
        <div class="grid3">${TPL_FIELDS.map(f => fieldHtml(f, t.config[f.key], `data-chg="tplcfg" data-id="${esc(t.id)}" data-key="${f.key}"`)).join('')}</div>
        <div class="row gap">
          <button class="primary" data-act="useTpl" data-id="${esc(t.id)}">Dùng để tạo dự án</button>
          <button class="danger" data-act="delTpl" data-id="${esc(t.id)}">Xóa mẫu</button>
        </div>
      </article>`).join('');
    return `
      <div class="row between wrap"><h2>Mẫu có sẵn</h2>
        ${cur() ? `<button data-act="saveCurrentTpl">Lưu dự án hiện tại thành mẫu</button>` : ''}</div>
      <section class="cards">${builtin}</section>
      <h2>Mẫu của bạn</h2>
      <section class="cards">${mine || '<p class="muted">Chưa có mẫu riêng. Sao chép một mẫu có sẵn để sửa.</p>'}</section>`;
  }

  // ---------- Dự án mới ----------
  function vNew() {
    const tpl = findTpl(S.tplDraft) || null;
    const base = tpl ? tpl.config : { genre: C.GENRES[0], narrativeStyle: C.NARRATIVE_STYLES[0], visualStyle: C.VISUAL_STYLES[0], minutes: 30, ratio: '16:9', audioMode: 'narration_only', defaultModel: 'flow', routing: 'hybrid', sceneSeconds: 15 };
    const market = C.MARKET_BY.US;
    const tplOpts = [['', 'Không dùng mẫu (mặc định)'], ...C.BUILTIN_TEMPLATES.map(t => [t.id, t.name]), ...S.templates.map(t => [t.id, `${t.name} (mẫu của bạn)`])];
    const fields = CFG_FIELDS.filter(f => f.key !== 'market' && f.key !== 'channel').map(f => {
      const v = base[f.key] !== undefined ? base[f.key] : (f.key === 'voiceRate' ? market.rate : '');
      return fieldHtml(f, v, `name="${f.key}"`);
    }).join('');
    return `
      <form id="newForm" class="card form" onsubmit="return false">
        <div class="grid3">
          <label class="field"><span>Tên dự án</span><input name="title" required placeholder="Ví dụ: Lịch sử đường sắt xuyên lục địa" value=""></label>
          <label class="field"><span>Mẫu cấu hình</span><select name="tpl" data-chg="newTpl">${tplOpts.map(([v, l]) => `<option value="${esc(v)}" ${v === S.tplDraft ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select></label>
          ${fieldHtml(CFG_FIELDS[0], 'SNAKE MEDIA', 'name="channel"')}
          ${fieldHtml(CFG_FIELDS[1], 'US', 'name="market" data-chg="newMarket"')}
          ${fields}
          <label class="field"><span>Ngân sách (tổng)</span><input type="number" name="budget" min="0" value="0"></label>
          <label class="field"><span>Tiền tệ ngân sách</span><select name="currency">${C.CURRENCIES.map(c => `<option ${c === 'USD' ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
          <label class="field"><span>Nguồn</span><select name="sourceType"><option value="script">Kịch bản hoàn chỉnh</option><option value="blueprint">Blueprint (cần phát triển thành kịch bản)</option></select></label>
        </div>
        <label class="field"><span>Kịch bản (có thể để trống, thêm sau)</span><textarea name="script" rows="6" placeholder="Dán kịch bản tại đây..."></textarea></label>
        <div class="row gap"><button class="primary" data-act="createProject">Tạo dự án</button><button data-act="go" data-screen="dashboard">Hủy</button></div>
      </form>`;
  }

  function findTpl(id) { return C.BUILTIN_TEMPLATES.find(t => t.id === id) || S.templates.find(t => t.id === id); }

  // ---------- Kịch bản ----------
  function viewScript(p) {
    const locked = !!p.sourceLocked;
    const cov = p.scenes && p.scenes.length ? C.checkCoverage(p) : null;
    const loc = (p.localizedByMarket || {})[p.market] || '';
    const ov = loc ? C.originalityOverlap(p.script, loc) : null;
    const mk = C.MARKET_BY[p.market];
    let preview = '';
    if (p.script && p.script.trim()) {
      try {
        const r = C.splitScenes(p.script, { minutes: p.minutes, sceneSeconds: p.sceneSeconds, market: p.market });
        preview = `<p>Sẽ tạo <b>${r.count}</b> cảnh · thời lượng timeline ${Math.round(r.targetSeconds / 60)} phút · voice ước tính ${Math.round(r.estimatedVoiceSeconds / 60 * 10) / 10} phút.</p>${r.warnings.map(w => `<p class="warn-text">⚠ ${esc(w)}</p>`).join('')}`;
      } catch (e) { preview = `<p class="bad-text">${esc(e.message)}</p>`; }
    }
    const drift = p.splitParams && (p.splitParams.minutes !== p.minutes || p.splitParams.sceneSeconds !== p.sceneSeconds || p.splitParams.market !== p.market);
    return `
      <section class="card">
        <div class="row between wrap"><h2>1. Nguồn</h2>${locked ? pill('Đã khóa', 'ok') : pill('Chưa khóa', 'info')}</div>
        <p class="muted small">Hash FNV-1a 32-bit: <code>${esc(locked ? p.sourceHash : '—')}</code> · ${p.script ? [...p.script].length.toLocaleString('vi-VN') : 0} ký tự (code point) ${locked ? `· khóa lúc ${esc(fmt(p.sourceLockedAt))}` : ''}</p>
        <p class="muted small">Hash chỉ phát hiện thay đổi, không phải mã bảo mật. Dán vào ô văn bản có thể làm đổi xuống dòng CRLF thành LF; nên nạp file .txt để giữ nguyên byte.</p>
        <label class="field"><span>Nội dung nguồn ${locked ? '(đã khóa, chỉ đọc)' : ''}</span>
          <textarea rows="10" ${locked ? 'readonly' : ''} data-chg="proj" data-key="script">${esc(p.script)}</textarea></label>
        <div class="row gap wrap">
          ${locked
            ? `<button class="danger" data-act="unlockSource">Mở khóa (cần lý do)</button>`
            : `<button class="primary" data-act="lockSource">Khóa nội dung gốc</button>`}
          <button ${locked ? 'disabled' : ''} data-act="pickTxt">Nạp file .txt</button>
          ${!locked && !(p.script || '').trim() ? `<button data-act="seedTest">Nạp dữ liệu thử (không phải kịch bản thật)</button>` : ''}
        </div>
        <div class="grid2">
          <label class="field"><span>Loại nguồn</span><select data-chg="proj" data-key="sourceType"><option value="script" ${p.sourceType === 'script' ? 'selected' : ''}>Kịch bản hoàn chỉnh</option><option value="blueprint" ${p.sourceType === 'blueprint' ? 'selected' : ''}>Blueprint</option></select></label>
        </div>
        ${p.sourceType === 'blueprint' ? '<p class="warn-text">Blueprint cần được phát triển thành kịch bản hoàn chỉnh trước khi phân cảnh.</p>' : ''}
        <label class="field"><span>Blueprint (câu hỏi trung tâm, lời hứa, góc tiếp cận, kết luận)</span>
          <textarea rows="4" data-chg="proj" data-key="blueprint">${esc(p.blueprint)}</textarea></label>
      </section>

      <section class="card">
        <h2>2. Kiểm dữ kiện, bản quyền, bản địa</h2>
        <div class="grid3">
          <label class="check"><input type="checkbox" ${p.review.facts ? 'checked' : ''} data-chg="review" data-key="facts"> Dữ kiện đã đối chiếu nguồn</label>
          <label class="check"><input type="checkbox" ${p.review.originality ? 'checked' : ''} data-chg="review" data-key="originality"> Có quyền dùng nguồn, không sao chép đối thủ</label>
          <label class="check"><input type="checkbox" ${p.review.localization ? 'checked' : ''} data-chg="review" data-key="localization"> Bản địa đã được người bản xứ duyệt</label>
        </div>
        <label class="field"><span>Người duyệt (ghi chú, không tạo tài khoản)</span><input value="${esc(p.review.reviewer)}" data-chg="review" data-key="reviewer"></label>
      </section>

      <section class="card">
        <h2>3. Bản địa hóa — ${esc(mk ? mk.name : p.market)}</h2>
        <p class="muted small">${esc(mk ? mk.note : '')} Viết lại theo thị trường; không dán kịch bản gốc hoặc kịch bản đối thủ.</p>
        <label class="field"><span>Bản địa hóa (tự viết)</span>
          <textarea rows="5" data-chg="loc" data-market="${esc(p.market)}">${esc(loc)}</textarea></label>
        ${ov ? `<p class="${ov.warn ? 'warn-text' : 'muted small'}">${ov.warn ? '⚠ ' : ''}Trùng lặp với nguồn: ${Math.round(ov.ratio * 100)}% chuỗi 8 ký tự (${ov.shared}/${ov.total}). ${ov.warn ? 'Trên 20%: cần người duyệt xem có sao chép không.' : 'Dưới ngưỡng cảnh báo.'}</p>` : ''}
      </section>

      <section class="card">
        <h2>4. Thiết lập dự án</h2>
        ${drift ? '<p class="warn-text">Thiết lập đã đổi so với lần phân cảnh gần nhất. Bấm “Phân cảnh lại” để áp dụng (sẽ thay thế cảnh hiện tại, sau khi tự tạo checkpoint).</p>' : ''}
        <div class="grid3">${CFG_FIELDS.map(f => fieldHtml(f, p[f.key], `data-chg="proj" data-key="${f.key}"`)).join('')}</div>
        <div class="grid2">
          <label class="field"><span>Ngân sách (tổng)</span><input type="number" min="0" value="${esc((p.budget || {}).amount || 0)}" data-chg="budgetAmount"></label>
          <label class="field"><span>Tiền tệ</span><select data-chg="budgetCurrency">${C.CURRENCIES.map(c => `<option ${(p.budget || {}).currency === c ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
        </div>
      </section>

      <section class="card">
        <h2>5. Phân cảnh tự động</h2>
        ${preview || '<p class="muted">Nhập kịch bản để xem trước số cảnh.</p>'}
        ${cov ? `<p>${cov.ok ? pill('Phủ 100% nguồn', 'ok') : pill('Chưa phủ đủ', 'bad')} ${esc(`${cov.covered}/${cov.total} ký tự`)}</p>` : ''}
        <div class="row gap">
          <button class="primary" data-act="split" ${locked ? '' : 'disabled'}>${p.scenes && p.scenes.length ? 'Phân cảnh lại' : 'Phân cảnh'}</button>
          ${locked ? '' : '<span class="muted small">Khóa nội dung gốc trước khi phân cảnh.</span>'}
        </div>
      </section>`;
  }

  // ---------- Bảng cảnh ----------
  function sceneCard(p, sc) {
    const text = C.sceneText(p, sc);
    const stale = C.isStale(p, sc);
    const chars = p.bible.characters.map(c => `<label class="check small"><input type="checkbox" ${(sc.characterIds || []).includes(c.id) ? 'checked' : ''} data-chg="charToggle" data-id="${esc(sc.id)}" data-cid="${esc(c.id)}"> ${esc(c.name)}</label>`).join('') || '<span class="muted small">Chưa có nhân vật trong Bible.</span>';
    const locOpts = [['', '— chưa gán —'], ...p.bible.locations.map(l => [l.id, l.name])];
    const issues = C.continuityIssues(p).filter(i => i.scene === sc.id);
    return `
      <details class="scene" data-sid="${esc(sc.id)}">
        <summary>
          <b>${esc(sc.id)}</b> · ${esc(sc.title || 'Không tên')}
          <span class="muted small">${sc.durationSec}s · ${esc(C.STATUSES[sc.status])}</span>
          ${stale ? pill('stale', 'warn') : ''}
          ${issues.some(i => i.level === 'error') ? pill('lỗi', 'bad') : ''}
        </summary>
        <div class="scene-body">
          <div class="src"><div class="muted small">Nguyên văn đoạn nguồn (không sửa) · ký tự ${sc.start}–${sc.end}</div><pre>${esc(text)}</pre></div>
          <div class="grid2">
            <label class="field"><span>Tiêu đề cảnh</span><input value="${esc(sc.title)}" data-chg="scene" data-id="${esc(sc.id)}" data-key="title"></label>
            <label class="field"><span>Máy quay (gợi ý, có thể đổi)</span><select data-chg="scene" data-id="${esc(sc.id)}" data-key="camera">${C.CAMERAS.map(c => `<option ${sc.camera === c ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></label>
          </div>
          <label class="field"><span>Hành động nhìn thấy được (bắt buộc)</span><textarea rows="2" data-chg="scene" data-id="${esc(sc.id)}" data-key="action">${esc(sc.action)}</textarea></label>
          <div class="grid2">
            <label class="field"><span>Trạng thái đầu cảnh (bắt buộc)</span><textarea rows="2" data-chg="scene" data-id="${esc(sc.id)}" data-key="opening">${esc(sc.opening)}</textarea></label>
            <label class="field"><span>Trạng thái cuối cảnh (bắt buộc)</span><textarea rows="2" data-chg="scene" data-id="${esc(sc.id)}" data-key="ending">${esc(sc.ending)}</textarea></label>
          </div>
          <div class="grid2">
            <label class="field"><span>Ánh sáng</span><input value="${esc(sc.lighting)}" data-chg="scene" data-id="${esc(sc.id)}" data-key="lighting"></label>
            <label class="field"><span>Bối cảnh</span><select data-chg="scene" data-id="${esc(sc.id)}" data-key="locationId">${locOpts.map(([v, l]) => `<option value="${esc(v)}" ${sc.locationId === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select></label>
          </div>
          <div class="field"><span>Nhân vật trong cảnh</span><div class="chips">${chars}</div></div>
          <label class="field"><span>Thoại — mỗi dòng “Tên: nguyên văn” (nguyên văn phải nằm trong đoạn nguồn)</span><textarea rows="3" data-chg="dialogue" data-id="${esc(sc.id)}">${esc(dialogueText(sc))}</textarea></label>
          <div class="grid2">
            <label class="field"><span>Âm thanh môi trường</span><input value="${esc(sc.ambient)}" data-chg="scene" data-id="${esc(sc.id)}" data-key="ambient"></label>
            <label class="field"><span>Nhạc / ghi chú âm</span><input value="${esc(sc.music)}" data-chg="scene" data-id="${esc(sc.id)}" data-key="music"></label>
          </div>
          <div class="grid3">
            <label class="field"><span>Model cho cảnh</span><select data-chg="scene" data-id="${esc(sc.id)}" data-key="model" ${p.routing !== 'hybrid' ? 'disabled' : ''}>${[['', `Theo mặc định (${C.MODELS[p.defaultModel].name})`], ...C.MODEL_IDS.map(id => [id, C.MODELS[id].name])].map(([v, l]) => `<option value="${v}" ${sc.model === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select></label>
            <label class="field"><span>Trạng thái</span><select data-chg="status" data-id="${esc(sc.id)}">${Object.keys(C.STATUSES).map(k => `<option value="${k}" ${sc.status === k ? 'selected' : ''}>${esc(C.STATUSES[k])}</option>`).join('')}</select></label>
            <label class="check"><input type="checkbox" ${sc.continuityChecked ? 'checked' : ''} data-chg="scene" data-id="${esc(sc.id)}" data-key="continuityChecked"> Đã đối chiếu nối cảnh</label>
          </div>
          <div class="row gap wrap">
            ${stale ? `<button data-act="confirmScene" data-id="${esc(sc.id)}">Xác nhận theo Bible/nguồn hiện tại</button>` : ''}
            <button class="danger" data-act="resetScene" data-id="${esc(sc.id)}">Xóa nội dung đã nhập của cảnh</button>
          </div>
          ${issues.length ? `<ul class="list small">${issues.map(i => `<li class="${i.level === 'error' ? 'bad-text' : 'warn-text'}">${esc(i.text)}</li>`).join('')}</ul>` : ''}
        </div>
      </details>`;
  }

  function viewScenes(p) {
    if (!p.scenes.length) return `<div class="empty"><p>Chưa có cảnh. Hãy khóa nguồn và phân cảnh ở bước “Kịch bản & Blueprint”.</p><button class="primary" data-act="go" data-screen="script">Đến bước kịch bản</button></div>`;
    const cov = C.checkCoverage(p);
    const start = UI.page * PAGE;
    const list = p.scenes.slice(start, start + PAGE).map(sc => sceneCard(p, sc)).join('');
    const approved = p.scenes.filter(s => s.status === 'approved').length;
    const stale = p.scenes.filter(s => C.isStale(p, s)).length;
    return `
      <div class="row gap wrap summary-bar">
        <span>${pill(`${p.scenes.length} cảnh`)}</span>
        <span>${cov.ok ? pill('Phủ 100%', 'ok') : pill('Chưa phủ đủ', 'bad')}</span>
        <span>${pill(`Đã duyệt ${approved}`, 'ok')}</span>
        ${stale ? pill(`${stale} stale`, 'warn') : ''}
      </div>
      ${pager(p.scenes.length, UI.page, 'scenePage')}
      ${list}
      ${pager(p.scenes.length, UI.page, 'scenePage')}`;
  }

  // ---------- Bible ----------
  function viewBible(p) {
    const b = p.bible;
    const unlocked = [...b.characters, ...b.locations].filter(x => !x.locked).length;
    const charCards = b.characters.map(c => `
      <article class="card">
        <div class="row between"><b>${esc(c.name || 'Nhân vật mới')}</b>${c.locked ? pill('đã khóa', 'ok') : pill('chưa khóa', 'warn')}</div>
        <div class="grid2">
          ${['name:Tên', 'description:Mô tả ngoại hình', 'wardrobe:Trang phục', 'anchors:Điểm nhận dạng', 'voice:Giọng nói (nếu có)', 'reference:Tên ảnh tham chiếu đã map (không dán mã)'].map(s => { const [k, l] = s.split(':'); return `<label class="field"><span>${esc(l)}</span><input value="${esc(c[k] || '')}" data-chg="item" data-list="characters" data-id="${esc(c.id)}" data-key="${k}"></label>`; }).join('')}
        </div>
        <button class="danger" data-act="delItem" data-list="characters" data-id="${esc(c.id)}">Xóa nhân vật</button>
      </article>`).join('');
    const locCards = b.locations.map(l => `
      <article class="card">
        <div class="row between"><b>${esc(l.name || 'Bối cảnh mới')}</b>${l.locked ? pill('đã khóa', 'ok') : pill('chưa khóa', 'warn')}</div>
        <div class="grid2">
          ${['name:Tên', 'description:Bố cục, thời gian, ánh sáng', 'anchors:Quy tắc nối (cửa, hướng, vật cố định)', 'reference:Tên ảnh tham chiếu đã map'].map(s => { const [k, lb] = s.split(':'); return `<label class="field"><span>${esc(lb)}</span><input value="${esc(l[k] || '')}" data-chg="item" data-list="locations" data-id="${esc(l.id)}" data-key="${k}"></label>`; }).join('')}
        </div>
        <button class="danger" data-act="delItem" data-list="locations" data-id="${esc(l.id)}">Xóa bối cảnh</button>
      </article>`).join('');
    return `
      <section class="card">
        <div class="row between wrap"><div><b>Bible v${b.version}</b> · ${unlocked ? `${unlocked} mục chưa khóa` : 'tất cả đã khóa'}</div>
          <button class="primary" data-act="lockBible" ${unlocked ? '' : 'disabled'}>Khóa Bible (tăng phiên bản)</button></div>
        <p class="muted small">Sửa Bible hoặc khóa lại sẽ làm các cảnh cũ stale. Cảnh stale vẫn giữ take cũ, nhưng cần xác nhận lại.</p>
      </section>
      <div class="row gap wrap"><button data-act="addItem" data-list="characters">+ Nhân vật</button><button data-act="addItem" data-list="locations">+ Bối cảnh</button></div>
      <h2>Nhân vật</h2><section class="cards">${charCards || '<p class="muted">Chưa có nhân vật.</p>'}</section>
      <h2>Bối cảnh</h2><section class="cards">${locCards || '<p class="muted">Chưa có bối cảnh.</p>'}</section>`;
  }

  // ---------- Continuity ----------
  function viewContinuity(p) {
    const issues = C.continuityIssues(p);
    const pairs = C.transitionPairs(p);
    const stale = p.scenes.filter(s => C.isStale(p, s));
    const errs = issues.filter(i => i.level === 'error');
    const warns = issues.filter(i => i.level === 'warn');
    const li = arr => arr.map(i => `<li class="${i.level === 'error' ? 'bad-text' : 'warn-text'}">${esc(i.text)}</li>`).join('') || '<li class="muted">Không có.</li>';
    const rows = pairs.map(pr => `
      <tr>
        <td>${esc(pr.from.id)} → ${esc(pr.to.id)}</td>
        <td class="small">${esc(pr.ending) || '<span class="bad-text">thiếu</span>'}</td>
        <td class="small">${esc(pr.opening) || '<span class="bad-text">thiếu</span>'}</td>
        <td><input type="checkbox" ${pr.checked ? 'checked' : ''} data-chg="scene" data-id="${esc(pr.to.id)}" data-key="continuityChecked"></td>
      </tr>`).join('');
    return `
      <section class="stats">
        <div class="stat bad"><b>${errs.length}</b><span>Lỗi chặn</span></div>
        <div class="stat warn"><b>${warns.length}</b><span>Cảnh báo</span></div>
        <div class="stat"><b>${stale.length}</b><span>Cảnh stale</span></div>
      </section>
      <div class="grid2">
        <section class="card"><h2>Lỗi chặn duyệt</h2><ul class="list">${li(errs)}</ul></section>
        <section class="card"><h2>Cảnh báo cần người xem</h2><ul class="list">${li(warns)}</ul></section>
      </div>
      ${stale.length ? `<section class="card"><div class="row between wrap"><b>${stale.length} cảnh stale</b><button data-act="confirmAllStale">Xác nhận tất cả theo Bible/nguồn hiện tại</button></div><p class="muted small">Chỉ bấm khi đã đối chiếu lại prompt và nội dung cảnh.</p></section>` : ''}
      <section class="card">
        <h2>Nối cảnh</h2>
        <p class="muted small">So sánh trạng thái cuối cảnh trước với trạng thái đầu cảnh sau, rồi tích khi đã đối chiếu bằng mắt.</p>
        ${pairs.length ? `<div class="tablewrap"><table><thead><tr><th>Cặp cảnh</th><th>Cuối cảnh trước</th><th>Đầu cảnh sau</th><th>Đã đối chiếu</th></tr></thead><tbody>${rows}</tbody></table></div>` : '<p class="muted">Cần ít nhất hai cảnh.</p>'}
      </section>`;
  }

  // ---------- Prompt Router ----------
  function viewRouter(p) {
    const caps = C.MODEL_IDS.map(id => {
      const m = C.MODELS[id];
      const lv = m.level === 'unverified' ? pill('CHƯA XÁC MINH', 'bad') : pill('Bản nháp thủ công', 'warn');
      return `<tr><td><b>${esc(m.name)}</b><div class="muted small">${esc(m.profile)}</div></td><td>${lv}</td><td>${m.min}–${m.max}s</td><td>${m.audio ? 'Có' : 'Không xác minh'}</td><td class="small">${esc(m.ratios.join(', '))}</td><td class="small">${esc(m.verified)}</td></tr>`;
    }).join('');
    const scenes = p.scenes;
    const rows = scenes.slice(UI.page * PAGE, UI.page * PAGE + PAGE).map(sc => {
      const mid = C.routeModel(p, sc);
      const plan = C.planClips(sc.durationSec, mid);
      const n = C.compileScenePrompts(p, sc, mid).reduce((a, c) => a + c.warnings.length, 0);
      return `<tr>
        <td>${esc(sc.id)} · ${esc(sc.title)}</td>
        <td>${p.routing === 'hybrid'
          ? `<select data-chg="scene" data-id="${esc(sc.id)}" data-key="model">${[['', 'Mặc định'], ...C.MODEL_IDS.map(id => [id, C.MODELS[id].name])].map(([v, l]) => `<option value="${v}" ${sc.model === v ? 'selected' : ''}>${esc(l)}</option>`).join('')}</select>`
          : esc(C.MODELS[mid].name)}</td>
        <td>${plan.length} clip (${plan.map(c => c.generatedSeconds + 's').join(' + ')})</td>
        <td>${n ? pill(`${n} cảnh báo`, 'warn') : pill('không', 'ok')}</td></tr>`;
    }).join('');
    const sceneId = UI.viewScene && scenes.find(s => s.id === UI.viewScene) ? UI.viewScene : (scenes[0] || {}).id;
    let viewer = '<p class="muted">Chưa có cảnh.</p>';
    if (sceneId) {
      const sc = scenes.find(s => s.id === sceneId);
      const mid = UI.viewModel && C.MODELS[UI.viewModel] ? UI.viewModel : C.routeModel(p, sc);
      const clips = C.planClips(sc.durationSec, mid);
      const ci = Math.min(UI.viewClip, clips.length - 1);
      const c = C.compileClipPrompt(p, sc, mid, ci);
      viewer = `
        <div class="grid3">
          <label class="field"><span>Cảnh</span><select data-chg="viewScene">${scenes.map(s => `<option value="${esc(s.id)}" ${s.id === sceneId ? 'selected' : ''}>${esc(s.id)} · ${esc(s.title)}</option>`).join('')}</select></label>
          <label class="field"><span>Model</span><select data-chg="viewModel">${C.MODEL_IDS.map(id => `<option value="${id}" ${id === mid ? 'selected' : ''}>${esc(C.MODELS[id].name)}</option>`).join('')}</select></label>
          <label class="field"><span>Clip</span><select data-chg="viewClip">${clips.map((_, i) => `<option value="${i}" ${i === ci ? 'selected' : ''}>Clip ${i + 1}/${clips.length}</option>`).join('')}</select></label>
        </div>
        ${c.warnings.map(w => `<p class="warn-text">⚠ ${esc(w)}</p>`).join('')}
        <p class="muted small">${C.MODELS[mid].level === 'unverified' ? 'Chưa xác minh — bản nháp để xem, không gửi API.' : 'BẢN NHÁP — chưa được gửi.'}</p>
        <label class="field"><span>Prompt</span><textarea rows="8" readonly id="promptBox">${esc(c.prompt)}</textarea></label>
        <div class="row gap"><button class="primary" data-act="copyPrompt">Sao chép prompt</button></div>
        <details><summary>Cài đặt (không đưa vào prompt)</summary><pre>${esc(JSON.stringify(c.settings, null, 2))}</pre></details>`;
    }
    return `
      <section class="card"><h2>Năng lực model — mức xác minh</h2>
        <div class="tablewrap"><table><thead><tr><th>Model</th><th>Mức</th><th>Clip</th><th>Âm thanh</th><th>Tỷ lệ</th><th>Ghi chú</th></tr></thead><tbody>${caps}</tbody></table></div>
        <p class="muted small">Mọi thông tin model lấy từ gói bàn giao ngày 12/11/2026. Chưa kiểm lại bằng tài khoản thật. Không có API gửi job trong ứng dụng.</p>
      </section>
      <section class="card"><h2>Định tuyến từng cảnh</h2>
        <p class="muted small">Chế độ: ${p.routing === 'hybrid' ? 'Hybrid — chọn model từng cảnh' : 'Một model — đổi trong Kịch bản & Blueprint'}.</p>
        <div class="tablewrap"><table><thead><tr><th>Cảnh</th><th>Model</th><th>Clip</th><th>Cảnh báo</th></tr></thead><tbody>${rows}</tbody></table></div>
        ${pager(scenes.length, UI.page, 'scenePage')}
      </section>
      <section class="card"><h2>Xem prompt</h2>${viewer}</section>`;
  }

  // ---------- Voice ----------
  function viewVoice(p) {
    const cov = C.checkCoverage(p);
    const est = Math.round(C.estimateVoiceSeconds(p.script, p.market));
    const measured = p.measuredVoiceSeconds || 0;
    const lock = p.voiceLock && p.voiceLock.hash === C.fnv1a(p.script) && cov.ok;
    const mk = C.MARKET_BY[p.market];
    const rows = p.scenes.slice(UI.page * PAGE, UI.page * PAGE + PAGE).map(sc => {
      const t = C.sceneText(p, sc);
      return `<tr>
        <td>${esc(sc.id)}</td>
        <td><details><summary class="small">${esc(t.slice(0, 70))}${t.length > 70 ? '…' : ''}</summary><pre>${esc(t)}</pre></details></td>
        <td>${C.unitCount(t, mk.unit).toLocaleString('vi-VN')} ${mk.unit === 'chars' ? 'ký tự' : 'từ'}</td>
        <td>${Math.round(C.estimateVoiceSeconds(t, p.market))}s</td>
        <td><input value="${esc(sc.ambient)}" data-chg="scene" data-id="${esc(sc.id)}" data-key="ambient" aria-label="Âm thanh môi trường ${esc(sc.id)}"></td>
        <td><input value="${esc(sc.music)}" data-chg="scene" data-id="${esc(sc.id)}" data-key="music" aria-label="Nhạc ${esc(sc.id)}"></td>
      </tr>`;
    }).join('');
    return `
      <section class="stats">
        <div class="stat"><b>${esc(C.AUDIO_MODES[p.audioMode])}</b><span>Chế độ âm thanh</span></div>
        <div class="stat"><b>${Math.round(est / 60 * 10) / 10} phút</b><span>Voice ước tính (chỉ tham khảo)</span></div>
        <div class="stat ${cov.ok ? '' : 'bad'}"><b>${cov.ok ? 'Đủ' : 'Lệch'}</b><span>Phủ lời đọc</span></div>
      </section>
      <section class="card">
        <h2>Khóa voice</h2>
        <p class="muted small">Lời đọc sạch = đúng nguyên văn nguồn, không tiêu đề, không chú thích. Thời lượng cần đo từ file audio thật; ứng dụng không tạo TTS.</p>
        <div class="row gap wrap">
          <label class="field inline"><span>Thời lượng đo thật (giây)</span><input type="number" min="0" value="${measured || ''}" data-chg="proj" data-key="measuredVoiceSeconds" data-num></label>
          ${lock
            ? pill(`Đã khóa lúc ${fmt(p.voiceLock.at)}`, 'ok')
            : `<button class="primary" data-act="lockVoice" ${cov.ok && measured > 0 ? '' : 'disabled'}>Khóa voice</button>`}
          ${p.voiceLock && !lock ? pill('Khóa đã mất hiệu lực (nguồn đổi)', 'bad') : ''}
        </div>
      </section>
      <section class="card"><h2>Từng cảnh</h2>
        <div class="tablewrap"><table><thead><tr><th>Cảnh</th><th>Lời đọc (nguyên văn)</th><th>Độ dài</th><th>Ước tính</th><th>Âm thanh môi trường</th><th>Nhạc</th></tr></thead><tbody>${rows}</tbody></table></div>
        ${pager(p.scenes.length, UI.page, 'scenePage')}
      </section>`;
  }

  // ---------- Ngân sách ----------
  function viewBudget(p) {
    const b = C.budgetSummary(p);
    const curs = Object.keys(b.byCurrency);
    const cards = curs.map(cur => {
      const x = b.byCurrency[cur];
      return `<article class="card"><h3>${esc(cur)}</h3>
        <p>Thực tế: <b>${money(x.actual, cur)}</b></p>
        <p class="muted small">Dự tính ${money(x.estimate, cur)} · Đặt trước ${money(x.reserved, cur)} · ${x.failedCount} lần thất bại/từ chối · ${x.unknownCount} khoản chưa rõ</p>
        <p class="small">Chi phí/cảnh đã duyệt: ${b.costPerApproved[cur] === null ? '<span class="muted">chưa có cảnh duyệt</span>' : `<b>${money(b.costPerApproved[cur], cur)}</b>`}</p>
      </article>`;
    }).join('');
    const scenes = [['', 'Toàn dự án'], ...p.scenes.map(s => [s.id, `${s.id} · ${s.title}`])];
    const rows = (p.costs || []).map(c => `<tr><td class="small">${esc(fmt(c.at))}</td><td>${esc(c.sceneId || '—')}</td><td>${esc(C.MODELS[c.model] ? C.MODELS[c.model].name : (c.model || '—'))}</td><td>${esc(c.kind)}</td><td>${esc(c.status)}</td><td>${money(Number(c.amount) || 0, c.currency)}</td><td>${esc(c.note || '')}</td><td><button class="danger" data-act="delCost" data-id="${esc(c.id)}">Xóa</button></td></tr>`).join('');
    return `
      <section class="card">
        <div class="grid2">
          <label class="field"><span>Ngân sách tổng</span><input type="number" min="0" value="${esc(p.budget.amount)}" data-chg="budgetAmount"></label>
          <label class="field"><span>Tiền tệ</span><select data-chg="budgetCurrency">${C.CURRENCIES.map(c => `<option ${p.budget.currency === c ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
        </div>
        <p class="muted small">${p.scenes.length ? `Ngân sách bình quân mỗi cảnh: ${b.perSceneBudget === null ? '—' : money(b.perSceneBudget, b.budgetCurrency)}.` : ''} ${b.overBudget ? '<span class="bad-text">Chi phí thực tế đã vượt ngân sách.</span>' : ''}</p>
      </section>
      <div class="cards">${cards || '<p class="muted">Chưa có chi phí nào được ghi.</p>'}</div>
      <section class="card"><h2>Ghi chi phí</h2>
        <form id="costForm" class="grid3" onsubmit="return false">
          <label class="field"><span>Cảnh</span><select name="sceneId">${scenes.map(([v, l]) => `<option value="${esc(v)}">${esc(l)}</option>`).join('')}</select></label>
          <label class="field"><span>Model</span><select name="model">${C.MODEL_IDS.map(id => `<option value="${id}">${esc(C.MODELS[id].name)}</option>`).join('')}</select></label>
          <label class="field"><span>Loại</span><select name="kind"><option value="estimate">Dự tính</option><option value="reserved">Đặt trước</option><option value="actual">Thực tế</option></select></label>
          <label class="field"><span>Kết quả</span><select name="status"><option value="ok">Thành công</option><option value="failed">Thất bại</option><option value="rejected">Bị từ chối</option><option value="unknown">Chưa rõ</option></select></label>
          <label class="field"><span>Số tiền</span><input type="number" name="amount" min="0" step="0.01" value="0"></label>
          <label class="field"><span>Tiền tệ</span><select name="currency">${C.CURRENCIES.map(c => `<option ${c === p.budget.currency ? 'selected' : ''}>${c}</option>`).join('')}</select></label>
          <label class="field"><span>Ghi chú</span><input name="note"></label>
        </form>
        <div class="row gap"><button class="primary" data-act="addCost">Thêm vào sổ chi phí</button></div>
        <p class="muted small">Mọi lần thử đều tính chi phí, kể cả thất bại. Không tự quy đổi tiền tệ.</p>
      </section>
      <section class="card"><h2>Sổ chi phí</h2>
        <div class="tablewrap"><table><thead><tr><th>Thời điểm</th><th>Cảnh</th><th>Model</th><th>Loại</th><th>Kết quả</th><th>Số tiền</th><th>Ghi chú</th><th></th></tr></thead><tbody>${rows || '<tr><td colspan="8" class="muted">Trống</td></tr>'}</tbody></table></div>
      </section>`;
  }

  // ---------- Phân công ----------
  function viewAssign(p) {
    const names = p.team.map(m => m.name).filter(Boolean);
    const filter = UI.assignFilter;
    const counts = {};
    p.scenes.forEach(s => { const k = s.assignee || '(chưa giao)'; counts[k] = (counts[k] || 0) + 1; });
    const scenes = p.scenes.filter(s => !filter || (filter === '__none' ? !s.assignee : s.assignee === filter));
    const rows = scenes.slice(0, PAGE * 2).map(s => `<tr>
      <td>${esc(s.id)} · ${esc(s.title)}</td>
      <td><select data-chg="scene" data-id="${esc(s.id)}" data-key="assignee"><option value="">— chưa giao —</option>${names.map(n => `<option ${s.assignee === n ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select></td>
      <td><input type="date" value="${esc(s.due)}" data-chg="scene" data-id="${esc(s.id)}" data-key="due"></td>
      <td>${esc(C.STATUSES[s.status])}</td></tr>`).join('');
    return `
      <section class="card"><h2>Thành viên</h2>
        <form id="memberForm" class="grid2" onsubmit="return false">
          <label class="field"><span>Tên (ghi chú)</span><input name="name" required></label>
          <label class="field"><span>Vai trò</span><select name="role">${C.ASSIGN_ROLES.map(r => `<option>${esc(r)}</option>`).join('')}</select></label>
        </form>
        <div class="row gap"><button class="primary" data-act="addMember">Thêm</button></div>
        <ul class="list">${p.team.map((m, i) => `<li>${esc(m.name)} — ${esc(m.role)} <button class="danger small-btn" data-act="delMember" data-idx="${i}">Xóa</button></li>`).join('') || '<li class="muted">Chưa có thành viên.</li>'}</ul>
      </section>
      <section class="card"><h2>Khối lượng theo người</h2>
        <div class="row gap wrap">${Object.keys(counts).map(k => pill(`${k}: ${counts[k]} cảnh`)).join(' ')}</div>
        <label class="field"><span>Lọc theo người</span><select data-chg="assignFilter"><option value="">Tất cả</option><option value="__none" ${filter === '__none' ? 'selected' : ''}>Chưa giao</option>${names.map(n => `<option ${filter === n ? 'selected' : ''}>${esc(n)}</option>`).join('')}</select></label>
        <div class="tablewrap"><table><thead><tr><th>Cảnh</th><th>Người phụ trách</th><th>Hạn</th><th>Trạng thái</th></tr></thead><tbody>${rows || '<tr><td colspan="4" class="muted">Không có cảnh.</td></tr>'}</tbody></table></div>
        ${scenes.length > PAGE * 2 ? `<p class="muted small">Hiển thị ${PAGE * 2}/${scenes.length} cảnh đầu tiên.</p>` : ''}
      </section>`;
  }

  // ---------- QC ----------
  function viewQc(p) {
    const start = UI.page * PAGE;
    const list = p.scenes.slice(start, start + PAGE).map(sc => {
      const r = C.canApprove(p, sc);
      const qc = Object.keys(C.QC_KEYS).map(k => `<label class="field"><span>${esc(C.QC_KEYS[k])}</span>
        <select data-chg="qc" data-id="${esc(sc.id)}" data-key="${k}">${C.QC_STATES.map(v => `<option value="${v}" ${(sc.qc || {})[k] === v ? 'selected' : ''}>${v === 'pass' ? 'Đạt' : v === 'fail' ? 'Không đạt' : 'Chưa chấm'}</option>`).join('')}</select></label>`).join('');
      const takes = (sc.takes || []).map(t => `<li class="row gap small">${esc(t.ref || t.id)} · ${esc(t.status)} · lần ${t.attempt || 1}
        ${t.status === 'received' ? `<button class="small-btn" data-act="takeQc" data-id="${esc(sc.id)}" data-tid="${esc(t.id)}" data-v="pass">QC đạt</button><button class="small-btn danger" data-act="takeQc" data-id="${esc(sc.id)}" data-tid="${esc(t.id)}" data-v="fail">Không đạt</button>` : ''}
        ${t.status === 'pass' && (sc.chosen || {})[t.clipIndex || 0] !== t.id ? `<button class="small-btn" data-act="chooseTake" data-id="${esc(sc.id)}" data-tid="${esc(t.id)}" data-clip="${t.clipIndex || 0}">Chọn cho clip ${(t.clipIndex || 0) + 1}</button>` : ''}
        ${(sc.chosen || {})[t.clipIndex || 0] === t.id ? pill(`đã chọn cho clip ${(t.clipIndex || 0) + 1}`, 'ok') : ''}</li>`).join('');
      return `
        <details class="scene" data-sid="${esc(sc.id)}">
          <summary><b>${esc(sc.id)}</b> · ${esc(sc.title)} <span class="muted small">${esc(C.STATUSES[sc.status])}</span>
            ${r.ok ? pill('đủ điều kiện', 'ok') : pill('chưa đủ', 'warn')}</summary>
          <div class="scene-body">
            <div class="grid3">${qc}</div>
            <h4>Take</h4><ul class="list">${takes || '<li class="muted">Chưa có take. Thêm ở “Hàng đợi”.</li>'}</ul>
            ${r.ok ? '' : `<ul class="list small warn-text">${r.reasons.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`}
            <div class="row gap wrap">
              <button class="primary" data-act="approve" data-id="${esc(sc.id)}" ${r.ok ? '' : 'disabled'}>Duyệt cảnh</button>
              <button class="danger" data-act="reject" data-id="${esc(sc.id)}">Từ chối (ghi lý do)</button>
            </div>
            ${(sc.rejections || []).length ? `<ul class="list small">${sc.rejections.map(x => `<li>${esc(fmt(x.at))}: ${esc(x.reason)}</li>`).join('')}</ul>` : ''}
          </div>
        </details>`;
    }).join('');
    const approved = p.scenes.filter(s => s.status === 'approved').length;
    return `<div class="row gap wrap summary-bar">${pill(`Đã duyệt ${approved}/${p.scenes.length}`, 'ok')}</div>
      ${p.scenes.length ? pager(p.scenes.length, UI.page, 'scenePage') + list + pager(p.scenes.length, UI.page, 'scenePage') : '<p class="muted">Chưa có cảnh.</p>'}`;
  }

  // ---------- Checkpoints ----------
  function viewCheckpoints(p) {
    const list = S.checkpoints[p.id] || [];
    return `
      <section class="card"><h2>Tạo checkpoint</h2>
        <form id="cpForm" class="row gap wrap" onsubmit="return false">
          <input name="name" placeholder="Tên, ví dụ: Trước khi đổi Bible" class="grow" required>
          <button class="primary" data-act="addCheckpoint">Lưu checkpoint</button>
        </form>
        <p class="muted small">Checkpoint là ảnh chụp toàn bộ dự án (JSON) trong trình duyệt này. Khôi phục sẽ thay dự án hiện tại; hãy tạo checkpoint trước nếu cần giữ bản hiện tại.</p>
      </section>
      <section class="card"><h2>Danh sách (${list.length}/10)</h2>
        <ul class="list">${list.map(c => `<li class="row between wrap gap">
          <span><b>${esc(c.name)}</b> · ${esc(fmt(c.at))} · bản ${c.revision}</span>
          <span class="row gap"><button data-act="restoreCp" data-id="${esc(c.id)}">Khôi phục</button><button class="danger small-btn" data-act="delCp" data-id="${esc(c.id)}">Xóa</button></span>
        </li>`).join('') || '<li class="muted">Chưa có checkpoint.</li>'}</ul>
      </section>`;
  }

  // ---------- Hàng đợi ----------
  function viewQueue(p) {
    const jobs = C.jobsForProject(p);
    const counts = {};
    jobs.forEach(j => { counts[j.state] = (counts[j.state] || 0) + 1; });
    const LBL = { pending: 'Chờ gửi', waiting: 'Đã gửi tay, chờ kết quả', review: 'Đã có kết quả, chờ QC', retry: 'Cần gửi lại', done: 'Đạt QC' };
    const filt = UI.queueFilter;
    const shown = jobs.filter(j => filt === 'all' || j.state === filt);
    const rows = shown.slice(0, 200).map(j => {
      const sc = p.scenes.find(s => s.id === j.sceneId);
      let act = '';
      if (j.state === 'pending' || j.state === 'retry') act = `<button class="small-btn" data-act="submitJob" data-key="${esc(j.key)}" data-sid="${esc(j.sceneId)}" data-model="${j.modelId}" data-clip="${j.clipIndex}">Ghi đã gửi tay</button>`;
      if (j.state === 'waiting') act = `<button class="small-btn" data-act="jobResult" data-key="${esc(j.key)}" data-sid="${esc(j.sceneId)}" data-v="received">Đã nhận kết quả</button><button class="small-btn danger" data-act="jobResult" data-key="${esc(j.key)}" data-sid="${esc(j.sceneId)}" data-v="failed">Thất bại</button>`;
      return `<tr>
        <td>${esc(j.sceneId)} · ${esc(sc ? sc.title : '')}</td>
        <td>${esc(C.MODELS[j.modelId].name)}</td>
        <td>Clip ${j.clipIndex + 1} (${j.clip.generatedSeconds}s)</td>
        <td>${pill(LBL[j.state], j.state === 'done' ? 'ok' : j.state === 'retry' ? 'bad' : 'info')}</td>
        <td>${j.attempts}</td>
        <td><code class="small">${esc(j.promptHash)}</code></td>
        <td>${act}</td></tr>`;
    }).join('');
    return `
      <section class="stats">
        <div class="stat"><b>${counts.pending || 0}</b><span>Chờ gửi</span></div>
        <div class="stat"><b>${counts.waiting || 0}</b><span>Chờ kết quả</span></div>
        <div class="stat"><b>${counts.review || 0}</b><span>Chờ QC</span></div>
        <div class="stat ${counts.retry ? 'bad' : ''}"><b>${counts.retry || 0}</b><span>Cần gửi lại</span></div>
        <div class="stat ok"><b>${counts.done || 0}</b><span>Đạt QC</span></div>
      </section>
      <p class="warn-text small">Ứng dụng KHÔNG gửi job tới Google Flow, Muse.ai hay Seedance. Mọi thao tác ở đây là ghi nhận thủ công.</p>
      <div class="row gap"><label class="field inline"><span>Lọc</span><select data-chg="queueFilter"><option value="all">Tất cả</option>${Object.keys(LBL).map(k => `<option value="${k}" ${filt === k ? 'selected' : ''}>${LBL[k]}</option>`).join('')}</select></label></div>
      <p class="muted small">Chỉ hiện các cảnh không ở trạng thái “Bản nháp”. Đổi trạng thái cảnh ở “Bảng cảnh”.</p>
      <div class="tablewrap"><table><thead><tr><th>Cảnh</th><th>Model</th><th>Clip</th><th>Trạng thái</th><th>Lần</th><th>Hash prompt</th><th></th></tr></thead>
      <tbody>${rows || '<tr><td colspan="7" class="muted">Chưa có job. Đặt cảnh sang “Prompt sẵn sàng” trước.</td></tr>'}</tbody></table></div>
      ${shown.length > 200 ? `<p class="muted small">Hiển thị 200/${shown.length} job.</p>` : ''}`;
  }

  // ---------- Production OS ----------
  function viewOS(p) {
    const stages = C.productionStages(p);
    const gate = C.productionGate(stages);
    const next = stages.find(s => !s.pass);
    const done = stages.filter(s => s.pass).length;
    return `
      <section class="stats">
        <div class="stat"><b>${done}/${stages.length}</b><span>Cổng đạt</span></div>
        <div class="stat gate-${gate.level}"><b>${esc(GATE_SHORT[gate.level])}</b><span>${esc(gate.label)}</span></div>
      </section>
      <p class="muted">${esc(gate.note)}</p>
      <section class="card">
        ${next ? `<p><b>Việc tiếp theo:</b> ${esc(next.name)} — phụ trách ${esc(next.owner)}. <span class="muted small">${esc(next.detail)}</span></p>` : '<p><b>Tất cả cổng đã đạt.</b></p>'}
      </section>
      <div class="tablewrap"><table><thead><tr><th>#</th><th>Cổng</th><th>Phụ trách</th><th>Trạng thái</th><th>Chi tiết</th></tr></thead><tbody>
        ${stages.map((s, i) => `<tr><td>${i + 1}</td><td>${esc(s.name)}</td><td>${esc(s.owner)}</td><td>${s.pass ? pill('Đạt', 'ok') : pill('Chưa', 'warn')}</td><td class="small">${esc(s.detail)}</td></tr>`).join('')}
      </tbody></table></div>
      <section class="card"><h2>Nhật ký gần đây</h2><ul class="list small">${(p.activity || []).slice(0, 12).map(a => `<li>${esc(fmt(a.at))} · ${esc(a.text)}</li>`).join('') || '<li class="muted">Chưa có.</li>'}</ul></section>`;
  }

  // ---------- Xuất file ----------
  function viewExport(p) {
    const g = GATE_SHORT[C.gateOf(p).level];
    const base = `${slug(p.title)}_${g}`;
    const items = [
      ['project', 'Sao lưu dự án (JSON)', 'Có thể nhập lại trên máy khác. Chứa toàn bộ dữ liệu dự án.', 'application/json'],
      ['prod', 'Production JSON (hợp đồng dữ liệu)', 'Hai hệ offset (UTF-16 và code point), nguyên văn, cảnh, Bible, ngân sách, cổng.', 'application/json'],
      ['script', 'Kịch bản đầy đủ (nguyên văn)', 'Đúng nội dung nguồn đã khóa, không thêm tiêu đề.', 'text/plain'],
      ['voice', 'Lời đọc sạch (nguyên văn)', 'Chỉ lời đọc: không tiêu đề, không chú thích, không QA.', 'text/plain'],
      ['board', 'Storyboard (CSV)', 'Một dòng mỗi cảnh; mở bằng Excel hoặc Google Sheets.', 'text/csv'],
      ['prompts-flow', 'Prompt Google Flow (Markdown)', 'Chỉ các cảnh định tuyến sang Flow. BẢN NHÁP.', 'text/markdown'],
      ['prompts-muse', 'Prompt Muse.ai (Markdown)', 'CHƯA XÁC MINH. Chỉ bản nháp thủ công.', 'text/markdown'],
      ['prompts-seedance', 'Prompt Seedance (Markdown)', 'Chỉ các cảnh định tuyến sang Seedance. BẢN NHÁP.', 'text/markdown'],
      ['prompts-all', 'Tất cả prompt (Markdown)', 'Gom theo model.', 'text/markdown'],
      ['qc', 'Báo cáo QC (Markdown)', 'Cổng, trạng thái cảnh, lịch sử từ chối.', 'text/markdown'],
      ['costs', 'Sổ chi phí (CSV)', 'Mọi lần thử, kể cả thất bại. Không quy đổi tiền tệ.', 'text/csv']
    ];
    return `
      <p>Nhãn đầu ra hiện tại: <b>${esc(C.productionGate(C.productionStages(p)).label)}</b></p>
      <div class="cards">${items.map(([k, t, d]) => `<article class="card">
        <h3>${esc(t)}</h3><p class="muted small">${esc(d)}</p>
        <button class="primary" data-act="export" data-kind="${k}">Tải xuống</button></article>`).join('')}</div>
      <p class="muted small">Tên file có kèm nhãn ${esc(g)}: ${esc(base)}_…</p>`;
  }

  const VIEWS = {
    dashboard: viewDashboard, templates: viewTemplates, script: viewScript, scenes: viewScenes, bible: viewBible,
    continuity: viewContinuity, router: viewRouter, voice: viewVoice, budget: viewBudget, assign: viewAssign,
    qc: viewQc, checkpoints: viewCheckpoints, queue: viewQueue, os: viewOS, export: viewExport
  };

  // ---------- Hành động ----------
  function exportFile(kind) {
    const p = cur();
    const g = GATE_SHORT[C.gateOf(p).level];
    const base = `${slug(p.title)}_${g}`;
    const map = {
      project: () => [`${slug(p.title)}_backup.json`, JSON.stringify({ schema: C.SCHEMA, kind: 'project', project: p }, null, 2), 'application/json'],
      prod: () => [`${base}_production.json`, JSON.stringify(C.exportProductionJSON(p), null, 2), 'application/json'],
      script: () => [`${base}_script.txt`, p.script, 'text/plain;charset=utf-8'],
      voice: () => [`${base}_voice_clean.txt`, C.voiceCleanExport(p), 'text/plain;charset=utf-8'],
      board: () => [`${base}_storyboard.csv`, C.storyboardCSV(p), 'text/csv;charset=utf-8'],
      'prompts-flow': () => [`${base}_prompts_flow.md`, C.promptsMarkdown(p, 'flow'), 'text/markdown;charset=utf-8'],
      'prompts-muse': () => [`${base}_prompts_muse_UNVERIFIED.md`, C.promptsMarkdown(p, 'muse'), 'text/markdown;charset=utf-8'],
      'prompts-seedance': () => [`${base}_prompts_seedance.md`, C.promptsMarkdown(p, 'seedance'), 'text/markdown;charset=utf-8'],
      'prompts-all': () => [`${base}_prompts_all.md`, C.promptsMarkdown(p, 'all'), 'text/markdown;charset=utf-8'],
      qc: () => [`${base}_qc_report.md`, C.qcMarkdown(p), 'text/markdown;charset=utf-8'],
      costs: () => [`${base}_costs.csv`, C.costCSV(p), 'text/csv;charset=utf-8']
    };
    const [name, content, type] = map[kind]();
    download(name, content, type);
  }

  function createProject(form) {
    const fd = new FormData(form);
    const title = String(fd.get('title') || '').trim();
    if (!title) { toast('Hãy nhập tên dự án.', 'warn'); return; }
    const market = C.MARKET_BY[fd.get('market')] || C.MARKET_BY.US;
    const cfg = {};
    CFG_KEYS.forEach(k => {
      const f = CFG_FIELDS.find(x => x.key === k);
      const raw = fd.get(k);
      if (raw === null) return;
      cfg[k] = f.type === 'number' ? Number(raw) : String(raw);
    });
    if (cfg.minutes < 20 || cfg.minutes > 120) { toast('Thời lượng phải từ 20 đến 120 phút.', 'warn'); return; }
    if (cfg.sceneSeconds < 10 || cfg.sceneSeconds > 20) { toast('Độ dài cảnh phải từ 10 đến 20 giây.', 'warn'); return; }
    const p = C.factoryProject(Object.assign({}, cfg, {
      title, channel: String(fd.get('channel') || 'SNAKE MEDIA'), market: market.code,
      voiceRate: cfg.voiceRate || market.rate,
      sourceType: String(fd.get('sourceType') || 'script'),
      script: String(fd.get('script') || ''),
      budget: { amount: Number(fd.get('budget')) || 0, currency: String(fd.get('currency') || market.currency) }
    }));
    p.activity = [{ at: now(), text: 'Tạo dự án.' }];
    S.projects[p.id] = p;
    S.order.unshift(p.id);
    S.currentId = p.id;
    S.screen = 'script';
    save();
    toast('Đã tạo dự án. Hãy khóa nội dung gốc khi đã sẵn sàng.', 'ok');
    render();
  }

  function setScene(id, key, val) {
    mutate(null, p => {
      const sc = p.scenes.find(s => s.id === id);
      if (!sc) return;
      sc[key] = val;
    });
  }

  const ACTIONS = {
    sharedSignIn() {
      const email = ((document.getElementById('shEmail') || {}).value || '').trim();
      if (!email.includes('@')) { toast('Nhập email hợp lệ.', 'warn'); return; }
      sharedRun(async () => {
        await window.SharedClient.signIn(email);
        SH.msg = 'Đã gửi liên kết đăng nhập tới email. Mở email rồi quay lại trang này.';
      });
    },
    sharedSignOut() {
      sharedRun(async () => { await window.SharedClient.signOut(); SH.session = null; SH.orgs = []; SH.orgId = ''; SH.msg = 'Đã đăng xuất.'; });
    },
    sharedOrgs() {
      sharedRun(async () => {
        SH.session = await window.SharedClient.session();
        if (!SH.session) { SH.msg = 'Chưa đăng nhập.'; return; }
        SH.orgs = await window.SharedClient.myOrgs();
        if (!SH.orgs.some(o => o.id === SH.orgId)) SH.orgId = SH.orgs[0] ? SH.orgs[0].id : '';
        SH.msg = `Có ${SH.orgs.length} tổ chức.`;
      });
    },
    sharedPushCurrent() {
      const p = cur();
      if (!p || !SH.orgId) return;
      sharedRun(async () => {
        const rev = await window.SharedClient.push(SH.orgId, p);
        p.remoteRevision = rev;
        p.remoteOrgId = SH.orgId;
        save();
        SH.msg = `Đã lưu “${p.title}” lên nhóm (revision ${rev}).`;
      }, err => {
        const e = SS.parseRpcError(err);
        SH.msg = e.message + (e.code === 'REVISION_CONFLICT' ? ' Bấm “Tải tất cả dự án từ nhóm” để nhận bản mới.' : '');
      });
    },
    sharedPullAll() {
      if (!SH.orgId) return;
      sharedRun(async () => {
        const rows = await window.SharedClient.pull(SH.orgId);
        let added = 0, updated = 0;
        rows.forEach(row => {
          const remote = SS.fromRemote(row);
          remote.remoteOrgId = SH.orgId;
          const local = S.projects[row.id];
          if (local && local.remoteRevision === remote.remoteRevision) return;
          if (local) {
            keepCheckpoint(row.id, `Bản local trước khi tải bản nhóm (${fmt(now())})`, JSON.stringify(SS.toPayload(local)), local.revision || 0);
            updated++;
          } else {
            added++;
            S.order.unshift(row.id);
          }
          S.projects[row.id] = remote;
        });
        if (!S.currentId || !S.projects[S.currentId]) S.currentId = S.order.find(id => S.projects[id]) || '';
        save();
        SH.msg = `Tải xong: ${added} dự án mới, ${updated} dự án được cập nhật (bản cũ đã lưu làm checkpoint).`;
      });
    },
    nav(t) { go(t.dataset.screen); },
    go(t) { go(t.dataset.screen); },
    open(t) { S.currentId = t.dataset.id; S.screen = 'script'; save(); render(); },
    newProject() { S.screen = 'new'; save(); render(); },
    createProject(t) { createProject(document.getElementById('newForm')); },
    pickTxt() { document.getElementById('fileTxt').click(); },
    pickJson() { document.getElementById('fileJson').click(); },
    seedTest() {
      mutate('Nạp dữ liệu thử để kiểm tra phân cảnh (không phải kịch bản thật).', p => {
        const n = Math.max(40, Math.round(p.minutes * 60 / 20));
        p.script = Array.from({ length: n }, (_, i) => `Đoạn thử ${i + 1}: nội dung mô phỏng để kiểm tra phân cảnh, không phải kịch bản thật.`).join(' ');
      });
    },
    lockSource() {
      const p = cur();
      if (!p.script || !p.script.trim()) { toast('Chưa có nội dung nguồn.', 'warn'); return; }
      if (!confirm('Khóa nội dung gốc? Sau khi khóa, không sửa được chữ trong nguồn trừ khi mở khóa có lý do.')) return;
      mutate('Khóa nội dung gốc.', p => {
        p.sourceLocked = true;
        p.sourceHash = C.fnv1a(p.script);
        p.sourceLockedAt = now();
        autoCheckpoint(p, 'Tự động: trước/khi khóa nguồn');
      });
    },
    unlockSource() {
      const reason = prompt('Lý do mở khóa nguồn (bắt buộc):');
      if (!reason || !reason.trim()) { toast('Cần ghi lý do mở khóa.', 'warn'); return; }
      mutate(`Mở khóa nguồn. Lý do: ${reason.trim()}`, p => {
        autoCheckpoint(p, 'Tự động: trước khi mở khóa nguồn');
        p.sourceLocked = false;
        p.sourceHash = '';
        p.voiceLock = null;
        p.review = { facts: false, originality: false, localization: false, reviewer: p.review.reviewer };
      });
    },
    split() {
      const p = cur();
      if (!p.sourceLocked) { toast('Khóa nội dung gốc trước khi phân cảnh.', 'warn'); return; }
      if (p.scenes.length && !confirm('Phân cảnh lại sẽ thay thế các cảnh hiện có (sẽ tự tạo checkpoint trước). Tiếp tục?')) return;
      try {
        mutate('Phân cảnh tự động.', pp => {
          if (pp.scenes.length) autoCheckpoint(pp, 'Tự động: trước khi phân cảnh lại');
          applySplit(pp);
        });
        toast(`Đã tạo ${cur().scenes.length} cảnh.`, 'ok');
      } catch (e) { toast(e.message, 'bad'); }
    },
    lockVoice() {
      const p = cur();
      if (!(p.measuredVoiceSeconds > 0)) { toast('Nhập thời lượng đo thật trước khi khóa voice.', 'warn'); return; }
      mutate('Khóa voice.', pp => {
        pp.voiceLock = { hash: C.fnv1a(pp.script), measuredSeconds: pp.measuredVoiceSeconds, at: now() };
        autoCheckpoint(pp, 'Tự động: khóa voice');
      });
    },
    lockBible() {
      mutate('Khóa Bible, tăng phiên bản.', p => {
        [...p.bible.characters, ...p.bible.locations].forEach(x => { x.locked = true; });
        p.bible.version += 1;
      });
    },
    addItem(t) {
      const list = t.dataset.list;
      mutate(null, p => {
        const id = C.uid(list === 'characters' ? 'chr' : 'loc');
        p.bible[list].push(list === 'characters'
          ? { id, name: '', description: '', wardrobe: '', anchors: '', reference: '', voice: '', locked: false }
          : { id, name: '', description: '', anchors: '', reference: '', locked: false });
      });
    },
    delItem(t) {
      if (!confirm('Xóa mục này khỏi Bible? Cảnh đang dùng sẽ mất liên kết.')) return;
      const list = t.dataset.list, id = t.dataset.id;
      mutate('Xóa mục Bible.', p => {
        p.bible[list] = p.bible[list].filter(x => x.id !== id);
        p.scenes.forEach(sc => {
          sc.characterIds = (sc.characterIds || []).filter(x => x !== id);
          if (sc.locationId === id) sc.locationId = '';
        });
      });
    },
    scenePage(t) {
      const p = cur();
      const pages = Math.max(1, Math.ceil(p.scenes.length / PAGE));
      UI.page = Math.min(pages - 1, Math.max(0, UI.page + Number(t.dataset.dir)));
      render();
    },
    confirmScene(t) {
      mutate(`Xác nhận ${t.dataset.id} theo Bible/nguồn hiện tại.`, p => {
        const sc = p.scenes.find(s => s.id === t.dataset.id);
        if (sc) { sc.bibleVersion = p.bible.version; sc.sourceHash = p.sourceHash; }
      });
    },
    confirmAllStale() {
      if (!confirm('Xác nhận tất cả cảnh stale theo Bible/nguồn hiện tại? Hãy đảm bảo đã đối chiếu prompt và nội dung.')) return;
      mutate('Xác nhận hàng loạt cảnh stale.', p => {
        p.scenes.forEach(sc => { if (C.isStale(p, sc)) { sc.bibleVersion = p.bible.version; sc.sourceHash = p.sourceHash; } });
      });
    },
    resetScene(t) {
      if (!confirm('Xóa hành động, trạng thái đầu/cuối, thoại và trạng thái của cảnh này? Đoạn nguồn không bị xóa.')) return;
      mutate(`Xóa nội dung đã nhập của ${t.dataset.id}.`, p => {
        const sc = p.scenes.find(s => s.id === t.dataset.id);
        if (!sc) return;
        Object.assign(sc, { action: '', opening: '', ending: '', lighting: '', characterIds: [], locationId: '', dialogue: [], ambient: '', music: '', status: 'draft', continuityChecked: false });
      });
    },
    copyPrompt() {
      const box = document.getElementById('promptBox');
      if (!box) return;
      const done = () => toast('Đã sao chép prompt.', 'ok');
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(box.value).then(done, () => { box.select(); document.execCommand && document.execCommand('copy'); done(); });
      else { box.select(); document.execCommand && document.execCommand('copy'); done(); }
    },
    addMember() {
      const f = document.getElementById('memberForm');
      const name = String(new FormData(f).get('name') || '').trim();
      if (!name) { toast('Nhập tên.', 'warn'); return; }
      mutate(`Thêm thành viên ${name}.`, p => { p.team.push({ name, role: String(new FormData(f).get('role')) }); });
    },
    delMember(t) { const i = Number(t.dataset.idx); mutate('Xóa thành viên.', p => { p.team.splice(i, 1); }); },
    addCost() {
      const f = document.getElementById('costForm');
      const fd = new FormData(f);
      const amount = Number(fd.get('amount'));
      if (!(amount >= 0)) { toast('Số tiền không hợp lệ.', 'warn'); return; }
      mutate('Ghi chi phí.', p => {
        p.costs = p.costs || [];
        p.costs.push({
          id: C.uid('cst'), at: now(), sceneId: String(fd.get('sceneId') || ''), model: String(fd.get('model')),
          attempt: p.costs.filter(c => c.sceneId === String(fd.get('sceneId') || '') && c.model === String(fd.get('model'))).length + 1,
          kind: String(fd.get('kind')), status: String(fd.get('status')), amount, currency: String(fd.get('currency')), note: String(fd.get('note') || '')
        });
      });
    },
    delCost(t) { if (!confirm('Xóa dòng chi phí này? Việc xóa được ghi nhật ký.')) return; mutate('Xóa một dòng chi phí.', p => { p.costs = p.costs.filter(c => c.id !== t.dataset.id); }); },
    approve(t) {
      const p = cur();
      const sc = p.scenes.find(s => s.id === t.dataset.id);
      const r = C.canApprove(p, sc);
      if (!r.ok) { toast(r.reasons[0], 'warn'); return; }
      mutate(`Duyệt ${sc.id}.`, pp => { const s = pp.scenes.find(x => x.id === sc.id); s.status = 'approved'; });
    },
    reject(t) {
      const reason = prompt('Lý do từ chối (bắt buộc):');
      if (!reason || !reason.trim()) { toast('Cần ghi lý do.', 'warn'); return; }
      mutate(`Từ chối ${t.dataset.id}.`, p => {
        const s = p.scenes.find(x => x.id === t.dataset.id);
        s.status = 'rework';
        s.rejections = [...(s.rejections || []), { at: now(), reason: reason.trim() }];
      });
    },
    chooseTake(t) {
      mutate(`Chọn take cho ${t.dataset.id}, clip ${Number(t.dataset.clip) + 1}.`, p => {
        const s = p.scenes.find(x => x.id === t.dataset.id);
        s.chosen = Object.assign({}, s.chosen || {}, { [Number(t.dataset.clip)]: t.dataset.tid });
      });
    },
    takeQc(t) {
      mutate(`QC take ${t.dataset.tid}: ${t.dataset.v}.`, p => {
        const s = p.scenes.find(x => x.id === t.dataset.id);
        const tk = (s.takes || []).find(x => x.id === t.dataset.tid);
        if (tk) tk.status = t.dataset.v;
        if (t.dataset.v === 'fail') {
          s.chosen = Object.assign({}, s.chosen || {});
          Object.keys(s.chosen).forEach(k => { if (s.chosen[k] === t.dataset.tid) delete s.chosen[k]; });
        }
      });
    },
    submitJob(t) {
      const ref = prompt('Tên/ghi chú tham chiếu của lần gửi (không dán mã API; có thể bỏ trống):', '') || '';
      mutate(`Ghi đã gửi tay job ${t.dataset.sid}.`, p => {
        const s = p.scenes.find(x => x.id === t.dataset.sid);
        s.takes = s.takes || [];
        const attempt = s.takes.filter(x => x.jobKey === t.dataset.key).length + 1;
        s.takes.push({ id: C.uid('tk'), jobKey: t.dataset.key, clipIndex: Number(t.dataset.clip) || 0, model: t.dataset.model, attempt, status: 'submitted', ref: ref.trim(), at: now() });
        if (s.status === 'draft') s.status = 'ready';
        if (['ready', 'rework'].includes(s.status)) s.status = 'generating';
      });
    },
    jobResult(t) {
      mutate(`Ghi kết quả job ${t.dataset.sid}: ${t.dataset.v}.`, p => {
        const s = p.scenes.find(x => x.id === t.dataset.sid);
        const tk = [...(s.takes || [])].reverse().find(x => x.jobKey === t.dataset.key && x.status === 'submitted');
        if (!tk) return;
        tk.status = t.dataset.v;
        tk.at = now();
        if (t.dataset.v === 'received' && s.status === 'generating') s.status = 'review';
        if (t.dataset.v === 'failed') s.status = 'rework';
      });
    },
    addCheckpoint() {
      const f = document.getElementById('cpForm');
      const name = String(new FormData(f).get('name') || '').trim();
      if (!name) { toast('Nhập tên checkpoint.', 'warn'); return; }
      const p = cur();
      autoCheckpoint(p, name);
      save(); render(); toast('Đã lưu checkpoint.', 'ok');
    },
    restoreCp(t) {
      const p = cur();
      const cp = (S.checkpoints[p.id] || []).find(c => c.id === t.dataset.id);
      if (!cp) return;
      if (!confirm(`Khôi phục “${cp.name}”? Dự án hiện tại sẽ bị thay thế (hãy tạo checkpoint trước nếu cần giữ).`)) return;
      const restored = JSON.parse(cp.snapshot);
      restored.activity = [{ at: now(), text: `Khôi phục checkpoint: ${cp.name}` }, ...(restored.activity || [])].slice(0, 100);
      S.projects[p.id] = restored;
      save(); render(); toast('Đã khôi phục.', 'ok');
    },
    delCp(t) {
      const p = cur();
      if (!confirm('Xóa checkpoint này?')) return;
      S.checkpoints[p.id] = (S.checkpoints[p.id] || []).filter(c => c.id !== t.dataset.id);
      save(); render();
    },
    export(t) { exportFile(t.dataset.kind); },
    useTpl(t) { S.tplDraft = t.dataset.id; S.screen = 'new'; save(); render(); },
    copyBuiltin(t) {
      const tpl = C.BUILTIN_TEMPLATES.find(x => x.id === t.dataset.id);
      const copy = { id: C.uid('tpl'), name: `${tpl.name} (bản sửa)`, config: JSON.parse(JSON.stringify(tpl.config)) };
      S.templates.push(copy); save(); render(); toast('Đã sao chép mẫu để sửa.', 'ok');
    },
    delTpl(t) { if (!confirm('Xóa mẫu này?')) return; S.templates = S.templates.filter(x => x.id !== t.dataset.id); save(); render(); },
    saveTplFrom(t) {
      const p = S.projects[t.dataset.id];
      saveAsTemplate(p);
    },
    saveCurrentTpl() { saveAsTemplate(cur()); },
    cloneProj(t) {
      const src = S.projects[t.dataset.id];
      const c = C.cloneProject(src);
      S.projects[c.id] = c; S.order.unshift(c.id); S.currentId = c.id; S.screen = 'script';
      save(); render(); toast('Đã nhân bản. Tiến độ và chi phí được đặt lại.', 'ok');
    },
    delProj(t) {
      const p = S.projects[t.dataset.id];
      if (!confirm(`Xóa dự án “${p.title}” và toàn bộ checkpoint của dự án? Không hoàn tác được.`)) return;
      delete S.projects[p.id]; delete S.checkpoints[p.id];
      S.order = S.order.filter(id => id !== p.id);
      if (S.currentId === p.id) S.currentId = S.order[0] || '';
      save(); render();
    }
  };

  function saveAsTemplate(p) {
    if (!p) return;
    const config = {};
    TPL_FIELDS.forEach(f => { config[f.key] = p[f.key]; });
    S.templates.push({ id: C.uid('tpl'), name: `Mẫu từ “${p.title}”`, config });
    save(); render(); toast('Đã lưu mẫu (không kèm kịch bản).', 'ok');
  }

  // Thay đổi giá trị (change)
  const CHANGES = {
    proj(t) {
      const key = t.dataset.key;
      const val = valueOf(t);
      mutate(null, p => {
        if (key === 'script' && p.sourceLocked) return;
        p[key] = val;
        if (key === 'market') {
          const m = C.MARKET_BY[val];
          if (m) { p.voiceRate = m.rate; if (!(p.scenes || []).length) p.budget.currency = m.currency; }
        }
      });
    },
    budgetAmount(t) { mutate(null, p => { p.budget.amount = Number(t.value) || 0; }); },
    budgetCurrency(t) { mutate(null, p => { p.budget.currency = t.value; }); },
    review(t) {
      const key = t.dataset.key;
      mutate(null, p => { p.review[key] = key === 'reviewer' ? t.value : t.checked; });
    },
    loc(t) {
      mutate(null, p => { p.localizedByMarket = p.localizedByMarket || {}; p.localizedByMarket[t.dataset.market] = t.value; });
    },
    scene(t) {
      const key = t.dataset.key;
      const val = valueOf(t);
      if (key === 'model' && val === '') { setScene(t.dataset.id, 'model', ''); return; }
      mutate(null, p => {
        const sc = p.scenes.find(s => s.id === t.dataset.id);
        if (!sc) return;
        if (key === 'continuityChecked') sc.continuityChecked = !!val;
        else sc[key] = val;
      });
    },
    status(t) {
      const p = cur();
      const sc = p.scenes.find(s => s.id === t.dataset.id);
      const next = t.value;
      if (next === 'approved') { toast('Dùng nút “Duyệt cảnh” ở mục QC để kiểm đủ điều kiện.', 'warn'); t.value = sc.status; return; }
      if (['ready', 'queued', 'generating', 'review'].includes(next) && (!sc.action || !sc.opening || !sc.ending)) {
        toast('Cần hành động và trạng thái đầu/cuối trước khi chuyển sang trạng thái này.', 'warn');
        t.value = sc.status; return;
      }
      mutate(null, pp => { pp.scenes.find(s => s.id === t.dataset.id).status = next; });
    },
    dialogue(t) { mutate(null, p => { const sc = p.scenes.find(s => s.id === t.dataset.id); if (sc) sc.dialogue = parseDialogue(t.value); }); },
    charToggle(t) {
      mutate(null, p => {
        const sc = p.scenes.find(s => s.id === t.dataset.id);
        if (!sc) return;
        const set = new Set(sc.characterIds || []);
        t.checked ? set.add(t.dataset.cid) : set.delete(t.dataset.cid);
        sc.characterIds = [...set];
      });
    },
    item(t) {
      mutate(null, p => {
        const it = p.bible[t.dataset.list].find(x => x.id === t.dataset.id);
        if (it) { it[t.dataset.key] = t.value; it.locked = false; }
      });
    },
    qc(t) {
      mutate(null, p => {
        const sc = p.scenes.find(s => s.id === t.dataset.id);
        if (sc) sc.qc = Object.assign({}, sc.qc, { [t.dataset.key]: t.value });
      });
    },
    viewScene(t) { UI.viewScene = t.value; UI.viewClip = 0; render(); },
    viewModel(t) { UI.viewModel = t.value; UI.viewClip = 0; render(); },
    viewClip(t) { UI.viewClip = Number(t.value); render(); },
    queueFilter(t) { UI.queueFilter = t.value; render(); },
    assignFilter(t) { UI.assignFilter = t.value; render(); },
    newTpl(t) {
      // Chỉ cập nhật các ô cấu hình, giữ nguyên tên dự án và kịch bản đang nhập.
      S.tplDraft = t.value;
      save();
      const tpl = findTpl(t.value);
      const form = document.getElementById('newForm');
      if (!form) return;
      if (tpl) {
        Object.keys(tpl.config).forEach(k => { if (form.elements[k] && k !== 'market') form.elements[k].value = tpl.config[k]; });
      }
    },
    newMarket(t) {
      const m = C.MARKET_BY[t.value];
      const form = document.getElementById('newForm');
      if (form && m) { form.elements.voiceRate.value = m.rate; form.elements.currency.value = m.currency; }
    },
    tplname(t) { const tp = S.templates.find(x => x.id === t.dataset.id); if (tp) { tp.name = t.value; save(); render(); } },
    tplcfg(t) {
      const tp = S.templates.find(x => x.id === t.dataset.id);
      if (!tp) return;
      const f = CFG_FIELDS.find(x => x.key === t.dataset.key);
      tp.config[t.dataset.key] = f && f.type === 'number' ? Number(t.value) : t.value;
      save();
    },
    importTxt(t) {
      const file = t.files && t.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const p = cur();
        if (!p || p.sourceLocked) { toast('Nội dung đã khóa. Mở khóa trước khi nạp file mới.', 'warn'); return; }
        mutate(`Nạp file ${file.name}.`, pp => { pp.script = String(reader.result); });
        toast(`Đã nạp ${file.name}.`, 'ok');
      };
      reader.readAsText(file, 'utf-8');
      t.value = '';
    },
    importJson(t) {
      const file = t.files && t.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        try {
          const data = JSON.parse(String(reader.result));
          const p = data.project || data;
          if (!p || !p.id || !Array.isArray(p.scenes) || !p.bible) throw new Error('Không đúng định dạng dự án.');
          if (S.projects[p.id]) p.id = C.uid('prj');
          p.activity = [{ at: now(), text: `Nhập từ file ${file.name}.` }, ...(p.activity || [])];
          S.projects[p.id] = p;
          S.order.unshift(p.id);
          S.currentId = p.id;
          S.screen = 'script';
          save(); render(); toast('Đã nhập dự án.', 'ok');
        } catch (e) { toast(`Không nhập được: ${e.message}`, 'bad'); }
      };
      reader.readAsText(file, 'utf-8');
      t.value = '';
    },
    switchProj(t) { S.currentId = t.value; UI.page = 0; save(); render(); },
    sharedOrg(t) { SH.orgId = t.value; SH.msg = ''; render(); }
  };

  // Các thay đổi cần bỏ qua những ô không thuộc logic (giữ tương thích)
  document.addEventListener('click', ev => {
    const t = ev.target.closest('[data-act]');
    if (!t || t.disabled) return;
    ev.preventDefault();
    const fn = ACTIONS[t.dataset.act];
    if (fn) fn(t, ev);
  });
  document.addEventListener('change', ev => {
    const t = ev.target;
    if (!t || !t.dataset || !t.dataset.chg) return;
    const fn = CHANGES[t.dataset.chg];
    if (fn) fn(t, ev);
  });
  document.getElementById('projSel').addEventListener('change', ev => CHANGES.switchProj(ev.target));
  document.getElementById('fileTxt').addEventListener('change', ev => CHANGES.importTxt(ev.target));
  document.getElementById('fileJson').addEventListener('change', ev => CHANGES.importJson(ev.target));

  // Khởi động
  if (!S.order.length && !Object.keys(S.projects).length) S.screen = 'dashboard';
  if (S.currentId && !S.projects[S.currentId]) S.currentId = S.order.find(id => S.projects[id]) || '';
  if (!S.currentId) S.currentId = S.order.find(id => S.projects[id]) || '';
  render();
  if (hasShared()) {
    window.SharedClient.session().then(sess => { SH.session = sess; if (sess) ACTIONS.sharedOrgs(); }).catch(() => {});
  }
})();
