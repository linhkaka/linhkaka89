/* Giao diện chẩn đoán. Toàn bộ logic nằm ở assets/engine.js; ở đây chỉ tải dữ liệu, hiển thị và lưu tạm trên máy. */
(function () {
  'use strict';
  const E = window.DiagEngine;
  const V = window.VN;
  const h = V.h;
  const LS_SESSION = 'vnmChanDoan.session.v1';
  const LS_SETTINGS = 'vnmChanDoan.settings.v1';
  const root = document.getElementById('root');
  let D = null;
  let run = null; // {targets, mode, label, limit, confirm, seed, answers}
  let session = null;
  let ui = { phase: 'ask', answer: '', picked: null, verdict: null };
  let gradeSel = null;

  function settings() {
    const s = V.lsGet(LS_SETTINGS) || {};
    return { confirm: E.clampConfirm(s.confirm || E.DEFAULT_CONFIRM), limit: s.limit || E.DEFAULT_LIMIT };
  }
  function setSetting(k, v) { const s = V.lsGet(LS_SETTINGS) || {}; s[k] = v; V.lsSet(LS_SETTINGS, s); }
  function nameOf(id) { const t = D.graph.byId[id]; return t ? t.name : id; }
  function gradeOf(id) { const t = D.graph.byId[id]; return t ? 'Lớp ' + t.grade : ''; }
  function show(node) { root.replaceChildren(node); window.scrollTo(0, 0); }

  function rebuild() {
    session = E.replay(D.graph, run.targets, run.answers, { limit: run.limit, seed: run.seed, mode: run.mode, confirm: run.confirm });
  }
  function save() { V.lsSet(LS_SESSION, run); }
  function start(targets, label, mode) {
    const s = settings();
    run = {
      targets: targets, label: label, mode: mode || 'target', confirm: s.confirm,
      limit: mode === 'screen' ? Math.min(60, Math.max(20, Math.round(targets.length * 1.5))) : s.limit,
      seed: Math.random().toString(36).slice(2, 10), answers: []
    };
    rebuild(); save(); ui = { phase: 'ask', answer: '', picked: null, verdict: null };
    render();
  }
  function restart() { V.lsDel(LS_SESSION); run = null; session = null; history.replaceState(null, '', './'); renderStart(); }

  function render() {
    if (!run) return renderStart();
    const item = E.nextItem(D.graph, session);
    if (!item) return renderResult();
    renderQuestion(item);
  }

  /* ------------------------------------------------------------ Màn hình bắt đầu */
  function renderStart(err) {
    const s = settings();
    const results = h('div', { class: 'results', hidden: true });
    const input = h('input', {
      type: 'search', placeholder: 'Gõ tên kiến thức, ví dụ: phương trình bậc hai, phân số, định lí Pythagore…',
      'aria-label': 'Tìm kiến thức', oninput: function () {
        const list = V.search(D.topics, input.value, 40);
        results.hidden = !input.value.trim();
        results.replaceChildren.apply(results, list.length ? list.map(function (t) {
          return h('button', { type: 'button', onclick: function () { pickTarget(t.id); } },
            h('b', { text: t.name }), h('div', { class: 'small muted', text: 'Lớp ' + t.grade + ' · ' + t.chapter }));
        }) : [h('p', { class: 'muted small', style: 'padding:10px', text: 'Không tìm thấy kiến thức phù hợp.' })]);
      }
    });
    const gradeBox = h('div', { class: 'grades' });
    const screenBtn = h('button', { class: 'btn primary', type: 'button', disabled: true, onclick: function () {
      const r = E.gradeTargets(D.graph, gradeSel);
      if (r) start(r.ids, 'Sàng lọc ' + r.label, 'screen');
    } }, 'Bắt đầu sàng lọc');
    for (let g = 1; g <= 12; g++) {
      gradeBox.append(h('button', { class: 'btn', type: 'button', 'data-g': g, onclick: function (e) {
        gradeSel = g;
        gradeBox.querySelectorAll('.btn').forEach(function (b) { b.classList.toggle('on', b === e.currentTarget); });
        const r = E.gradeTargets(D.graph, g);
        screenBtn.disabled = !r;
        screenBtn.textContent = r ? 'Sàng lọc lớp ' + g + ' (' + r.ids.length + ' kiến thức)' : 'Bắt đầu sàng lọc';
      } }, 'Lớp ' + g));
    }
    const confirmSel = h('select', { 'aria-label': 'Số câu cần đúng liên tiếp', onchange: function () { setSetting('confirm', Number(confirmSel.value)); } },
      E.CONFIRM_CHOICES.map(function (n) { return h('option', { value: String(n), selected: n === s.confirm ? true : null, text: n + ' câu' }); }));
    confirmSel.value = String(s.confirm);
    const limitSel = h('select', { 'aria-label': 'Số câu tối đa', onchange: function () { setSetting('limit', Number(limitSel.value)); } },
      [8, 12, 16, 20, 30].map(function (n) { return h('option', { value: String(n), text: n + ' câu' }); }));
    limitSel.value = String(s.limit);

    show(h('div', null,
      h('h1', { text: 'Chẩn đoán lỗ hổng kiến thức' }),
      h('p', { class: 'lead', text: 'Chọn kiến thức em đang học. Nếu trả lời sai, hệ thống sẽ lần ngược về các kiến thức nền ở lớp dưới để tìm đúng chỗ bị hổng, rồi gợi ý lộ trình học từ thấp đến cao.' }),
      err ? h('p', { class: 'notice', text: err }) : null,
      h('section', { class: 'card' },
        h('h2', { style: 'margin-top:0', text: '1. Chẩn đoán một kiến thức' }),
        input, results),
      h('section', { class: 'card' },
        h('h2', { style: 'margin-top:0', text: '2. Sàng lọc cả một lớp' }),
        h('p', { class: 'muted small', text: 'Kiểm tra lần lượt các kiến thức của lớp đã chọn; chỉ lần ngược trong phạm vi lớp đó.' }),
        gradeBox, h('div', { class: 'row', style: 'margin-top:12px' }, screenBtn)),
      h('details', { class: 'card' },
        h('summary', { text: 'Cài đặt' }),
        h('div', { class: 'grid', style: 'margin-top:12px' },
          h('label', null, h('div', { class: 'small muted', text: 'Số câu đúng liên tiếp để công nhận "đã vững"' }), confirmSel),
          h('label', null, h('div', { class: 'small muted', text: 'Số câu tối đa mỗi lượt chẩn đoán' }), limitSel))),
      h('p', { class: 'small muted', text: 'Cách ghi đáp án: số thập phân dùng dấu phẩy (3,5); nhiều đáp án ngăn bằng dấu chấm phẩy (2; 3); phân số viết a/b; toạ độ viết (1; 2).' })
    ));
    input.focus();
  }
  function pickTarget(id) {
    history.replaceState(null, '', '?muc-tieu=' + encodeURIComponent(id));
    start([id], nameOf(id), 'target');
  }

  /* ------------------------------------------------------------ Câu hỏi */
  function commit(result, text) {
    const item = E.nextItem(D.graph, session);
    run.answers.push({ id: item.topicId, qid: item.question.id, result: result, text: text || '' });
    rebuild(); save();
    ui = { phase: 'ask', answer: '', picked: null, verdict: null };
    render();
  }
  function undo() {
    if (!run.answers.length) return;
    run.answers.pop(); rebuild(); save();
    ui = { phase: 'ask', answer: '', picked: null, verdict: null };
    render();
  }
  function reasonFor(item) {
    const id = item.topicId;
    if (run.targets.indexOf(id) >= 0 && run.mode !== 'screen') return 'Kiến thức mục tiêu';
    if (item.attempt > 1) {
      const prev = session.attempts[id] || [];
      return prev.some(function (a) { return a.result !== 'correct'; }) ? 'Câu xác nhận (dễ hơn)' : 'Câu ' + item.attempt + ' để chắc chắn đã vững';
    }
    const dependents = D.graph.dependents[id].map(function (d) { return d.id; })
      .filter(function (x) { return session.status[x] && session.status[x].s === 'weak'; });
    if (dependents.length) return 'Lần ngược: là kiến thức nền của «' + nameOf(dependents[0]) + '»';
    return run.mode === 'screen' ? 'Sàng lọc' : 'Kiến thức liên quan';
  }
  function answerText(q) {
    if (q.type === 'choice') {
      const c = (q.choices || []).find(function (x) { return x.key === q.answer; });
      return q.answer + '. ' + (c ? c.text : '');
    }
    return q.answer;
  }
  function renderQuestion(item) {
    const q = item.question;
    const t = D.graph.byId[item.topicId];
    const asked = session.answers.length;
    const pct = Math.round(100 * asked / session.limit);
    const box = h('div');
    const submit = function () {
      const val = q.type === 'choice' ? ui.picked : ui.answer;
      if (!val) return;
      ui.verdict = E.judgeQuestion(q, val);
      ui.phase = 'judged';
      ui.answer = val;
      renderQuestion(item);
    };
    let answerArea;
    if (ui.phase === 'ask') {
      if (q.type === 'choice') {
        answerArea = h('div', { class: 'choices' }, q.choices.map(function (c) {
          return h('button', { type: 'button', class: 'btn choice' + (ui.picked === c.key ? ' picked' : ''), onclick: function () {
            ui.picked = c.key; submit();
          } }, h('b', { text: c.key + '.' }), ' ' + c.text);
        }));
      } else {
        const inp = h('input', { type: 'text', value: ui.answer, placeholder: 'Nhập đáp án', 'aria-label': 'Đáp án',
          autocomplete: 'off', oninput: function () { ui.answer = inp.value; },
          onkeydown: function (e) { if (e.key === 'Enter') submit(); } });
        answerArea = h('div', null, inp,
          h('div', { class: 'row', style: 'margin-top:10px' },
            h('button', { class: 'btn primary', type: 'button', onclick: submit }, 'Kiểm tra')));
        setTimeout(function () { inp.focus(); }, 0);
      }
    } else {
      const v = ui.verdict.verdict;
      const expl = h('div', { class: 'small', style: 'margin-top:6px' },
        h('div', null, 'Đáp án: ', h('b', { text: answerText(q) })),
        q.explanation ? h('div', { class: 'muted', text: 'Giải thích: ' + q.explanation }) : null);
      if (v === 'manual') {
        answerArea = h('div', { class: 'verdict manual' },
          h('b', { text: 'Máy chưa chắc chắn cách viết của em. Em hãy tự đối chiếu:' }),
          h('div', { class: 'small', text: 'Em đã trả lời: ' + ui.answer }), expl,
          h('div', { class: 'row', style: 'margin-top:10px' },
            h('button', { class: 'btn primary', type: 'button', onclick: function () { commit('correct', ui.answer); } }, 'Em làm đúng'),
            h('button', { class: 'btn', type: 'button', onclick: function () { commit('wrong', ui.answer); } }, 'Em làm sai')));
      } else {
        const ok = v === 'correct';
        answerArea = h('div', { class: 'verdict ' + (ok ? 'ok' : 'bad') },
          h('b', { text: ok ? '✓ Chính xác!' : '✗ Chưa đúng.' }),
          ok ? null : h('div', { class: 'small', text: 'Em đã trả lời: ' + (q.type === 'choice' ? ui.answer : ui.answer) }),
          expl,
          h('div', { class: 'row', style: 'margin-top:10px' },
            h('button', { class: 'btn primary', type: 'button', onclick: function () { commit(ok ? 'correct' : 'wrong', ui.answer); } }, 'Câu tiếp theo →')));
        setTimeout(function () { const b = answerArea.querySelector('.btn.primary'); if (b) b.focus(); }, 0);
      }
    }
    box.append(
      h('div', { class: 'row', style: 'justify-content:space-between' },
        h('span', { class: 'small muted', text: run.label }),
        h('span', { class: 'small muted', text: 'Câu ' + (asked + 1) + ' / tối đa ' + session.limit })),
      h('div', { class: 'progress', role: 'progressbar', 'aria-valuenow': String(pct), 'aria-valuemin': '0', 'aria-valuemax': '100' }, h('i', { style: 'width:' + pct + '%' })),
      h('section', { class: 'card' },
        h('div', { class: 'row' },
          h('span', { class: 'tag brand', text: 'Lớp ' + t.grade }),
          h('span', { class: 'tag', text: V.DIFF[q.difficulty] || '' }),
          h('span', { class: 'small muted', text: reasonFor(item) })),
        h('h3', { style: 'margin-top:10px', text: t.name }),
        h('p', { class: 'prompt', text: q.prompt }),
        answerArea,
        ui.phase === 'ask' ? h('div', { class: 'row', style: 'margin-top:14px' },
          h('button', { class: 'btn small', type: 'button', onclick: function () { commit('skip', ''); } }, 'Em chưa biết làm'),
          run.answers.length ? h('button', { class: 'btn small', type: 'button', onclick: undo }, '↶ Hoàn tác câu trước') : null,
          h('button', { class: 'btn small', type: 'button', onclick: function () { run.limit = session.answers.length; rebuild(); save(); render(); } }, 'Kết thúc, xem kết quả'),
          h('button', { class: 'btn small', type: 'button', onclick: function () { if (confirm('Bỏ lượt chẩn đoán này?')) restart(); } }, 'Làm lại từ đầu')) : null)
    );
    show(box);
  }

  /* ------------------------------------------------------------ Kết quả */
  function topicLine(id, extra) {
    const t = D.graph.byId[id];
    return h('div', null,
      h('b', { text: t.name }), ' ', h('span', { class: 'tag brand', text: 'Lớp ' + t.grade }), extra || null,
      h('div', { class: 'small muted', text: t.chapter + (t.lesson ? ' · ' + t.lesson : '') }),
      h('div', { class: 'small', text: t.description }));
  }
  function renderResult() {
    const sum = E.summarize(D.graph, session);
    const chapters = E.chapterSummary(D.graph, session);
    const rootIds = new Set(sum.roots.map(function (r) { return r.id; }));
    const total = sum.mastered.length + sum.shaky.length + sum.weak.length + sum.untested.length;
    const out = h('div');
    out.append(
      h('h1', { text: 'Kết quả: ' + run.label }),
      h('p', { class: 'muted', text: 'Đã làm ' + sum.asked + ' câu' + (sum.limitReached ? ' (đã hết số câu tối đa, một số kiến thức chưa kịp kiểm tra)' : '') + '.' }),
      h('div', { class: 'stats' },
        stat('ok', sum.mastered.length, 'Đã vững'), stat('warn', sum.shaky.length, 'Chưa chắc'),
        stat('bad', sum.weak.length, 'Bị hổng'), stat('unk', sum.untested.length, 'Chưa kiểm tra')),
      h('p', { class: 'small muted', text: 'Tổng ' + total + ' kiến thức trong phạm vi. "Đã vững" gồm cả kiến thức được suy ra (vì em làm đúng kiến thức cao hơn dựa trên nó).' })
    );
    if (sum.roots.length) {
      out.append(h('section', { class: 'card' },
        h('h2', { style: 'margin-top:0', text: '🎯 Nguyên nhân gốc' }),
        h('p', { class: 'small muted', text: 'Những kiến thức bị hổng mà kiến thức nền của nó không bị hổng — nên bắt đầu ôn từ đây.' }),
        h('ul', { class: 'list' }, sum.roots.map(function (r) {
          const notes = [];
          if (r.pendingPrereqs.length) notes.push('Chưa kịp kiểm tra kiến thức nền: ' + r.pendingPrereqs.map(nameOf).join(', ') + ' — có thể lỗ hổng còn sâu hơn.');
          if (r.outOfScopePrereqs.length) notes.push('Kiến thức nền ngoài phạm vi sàng lọc: ' + r.outOfScopePrereqs.map(function (x) { return nameOf(x) + ' (' + gradeOf(x) + ')'; }).join(', ') + '.');
          return h('li', null, topicLine(r.id, sum.unconfirmed.indexOf(r.id) >= 0 ? h('span', { class: 'tag warn', text: 'chưa xác nhận' }) : null),
            notes.map(function (n) { return h('div', { class: 'small notice', style: 'margin-top:6px', text: n }); }),
            h('div', { class: 'row', style: 'margin-top:6px' },
              h('a', { class: 'btn small', href: '../kham-pha/?id=' + r.id }, 'Xem trên bản đồ')));
        }))));
    } else if (!sum.weak.length && !sum.shaky.length) {
      out.append(h('section', { class: 'card' }, h('h2', { style: 'margin-top:0', text: '🎉 Không phát hiện lỗ hổng' }),
        h('p', { text: 'Em đã làm tốt các câu đã kiểm tra. Có thể chuyển sang kiến thức tiếp theo hoặc chọn mức "5 câu" trong Cài đặt để kiểm tra chặt hơn.' })));
    }
    if (sum.path.length) {
      out.append(h('section', { class: 'card' },
        h('h2', { style: 'margin-top:0', text: '🧭 Lộ trình học đề xuất' }),
        h('p', { class: 'small muted', text: 'Xếp từ lớp thấp đến lớp cao; trong cùng lớp, kiến thức nền đứng trước.' }),
        h('ol', { class: 'path' }, sum.path.map(function (p) {
          return h('li', { class: p.isRoot ? 'root' : '' },
            h('b', { text: nameOf(p.id) }), ' ',
            h('span', { class: 'tag brand', text: gradeOf(p.id) }),
            h('span', { class: 'tag ' + V.STATUS_CLASS[p.status], text: V.STATUS[p.status] }),
            p.isRoot ? h('span', { class: 'tag bad', text: 'gốc' }) : null,
            p.isTarget ? h('span', { class: 'tag', text: 'mục tiêu' }) : null);
        }))));
    }
    if (chapters.length > 1) {
      out.append(h('section', { class: 'card' },
        h('h2', { style: 'margin-top:0', text: '📚 Theo chương' }),
        h('ul', { class: 'list' }, chapters.map(function (c) {
          return h('li', null, h('b', { text: c.label }), h('div', { class: 'small muted' },
            c.mastered + ' vững · ' + c.shaky + ' chưa chắc · ' + c.weak + ' hổng · ' + c.untested + ' chưa kiểm tra'));
        }))));
    }
    out.append(h('details', { class: 'card' },
      h('summary', { text: 'Nhật ký trả lời (' + run.answers.length + ' câu)' }),
      h('ol', { class: 'small' }, run.answers.map(function (a) {
        const q = E.questionById(D.graph, a.qid);
        const label = { correct: '✓ đúng', wrong: '✗ sai', skip: '— chưa biết' }[a.result];
        return h('li', null, label + ' · ' + nameOf(a.id) + (q ? ' — ' + q.prompt : '') + (a.text ? ' (em ghi: ' + a.text + ')' : ''));
      }))));
    out.append(h('div', { class: 'row no-print' },
      h('button', { class: 'btn primary', type: 'button', onclick: restart }, 'Chẩn đoán kiến thức khác'),
      h('button', { class: 'btn', type: 'button', onclick: function () { window.print(); } }, 'In / Lưu PDF'),
      run.answers.length ? h('button', { class: 'btn', type: 'button', onclick: function () { run.limit = Math.max(run.limit, run.answers.length) + 8; rebuild(); save(); render(); } }, 'Làm thêm 8 câu') : null));
    show(out);
  }
  function stat(cls, n, label) { return h('div', { class: 'stat ' + cls }, h('b', { text: String(n) }), label); }

  /* ------------------------------------------------------------ Khởi động */
  V.loadData('../').then(function (data) {
    D = data;
    const params = new URLSearchParams(location.search);
    const target = params.get('muc-tieu');
    const lop = params.get('lop');
    const saved = V.lsGet(LS_SESSION);
    if (target) {
      const ids = target.split(',').filter(function (id) { return D.graph.byId[id]; });
      if (saved && saved.targets.join(',') === ids.join(',') && saved.mode === 'target') { run = saved; rebuild(); return render(); }
      if (ids.length) return start(ids, ids.length === 1 ? nameOf(ids[0]) : ids.length + ' kiến thức', 'target');
      return renderStart('Không tìm thấy kiến thức có mã ' + target + '.');
    }
    if (lop) {
      const r = E.gradeTargets(D.graph, lop);
      if (r) return start(r.ids, 'Sàng lọc ' + r.label, 'screen');
    }
    if (saved && saved.targets && saved.targets.every(function (id) { return D.graph.byId[id]; })) {
      run = saved;
      try { rebuild(); } catch (e) { run = null; V.lsDel(LS_SESSION); }
    }
    render();
  }).catch(function (e) {
    root.replaceChildren(h('p', { class: 'notice', text: 'Lỗi tải dữ liệu: ' + e.message + '. Nếu mở file trực tiếp, hãy chạy một máy chủ tĩnh (ví dụ: python3 -m http.server).' }));
  });
})();
