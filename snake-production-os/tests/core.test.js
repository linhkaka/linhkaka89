// Chạy: node --test snake-production-os/tests/
'use strict';
const test = require('node:test');
const assert = require('node:assert/strict');
const C = require('../core.js');

const SENT = 'Đây là một đoạn kể thử nghiệm để kiểm tra việc phân cảnh và giữ nguyên văn. ';

function makeProject(script, overrides = {}) {
  const p = C.factoryProject(Object.assign({ script, minutes: 1, market: 'US', sceneSeconds: 15 }, overrides));
  p.sourceLocked = true;
  p.sourceHash = C.fnv1a(script);
  const r = C.splitScenes(script, { minutes: p.minutes, sceneSeconds: p.sceneSeconds, market: p.market });
  p.scenes = r.scenes.map(s => Object.assign({
    title: '', action: 'Hành động', opening: 'Mở', ending: 'Kết', camera: '', lighting: '',
    characterIds: [], locationId: '', dialogue: [], ambient: '', music: '', model: '',
    status: 'draft', assignee: '', due: '', takes: [], chosenTakeId: '', qc: C.emptyQc(),
    continuityChecked: true, bibleVersion: p.bible.version, sourceHash: p.sourceHash, rejections: []
  }, s));
  return p;
}

test('phân cảnh 30 phút: 120 cảnh 15s, phủ 100%, ghép lại đúng nguyên văn', () => {
  const script = SENT.repeat(400);
  const r = C.splitScenes(script, { minutes: 30, sceneSeconds: 15, market: 'US' });
  assert.equal(r.count, 120);
  assert.ok(r.scenes.every(s => s.durationSec === 15));
  assert.equal(r.scenes.reduce((a, s) => a + s.durationSec, 0), 1800);
  const p = { script, scenes: r.scenes };
  const cov = C.checkCoverage(p);
  assert.equal(cov.ok, true, JSON.stringify(cov.issues));
  assert.equal(C.voiceCleanText(p), script);
});

test('phân cảnh 120 phút: mọi cảnh nằm trong 10–20 giây', () => {
  const script = SENT.repeat(3000);
  const r = C.splitScenes(script, { minutes: 120, sceneSeconds: 20, market: 'US' });
  assert.ok(r.scenes.every(s => s.durationSec >= 10 && s.durationSec <= 20));
  assert.equal(r.scenes.reduce((a, s) => a + s.durationSec, 0), 7200);
});

test('nguồn ngắn hơn số cảnh mong muốn: không tạo cảnh rỗng, vẫn phủ đủ', () => {
  const script = 'Một. Hai. Ba.';
  const r = C.splitScenes(script, { minutes: 1, sceneSeconds: 10, market: 'US' });
  const p = { script, scenes: r.scenes };
  assert.ok(r.scenes.every(s => s.end > s.start));
  assert.equal(C.checkCoverage(p).ok, true);
  assert.equal(C.voiceCleanText(p), script);
});

test('Unicode: emoji ZWJ, tổ hợp tiếng Việt, tiếng Nhật, CRLF được giữ nguyên byte', () => {
  const script = 'Chào 👩‍👩‍👧‍👦 thế giới.\r\nTiếng Việt: Ệ̂ấ ắ. 日本語のテキスト。🎬 ' + SENT.repeat(20) + '\r\n';
  const r = C.splitScenes(script, { minutes: 0.5, sceneSeconds: 10, market: 'JP' });
  const p = { script, scenes: r.scenes };
  assert.equal(C.checkCoverage(p).ok, true);
  assert.equal(C.voiceCleanText(p), script, 'CRLF và ký tự đặc biệt phải còn nguyên');
  // Không cắt đôi cặp thay thế (surrogate pair)
  r.scenes.forEach(s => {
    const code = script.charCodeAt(s.start);
    assert.ok(!(code >= 0xdc00 && code <= 0xdfff), `cảnh ${s.id} bắt đầu giữa surrogate pair`);
  });
  assert.equal(C.cpLength('👩‍👩‍👧‍👦'), 7);
});

test('chỉ số code point khác UTF-16 khi có emoji', () => {
  const s = 'a🎬b';
  assert.equal(s.length, 4);
  assert.equal(C.cpIndex(s, 3), 2);
});

