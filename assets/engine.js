/* Engine chẩn đoán: hàm thuần, không DOM, không phụ thuộc. Trên trình duyệt là window.DiagEngine, trong Node thì require().
 *
 * Việt hoá và điều chỉnh từ lõi của dự án cn-math-taxonomy (xiaoyang111222, CC BY-NC 4.0).
 * Thuật toán giữ nguyên; phần phân tích chương/lớp và chấm đáp án được viết lại cho Việt Nam
 * (dấu phẩy thập phân, dấu chấm phân cách hàng nghìn, đơn vị đo tiếng Việt, lớp 1–12).
 *
 * Luồng dữ liệu:
 *   buildGraph(topics, deps, questions?) -> graph
 *   createSession(graph, targets, {limit, seed, avoid, mode, confirm}) -> session (dữ liệu thuần, JSON được)
 *   nextItem(graph, session) -> {topicId, question, attempt} | null
 *   applyAnswer(graph, session, id, 'correct'|'wrong'|'skip', {text, prompt, pin, qid}) -> session mới
 *   summarize(graph, session) -> kết quả (nguyên nhân gốc, lộ trình học, đã vững / chưa chắc / hổng / chưa kiểm tra)
 *   gradeTargets(graph, 'lop6' | 6 | 'tieu-hoc' | 'thcs' | 'thpt') -> {ids, label} | null
 *   chapterSummary(graph, session) -> tổng hợp theo chương (chương yếu xếp trước)
 *   layout(graph, session, summary) -> bố cục phân tầng cho sơ đồ lộ trình
 *   judgeQuestion(question, userText) -> {verdict:'correct'|'wrong'|'manual', reason}
 *
 * Mỗi kiến thức cần trả lời đúng liên tiếp `confirm` câu mới được tính là "đã vững" (mặc định 3; giao diện cho chọn 2/3/5).
 *   Đúng đủ -> đã vững (và suy ra các kiến thức tiền đề cũng vững);
 *   Sai / "chưa biết" giữa chừng -> ra thêm một câu dễ hơn để xác nhận:
 *     câu xác nhận đúng -> chưa chắc (shaky, không lần ngược);
 *     câu xác nhận cũng sai -> hổng (weak, lần ngược về tiền đề: hard trước soft).
 *   Chọn câu: câu đầu ưu tiên standard (vận dụng); đúng liên tiếp thì ra challenge (nâng cao); sai thì quay về basic (cơ bản).
 */
