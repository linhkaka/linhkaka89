/* Trang khám phá: vẽ vùng lân cận của một kiến thức (tiền đề phía trên, kiến thức tiếp nối phía dưới). */
(function () {
  'use strict';
  const V = window.VN;
  const h = V.h;
  const $ = function (id) { return document.getElementById(id); };
  const COLORS = { 'tieu-hoc': '#2f8f5b', thcs: '#2b6cb0', thpt: '#b3261e' };
  let D = null;
  let cy = null;
  let current = null;

  function neighbourhood(id, up, down) {
    const set = new Set([id]);
    let frontier = [id];
    for (let i = 0; i < up && frontier.length; i++) {
      const next = [];
      frontier.forEach(function (x) { D.graph.prereqs[x].forEach(function (p) { if (!set.has(p.id)) { set.add(p.id); next.push(p.id); } }); });
      frontier = next;
    }
    frontier = [id];
    for (let i = 0; i < down && frontier.length; i++) {
      const next = [];
      frontier.forEach(function (x) { D.graph.dependents[x].forEach(function (p) { if (!set.has(p.id)) { set.add(p.id); next.push(p.id); } }); });
      frontier = next;
    }
    return set;
  }

  function draw(ids, focus) {
    const els = [];
    ids.forEach(function (id) {
      const t = D.graph.byId[id];
      els.push({ data: { id: id, label: t.name + '\n(Lớp ' + t.grade + ')', color: COLORS[t.stage] }, classes: id === focus ? 'focus' : '' });
    });
    D.deps.forEach(function (d) {
      if (ids.has(d.topicId) && ids.has(d.prerequisiteId)) {
        els.push({ data: { id: d.prerequisiteId + '>' + d.topicId, source: d.prerequisiteId, target: d.topicId }, classes: d.strength });
      }
    });
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (cy) cy.destroy();
    cy = window.cytoscape({
      container: $('cy'), elements: els, wheelSensitivity: 0.25,
      layout: { name: 'dagre', rankDir: 'TB', nodeSep: 18, rankSep: 50 },
      style: [
        { selector: 'node', style: {
          shape: 'round-rectangle', 'background-color': dark ? '#1d2220' : '#ffffff', 'border-color': 'data(color)', 'border-width': 2,
          label: 'data(label)', 'text-wrap': 'wrap', 'text-max-width': 150, 'font-size': 11, color: dark ? '#e8ece9' : '#1d2422',
          'text-valign': 'center', width: 165, height: 52, padding: 4 } },
        { selector: 'node.focus', style: { 'background-color': 'data(color)', color: '#fff', 'border-width': 3 } },
        { selector: 'edge', style: { width: 1.6, 'line-color': dark ? '#6f7c77' : '#9aa6a1', 'target-arrow-color': dark ? '#6f7c77' : '#9aa6a1',
          'target-arrow-shape': 'triangle', 'curve-style': 'bezier' } },
        { selector: 'edge.soft', style: { 'line-style': 'dashed' } }
      ]
    });
    cy.on('tap', 'node', function (e) { select(e.target.id()); });
  }

  function select(id, keepGraph) {
    current = id;
    history.replaceState(null, '', '?id=' + id);
    if (!keepGraph) draw(neighbourhood(id, Number($('up').value), Number($('down').value)), id);
    else if (cy) { cy.nodes().removeClass('focus'); cy.getElementById(id).addClass('focus'); }
    const t = D.graph.byId[id];
    const pre = D.graph.prereqs[id];
    const post = D.graph.dependents[id];
    const link = function (x, extra) {
      const tt = D.graph.byId[x.id];
      return h('li', null, h('a', { href: '?id=' + x.id, onclick: function (e) { e.preventDefault(); select(x.id); } }, tt.name),
        ' ', h('span', { class: 'tag brand', text: 'Lớp ' + tt.grade }), x.strength === 'soft' ? h('span', { class: 'tag', text: 'nên biết' }) : null, extra || null);
    };
    $('panel').replaceChildren(
      h('div', null, h('span', { class: 'tag brand', text: 'Lớp ' + t.grade + ' · ' + V.STAGE[t.stage] }), h('span', { class: 'tag', text: t.domain })),
      h('h2', { style: 'margin:10px 0 4px', text: t.name }),
      h('div', { class: 'small muted', text: t.chapter + (t.lesson ? ' · ' + t.lesson : '') }),
      h('p', { text: t.description }),
      h('div', { class: 'row' },
        h('a', { class: 'btn primary', href: '../chan-doan/?muc-tieu=' + id }, 'Chẩn đoán kiến thức này'),
        h('button', { class: 'btn small', type: 'button', onclick: function () { if (cy) cy.fit(undefined, 20); } }, 'Vừa khung')),
      h('h3', { style: 'margin-top:18px', text: 'Kiến thức tiền đề (' + pre.length + ')' }),
      pre.length ? h('ul', { class: 'small' }, pre.map(function (p) { return link(p); })) : h('p', { class: 'small muted', text: 'Không có — đây là kiến thức khởi đầu.' }),
      h('h3', { text: 'Kiến thức cần đến nó (' + post.length + ')' }),
      post.length ? h('ul', { class: 'small' }, post.map(function (p) { return link(p); })) : h('p', { class: 'small muted', text: 'Chưa có trong dữ liệu.' }),
      h('h3', { text: 'Câu hỏi mẫu' }),
      h('p', { class: 'small', text: (D.graph.bank[id][0] || {}).prompt || '' }),
      h('p', { class: 'small muted', text: 'Mã: ' + id + ' · ' + D.graph.bank[id].length + ' câu trong ngân hàng' })
    );
  }

  function showGrade(g) {
    const ids = new Set(D.topics.filter(function (t) { return t.grade === Number(g); }).map(function (t) { return t.id; }));
    draw(ids, null);
    const first = D.topics.find(function (t) { return t.grade === Number(g); });
    if (first) select(first.id, true);
  }

  V.loadData('../').then(function (data) {
    D = data;
    for (let g = 1; g <= 12; g++) $('grade').append(h('option', { value: String(g), text: 'Lớp ' + g }));
    $('grade').addEventListener('change', function () { if ($('grade').value) showGrade($('grade').value); });
    ['up', 'down'].forEach(function (k) { $(k).addEventListener('change', function () { $('grade').value = ''; if (current) select(current); }); });
    const q = $('q'), hits = $('hits');
    q.addEventListener('input', function () {
      const list = V.search(D.topics, q.value, 25);
      hits.hidden = !q.value.trim();
      hits.replaceChildren.apply(hits, list.map(function (t) {
        return h('button', { type: 'button', onclick: function () { hits.hidden = true; q.value = ''; $('grade').value = ''; select(t.id); } },
          h('b', { text: t.name }), h('div', { class: 'small muted', text: 'Lớp ' + t.grade + ' · ' + t.chapter }));
      }));
    });
    const id = new URLSearchParams(location.search).get('id');
    select(D.graph.byId[id] ? id : 'vnm_09_18');
  }).catch(function (e) {
    $('panel').replaceChildren(h('p', { class: 'notice', text: 'Lỗi tải dữ liệu: ' + e.message }));
  });
})();