test('hash FNV-1a: ổn định, và đổi khi chỉ đổi một ký tự xuống dòng', () => {
  assert.equal(C.fnv1a('abc'), C.fnv1a('abc'));
  assert.notEqual(C.fnv1a('a\nb'), C.fnv1a('a\r\nb'));
});

test('cảnh lệch thời lượng voice: có cảnh báo, không tự thêm nội dung', () => {
  const script = SENT.repeat(10); // rất ngắn so với 30 phút
  const r = C.splitScenes(script, { minutes: 30, sceneSeconds: 15, market: 'US' });
  assert.ok(r.warnings.some(w => w.includes('Không tự thêm')));
  assert.equal(C.checkCoverage({ script, scenes: r.scenes }).ok, true);
});

test('planClips: Flow 20s = 10+10; Seedance 20s = 15+5; Muse 12s = 10+2', () => {
  const f = C.planClips(20, 'flow');
  assert.deepEqual(f.map(c => c.editorialSeconds), [10, 10]);
  const s = C.planClips(20, 'seedance');
  assert.deepEqual(s.map(c => c.editorialSeconds), [15, 5]);
  assert.deepEqual(s.map(c => c.generatedSeconds), [15, 5]);
  const m = C.planClips(12, 'muse');
  assert.deepEqual(m.map(c => c.editorialSeconds), [10, 2]);
  assert.equal(m[1].trimSeconds, round(m[1].generatedSeconds - 2));
});
function round(n) { return Math.round(n * 10) / 10; }

test('định tuyến: chế độ single bỏ qua cấu hình từng cảnh; hybrid dùng cấu hình cảnh', () => {
  const p = makeProject(SENT.repeat(4), { defaultModel: 'flow', routing: 'single' });
  p.scenes[0].model = 'seedance';
  assert.equal(C.routeModel(p, p.scenes[0]), 'flow');
  p.routing = 'hybrid';
  assert.equal(C.routeModel(p, p.scenes[0]), 'seedance');
  assert.equal(C.routeModel(p, p.scenes[1]), 'flow');
});

test('thoại: mỗi câu xuất hiện đúng một lần trong các clip, không lặp', () => {
  const p = makeProject(SENT.repeat(4), { audioMode: 'dialogue_native', defaultModel: 'seedance', routing: 'single' });
  p.bible.characters = [{ id: 'c1', name: 'An', description: 'd', wardrobe: 'w', anchors: 'a', reference: 'ref-an', locked: true }];
  const sc = p.scenes[0];
  sc.durationSec = 20;
  sc.characterIds = ['c1'];
  sc.dialogue = [{ speaker: 'An', line: 'Câu một' }, { speaker: 'An', line: 'Câu hai' }];
  const clips = C.compileScenePrompts(p, sc, 'seedance');
  assert.equal(clips.length, 2);
  const text = clips.map(c => c.prompt).join('\n');
  assert.equal(text.split('Câu một').length - 1, 1);
  assert.equal(text.split('Câu hai').length - 1, 1);
});

test('prompt không chứa cài đặt giao diện; cài đặt nằm ở settings', () => {
  const p = makeProject(SENT.repeat(4), { ratio: '9:16', defaultModel: 'flow', routing: 'single' });
  const c = C.compileClipPrompt(p, p.scenes[0], 'flow', 0);
  assert.ok(!c.prompt.includes('9:16'));
  assert.equal(c.settings.ratio, '9:16');
  assert.equal(c.settings.source_span.start_utf16, p.scenes[0].start);
});

test('Muse.ai: luôn cảnh báo chưa xác minh và không gắn quyền API', () => {
  const p = makeProject(SENT.repeat(4), { defaultModel: 'muse', routing: 'single' });
  const c = C.compileClipPrompt(p, p.scenes[0], 'muse', 0);
  assert.ok(c.warnings.some(w => w.includes('chưa xác minh')));
  assert.equal(C.MODELS.muse.level, 'unverified');
  assert.ok(C.MODELS.flow.verified.includes('Chưa kiểm tài khoản'));
});

