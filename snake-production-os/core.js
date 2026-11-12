/*
 * SNAKE Production OS — lõi nghiệp vụ (không có giao diện).
 * Mọi hàm ở đây là thuần (không đụng DOM, không mạng) để kiểm thử bằng Node.
 * Nguyên tắc: không sửa nội dung nguồn, không tự thêm/bớt lời thoại, không coi
 * năng lực model là đã xác minh khi chưa có bằng chứng.
 */
(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.SnakeCore = api;
}(typeof self !== 'undefined' ? self : globalThis, function () {
  'use strict';

  const SCHEMA = 'snake-production-os/0.1';
  const MIN_SCENE = 10;
  const MAX_SCENE = 20;
  const MAX_SCENES = 1600;

  // 9 thị trường đích theo yêu cầu. unit: 'chars' (đếm ký tự) hoặc 'words' (đếm từ).
  const MARKETS = [
    { code: 'JP', name: 'Nhật Bản', lang: 'ja-JP', unit: 'chars', rate: 300, currency: 'JPY', note: 'Đếm theo ký tự. Kiểm tra kính ngữ, đơn vị đo, cách gọi địa danh và thuật ngữ chuyên ngành.' },
    { code: 'KR', name: 'Hàn Quốc', lang: 'ko-KR', unit: 'words', rate: 150, currency: 'KRW', note: 'Kiểm tra kính ngữ, tên riêng và cách viết thương hiệu, địa danh.' },
    { code: 'TW', name: 'Đài Loan', lang: 'zh-TW', unit: 'chars', rate: 300, currency: 'TWD', note: 'Dùng chữ phồn thể và thuật ngữ Đài Loan. Không dùng nguyên văn giản thể.' },
    { code: 'US', name: 'Hoa Kỳ', lang: 'en-US', unit: 'words', rate: 150, currency: 'USD', note: 'Đơn vị đo Anh-Mỹ, luật quảng cáo và cách trích nguồn theo chuẩn địa phương.' },
    { code: 'IT', name: 'Ý', lang: 'it-IT', unit: 'words', rate: 150, currency: 'EUR', note: 'Kiểm tra tên riêng, địa danh, ngày tháng và cách xưng hô.' },
    { code: 'ES', name: 'Tây Ban Nha', lang: 'es-ES', unit: 'words', rate: 150, currency: 'EUR', note: 'Kiểm tra tên riêng, đơn vị và cách xưng hô (tú/usted) theo ngữ cảnh.' },
    { code: 'DE', name: 'Đức', lang: 'de-DE', unit: 'words', rate: 150, currency: 'EUR', note: 'Kiểm tra danh từ ghép, đơn vị và văn phong trang trọng/thân mật.' },
    { code: 'FR', name: 'Pháp', lang: 'fr-FR', unit: 'words', rate: 150, currency: 'EUR', note: 'Kiểm tra dấu câu kiểu Pháp, tên riêng và cách xưng hô (tu/vous).' },
    { code: 'PL', name: 'Ba Lan', lang: 'pl-PL', unit: 'words', rate: 150, currency: 'PLN', note: 'Kiểm tra biến cách, tên riêng và đơn vị đo.' }
  ];
  const MARKET_BY = Object.fromEntries(MARKETS.map(m => [m.code, m]));
  const CURRENCIES = ['VND', 'USD', 'EUR', 'JPY', 'KRW', 'TWD', 'PLN'];

  const GENRES = ['Phim tài liệu', 'Drama / Phim truyện', 'Story Drama voiceover', 'Giải thích / What-if', 'Lịch sử điện ảnh', 'Phóng sự', 'Hoạt hình'];
  const NARRATIVE_STYLES = ['Điều tra từng bước', 'Kể theo nhân vật', 'Biên niên thời gian', 'Câu hỏi – giải đáp', 'Leo thang hồi hộp', 'Nhẹ nhàng đời thường'];
  const VISUAL_STYLES = ['Điện ảnh chân thật', 'Người que 2D điện ảnh', 'Hand-drawn / Vẽ tay', 'Hybrid · Stock + AI', '3D khoa học', 'Tối giản / Motion graphics'];
  const RATIOS = ['16:9', '9:16', '1:1', '4:3', '3:4', '21:9'];
  const AUDIO_MODES = {
    narration_only: 'Chỉ voiceover ghép riêng',
    dialogue_native: 'Đối thoại nhiều nhân vật',
    mixed: 'Mixed · đối thoại + voiceover',
    silent_ambient: 'Không lời · âm thanh môi trường'
  };
  const CAMERAS = ['Máy tĩnh · trung cảnh', 'Dolly-in chậm', 'Tracking ngang', 'Toàn cảnh góc rộng', 'Cận cảnh chi tiết', 'Over-the-shoulder', 'Reverse shot'];
  const STATUSES = {
    draft: 'Bản nháp', ready: 'Prompt sẵn sàng', queued: 'Đang xếp hàng', generating: 'Đang tạo',
    review: 'Chờ duyệt', approved: 'Đã duyệt', rework: 'Cần sửa'
  };
  const QC_KEYS = {
    technical: 'Kỹ thuật (độ phân giải, thời lượng, khung hình)',
    factual: 'Dữ kiện / native',
    visual: 'Hình ảnh & hành động',
    continuity: 'Continuity (nhân vật, bối cảnh, nối cảnh)',
    audio: 'Thoại & âm thanh (khẩu hình)'
  };
  const QC_STATES = ['pending', 'pass', 'fail'];
  const ASSIGN_ROLES = ['Admin', 'Producer', 'Writer', 'Localizer', 'Reviewer', 'Voice / Visual Editor', 'Viewer'];

  // Hồ sơ model. "level" là mức xác minh thực tế, không phải tên gọi.
  const MODELS = {
    flow: {
      id: 'flow', name: 'Google Flow', profile: 'Omni Flash 1.2 (gói không thuê bao)',
      min: 3, max: 10, audio: true, ratios: ['16:9', '9:16'], level: 'draft',
      verified: 'Ghi nhận tài liệu công khai ngày 12/11/2026 (từ gói bàn giao). Chưa kiểm tài khoản. Ứng dụng không có API.',
      prefix: 'Một hành động chính, một hướng máy quay rõ ràng.'
    },
    muse: {
      id: 'muse', name: 'Muse.ai', profile: 'Chưa xác định model/phiên bản',
      min: 1, max: 10, audio: false, ratios: ['16:9', '9:16', '1:1', '21:9'], level: 'unverified',
      verified: 'CHƯA XÁC MINH sản phẩm, model và API. 10 giây là mục tiêu biên tập tạm tính, không phải giới hạn nhà cung cấp. Chỉ xuất bản nháp thủ công.',
      prefix: 'Một cảnh liên tục, diễn xuất tiết chế.'
    },
    seedance: {
      id: 'seedance', name: 'Seedance 2.0 · Runway', profile: 'Seedance 2.0 trên Runway',
      min: 5, max: 15, audio: true, ratios: ['21:9', '16:9', '4:3', '1:1', '3:4', '9:16'], level: 'draft',
      verified: 'Ghi nhận tài liệu Runway ngày 12/11/2026. Chưa kiểm tài khoản hoặc API. Chỉ áp dụng cho bề mặt Runway; không suy cho nhà cung cấp khác.',
      prefix: 'Dàn cảnh rõ vị trí từng nhân vật và thứ tự hành động.'
    }
  };
  const MODEL_IDS = Object.keys(MODELS);

  const BUILTIN_TEMPLATES = [
    { id: 'tpl-doc-30', name: 'Phim tài liệu 30 phút', config: { genre: 'Phim tài liệu', narrativeStyle: 'Điều tra từng bước', visualStyle: 'Hybrid · Stock + AI', minutes: 30, ratio: '16:9', audioMode: 'narration_only', defaultModel: 'flow', routing: 'hybrid', sceneSeconds: 15 } },
    { id: 'tpl-doc-60', name: 'Phim tài liệu 60 phút (định tuyến hybrid)', config: { genre: 'Phim tài liệu', narrativeStyle: 'Biên niên thời gian', visualStyle: 'Điện ảnh chân thật', minutes: 60, ratio: '16:9', audioMode: 'narration_only', defaultModel: 'flow', routing: 'hybrid', sceneSeconds: 15 } },
    { id: 'tpl-drama-60', name: 'Drama đối thoại 60 phút', config: { genre: 'Drama / Phim truyện', narrativeStyle: 'Kể theo nhân vật', visualStyle: 'Điện ảnh chân thật', minutes: 60, ratio: '16:9', audioMode: 'dialogue_native', defaultModel: 'seedance', routing: 'hybrid', sceneSeconds: 15 } },
    { id: 'tpl-story-90', name: 'Story Drama voiceover 90 phút', config: { genre: 'Story Drama voiceover', narrativeStyle: 'Leo thang hồi hộp', visualStyle: 'Người que 2D điện ảnh', minutes: 90, ratio: '16:9', audioMode: 'mixed', defaultModel: 'flow', routing: 'hybrid', sceneSeconds: 15 } },
    { id: 'tpl-doc-120', name: 'Phim tài liệu 120 phút', config: { genre: 'Phim tài liệu', narrativeStyle: 'Điều tra từng bước', visualStyle: 'Điện ảnh chân thật', minutes: 120, ratio: '16:9', audioMode: 'narration_only', defaultModel: 'flow', routing: 'hybrid', sceneSeconds: 15 } }
  ];

  // ---------- Tiện ích chung ----------
  const clamp = (n, a, b) => Math.min(b, Math.max(a, n));
  const round1 = n => Math.round(n * 10) / 10;
  const nowIso = () => new Date().toISOString();
  const pad3 = n => String(n).padStart(3, '0');

  function uid(prefix) {
    const rnd = (globalThis.crypto && globalThis.crypto.randomUUID) ? globalThis.crypto.randomUUID().slice(0, 8) : Math.random().toString(36).slice(2, 10);
    return `${prefix}_${rnd}`;
  }

  // Băm FNV-1a 32-bit trên byte UTF-8 của chuỗi. Chỉ phát hiện thay đổi, KHÔNG phải mã bảo mật.
  function fnv1a(str) {
    const bytes = new TextEncoder().encode(str);
    let h = 0x811c9dc5;
    for (const b of bytes) {
      h ^= b;
      h = Math.imul(h, 0x01000193) >>> 0;
    }
    return h.toString(16).padStart(8, '0');
  }

  // Số code point (đếm theo Unicode) — khác với chỉ số UTF-16 của JavaScript.
  const cpLength = s => [...s].length;
  function cpIndex(s, utf16Index) { return [...s.slice(0, utf16Index)].length; }

  function unitCount(text, unit) {
    if (unit === 'chars') return [...text.replace(/\s/g, '')].length;
    return (text.trim().match(/\S+/g) || []).length;
  }

  function estimateVoiceSeconds(text, market) {
    const m = MARKET_BY[market] || MARKETS[3];
    return unitCount(text, m.unit) / m.rate * 60;
  }

  // Các vị trí kết thúc token (word). Phần tử cuối luôn là độ dài chuỗi.
  function wordBoundaries(text, lang) {
    const out = [];
    if (typeof Intl !== 'undefined' && Intl.Segmenter) {
      const seg = new Intl.Segmenter(lang || 'vi', { granularity: 'word' });
      for (const part of seg.segment(text)) out.push(part.index + part.segment.length);
    } else {
      const re = /\S+\s*/g;
      let m;
      while ((m = re.exec(text))) out.push(m.index + m[0].length);
    }
    if (!out.length || out[out.length - 1] !== text.length) out.push(text.length);
    return out;
  }

  // ---------- Phân cảnh ----------
  // Chia nguồn thành cảnh liên tiếp, bao phủ 100%, không mất và không lặp ký tự.
  function splitScenes(script, opts) {
    if (!script || !script.trim()) throw new Error('Hãy nhập kịch bản hoàn chỉnh trước khi phân cảnh.');
    const market = MARKET_BY[opts.market] || MARKETS[3];
    const T = Math.round(opts.minutes * 60);
    const sceneSec = clamp(Math.round(opts.sceneSeconds || 15), MIN_SCENE, MAX_SCENE);
    const B = wordBoundaries(script, market.lang);
    const M = B.length;
    let N = Math.max(Math.ceil(T / MAX_SCENE), Math.min(Math.floor(T / MIN_SCENE), Math.round(T / sceneSec)));
    N = Math.max(1, Math.min(N, M));
    if (N > MAX_SCENES) throw new Error(`Nguồn vượt giới hạn ${MAX_SCENES} cảnh. Hãy tách thành các tập và giữ nguyên nội dung.`);

    const cuts = [0];
    let prevJ = -1;
    for (let i = 1; i < N; i++) {
      let j = Math.round(i * M / N) - 1;
      j = Math.max(j, prevJ + 1);
      j = Math.min(j, M - 1 - (N - i));
      cuts.push(B[j]);
      prevJ = j;
    }

    const base = Math.floor(T / N);
    const rem = T - base * N;
    const scenes = [];
    for (let i = 0; i < N; i++) {
      const start = cuts[i];
      const end = i < N - 1 ? cuts[i + 1] : script.length;
      scenes.push({ id: `S${pad3(i + 1)}`, n: i + 1, start, end, durationSec: base + (i < rem ? 1 : 0) });
    }

    const warnings = [];
    const est = estimateVoiceSeconds(script, market.code);
    const gap = (est - T) / T;
    if (Math.abs(gap) > 0.1) {
      warnings.push(`Thời lượng voice ước tính ${Math.round(est / 60 * 10) / 10} phút khác mục tiêu ${opts.minutes} phút (${Math.round(gap * 100)}%). Không tự thêm hoặc lặp nội dung. Cần duyệt nguồn hoặc đo TTS thật.`);
    }
    if (base < MIN_SCENE || base + (rem ? 1 : 0) > MAX_SCENE) warnings.push('Có cảnh ngoài khoảng 10–20 giây.');
    return { scenes, count: N, targetSeconds: T, estimatedVoiceSeconds: Math.round(est), warnings };
  }

  // Kiểm độ phủ: các cảnh liên tiếp, đúng thứ tự, ghép lại đúng nguyên văn nguồn.
  function checkCoverage(project) {
    const s = project.script || '';
    const scenes = project.scenes || [];
    const issues = [];
    let pos = 0;
    scenes.forEach(sc => {
      if (sc.start !== pos) issues.push(`${sc.id}: bắt đầu tại ${sc.start}, cần ${pos} (thiếu hoặc lặp)`);
      if (!(sc.end > sc.start)) issues.push(`${sc.id}: khoảng rỗng hoặc đảo chiều`);
      pos = sc.end;
    });
    if (!scenes.length) issues.push('Chưa có cảnh nào');
    if (scenes.length && pos !== s.length) issues.push(`Cảnh phủ đến ${pos}/${s.length}`);
    const joined = scenes.map(sc => s.slice(sc.start, sc.end)).join('') === s;
    const ok = issues.length === 0 && joined;
    return { ok, joined, covered: pos, total: s.length, issues };
  }

  // Lời đọc voiceover chính là nguyên văn nguồn, ghép từ các cảnh.
  function voiceCleanText(project) {
    return (project.scenes || []).map(sc => project.script.slice(sc.start, sc.end)).join('');
  }

  function sceneText(project, scene) { return project.script.slice(scene.start, scene.end); }

  // ---------- Model, clip và routing ----------
  // Chia một cảnh biên tập (10–20s) thành các clip mà model tạo được.
  function planClips(durationSec, modelId) {
    const m = MODELS[modelId];
    if (!m) throw new Error(`Model không hợp lệ: ${modelId}`);
    const count = Math.max(1, Math.ceil(durationSec / m.max));
    const clips = [];
    let elapsed = 0;
    for (let i = 0; i < count; i++) {
      const editorial = Math.min(m.max, durationSec - elapsed);
      const generated = Math.max(m.min, Math.ceil(editorial));
      clips.push({
        index: i,
        editorialSeconds: round1(editorial),
        generatedSeconds: generated,
        trimSeconds: round1(generated - editorial),
        inSeconds: round1(elapsed),
        outSeconds: round1(elapsed + editorial)
      });
      elapsed += editorial;
    }
    return clips;
  }

  // Định tuyến: chế độ single dùng một model; chế độ hybrid cho phép chọn model theo cảnh.
  function routeModel(project, scene) {
    if (project.routing !== 'hybrid') return project.defaultModel;
    return MODELS[scene.model] ? scene.model : project.defaultModel;
  }

  function dialogueForClip(scene, plan, clipIndex) {
    const d = scene.dialogue || [];
    return d.filter((_, i) => Math.floor(i * plan.length / d.length) === clipIndex);
  }

  function findCharacter(project, id) { return (project.bible.characters || []).find(c => c.id === id); }

  // Prompt cho một clip của một model. Cấu hình (tỷ lệ, thời lượng, tham chiếu) nằm ở settings, không trong prompt.
  function compileClipPrompt(project, scene, modelId, clipIndex) {
    const model = MODELS[modelId];
    const plan = planClips(scene.durationSec, modelId);
    const clip = plan[clipIndex];
    if (!clip) throw new Error('Clip không tồn tại trong kế hoạch.');
    const bible = project.bible;
    const chars = (scene.characterIds || []).map(id => findCharacter(project, id)).filter(Boolean);
    const loc = (bible.locations || []).find(l => l.id === scene.locationId);
    const warnings = [];
    const lines = [model.prefix];

    chars.forEach(c => {
      const clean = x => String(x || '').trim().replace(/[.!?。]+$/u, '');
      const parts = [clean(c.description), c.wardrobe ? `Trang phục: ${clean(c.wardrobe)}` : '', c.anchors ? `Điểm nhận dạng: ${clean(c.anchors)}` : ''].filter(Boolean);
      lines.push([clean(c.name), ...parts].filter(Boolean).join('. ') + '.');
      if (!c.description) warnings.push(`Nhân vật "${c.name}" thiếu mô tả ngoại hình trong Bible.`);
    });
    if (loc) lines.push(`Bối cảnh: ${loc.name}. ${loc.description}. ${loc.anchors}.`);
    lines.push(clipIndex === 0
      ? `Mở cảnh: ${scene.opening}`
      : 'Tiếp nối từ clip trước: giữ nguyên tư thế và vị trí đã kết thúc, chỉ chuyển động tự nhiên, không lặp lại hành động đã hoàn tất.');
    lines.push(`Hành động (đoạn ${clipIndex + 1}/${plan.length}): ${scene.action}`);
    lines.push(`Máy quay: ${scene.camera || 'chưa chọn'}. Ánh sáng: ${scene.lighting || 'chưa chọn'}. Phong cách: ${project.visualStyle}.`);
    if (clipIndex === plan.length - 1 && scene.ending) lines.push(`Kết cảnh: ${scene.ending}`);

    const dlg = dialogueForClip(scene, plan, clipIndex);
    if (project.audioMode === 'narration_only') lines.push('Không nói hoặc diễn khẩu hình. Voiceover được ghép riêng.');
    if (project.audioMode === 'silent_ambient') lines.push('Không có lời nói. Chỉ có âm thanh môi trường.');
    if (project.audioMode === 'dialogue_native' || project.audioMode === 'mixed') {
      if (model.audio) {
        dlg.forEach(d => lines.push(`${d.speaker} nói nguyên văn: “${d.line}”`));
      } else if (dlg.length) {
        warnings.push('Model chưa xác minh hỗ trợ thoại trong video: thoại không đưa vào prompt phát lời, giữ trong kế hoạch lồng tiếng.');
      }
    }
    if (scene.ambient && model.audio) lines.push(`Âm thanh môi trường: ${scene.ambient}.`);

    if (model.level === 'unverified') warnings.push('Muse.ai chưa xác minh: chỉ xuất bản nháp thủ công, không gửi qua API.');
    if (!model.ratios.includes(project.ratio)) warnings.push(`Tỷ lệ ${project.ratio} chưa nằm trong hồ sơ ${model.name}.`);
    if (plan.length > 1) warnings.push(`Cảnh chia ${plan.length} clip: cần duyệt hành động từng đoạn trước khi tạo.`);
    if (!scene.opening || !scene.ending) warnings.push('Thiếu trạng thái đầu hoặc cuối cảnh.');
    if (scene.bibleVersion !== undefined && scene.bibleVersion !== bible.version) warnings.push('Cảnh dựa trên Bible cũ. Cần xác nhận lại trước khi tạo.');
    chars.filter(c => !c.reference).forEach(c => warnings.push(`Nhân vật "${c.name}" chưa có ảnh tham chiếu đã map. Không tự tạo mã tham chiếu.`));

    const span = { start_utf16: scene.start, end_utf16: scene.end, start_codepoint: cpIndex(project.script, scene.start), end_codepoint: cpIndex(project.script, scene.end) };
    const settings = {
      model: model.name,
      profile: model.profile,
      verification: model.verified,
      status: model.level,
      ratio: project.ratio,
      clip: { index: clipIndex + 1, of: plan.length, ...clip },
      mode: 'Text-to-video · bản nháp đạo diễn',
      references: [
        ...chars.map(c => ({ name: c.name, asset: c.reference || null, status: c.reference ? 'mapped' : 'missing' })),
        ...(loc ? [{ name: loc.name, asset: loc.reference || null, status: loc.reference ? 'mapped' : 'missing' }] : [])
      ],
      source_span: span,
      voiceover_text: sceneText(project, scene),
      dialogue_for_clip: dlg.map(d => ({ speaker: d.speaker, line: d.line })),
      continuity_bible_version: bible.version
    };
    return { prompt: lines.filter(Boolean).join('\n'), settings, warnings };
  }

  function compileScenePrompts(project, scene, modelId) {
    return planClips(scene.durationSec, modelId).map((_, i) => ({ clipIndex: i, ...compileClipPrompt(project, scene, modelId, i) }));
  }

  // ---------- Continuity ----------
  // Trả về danh sách vấn đề. level: 'error' chặn duyệt, 'warn' cần người xem.
  function continuityIssues(project) {
    const out = [];
    const bible = project.bible;
    (project.scenes || []).forEach(sc => {
      const add = (level, code, text) => out.push({ level, code, scene: sc.id, text: `${sc.id}: ${text}` });
      if (!sc.action || !sc.action.trim()) add('error', 'action', 'thiếu hành động nhìn thấy được');
      if (!sc.opening || !sc.opening.trim()) add('error', 'opening', 'thiếu trạng thái đầu cảnh');
      if (!sc.ending || !sc.ending.trim()) add('error', 'ending', 'thiếu trạng thái cuối cảnh');
      if (!(sc.durationSec >= MIN_SCENE && sc.durationSec <= MAX_SCENE)) add('error', 'duration', `thời lượng ${sc.durationSec}s ngoài 10–20s`);
      const ids = sc.characterIds || [];
      ids.forEach(id => {
        const c = findCharacter(project, id);
        if (!c) add('error', 'unknown_character', `nhân vật ${id} không có trong Bible`);
        else {
          if (!c.locked) add('warn', 'unlocked_character', `nhân vật "${c.name}" chưa khóa trong Bible`);
          if (!c.reference) add('warn', 'no_reference', `nhân vật "${c.name}" chưa có ảnh tham chiếu đã map`);
        }
      });
      if (ids.length > 3) add('warn', 'many_characters', `${ids.length} nhân vật trong một cảnh: rủi ro trôi nhận dạng (heuristic, cần QC hình)`);
      if (!sc.locationId) add('warn', 'no_location', 'chưa gán bối cảnh');
      if (sc.bibleVersion !== bible.version) add('warn', 'stale_bible', `dựa trên Bible v${sc.bibleVersion}, hiện là v${bible.version}`);
      if (sc.sourceHash !== project.sourceHash) add('error', 'stale_source', 'nguồn đã đổi hoặc đang mở khóa; cần phân cảnh lại hoặc xác nhận');
      const text = sceneText(project, sc);
      (sc.dialogue || []).forEach(d => {
        if (!text.includes(d.line)) add('error', 'dialogue_not_verbatim', `thoại của ${d.speaker} không khớp nguyên văn trong cảnh`);
      });
      if (sc.model === 'muse' && (sc.dialogue || []).length) add('warn', 'muse_dialogue', 'Muse.ai chưa xác minh âm thanh/thoại');
    });
    // Nối cảnh: mỗi cảnh (trừ cảnh đầu) phải được đối chiếu với trạng thái cuối cảnh trước.
    (project.scenes || []).slice(1).forEach(sc => {
      if (!sc.continuityChecked) out.push({ level: 'warn', code: 'transition_unchecked', scene: sc.id, text: `${sc.id}: chưa đối chiếu nối cảnh với cảnh trước` });
    });
    return out;
  }

  // Cặp nối cảnh để người xem so sánh: trạng thái cuối cảnh i và đầu cảnh i+1.
  function transitionPairs(project) {
    const scenes = project.scenes || [];
    return scenes.slice(1).map((sc, i) => ({ from: scenes[i], to: sc, ending: scenes[i].ending || '', opening: sc.opening || '', checked: !!sc.continuityChecked }));
  }

  // ---------- Chất lượng, duyệt, ngân sách ----------
  function isStale(project, scene) {
    return scene.bibleVersion !== project.bible.version || scene.sourceHash !== project.sourceHash;
  }

  function canApprove(project, scene) {
    const reasons = [];
    if (!scene.action || !scene.opening || !scene.ending) reasons.push('Thiếu hành động hoặc trạng thái đầu/cuối');
    if (!scene.continuityChecked) reasons.push('Chưa đối chiếu nối cảnh');
    if (isStale(project, scene)) reasons.push('Cảnh đã stale theo Bible hoặc nguồn: cần xác nhận lại và tạo take mới');
    Object.keys(QC_KEYS).forEach(k => { if ((scene.qc || {})[k] !== 'pass') reasons.push(`QC chưa đạt: ${QC_KEYS[k]}`); });
    const plan = planClips(scene.durationSec, routeModel(project, scene));
    plan.forEach((_, k) => {
      const take = (scene.takes || []).find(t => t.id === (scene.chosen || {})[k]);
      if (!take) reasons.push(`Clip ${k + 1}/${plan.length}: chưa chọn take`);
      else if (take.status !== 'pass') reasons.push(`Clip ${k + 1}/${plan.length}: take đã chọn chưa đạt QC`);
    });
    return { ok: reasons.length === 0, reasons };
  }

  // Ngân sách tách theo tiền tệ, không cộng chéo VND/USD. Chi phí thất bại/từ chối vẫn được tính.
  function budgetSummary(project) {
    const byCur = {};
    const approved = (project.scenes || []).filter(s => s.status === 'approved').length;
    (project.costs || []).forEach(c => {
      const cur = c.currency || 'VND';
      byCur[cur] = byCur[cur] || { estimate: 0, reserved: 0, actual: 0, unknownCount: 0, failedCount: 0, count: 0 };
      const b = byCur[cur];
      b.count += 1;
      if (c.status === 'unknown') b.unknownCount += 1;
      if (c.status === 'failed' || c.status === 'rejected') b.failedCount += 1;
      if (c.kind === 'estimate') b.estimate += Number(c.amount) || 0;
      else if (c.kind === 'reserved') b.reserved += Number(c.amount) || 0;
      else if (c.kind === 'actual') b.actual += Number(c.amount) || 0;
    });
    const costPerApproved = {};
    Object.keys(byCur).forEach(cur => { costPerApproved[cur] = approved > 0 ? byCur[cur].actual / approved : null; });
    const sceneCount = (project.scenes || []).length;
    const budget = project.budget || { amount: 0, currency: 'VND' };
    const perScene = sceneCount && budget.amount ? budget.amount / sceneCount : null;
    const overBudget = !!(byCur[budget.currency] && budget.amount && byCur[budget.currency].actual > budget.amount);
    return { byCurrency: byCur, approvedCount: approved, costPerApproved, perSceneBudget: perScene, budgetCurrency: budget.currency, overBudget };
  }

  // ---------- Production OS: cổng sản xuất ----------
  function productionStages(project) {
    const scenes = project.scenes || [];
    const cov = checkCoverage(project);
    const issues = continuityIssues(project);
    const errs = issues.filter(i => i.level === 'error');
    const chars = project.bible.characters || [];
    const locs = project.bible.locations || [];
    const allLocked = [...chars, ...locs].every(x => x.locked);
    const durOk = scenes.length > 0 && scenes.every(s => s.durationSec >= MIN_SCENE && s.durationSec <= MAX_SCENE);
    const promptsOk = scenes.length > 0 && scenes.every(s => s.action && s.opening && s.ending);
    const unchecked = scenes.slice(1).filter(s => !s.continuityChecked).length;
    const voice = project.voiceLock;
    const voiceOk = !!voice && voice.hash === fnv1a(project.script || '') && cov.ok;
    const mediaOk = scenes.length > 0 && scenes.every(s => s.status === 'approved' && canApprove(project, s).ok);
    const p = project.review || {};
    return [
      { id: 'source', name: 'Nguồn đã khóa', owner: 'Writer', pass: !!project.sourceLocked && fnv1a(project.script || '') === project.sourceHash, detail: project.sourceLocked ? 'Đã khóa, hash khớp.' : 'Chưa khóa nội dung gốc.' },
      { id: 'rights', name: 'Dữ kiện, bản quyền, bản địa đã duyệt', owner: 'Reviewer', pass: !!(p.facts && p.originality && p.localization), detail: `Dữ kiện: ${p.facts ? 'có' : 'chưa'} · Bản quyền: ${p.originality ? 'có' : 'chưa'} · Bản địa: ${p.localization ? 'có' : 'chưa'}` },
      { id: 'bible', name: 'Bible đã khóa', owner: 'Visual Editor', pass: allLocked, detail: allLocked ? `Bible v${project.bible.version}` : 'Có nhân vật hoặc bối cảnh chưa khóa.' },
      { id: 'scenes', name: 'Phân cảnh đủ 100% nguồn và 10–20s', owner: 'Producer', pass: cov.ok && durOk, detail: cov.ok ? `${scenes.length} cảnh, phủ ${cov.covered}/${cov.total} ký tự.` : (cov.issues[0] || 'Chưa phân cảnh.') },
      { id: 'prompts', name: 'Hành động và trạng thái đầu/cuối đầy đủ', owner: 'Visual Editor', pass: promptsOk, detail: promptsOk ? 'Mọi cảnh đã có đủ thông tin.' : 'Có cảnh thiếu hành động hoặc trạng thái.' },
      { id: 'continuity', name: 'Continuity không còn lỗi', owner: 'Reviewer', pass: errs.length === 0 && unchecked === 0, detail: errs.length ? `${errs.length} lỗi chặn.` : (unchecked ? `${unchecked} cảnh chưa đối chiếu nối cảnh.` : 'Không có lỗi.') },
      { id: 'voice', name: 'Voice đã khóa (đo thời lượng thật)', owner: 'Voice / Visual Editor', pass: voiceOk, detail: voice ? `Khóa lúc ${voice.at}, đo ${voice.measuredSeconds || 'chưa nhập'} giây.` : 'Chưa khóa voice.' },
      { id: 'media', name: 'Mọi cảnh đã duyệt QC và có take', owner: 'Reviewer', pass: mediaOk, detail: `${scenes.filter(s => s.status === 'approved').length}/${scenes.length} cảnh đã duyệt.` }
    ];
  }

  function productionGate(stages) {
    const ok = id => stages.find(s => s.id === id).pass;
    const core = ['source', 'rights', 'bible', 'scenes', 'prompts', 'continuity'].every(ok);
    const approvedKit = core && ok('voice');
    const finished = approvedKit && ok('media');
    if (finished) return { level: 'finished', label: 'HOÀN TẤT · Video đã duyệt từng cảnh', note: 'Đủ cổng FINISHED_VIDEO.' };
    if (approvedKit) return { level: 'approved_kit', label: 'APPROVED KIT · Gói prompt đã duyệt', note: 'Chưa có video hoàn tất. Không gọi đây là phim hoàn tất.' };
    return { level: 'draft', label: 'DRAFT KIT · Bản nháp', note: 'Chưa đủ cổng duyệt. Mọi đầu ra chỉ là bản nháp.' };
  }

  // Kiểm trùng lặp với nguồn: tỷ lệ shingle ký tự có trong nguồn. Chỉ là cảnh báo để người duyệt xem.
  function originalityOverlap(source, localized, n = 8) {
    const grams = t => {
      const s = (t || '').replace(/\s+/g, ' ').toLowerCase();
      const out = new Set();
      const arr = [...s];
      for (let i = 0; i + n <= arr.length; i++) out.add(arr.slice(i, i + n).join(''));
      return out;
    };
    const src = grams(source), loc = grams(localized);
    if (!loc.size) return { ratio: 0, shared: 0, total: 0, warn: false };
    let shared = 0;
    loc.forEach(g => { if (src.has(g)) shared++; });
    const ratio = shared / loc.size;
    return { ratio: Math.round(ratio * 1000) / 1000, shared, total: loc.size, warn: ratio > 0.2 };
  }

  // ---------- Hàng đợi (thủ công) ----------
  function jobsForProject(project) {
    const jobs = [];
    (project.scenes || []).forEach(sc => {
      if (sc.status === 'draft') return;
      const modelId = routeModel(project, sc);
      planClips(sc.durationSec, modelId).forEach((clip, k) => {
        const prompt = compileClipPrompt(project, sc, modelId, k);
        const key = `${project.id}:${sc.id}:${modelId}:C${k + 1}:${fnv1a(prompt.prompt)}`;
        const takes = (sc.takes || []).filter(t => t.jobKey === key);
        let state = 'pending';
        if (takes.some(t => t.status === 'pass')) state = 'done';
        else if (takes.some(t => t.status === 'received')) state = 'review';
        else if (takes.some(t => t.status === 'submitted')) state = 'waiting';
        else if (takes.length) state = 'retry';
        jobs.push({ key, sceneId: sc.id, modelId, clipIndex: k, clip, attempts: takes.length, state, promptHash: fnv1a(prompt.prompt), warnings: prompt.warnings });
      });
    });
    return jobs;
  }

  // ---------- Xuất file ----------
  function csvCell(v) {
    const s = v === undefined || v === null ? '' : String(v);
    return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  }
  function toCsv(rows) { return rows.map(r => r.map(csvCell).join(',')).join('\r\n') + '\r\n'; }

  function gateOf(project) { return productionGate(productionStages(project)); }

  function exportProductionJSON(project, exportedAt) {
    const stages = productionStages(project);
    const gate = productionGate(stages);
    const sceneRows = (project.scenes || []).map(sc => {
      const model = routeModel(project, sc);
      return {
        id: sc.id, n: sc.n,
        start_utf16: sc.start, end_utf16: sc.end,
        start_codepoint: cpIndex(project.script, sc.start), end_codepoint: cpIndex(project.script, sc.end),
        narration: sceneText(project, sc),
        duration_seconds: sc.durationSec,
        title: sc.title || '', action: sc.action || '', opening: sc.opening || '', ending: sc.ending || '',
        camera: sc.camera || '', lighting: sc.lighting || '', ambient: sc.ambient || '', music: sc.music || '',
        characters: sc.characterIds || [], location: sc.locationId || '',
        dialogue: (sc.dialogue || []).map(d => ({ speaker: d.speaker, line: d.line })),
        route_model: model,
        clips: planClips(sc.durationSec, model),
        status: sc.status, stale: isStale(project, sc), qc: sc.qc, chosen_takes: sc.chosen || {},
        continuity_checked: !!sc.continuityChecked, assignee: sc.assignee || '', due: sc.due || ''
      };
    });
    return {
      schema: SCHEMA,
      exported_at: exportedAt || nowIso(),
      output_label: gate.label,
      output_note: gate.note,
      project: { id: project.id, title: project.title, channel: project.channel, revision: project.revision },
      market: project.market, genre: project.genre, narrative_style: project.narrativeStyle, visual_style: project.visualStyle,
      ratio: project.ratio, audio_mode: project.audioMode, routing: project.routing, default_model: project.defaultModel,
      source: {
        type: project.sourceType, locked: !!project.sourceLocked, hash_fnv1a32: project.sourceHash || null,
        encoding: 'utf-8', offset_encoding_primary: 'utf16', offset_encoding_secondary: 'codepoint',
        length_utf16: (project.script || '').length, length_codepoint: cpLength(project.script || ''),
        text: project.script || ''
      },
      timing: {
        target_seconds: Math.round((project.minutes || 0) * 60),
        estimated_voice_seconds: Math.round(estimateVoiceSeconds(project.script || '', project.market)),
        measured_voice_seconds: project.voiceLock ? project.voiceLock.measuredSeconds : null,
        timeline_seconds: (project.scenes || []).reduce((a, s) => a + s.durationSec, 0)
      },
      bible: { version: project.bible.version, characters: project.bible.characters, locations: project.bible.locations },
      scenes: sceneRows,
      stages: stages.map(s => ({ id: s.id, name: s.name, owner: s.owner, pass: s.pass, detail: s.detail })),
      continuity_issues: continuityIssues(project),
      budget: budgetSummary(project),
      costs: project.costs || []
    };
  }

  function storyboardCSV(project) {
    const rows = [['scene_id', 'start_utf16', 'end_utf16', 'duration_s', 'title', 'action', 'opening', 'ending', 'camera', 'lighting', 'characters', 'location', 'route_model', 'status', 'assignee', 'due', 'stale']];
    (project.scenes || []).forEach(sc => {
      const names = (sc.characterIds || []).map(id => (findCharacter(project, id) || { name: id }).name);
      const loc = (project.bible.locations || []).find(l => l.id === sc.locationId);
      rows.push([sc.id, sc.start, sc.end, sc.durationSec, sc.title, sc.action, sc.opening, sc.ending, sc.camera, sc.lighting, names.join('; '), loc ? loc.name : '', routeModel(project, sc), STATUSES[sc.status] || sc.status, sc.assignee, sc.due, isStale(project, sc) ? 'yes' : 'no']);
    });
    return '﻿' + toCsv(rows);
  }

  function costCSV(project) {
    const rows = [['at', 'scene_id', 'model', 'attempt', 'kind', 'status', 'amount', 'currency', 'note']];
    (project.costs || []).forEach(c => rows.push([c.at, c.sceneId || '', c.model || '', c.attempt || '', c.kind, c.status, c.amount, c.currency, c.note || '']));
    return '﻿' + toCsv(rows);
  }

  // Lời đọc sạch: chỉ nguyên văn nguồn, không có tiêu đề, chú thích hay QA.
  function voiceCleanExport(project) { return voiceCleanText(project); }

  function promptsMarkdown(project, modelId) {
    const ids = modelId === 'all' ? MODEL_IDS : [modelId];
    const out = [`# Gói prompt — ${project.title}`, '', `Nhãn đầu ra: **${gateOf(project).label}**. Mọi prompt là BẢN NHÁP cho đến khi có cổng duyệt tương ứng. Không có lệnh gửi API.`, ''];
    ids.forEach(mid => {
      const scenes = (project.scenes || []).filter(sc => routeModel(project, sc) === mid);
      if (modelId === 'all' && !scenes.length) return;
      out.push(`## ${MODELS[mid].name} (${MODELS[mid].level === 'unverified' ? 'CHƯA XÁC MINH' : 'BẢN NHÁP'})`, '', MODELS[mid].verified, '');
      scenes.forEach(sc => {
        compileScenePrompts(project, sc, mid).forEach(c => {
          out.push(`### ${sc.id} · clip ${c.clipIndex + 1}`, '', '```json', JSON.stringify(c.settings, null, 2), '```', '', '**Prompt**', '', c.prompt, '');
          if (c.warnings.length) out.push(...c.warnings.map(w => `- ⚠ ${w}`), '');
        });
      });
    });
    return out.join('\n');
  }

  function qcMarkdown(project) {
    const stages = productionStages(project);
    const gate = productionGate(stages);
    const out = [`# Báo cáo QC — ${project.title}`, '', `Nhãn: **${gate.label}**. ${gate.note}`, '', '## Cổng sản xuất', ''];
    stages.forEach(s => out.push(`- [${s.pass ? 'x' : ' '}] ${s.name} — ${s.owner}. ${s.detail}`));
    out.push('', '## Cảnh', '', '| Cảnh | Trạng thái | Stale | Lỗi/cảnh báo | QC |', '|---|---|---|---|---|');
    (project.scenes || []).forEach(sc => {
      const qc = Object.keys(QC_KEYS).map(k => `${k}:${(sc.qc || {})[k] || 'pending'}`).join(' ');
      const iss = continuityIssues(project).filter(i => i.scene === sc.id).length;
      out.push(`| ${sc.id} | ${STATUSES[sc.status] || sc.status} | ${isStale(project, sc) ? 'có' : 'không'} | ${iss} | ${qc} |`);
    });
    const hist = (project.scenes || []).filter(s => (s.rejections || []).length);
    if (hist.length) {
      out.push('', '## Lịch sử từ chối', '');
      hist.forEach(s => s.rejections.forEach(r => out.push(`- ${s.id} · ${r.at}: ${r.reason}`)));
    }
    return out.join('\n');
  }

  function factoryProject(overrides) {
    return Object.assign({
      id: uid('prj'), revision: 0, title: 'Dự án mới', channel: 'SNAKE MEDIA', market: 'US',
      genre: GENRES[0], narrativeStyle: NARRATIVE_STYLES[0], visualStyle: VISUAL_STYLES[0],
      minutes: 30, ratio: '16:9', audioMode: 'narration_only', defaultModel: 'flow', routing: 'hybrid',
      sceneSeconds: 15, voiceRate: MARKET_BY.US.rate, sourceType: 'script',
      script: '', blueprint: '', sourceLocked: false, sourceHash: '', sourceLockedAt: '',
      localizedByMarket: {}, review: { facts: false, originality: false, localization: false, reviewer: '' },
      bible: { version: 1, characters: [], locations: [] },
      scenes: [], costs: [], budget: { amount: 0, currency: 'USD' }, team: [], voiceLock: null,
      checkpointsCount: 0, activity: [], createdAt: nowIso(), updatedAt: nowIso()
    }, overrides || {});
  }

  function projectFromTemplate(tpl, title, market) {
    const c = tpl.config;
    const m = MARKET_BY[market] || MARKET_BY.US;
    return factoryProject(Object.assign({}, c, {
      title: title || tpl.name, market: m.code, voiceRate: m.rate,
      budget: { amount: 0, currency: m.currency }
    }));
  }

  // Tạo bản sao: giữ cấu hình, nguồn, Bible; xóa tiến độ, chi phí, take và checkpoint.
  function cloneProject(p, title) {
    const copy = JSON.parse(JSON.stringify(p));
    copy.id = uid('prj');
    copy.title = title || `${p.title} (bản sao)`;
    copy.revision = 0;
    copy.costs = [];
    copy.voiceLock = null;
    copy.scenes = (copy.scenes || []).map(sc => Object.assign({}, sc, {
      status: 'draft', takes: [], chosen: {}, qc: emptyQc(), continuityChecked: false, rejections: [], chosen: {}
    }));
    copy.activity = [{ at: nowIso(), text: `Nhân bản từ "${p.title}".` }];
    copy.createdAt = nowIso();
    copy.updatedAt = nowIso();
    return copy;
  }

  function emptyQc() { return Object.fromEntries(Object.keys(QC_KEYS).map(k => [k, 'pending'])); }

  // Thống kê nhanh cho bảng điều khiển.
  function projectSummary(p) {
    const scenes = p.scenes || [];
    const issues = continuityIssues(p);
    const gate = gateOf(p);
    const actual = {};
    (p.costs || []).forEach(c => { if (c.kind === 'actual') actual[c.currency] = (actual[c.currency] || 0) + (Number(c.amount) || 0); });
    return {
      id: p.id, title: p.title, market: p.market, minutes: p.minutes,
      sceneCount: scenes.length,
      approved: scenes.filter(s => s.status === 'approved').length,
      stale: scenes.filter(s => isStale(p, s)).length,
      errors: issues.filter(i => i.level === 'error').length,
      warnings: issues.filter(i => i.level === 'warn').length,
      gate, actual, updatedAt: p.updatedAt
    };
  }

  return {
    SCHEMA, MIN_SCENE, MAX_SCENE, MAX_SCENES,
    MARKETS, MARKET_BY, CURRENCIES, GENRES, NARRATIVE_STYLES, VISUAL_STYLES, RATIOS, AUDIO_MODES,
    CAMERAS, STATUSES, QC_KEYS, QC_STATES, ASSIGN_ROLES, MODELS, MODEL_IDS, BUILTIN_TEMPLATES,
    clamp, uid, fnv1a, cpLength, cpIndex, unitCount, estimateVoiceSeconds, wordBoundaries,
    splitScenes, checkCoverage, voiceCleanText, sceneText,
    planClips, routeModel, compileClipPrompt, compileScenePrompts,
    continuityIssues, transitionPairs, isStale, canApprove, budgetSummary,
    productionStages, productionGate, originalityOverlap, jobsForProject,
    csvCell, toCsv, exportProductionJSON, storyboardCSV, costCSV, voiceCleanExport,
    promptsMarkdown, qcMarkdown, factoryProject, projectFromTemplate, cloneProject,
    emptyQc, projectSummary, gateOf, findCharacter
  };
}));