(function (root, factory) {
  if (typeof module !== 'undefined' && module.exports) module.exports = factory();
  else root.DiagEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  /* ------------------------------------------------------------------ Đồ thị */

  const DIFF_RANK = { basic: 0, standard: 1, challenge: 2, advanced: 2 };

  function qNum(q) { const m = /_q(\d+)$/.exec(q.id); return m ? parseInt(m[1], 10) : 0; }

  function buildGraph(topics, deps, questions) {
    const byId = Object.create(null);
    const index = Object.create(null);
    topics.forEach(function (t, i) { byId[t.id] = t; index[t.id] = i; });
    const prereqs = Object.create(null);
    const dependents = Object.create(null);
    topics.forEach(function (t) { prereqs[t.id] = []; dependents[t.id] = []; });
    const seen = Object.create(null);
    deps.forEach(function (d) {
      if (!byId[d.topicId] || !byId[d.prerequisiteId]) return;
      const k = d.topicId + '<' + d.prerequisiteId;
      if (seen[k]) return;
      seen[k] = true;
      const strength = d.strength === 'soft' ? 'soft' : 'hard';
      prereqs[d.topicId].push({ id: d.prerequisiteId, strength: strength, reason: d.reason });
      dependents[d.prerequisiteId].push({ id: d.topicId, strength: strength });
    });
    // Tiền đề: hard trước, soft sau; cùng loại thì theo thứ tự trong topics.json, để thứ tự ra câu hỏi luôn xác định.
    const rank = function (e) { return (e.strength === 'hard' ? 0 : 1) * 1e6 + index[e.id]; };
    Object.keys(prereqs).forEach(function (id) {
      prereqs[id].sort(function (a, b) { return rank(a) - rank(b); });
      dependents[id].sort(function (a, b) { return index[a.id] - index[b.id]; });
    });
    // Ngân hàng câu hỏi theo từng kiến thức, sắp theo số thứ tự câu. Thiếu thì dùng diagnostic_question.
    const bank = Object.create(null);
    topics.forEach(function (t) { bank[t.id] = []; });
    let fromFile = 0;
    (Array.isArray(questions) ? questions : []).forEach(function (q) {
      if (q && bank[q.topicId] && !byId[q.topicId].external) { bank[q.topicId].push(q); fromFile++; }
    });
    topics.forEach(function (t) {
      const dq = t.diagnostic_question;
      if (!t.external && !bank[t.id].length && dq && dq.question) {
        bank[t.id].push({ id: t.id + '_q1', topicId: t.id, difficulty: 'standard', type: 'legacy', prompt: dq.question, answer: dq.answer, explanation: '' });
      }
    });
    Object.keys(bank).forEach(function (id) { bank[id].sort(function (a, b) { return qNum(a) - qNum(b); }); });
    return {
      topics: topics, byId: byId, index: index, prereqs: prereqs, dependents: dependents, bank: bank,
      hasBank: fromFile > 0, _anc: Object.create(null)
    };
  }

  /** Tập tổ tiên thực sự (không gồm chính nó), có bộ nhớ đệm. */
  function ancestorSet(graph, id) {
    const memo = graph._anc;
    if (memo[id]) return memo[id];
    const visiting = graph._visiting || (graph._visiting = Object.create(null));
    if (visiting[id]) throw new Error('Đồ thị tiền đề có chu trình: ' + id);
    visiting[id] = true;
    const out = new Set();
    graph.prereqs[id].forEach(function (p) {
      out.add(p.id);
      ancestorSet(graph, p.id).forEach(function (a) { out.add(a); });
    });
    visiting[id] = false;
    memo[id] = out;
    return out;
  }

  /** Tổ tiên chỉ đi theo cạnh hard. Chế độ sàng lọc dùng để suy ra "đã vững". */
  function hardAncestorSet(graph, id) {
    const memo = graph._hardAnc || (graph._hardAnc = Object.create(null));
    if (memo[id]) return memo[id];
    const visiting = graph._hardVisiting || (graph._hardVisiting = Object.create(null));
    if (visiting[id]) throw new Error('Đồ thị tiền đề có chu trình: ' + id);
    visiting[id] = true;
    const out = new Set();
    graph.prereqs[id].forEach(function (p) {
      if (p.strength !== 'hard') return;
      out.add(p.id);
      hardAncestorSet(graph, p.id).forEach(function (a) { out.add(a); });
    });
    visiting[id] = false;
    memo[id] = out;
    return out;
  }

  function ancestors(graph, ids) {
    const list = Array.isArray(ids) ? ids : [ids];
    const out = new Set();
    list.forEach(function (id) { ancestorSet(graph, id).forEach(function (a) { out.add(a); }); });
    return out;
  }

  /** Sắp xếp tô-pô một tập con (tiền đề đứng trước); cùng tầng thì theo thứ tự file. */
  function topoSort(graph, ids) {
    const set = new Set(ids);
    const indeg = Object.create(null);
    set.forEach(function (id) {
      indeg[id] = graph.prereqs[id].filter(function (p) { return set.has(p.id); }).length;
    });
    const ready = [];
    set.forEach(function (id) { if (indeg[id] === 0) ready.push(id); });
    const byIndex = function (a, b) { return graph.index[a] - graph.index[b]; };
    const order = [];
    while (ready.length) {
      ready.sort(byIndex);
      const id = ready.shift();
      order.push(id);
      graph.dependents[id].forEach(function (d) {
        if (!set.has(d.id)) return;
        indeg[d.id] -= 1;
        if (indeg[d.id] === 0) ready.push(d.id);
      });
    }
    if (order.length !== set.size) throw new Error('Sắp xếp tô-pô thất bại: đồ thị con có chu trình');
    return order;
  }

  /** Đồ thị con tiền đề của các mục tiêu: mục tiêu + mọi tổ tiên, theo thứ tự tô-pô. */
  function subgraph(graph, targets) {
    const set = new Set(targets);
    ancestors(graph, targets).forEach(function (a) { set.add(a); });
    return { nodes: topoSort(graph, set), set: set };
  }

  function isTestable(graph, id) {
    const t = graph.byId[id];
    return !!(t && !t.external && graph.bank[id] && graph.bank[id].length);
  }

  function questionById(graph, qid) {
    const m = /^(.*)_q\d+$/.exec(qid || '');
    const list = m ? graph.bank[m[1]] : null;
    return (list || []).find(function (q) { return q.id === qid; }) || null;
  }

  /* ------------------------------------------------------------------ Phiên làm bài */

  const RESULTS = { correct: 1, wrong: 1, skip: 1 };
  const DEFAULT_LIMIT = 16;
  const SCREEN_LIMIT = 40;
  const DEFAULT_CONFIRM = 3;
  const CONFIRM_CHOICES = [2, 3, 5];

  function clampConfirm(n) {
    const v = Math.floor(Number(n));
    return CONFIRM_CHOICES.indexOf(v) >= 0 ? v : DEFAULT_CONFIRM;
  }

  function normalizeConfirm(n) {
    const v = Math.floor(Number(n));
    return v >= 1 && v <= 10 ? v : DEFAULT_CONFIRM;
  }

  /** Số câu đúng liên tiếp cần để "đã vững": min(confirm, số câu trong ngân hàng), tối thiểu 1. */
  function needConfirm(graph, session, id) {
    const bankLen = (graph.bank[id] || []).length;
    const conf = session && session.confirm != null ? session.confirm : DEFAULT_CONFIRM;
    return Math.max(1, Math.min(conf, bankLen || 1));
  }

  function createSession(graph, targets, opts) {
    opts = opts || {};
    const ts = Array.from(new Set(targets));
    if (!ts.length) throw new Error('Cần ít nhất một kiến thức mục tiêu');
    ts.forEach(function (id) { if (!graph.byId[id]) throw new Error('Không có kiến thức: ' + id); });
    const screen = opts.mode === 'screen';
    const limit = Math.max(1, Math.floor(opts.limit == null ? (screen ? SCREEN_LIMIT : DEFAULT_LIMIT) : opts.limit));
    const confirm = normalizeConfirm(opts.confirm == null ? DEFAULT_CONFIRM : opts.confirm);
    // Chế độ sàng lọc: phạm vi chính là tập mục tiêu (không gộp tiền đề), lần ngược chỉ trong phạm vi.
    const sub = screen ? { nodes: topoSort(graph, ts) } : subgraph(graph, ts);
    const pos = Object.create(null);
    sub.nodes.forEach(function (id, i) { pos[id] = i; });
    // Mục tiêu "cao" nhất (cuối thứ tự tô-pô) hỏi trước; các mục tiêu khác chờ trong ngăn xếp.
    const stack = ts.filter(function (id) { return isTestable(graph, id); })
      .sort(function (a, b) { return pos[b] - pos[a]; });
    return {
      targets: ts, limit: limit, confirm: confirm, order: sub.nodes, status: {}, stack: stack, answers: [], attempts: {},
      mode: screen ? 'screen' : 'target', scope: screen ? ts.slice() : null,
      seed: opts.seed == null ? 'default' : String(opts.seed),
      avoid: Array.from(new Set(opts.avoid || []))
    };
  }

  function cloneSession(s) {
    const attempts = {};
    Object.keys(s.attempts).forEach(function (k) { attempts[k] = s.attempts[k].slice(); });
    return {
      targets: s.targets.slice(), limit: s.limit, confirm: s.confirm, order: s.order, stack: s.stack.slice(),
      status: Object.assign({}, s.status), answers: s.answers.slice(), attempts: attempts,
      seed: s.seed, avoid: s.avoid, mode: s.mode, scope: s.scope ? s.scope.slice() : null
    };
  }

  /* ---- Ngẫu nhiên có hạt giống: cùng (seed, kiến thức, lượt) luôn ra cùng số, nên phiên phát lại được ---- */
  function hashStr(str) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < str.length; i++) { h ^= str.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return h >>> 0;
  }

  function mulberry32(a) {
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function rand01(seed, key) {
    const f = mulberry32(hashStr(String(seed) + '|' + key));
    f();
    return f();
  }

  const rankOf = function (q) { return DIFF_RANK[q.difficulty] == null ? 1 : DIFF_RANK[q.difficulty]; };

  /**
   * Chọn câu thứ `attempt` cho kiến thức `id`:
   *  - câu đã ra trong phiên thì không ra lại;
   *  - câu đầu: ưu tiên standard, rồi basic;
   *  - đúng liên tiếp, chưa sai: ưu tiên challenge, rồi standard, rồi basic;
   *  - sau khi sai: câu xác nhận dễ bằng hoặc dễ hơn (ưu tiên basic);
   *  - trong cùng mức, chọn giả ngẫu nhiên theo seed, ưu tiên câu chưa gặp (ngoài session.avoid).
   */
  function pickQuestion(graph, session, id, attempt) {
    const all = graph.bank[id] || [];
    const tried = (session.attempts[id] || []).map(function (a) { return a.qid; });
    const pool = all.filter(function (q) { return tried.indexOf(q.id) < 0; });
    if (!pool.length) return null;
    const avoid = new Set(session.avoid || []);
    const freshFirst = function (list) {
      const f = list.filter(function (q) { return !avoid.has(q.id); });
      return f.length ? f : list;
    };
    const pickRank = function (list, ranks) {
      for (let i = 0; i < ranks.length; i++) {
        const hit = list.filter(function (q) { return rankOf(q) === ranks[i]; });
        if (hit.length) return freshFirst(hit);
      }
      return freshFirst(list);
    };
    const prev = session.attempts[id] || [];
    const hadFail = prev.some(function (a) { return a.result !== 'correct'; });
    let cand;
    if (attempt <= 1 || !hadFail) {
      const base = freshFirst(pool);
      if (attempt <= 1) cand = pickRank(base, [1, 0]);
      else cand = pickRank(base, [2, 1, 0]);
    } else {
      const first = all.find(function (q) { return q.id === tried[0]; });
      const r0 = first ? rankOf(first) : 1;
      const tiers = [
        pool.filter(function (q) { return rankOf(q) === 0; }),
        pool.filter(function (q) { return rankOf(q) === r0; }),
        pool.filter(function (q) { return rankOf(q) < r0; })
      ];
      const hit = tiers.find(function (t) { return t.length; });
      if (hit) cand = freshFirst(hit);
      else {
        const lo = Math.min.apply(null, pool.map(rankOf));
        cand = freshFirst(pool.filter(function (q) { return rankOf(q) === lo; }));
      }
    }
    const idx = Math.min(cand.length - 1, Math.floor(rand01(session.seed, id + '|' + attempt) * cand.length));
    return cand[idx];
  }

  /**
   * Ghi nhận một lần trả lời (cho câu mà nextItem vừa đưa ra).
   *  - đúng liên tiếp đủ needConfirm câu: kiến thức này và các tổ tiên chưa kết luận -> đã vững
   *    (tổ tiên ghi src 'inferred'; chế độ sàng lọc chỉ suy theo cạnh hard);
   *  - đúng nhưng chưa đủ: ra tiếp câu khác của cùng kiến thức;
   *  - sai/chưa biết lần đầu: ra một câu xác nhận (không còn câu thì kết luận hổng ngay);
   *  - câu xác nhận đúng: chưa chắc (shaky);
   *  - câu xác nhận sai: hổng, đẩy các tiền đề (hard trước) lên đầu ngăn xếp.
   */
  function applyAnswer(graph, session, id, result, extra) {
    if (!RESULTS[result]) throw new Error('Kết quả phải là correct / wrong / skip');
    if (!graph.byId[id]) throw new Error('Không có kiến thức: ' + id);
    const s = cloneSession(session);
    if (s.status[id]) { delete s.status[id]; s.attempts[id] = []; }
    const prev = s.attempts[id] || [];
    let q;
    if (extra && extra.pin) {
      q = extra.qid ? questionById(graph, extra.qid) : null;
      if (!q || q.topicId !== id) return session;
    } else {
      q = pickQuestion(graph, s, id, prev.length + 1);
    }
    const rec = { id: id, qid: q ? q.id : null, result: result };
    if (extra && extra.text != null && extra.text !== '') rec.text = String(extra.text);
    if (extra && extra.prompt) rec.prompt = String(extra.prompt);
    s.answers.push(rec);
    s.attempts[id] = prev.concat([{ qid: rec.qid, result: result }]);
    const attempts = s.attempts[id];
    const fails = attempts.filter(function (a) { return a.result !== 'correct'; }).length;
    const corrects = attempts.filter(function (a) { return a.result === 'correct'; }).length;
    const need = needConfirm(graph, s, id);
    if (result === 'correct') {
      if (fails === 0 && corrects >= need) {
        s.status[id] = { s: 'mastered', src: 'direct' };
        (s.mode === 'screen' ? hardAncestorSet(graph, id) : ancestorSet(graph, id)).forEach(function (a) {
          if (!s.status[a]) s.status[a] = { s: 'mastered', src: 'inferred' };
        });
      } else if (fails > 0) {
        s.status[id] = { s: 'shaky', src: 'direct' };
      }
    } else if (fails === 1 && pickQuestion(graph, s, id, attempts.length + 1)) {
      // Sai lần đầu: chờ câu xác nhận.
    } else {
      s.status[id] = { s: 'weak', src: 'direct' };
      const scope = s.scope ? new Set(s.scope) : null;
      const push = graph.prereqs[id]
        .map(function (p) { return p.id; })
        .filter(function (p) { return isTestable(graph, p) && !s.status[p] && (!scope || scope.has(p)); });
      const pushed = new Set(push);
      s.stack = push.concat(s.stack.filter(function (x) { return !pushed.has(x); }));
    }
    return s;
  }

  function nextQuestion(graph, session) {
    if (session.answers.length >= session.limit) return null;
    for (let i = 0; i < session.stack.length; i++) {
      const id = session.stack[i];
      if (!session.status[id] && isTestable(graph, id)) return id;
    }
    return null;
  }

  function nextItem(graph, session) {
    const id = nextQuestion(graph, session);
    if (!id) return null;
    const attempt = (session.attempts[id] || []).length + 1;
    const q = pickQuestion(graph, session, id, attempt);
    return q ? { topicId: id, question: q, attempt: attempt } : null;
  }

  /** Dựng lại phiên từ lịch sử trả lời (khôi phục khi tải lại trang, hoàn tác). Bản ghi có qid thì ghim đúng câu đó. */
  function replay(graph, targets, answers, opts) {
    let s = createSession(graph, targets, opts);
    answers.forEach(function (a) {
      if (!a || a.exclude) return;
      const extra = {};
      if (a.text != null && a.text !== '') extra.text = a.text;
      if (a.prompt) extra.prompt = a.prompt;
      if (a.qid) { extra.pin = true; extra.qid = a.qid; }
      s = applyAnswer(graph, s, a.id, a.result, extra);
    });
    return s;
  }

  /** Trạng thái: mastered / shaky / weak / unknown. Sai một câu rồi hết lượt -> tính là weak. */
  function statusOf(session, id) {
    const st = session.status[id];
    if (st) return st.s;
    return isUnconfirmed(session, id) ? 'weak' : 'unknown';
  }

  function isUnconfirmed(session, id) {
    const a = session.attempts[id];
    if (session.status[id] || !a || !a.length) return false;
    return a.some(function (x) { return x.result !== 'correct'; });
  }

  /* ------------------------------------------------------------------ Kết quả */

  function summarize(graph, session) {
    const nodes = session.order;
    const st = function (id) { return statusOf(session, id); };
    const mastered = nodes.filter(function (id) { return st(id) === 'mastered'; });
    const shaky = nodes.filter(function (id) { return st(id) === 'shaky'; });
    const weak = nodes.filter(function (id) { return st(id) === 'weak'; });
    const unconfirmed = weak.filter(function (id) { return isUnconfirmed(session, id); });
    const untested = nodes.filter(function (id) { return st(id) === 'unknown'; });
    const scope = session.scope ? new Set(session.scope) : null;
    const inScope = function (id) { return !scope || scope.has(id); };

    const roots = weak.filter(function (id) {
      return !graph.prereqs[id].some(function (p) { return st(p.id) === 'weak'; });
    }).map(function (id) {
      const unk = graph.prereqs[id].filter(function (p) { return st(p.id) === 'unknown'; });
      const testableUnk = unk.filter(function (p) { return isTestable(graph, p.id); });
      return {
        id: id,
        pendingPrereqs: testableUnk.filter(function (p) { return inScope(p.id); }).map(function (p) { return p.id; }),
        outOfScopePrereqs: testableUnk.filter(function (p) { return !inScope(p.id); }).map(function (p) { return p.id; }),
        externalPrereqs: unk.filter(function (p) { return !isTestable(graph, p.id); }).map(function (p) { return p.id; })
      };
    });

    // Lộ trình học: (nguyên nhân gốc ∪ chưa chắc) và mọi hậu duệ trong đồ thị con, bỏ phần đã vững.
    const inSub = new Set(nodes);
    const reach = new Set();
    const queue = roots.map(function (r) { return r.id; }).concat(shaky);
    queue.forEach(function (id) { reach.add(id); });
    while (queue.length) {
      const id = queue.shift();
      graph.dependents[id].forEach(function (d) {
        if (inSub.has(d.id) && !reach.has(d.id)) { reach.add(d.id); queue.push(d.id); }
      });
    }
    const rootSet = new Set(roots.map(function (r) { return r.id; }));
    const targetSet = new Set(scope ? [] : session.targets);
    const topoPos = Object.create(null);
    nodes.forEach(function (id, i) { topoPos[id] = i; });
    const path = nodes.filter(function (id) { return reach.has(id) && st(id) !== 'mastered'; })
      .map(function (id) {
        return { id: id, status: st(id), isRoot: rootSet.has(id), isTarget: targetSet.has(id) };
      });
    // Lộ trình xếp theo lớp từ thấp đến cao; cùng lớp giữ thứ tự tô-pô.
    path.sort(function (a, b) {
      return gradeRank(graph, a.id) - gradeRank(graph, b.id) || topoPos[a.id] - topoPos[b.id];
    });

    const pending = session.stack.filter(function (id) { return !session.status[id] && isTestable(graph, id); });
    const next = nextQuestion(graph, session);
    return {
      mode: session.mode || 'target',
      targets: session.targets.slice(),
      asked: session.answers.length,
      limit: session.limit,
      finished: next === null,
      limitReached: session.answers.length >= session.limit && pending.length > 0,
      mastered: mastered, shaky: shaky, weak: weak, unconfirmed: unconfirmed, untested: untested,
      roots: roots, path: path
    };
  }

  /* ------------------------------------------------------------------ Bố cục sơ đồ lộ trình */

  function layout(graph, session, summary) {
    const S = new Set();
    const screen = !!session.scope;
    summary.path.forEach(function (p) { S.add(p.id); });
    if (!screen) session.targets.forEach(function (id) { S.add(id); });
    summary.roots.forEach(function (r) { S.add(r.id); });
    session.answers.forEach(function (a) { S.add(a.id); });
    if (S.size < 3 && !screen) {
      session.targets.forEach(function (id) {
        graph.prereqs[id].slice(0, 6).forEach(function (p) { S.add(p.id); });
      });
    }
    const ids = topoSort(graph, S);
    const edges = [];
    ids.forEach(function (b) {
      const anc = ancestorSet(graph, b);
      ids.forEach(function (a) {
        if (a === b || !anc.has(a)) return;
        const between = ids.some(function (c) {
          return c !== a && c !== b && anc.has(c) && ancestorSet(graph, c).has(a);
        });
        if (between) return;
        const direct = graph.prereqs[b].find(function (p) { return p.id === a; });
        edges.push({ from: a, to: b, direct: !!direct, strength: direct ? direct.strength : 'hard' });
      });
    });
    const layer = Object.create(null);
    ids.forEach(function (id) {
      let l = 0;
      edges.forEach(function (e) { if (e.to === id) l = Math.max(l, layer[e.from] + 1); });
      layer[id] = l;
    });
    const nLayers = ids.reduce(function (m, id) { return Math.max(m, layer[id] + 1); }, 1);
    const rows = [];
    for (let i = 0; i < nLayers; i++) rows.push([]);
    ids.forEach(function (id) { rows[layer[id]].push(id); });
    const slot = Object.create(null);
    rows.forEach(function (r) { r.forEach(function (id, i) { slot[id] = i; }); });
    const bary = function (id, nbrs) {
      if (!nbrs.length) return slot[id];
      return nbrs.reduce(function (s, n) { return s + slot[n]; }, 0) / nbrs.length;
    };
    for (let it = 0; it < 4; it++) {
      for (let l = 1; l < nLayers; l++) {
        rows[l].sort(function (a, b) {
          return bary(a, edges.filter(function (e) { return e.to === a; }).map(function (e) { return e.from; })) -
                 bary(b, edges.filter(function (e) { return e.to === b; }).map(function (e) { return e.from; }));
        });
        rows[l].forEach(function (id, i) { slot[id] = i; });
      }
      for (let l = nLayers - 2; l >= 0; l--) {
        rows[l].sort(function (a, b) {
          return bary(a, edges.filter(function (e) { return e.from === a; }).map(function (e) { return e.to; })) -
                 bary(b, edges.filter(function (e) { return e.from === b; }).map(function (e) { return e.to; }));
        });
        rows[l].forEach(function (id, i) { slot[id] = i; });
      }
    }
    const rootSet = new Set(summary.roots.map(function (r) { return r.id; }));
    const targetSet = new Set(screen ? [] : session.targets);
    const nodes = [];
    rows.forEach(function (r, l) {
      r.forEach(function (id, i) {
        nodes.push({
          id: id, layer: l, col: i, cols: r.length,
          status: statusOf(session, id), isTarget: targetSet.has(id), isRoot: rootSet.has(id)
        });
      });
    });
    return { nodes: nodes, edges: edges, layers: nLayers, maxCols: rows.reduce(function (m, r) { return Math.max(m, r.length); }, 1) };
  }

  /* ------------------------------------------------------------------ Lớp, cấp học, chương */

  const STAGES = {
    'tieu-hoc': { label: 'Tiểu học (lớp 1–5)', from: 1, to: 5 },
    'thcs': { label: 'THCS (lớp 6–9)', from: 6, to: 9 },
    'thpt': { label: 'THPT (lớp 10–12)', from: 10, to: 12 }
  };

  function stageOf(grade) {
    if (grade <= 5) return 'tieu-hoc';
    if (grade <= 9) return 'thcs';
    return 'thpt';
  }

  /** Lớp × 2 + tập (Tập 1 = 0, Tập 2 = 1), dùng để sắp lộ trình học. */
  function gradeRank(graph, id) {
    const t = graph.byId[id];
    if (!t || typeof t.grade !== 'number') return 0;
    return t.grade * 2 + (t.volume === 2 ? 1 : 0);
  }

  /**
   * Thông tin chương của một kiến thức. Dữ liệu Việt Nam lưu sẵn trường có cấu trúc:
   *   grade (1–12), chapter ("Chương I. Tập hợp các số tự nhiên"), lesson ("Bài 1. Tập hợp") tuỳ chọn.
   * Trả về {volume:'Lớp 6', chapterNo:'Chương I', chapterName:'Tập hợp các số tự nhiên', section:'Bài 1. Tập hợp'}.
   * Nhận cả chuỗi (kiểu cũ) hoặc đối tượng topic.
   */
  function parseChapter(input) {
    const t = input && typeof input === 'object' ? input : { chapter: input };
    const s = String(t.chapter || '').trim();
    const volume = typeof t.grade === 'number' ? 'Lớp ' + t.grade : '';
    const m = /^((?:Chương|Chủ đề|Phần)\s+[^.:]+)[.:]\s*(.+)$/.exec(s);
    if (m) return { volume: volume, chapterNo: m[1], chapterName: m[2], section: t.lesson || '' };
    return { volume: volume, chapterNo: '', chapterName: s, section: t.lesson || '' };
  }

  /** Môn học: dữ liệu hiện chỉ có Toán, giữ hàm để mở rộng sau. */
  function subjectOf(topic) {
    return (topic && topic.subject) || 'math';
  }

  /**
   * Toàn bộ kiến thức của một lớp hoặc một cấp học.
   *   6 | '6' | 'lop6' | 'lop-6' | 'Lớp 6' -> lớp 6
   *   'tieu-hoc' | 'thcs' | 'thpt' -> cả cấp học
   * Trả về {ids, grades, label}; không nhận ra thì null.
   */
  function gradeTargets(graph, scope, subject) {
    const subj = subject == null || subject === '' ? 'math' : subject;
    const key = String(scope == null ? '' : scope).trim().toLowerCase();
    let grades = null;
    let label = '';
    if (STAGES[key]) {
      grades = [];
      for (let g = STAGES[key].from; g <= STAGES[key].to; g++) grades.push(g);
      label = STAGES[key].label;
    } else {
      const m = /^(?:l(?:ớ|o)p\s*-?\s*)?(\d{1,2})$/.exec(key);
      if (m) {
        const g = parseInt(m[1], 10);
        if (g >= 1 && g <= 12) { grades = [g]; label = 'Lớp ' + g; }
      }
    }
    if (!grades) return null;
    const ids = graph.topics.filter(function (t) {
      if (t.external) return false;
      if (subj !== 'all' && subjectOf(t) !== subj) return false;
      return grades.indexOf(t.grade) >= 0;
    }).map(function (t) { return t.id; });
    return ids.length ? { ids: ids, grades: grades, label: label } : null;
  }

  /** Tổng hợp theo chương: số đã vững / chưa chắc / hổng / chưa kiểm tra. Chương hổng nhiều xếp trước. */
  function chapterSummary(graph, session) {
    const inOrder = new Set(session.order);
    const byKey = Object.create(null);
    const list = [];
    graph.topics.forEach(function (t) {
      if (t.external || !inOrder.has(t.id)) return;
      const c = parseChapter(t);
      const parts = [c.volume, c.chapterNo, c.chapterName].filter(Boolean);
      const key = parts.join(' · ');
      let ch = byKey[key];
      if (!ch) {
        ch = byKey[key] = {
          key: key, volume: c.volume, chapterNo: c.chapterNo, chapterName: c.chapterName,
          label: parts.join(' · '),
          total: 0, mastered: 0, shaky: 0, weak: 0, untested: 0, weakIds: [], shakyIds: [], untestedIds: [], _i: list.length
        };
        list.push(ch);
      }
      const st = statusOf(session, t.id);
      ch.total++;
      if (st === 'mastered') ch.mastered++;
      else if (st === 'shaky') { ch.shaky++; ch.shakyIds.push(t.id); }
      else if (st === 'weak') { ch.weak++; ch.weakIds.push(t.id); }
      else { ch.untested++; ch.untestedIds.push(t.id); }
    });
    list.sort(function (a, b) { return b.weak - a.weak || b.shaky - a.shaky || a._i - b._i; });
    list.forEach(function (ch) { delete ch._i; });
    return list;
  }

  function resolveTargets(rawIds, aliases) {
    const map = aliases || {};
    const out = [];
    const seen = Object.create(null);
    (Array.isArray(rawIds) ? rawIds : [rawIds]).forEach(function (id) {
      if (!id) return;
      let targets = null;
      const spec = map[id];
      if (spec && Array.isArray(spec.targets)) targets = spec.targets;
      else if (Array.isArray(spec)) targets = spec;
      const list = targets && targets.length ? targets : [id];
      list.forEach(function (tid) {
        if (!seen[tid]) { seen[tid] = true; out.push(tid); }
      });
    });
    return out;
  }

  /* ------------------------------------------------------------------ Chấm đáp án */

  /**
   * Chuẩn hoá câu trả lời theo cách viết ở Việt Nam:
   *  - dấu phẩy thập phân: 3,5 -> 3.5;
   *  - dấu chấm phân cách hàng nghìn: 1.000.000 -> 1000000 (chỉ khi phần nguyên không bắt đầu bằng 0);
   *  - nhiều đáp án ngăn bằng dấu chấm phẩy ";" hoặc chữ "và" / "hoặc";
   *  - hỗn số "1 1/2", phần trăm, độ, đơn vị đo tiếng Việt.
   */
  function normalizeText(input) {
    let s = String(input == null ? '' : input);
    s = s.replace(/²/g, '^2').replace(/³/g, '^3').replace(/[º˚∘゜]/g, '°');
    s = s.normalize('NFKC');
    s = s.replace(/[−‐-―﹣]/g, '-')
      .replace(/[“”‘’]/g, '"')
      .replace(/[×·⋅∙]/g, '*')
      .replace(/÷/g, '/')
      .replace(/[≦⩽]/g, '≤').replace(/[≧⩾]/g, '≥')
      .replace(/<=/g, '≤').replace(/>=/g, '≥')
      .replace(/[\[\]{}]/g, function (c) { return c === '[' || c === '{' ? '(' : ')'; });
    s = s.toLowerCase().normalize('NFC');
    s = s.replace(/(\d)\s*độ(?![a-zà-ỹđ])/g, '$1°');
    // Dấu chấm hàng nghìn (kiểu Việt Nam) trước, rồi mới đổi dấu phẩy thập phân.
    s = s.replace(/(^|[^\d.,])([1-9]\d{0,2}(?:\.\d{3})+)(?![\d.,]*\d)/g, function (_, pre, num) { return pre + num.replace(/\./g, ''); });
    s = s.replace(/(\d),(\d)/g, '$1.$2');
    s = s.replace(/(^|\s)(và|hoặc)(?=\s|$)/g, '$1;');
    s = s.replace(/(\d)\s+(\d+\s*\/\s*\d+)/g, '$1~$2'); // hỗn số "1 1/2"
    s = s.replace(/\s+/g, '');
    s = s.replace(/^(đápán|đáp số|đs|kq|kếtquả)[:=]/, '');
    s = s.replace(/[.!]+$/, '');
    return s;
  }

  function splitTop(s, seps) {
    const parts = [];
    let depth = 0;
    let cur = '';
    for (let i = 0; i < s.length; i++) {
      const c = s[i];
      if (c === '(') depth++;
      else if (c === ')') depth = Math.max(0, depth - 1);
      if (depth === 0 && seps.indexOf(c) >= 0) { parts.push(cur); cur = ''; } else cur += c;
    }
    parts.push(cur);
    return parts.filter(function (p) { return p !== ''; });
  }

  function gcd(a, b) { a = a < 0n ? -a : a; b = b < 0n ? -b : b; while (b) { const t = a % b; a = b; b = t; } return a; }

  function ratio(n, d) {
    if (d === 0n) return null;
    if (d < 0n) { n = -n; d = -d; }
    const g = gcd(n, d) || 1n;
    return [n / g, d / g];
  }

  function decToRatio(str) {
    const i = str.indexOf('.');
    if (i < 0) return ratio(BigInt(str), 1n);
    const frac = str.slice(i + 1);
    const whole = str.slice(0, i) || '0';
    return ratio(BigInt(whole + frac), 10n ** BigInt(frac.length));
  }

  function isWrapped(t) {
    if (t[0] !== '(' || t[t.length - 1] !== ')') return false;
    let depth = 0;
    for (let i = 0; i < t.length; i++) {
      if (t[i] === '(') depth++;
      else if (t[i] === ')') { depth--; if (depth === 0 && i < t.length - 1) return false; }
    }
    return depth === 0;
  }

  // Khoá đã bỏ khoảng trắng và viết thường.
  const UNIT_ALIASES = {
    'm': 'm', 'mét': 'm', 'cm': 'cm', 'xăng-ti-mét': 'cm', 'xentimét': 'cm', 'mm': 'mm', 'mi-li-mét': 'mm', 'milimét': 'mm',
    'dm': 'dm', 'đề-xi-mét': 'dm', 'km': 'km', 'ki-lô-mét': 'km', 'kilômét': 'km',
    'kg': 'kg', 'ki-lô-gam': 'kg', 'kilôgam': 'kg', 'g': 'g', 'gam': 'g', 'yến': 'yến', 'tạ': 'tạ', 'tấn': 'tấn',
    'l': 'l', 'lít': 'l', 'ml': 'ml', 'mi-li-lít': 'ml', 'mililít': 'ml',
    's': 's', 'giây': 's', 'phút': 'phút', 'min': 'phút', 'giờ': 'giờ', 'h': 'giờ', 'ngày': 'ngày', 'tuần': 'tuần', 'tháng': 'tháng', 'năm': 'năm',
    'm^2': 'm^2', 'cm^2': 'cm^2', 'dm^2': 'dm^2', 'mm^2': 'mm^2', 'km^2': 'km^2', 'ha': 'ha', 'héc-ta': 'ha',
    'm^3': 'm^3', 'cm^3': 'cm^3', 'dm^3': 'dm^3',
    'đồng': 'đồng', 'đ': 'đồng', 'vnd': 'đồng', 'nghìnđồng': 'nghìn đồng', '°': '°',
    'km/h': 'km/h', 'km/giờ': 'km/h', 'm/s': 'm/s', 'm/giây': 'm/s', 'm/phút': 'm/phút'
  };

  function canonUnit(u) {
    if (!u) return { name: '', known: true };
    if (UNIT_ALIASES[u]) return { name: UNIT_ALIASES[u], known: true };
    if (/^[a-zà-ỹđ-]{2,14}$/.test(u)) return { name: u, known: false };
    return null;
  }

  /** Phân tích số: nguyên, thập phân, phân số a/b, hỗn số, phần trăm, có dấu/ngoặc; cuối có thể có đơn vị. */
  function parseNumeric(str) {
    let t = str;
    let neg = false;
    for (let guard = 0; guard < 4; guard++) {
      if (isWrapped(t)) { t = t.slice(1, -1); continue; }
      if ((t[0] === '-' || t[0] === '+') && isWrapped(t.slice(1))) { if (t[0] === '-') neg = !neg; t = t.slice(2, -1); continue; }
      break;
    }
    const m = /^([+-]?)(?:(\d+)~)?(\d+(?:\.\d+)?|\.\d+)(?:\/(\d+(?:\.\d+)?|\.\d+))?(%|°)?(.*)$/.exec(t);
    if (!m) return null;
    const whole = m[2], numS = m[3], denS = m[4], mark = m[5];
    const rest = m[6];
    if (whole && !denS) return null;
    let val;
    if (whole) {
      const n = decToRatio(numS), d = decToRatio(denS);
      if (!n || !d || d[0] === 0n) return null;
      const f = ratio(n[0] * d[1], n[1] * d[0]);
      const w = ratio(BigInt(whole), 1n);
      val = ratio(w[0] * f[1] + f[0], f[1]);
    } else if (denS) {
      const n = decToRatio(numS), d = decToRatio(denS);
      if (!n || !d || d[0] === 0n) return null;
      val = ratio(n[0] * d[1], n[1] * d[0]);
    } else {
      val = decToRatio(numS);
    }
    if (!val) return null;
    if (m[1] === '-') neg = !neg;
    let n = neg ? -val[0] : val[0];
    let d = val[1];
    let unit = { name: '', known: true };
    if (mark === '%') {
      const r = ratio(n, d * 100n);
      n = r[0]; d = r[1];
      if (rest) return null;
    } else if (mark === '°') {
      unit = { name: '°', known: true };
      if (rest) return null;
    } else if (rest) {
      unit = canonUnit(rest);
      if (!unit) return null;
    }
    return { key: n + '/' + d, unit: unit };
  }

  function analyzePart(p) {
    let variable = '';
    let body = p;
    const m = /^([a-z](?:_?\d)?(?:\([a-z]\))?)=(.+)$/.exec(p);
    if (m) { variable = m[1]; body = m[2]; }
    const num = parseNumeric(body);
    if (num) return { raw: p, variable: variable, kind: 'num', key: num.key, unit: num.unit };
    const tm = /^\((.+)\)$/.exec(body);
    if (tm) {
      const items = splitTop(tm[1], ',;');
      const nums = items.map(parseNumeric);
      if (items.length > 1 && nums.every(Boolean)) {
        return { raw: p, variable: variable, kind: 'tuple', key: 't:' + nums.map(function (x) { return x.key; }).join(','), unit: { name: '', known: true } };
      }
    }
    return { raw: p, variable: variable, kind: 'text', key: body, unit: { name: '', known: true } };
  }

  function parseAnswer(input) {
    const norm = normalizeText(input);
    const parts = splitTop(norm, ';').map(analyzePart);
    return { norm: norm, parts: parts };
  }

  function partCompare(a, b) {
    if (a.kind !== b.kind || a.key !== b.key) return 'ne';
    const ua = a.unit, ub = b.unit;
    if (!ua.name || !ub.name || ua.name === ub.name) return 'eq';
    return ua.known && ub.known ? 'ne' : 'unsure';
  }

  function sameMultiset(as, bs, ignoreVar) {
    if (as.length !== bs.length) return null;
    const left = bs.slice();
    let fuzzy = false;
    for (let i = 0; i < as.length; i++) {
      let hit = -1;
      for (let j = 0; j < left.length; j++) {
        if (!ignoreVar && as[i].variable !== left[j].variable) continue;
        const c = partCompare(as[i], left[j]);
        if (c === 'ne') continue;
        if (c === 'unsure') fuzzy = true;
        hit = j;
        break;
      }
      if (hit < 0) return null;
      left.splice(hit, 1);
    }
    return fuzzy ? 'unsure' : 'eq';
  }

  function allNumeric(parts) { return parts.every(function (p) { return p.kind === 'num' || p.kind === 'tuple'; }); }

  function compareParsed(u, r) {
    let res = null;
    if (u.parts.length === r.parts.length) {
      const refVars = r.parts.map(function (p) { return p.variable; });
      const refVarsDistinct = r.parts.length > 1 && refVars.every(Boolean) && new Set(refVars).size === refVars.length;
      if (refVarsDistinct) {
        if (u.parts.every(function (p) { return p.variable; })) res = sameMultiset(u.parts, r.parts, false);
        else if (u.parts.every(function (p) { return !p.variable; })) {
          res = 'eq';
          for (let i = 0; i < u.parts.length; i++) {
            const c = partCompare(u.parts[i], r.parts[i]);
            if (c === 'ne') { res = null; break; }
            if (c === 'unsure') res = 'unsure';
          }
        } else return { relation: 'unsure' };
      } else {
        res = sameMultiset(u.parts, r.parts, true);
      }
    }
    if (res === 'eq') return { relation: 'equal' };
    if (res === 'unsure') return { relation: 'unsure' };
    return { relation: allNumeric(u.parts) && allNumeric(r.parts) ? 'different' : 'unsure' };
  }

  /**
   * Chỉ kết luận đúng/sai khi chắc chắn; còn lại trả 'manual' để học sinh tự đối chiếu với đáp án.
   *  - giống hệt sau chuẩn hoá, hoặc tương đương về giá trị/tập đáp án -> correct
   *  - cả hai đều là số nhưng khác nhau -> wrong
   *  - biểu thức, chữ, nhiều cách viết -> manual
   */
  function judgeAnswer(user, reference) {
    const u = parseAnswer(user);
    const r = parseAnswer(reference);
    if (!u.norm) return { verdict: 'manual', reason: 'empty' };
    if (u.norm === r.norm) return { verdict: 'correct', reason: 'identical' };
    if (!r.parts.length) return { verdict: 'manual', reason: 'no-reference' };
    const c = compareParsed(u, r);
    if (c.relation === 'equal') return { verdict: 'correct', reason: 'equivalent' };
    if (c.relation === 'different') return { verdict: 'wrong', reason: 'numeric-mismatch' };
    return { verdict: 'manual', reason: 'unsure' };
  }

  const MANUAL_EMPTY = { verdict: 'manual', reason: 'empty' };

  function judgeChoice(user, q) {
    const raw = String(user == null ? '' : user).trim();
    if (!raw) return MANUAL_EMPTY;
    const choices = q.choices || [];
    const keys = choices.map(function (c) { return c.key; });
    let letter = null;
    const m = /^[(]?([A-Za-z])[).:]?$/.exec(raw);
    if (m) letter = m[1].toUpperCase();
    else {
      const n = normalizeText(raw);
      const hit = choices.find(function (c) { return normalizeText(c.text) === n; });
      if (hit) letter = hit.key;
    }
    if (!letter || keys.indexOf(letter) < 0) return { verdict: 'manual', reason: 'unrecognized' };
    return letter === q.answer ? { verdict: 'correct', reason: 'choice' } : { verdict: 'wrong', reason: 'choice' };
  }

  function judgeNumeric(user, q) {
    const u = parseAnswer(user);
    if (!u.norm) return MANUAL_EMPTY;
    const refs = [q.answer].concat(q.accept || []);
    for (let i = 0; i < refs.length; i++) {
      if (parseAnswer(refs[i]).norm === u.norm) return { verdict: 'correct', reason: 'identical' };
    }
    const main = parseAnswer(q.answer);
    if (!q.unordered && main.parts.length > 1) {
      if (u.parts.length !== main.parts.length) {
        return allNumeric(u.parts) ? { verdict: 'wrong', reason: 'count-mismatch' } : { verdict: 'manual', reason: 'unsure' };
      }
      let res = 'eq';
      for (let i = 0; i < u.parts.length; i++) {
        const c = partCompare(u.parts[i], main.parts[i]);
        if (c === 'ne') { res = 'ne'; break; }
        if (c === 'unsure') res = 'unsure';
      }
      if (res === 'eq') return { verdict: 'correct', reason: 'equivalent' };
      if (res === 'ne' && allNumeric(u.parts) && allNumeric(main.parts)) return { verdict: 'wrong', reason: 'numeric-mismatch' };
      return { verdict: 'manual', reason: 'unsure' };
    }
    const r = judgeAnswer(user, q.answer);
    if (r.verdict === 'correct') return r;
    for (let i = 1; i < refs.length; i++) {
      if (judgeAnswer(user, refs[i]).verdict === 'correct') return { verdict: 'correct', reason: 'accept' };
    }
    return r;
  }

  function judgeShort(user, q) {
    const u = normalizeText(user);
    if (!u) return MANUAL_EMPTY;
    const refs = [q.answer].concat(q.accept || []);
    for (let i = 0; i < refs.length; i++) {
      if (normalizeText(refs[i]) === u) return { verdict: 'correct', reason: i ? 'accept' : 'identical' };
    }
    for (let i = 0; i < refs.length; i++) {
      if (judgeAnswer(user, refs[i]).verdict === 'correct') return { verdict: 'correct', reason: 'equivalent' };
    }
    return { verdict: 'manual', reason: 'unsure' };
  }

  /** Chấm theo dạng câu: choice so chữ cái; numeric so giá trị; short so khớp sau chuẩn hoá + accept; self luôn tự đánh giá. */
  function judgeQuestion(q, user) {
    switch (q.type) {
      case 'choice': return judgeChoice(user, q);
      case 'numeric': return judgeNumeric(user, q);
      case 'short': return judgeShort(user, q);
      case 'self': return { verdict: 'manual', reason: 'self' };
      default: return judgeAnswer(user, q.answer);
    }
  }

  return {
    DEFAULT_LIMIT: DEFAULT_LIMIT,
    SCREEN_LIMIT: SCREEN_LIMIT,
    DEFAULT_CONFIRM: DEFAULT_CONFIRM,
    CONFIRM_CHOICES: CONFIRM_CHOICES.slice(),
    STAGES: STAGES,
    stageOf: stageOf,
    clampConfirm: clampConfirm,
    normalizeConfirm: normalizeConfirm,
    needConfirm: needConfirm,
    gradeTargets: gradeTargets,
    subjectOf: subjectOf,
    chapterSummary: chapterSummary,
    buildGraph: buildGraph,
    questionById: questionById,
    pickQuestion: pickQuestion,
    nextItem: nextItem,
    isUnconfirmed: isUnconfirmed,
    mulberry32: mulberry32,
    judgeQuestion: judgeQuestion,
    ancestors: ancestors,
    topoSort: topoSort,
    subgraph: subgraph,
    isTestable: isTestable,
    createSession: createSession,
    applyAnswer: applyAnswer,
    nextQuestion: nextQuestion,
    replay: replay,
    statusOf: statusOf,
    summarize: summarize,
    layout: layout,
    parseChapter: parseChapter,
    gradeRank: gradeRank,
    resolveTargets: resolveTargets,
    normalizeText: normalizeText,
    judgeAnswer: judgeAnswer
  };
});