test('tham chiếu thiếu: cảnh báo, không tự tạo mã tham chiếu', () => {
  const p = makeProject(SENT.repeat(4), { defaultModel: 'flow', routing: 'single' });
  p.bible.characters = [{ id: 'c1', name: 'Lan', description: 'd', wardrobe: 'w', anchors: 'a', reference: '', locked: true }];
  p.scenes[0].characterIds = ['c1'];
  const c = C.compileClipPrompt(p, p.scenes[0], 'flow', 0);
  assert.ok(c.warnings.some(w => w.includes('chưa có ảnh tham chiếu')));
  assert.equal(c.settings.references[0].asset, null);
});

test('continuity: thiếu hành động, thoại không khớp nguyên văn, Bible cũ', () => {
  const p = makeProject(SENT.repeat(4), { defaultModel: 'flow', routing: 'single' });
  p.scenes[0].action = '';
  p.scenes[1].dialogue = [{ speaker: 'X', line: 'Câu không có trong nguồn' }];
  p.bible.version = 3;
  const issues = C.continuityIssues(p);
  assert.ok(issues.some(i => i.code === 'action' && i.level === 'error'));
  assert.ok(issues.some(i => i.code === 'dialogue_not_verbatim' && i.level === 'error'));
  assert.ok(issues.some(i => i.code === 'stale_bible' && i.level === 'warn'));
});

test('duyệt cảnh: chặn khi QC chưa đạt, chưa chọn take hoặc take chưa pass', () => {
  const p = makeProject(SENT.repeat(4), { defaultModel: 'flow', routing: 'single' });
  const sc = p.scenes[0];
  let r = C.canApprove(p, sc);
  assert.equal(r.ok, false);
  assert.ok(r.reasons.some(x => x.includes('chưa chọn take')));
  Object.keys(C.QC_KEYS).forEach(k => { sc.qc[k] = 'pass'; });
  // Cảnh 15s với Flow có 2 clip: phải có take đạt cho từng clip
  sc.takes = [{ id: 't1', status: 'fail', clipIndex: 0 }, { id: 't2', status: 'pass', clipIndex: 1 }];
  sc.chosen = { 0: 't1', 1: 't2' };
  r = C.canApprove(p, sc);
  assert.ok(r.reasons.some(x => x.includes('Clip 1/2') && x.includes('chưa đạt')));
  assert.ok(!r.reasons.some(x => x.includes('Clip 2/2')));
  sc.takes[0].status = 'pass';
  assert.equal(C.canApprove(p, sc).ok, true);
  sc.chosen = { 0: 't1' };
  r = C.canApprove(p, sc);
  assert.ok(r.reasons.some(x => x.includes('Clip 2/2') && x.includes('chưa chọn take')));
});

test('ngân sách: không cộng chéo tiền tệ, tính cả lần thất bại, không chia cho 0', () => {
  const p = makeProject(SENT.repeat(4));
  p.costs = [
    { kind: 'actual', status: 'ok', amount: 100, currency: 'USD' },
    { kind: 'actual', status: 'rejected', amount: 50, currency: 'USD' },
    { kind: 'actual', status: 'ok', amount: 1000000, currency: 'VND' },
    { kind: 'estimate', status: 'ok', amount: 999, currency: 'USD' },
    { kind: 'actual', status: 'unknown', amount: 0, currency: 'USD' }
  ];
  const b = C.budgetSummary(p);
  assert.equal(b.byCurrency.USD.actual, 150);
  assert.equal(b.byCurrency.VND.actual, 1000000);
  assert.equal(b.byCurrency.USD.estimate, 999);
  assert.equal(b.byCurrency.USD.unknownCount, 1);
  assert.equal(b.costPerApproved.USD, null, 'không có cảnh duyệt thì null');
  p.scenes[0].status = 'approved';
  p.scenes[1].status = 'approved';
  assert.equal(C.budgetSummary(p).costPerApproved.USD, 75);
});

