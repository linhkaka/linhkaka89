/* Tiện ích dùng chung: tải dữ liệu, tạo phần tử DOM, nhãn tiếng Việt. */
(function () {
  'use strict';
  function h(tag, attrs) {
    const el = document.createElement(tag);
    const a = attrs || {};
    Object.keys(a).forEach(function (k) {
      const v = a[k];
      if (v == null || v === false) return;
      if (k === 'class') el.className = v;
      else if (k === 'text') el.textContent = v;
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2), v);
      else if (k === 'value' || k === 'disabled' || k === 'checked') el[k] = v;
      else el.setAttribute(k, v === true ? '' : v);
    });
    for (let i = 2; i < arguments.length; i++) add(el, arguments[i]);
    return el;
  }
  function add(el, c) {
    if (c == null || c === false) return;
    if (Array.isArray(c)) { c.forEach(function (x) { add(el, x); }); return; }
    el.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  let cache = null;
  function loadData(base) {
    if (cache) return cache;
    const b = base || '../';
    const get = function (p) {
      return fetch(b + 'data/' + p).then(function (r) {
        if (!r.ok) throw new Error('Không tải được ' + p);
        return r.json();
      });
    };
    cache = Promise.all([get('topics.json'), get('dependencies.json'), get('questions.json')]).then(function (r) {
      const graph = window.DiagEngine.buildGraph(r[0], r[1], r[2]);
      return { topics: r[0], deps: r[1], questions: r[2], graph: graph };
    });
    return cache;
  }
  const STATUS = { mastered: 'Đã vững', shaky: 'Chưa chắc', weak: 'Bị hổng', unknown: 'Chưa kiểm tra' };
  const STATUS_CLASS = { mastered: 'ok', shaky: 'warn', weak: 'bad', unknown: '' };
  const DIFF = { basic: 'Cơ bản', standard: 'Vận dụng', challenge: 'Nâng cao' };
  const STAGE = { 'tieu-hoc': 'Tiểu học', thcs: 'THCS', thpt: 'THPT' };
  function lsGet(k) { try { return JSON.parse(localStorage.getItem(k)); } catch (e) { return null; } }
  function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* chế độ riêng tư */ } }
  function lsDel(k) { try { localStorage.removeItem(k); } catch (e) { /* bỏ qua */ } }
  function fold(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd'); }
  function search(topics, q, limit) {
    const k = fold(q).trim();
    if (!k) return [];
    const words = k.split(/\s+/);
    return topics.filter(function (t) {
      const hay = fold(t.name + ' ' + t.chapter + ' ' + t.description + ' lop ' + t.grade);
      return words.every(function (w) { return hay.indexOf(w) >= 0; });
    }).slice(0, limit || 30);
  }
  window.VN = { h: h, loadData: loadData, STATUS: STATUS, STATUS_CLASS: STATUS_CLASS, DIFF: DIFF, STAGE: STAGE,
    lsGet: lsGet, lsSet: lsSet, lsDel: lsDel, fold: fold, search: search };
})();