test('cổng sản xuất: mặc định là DRAFT; đủ điều kiện mới lên APPROVED/FINISHED', () => {
  const p = makeProject(SENT.repeat(4), { defaultModel: 'flow', routing: 'single' });
  assert.equal(C.productionGate(C.productionStages(p)).level, 'draft');
  p.review = { facts: true, originality: true, localization: true, reviewer: 'x' };
  p.bible.characters = [];
  p.voiceLock = { hash: C.fnv1a(p.script), measuredSeconds: 60, at: 'now' };
  p.scenes.forEach(s => { s.continuityChecked = true; });
  const stagesApproved = C.productionStages(p);
  assert.equal(C.productionGate(stagesApproved).level, 'approved_kit', JSON.stringify(stagesApproved.filter(s => !s.pass)));
  p.scenes.forEach(s => {
    s.status = 'approved';
    s.takes = [{ id: 'k', status: 'pass', clipIndex: 0 }, { id: 'k2', status: 'pass', clipIndex: 1 }];
    s.chosen = { 0: 'k', 1: 'k2' };
    Object.keys(C.QC_KEYS).forEach(q => { s.qc[q] = 'pass'; });
  });
  assert.equal(C.productionGate(C.productionStages(p)).level, 'finished');
});

test('khóa voice bị vô hiệu khi nguồn đổi', () => {
  const p = makeProject(SENT.repeat(4));
  p.voiceLock = { hash: C.fnv1a(p.script), measuredSeconds: 60, at: 'now' };
  p.script = p.script + 'Thêm.';
  const st = C.productionStages(p).find(s => s.id === 'voice');
  assert.equal(st.pass, false);
});

test('kiểm trùng nguồn: bản sao gần như nguyên văn có tỷ lệ cao; bản tự viết có tỷ lệ thấp', () => {
  const src = 'Các nhà khoa học đã phát hiện ra một hiện tượng hoàn toàn mới trong phòng thí nghiệm tại Berlin năm ngoái.';
  const copy = src;
  const own = 'Ở xứ sở lạnh giá, người thợ cơ khí thức dậy trước bình minh để kiểm tra từng bánh răng của nhà máy cũ.';
  assert.equal(C.originalityOverlap(src, copy).warn, true);
  assert.equal(C.originalityOverlap(src, own).warn, false);
});

test('clone: giữ cấu hình và kịch bản nhưng đặt lại tiến độ, chi phí và take', () => {
  const p = makeProject(SENT.repeat(4));
  p.scenes[0].status = 'approved';
  p.scenes[0].takes = [{ id: 'k', status: 'pass' }];
  p.costs = [{ kind: 'actual', amount: 5, currency: 'USD', status: 'ok' }];
  const c = C.cloneProject(p);
  assert.notEqual(c.id, p.id);
  assert.equal(c.script, p.script);
  assert.equal(c.scenes[0].status, 'draft');
  assert.deepEqual(c.scenes[0].takes, []);
  assert.deepEqual(c.costs, []);
  assert.equal(p.scenes[0].status, 'approved', 'bản gốc không bị đổi');
});

test('xuất JSON sản xuất: có nhãn đầu ra, hai hệ offset và nguyên văn nguồn', () => {
  const script = 'Chào 🎬 thế giới. ' + SENT.repeat(2);
  const p = makeProject(script);
  const out = C.exportProductionJSON(p, '2026-11-12T00:00:00Z');
  assert.equal(out.schema, C.SCHEMA);
  assert.match(out.output_label, /DRAFT/);
  assert.equal(out.source.text, script);
  assert.equal(out.source.length_utf16, script.length);
  assert.equal(out.source.length_codepoint, C.cpLength(script));
  assert.equal(out.scenes[0].start_utf16, 0);
  assert.equal(out.scenes.map(s => s.narration).join(''), script);
});

test('xuất CSV: ô có dấu phẩy và ngoặc kép được bọc đúng', () => {
  assert.equal(C.csvCell('a,"b"'), '"a,""b"""');
});

test('nhãn đầu ra gắn với nội dung kiểm: không gọi là phim hoàn tất khi chưa có video', () => {
  const p = makeProject(SENT.repeat(4));
  const md = C.promptsMarkdown(p, 'all');
  assert.match(md, /BẢN NHÁP/);
  assert.doesNotMatch(md, /HOÀN TẤT/);
});

test('hàng đợi: khóa idempotency gồm hash prompt, không đổi khi chạy lại', () => {
  const p = makeProject(SENT.repeat(4), { defaultModel: 'flow', routing: 'single' });
  p.scenes[0].status = 'ready';
  const a = C.jobsForProject(p);
  const b = C.jobsForProject(p);
  assert.equal(a[0].key, b[0].key);
  assert.equal(a[0].state, 'pending');
});
