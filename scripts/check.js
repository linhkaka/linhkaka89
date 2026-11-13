// Kiểm tra ngân hàng câu hỏi bằng chính engine chấm bài:
//  1) đáp án chuẩn và mọi cách viết trong `accept` phải được chấm "correct";
//  2) với câu có `verify`, giá trị tính độc lập (Python, phân số chính xác) phải được chấm "correct" so với đáp án;
//  3) đồ thị dựng được, sắp xếp tô-pô không lỗi.
'use strict';
const fs = require('fs');
const path = require('path');
const E = require('../assets/engine.js');
const root = path.join(__dirname, '..');
const read = (p) => JSON.parse(fs.readFileSync(path.join(root, p), 'utf8'));
const topics = read('data/topics.json');
const deps = read('data/dependencies.json');
const questions = read('data/questions.json');
const verify = fs.existsSync(path.join(__dirname, '.verify.json')) ? read('scripts/.verify.json') : [];
const byId = new Map(questions.map((q) => [q.id, q]));
const errors = [];
let manual = 0;

for (const q of questions) {
  if (q.type === 'choice') {
    if (E.judgeQuestion(q, q.answer).verdict !== 'correct') errors.push(q.id + ': đáp án trắc nghiệm không được chấm đúng');
    continue;
  }
  for (const a of [q.answer].concat(q.accept || [])) {
    const v = E.judgeQuestion(q, a).verdict;
    if (v !== 'correct') errors.push(q.id + ': "' + a + '" bị chấm ' + v);
  }
  if (q.type === 'numeric' && E.judgeQuestion(q, '123456789').verdict === 'manual') manual++;
}
for (const c of verify) {
  const q = byId.get(c.id);
  const v = E.judgeQuestion(q, c.value).verdict;
  if (v !== 'correct') errors.push(c.id + ': đáp án "' + q.answer + '" KHÁC giá trị kiểm chứng ' + c.value + ' (' + v + ')');
}
const g = E.buildGraph(topics, deps, questions);
E.topoSort(g, topics.map((t) => t.id));

if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('OK: ' + questions.length + ' câu, ' + verify.length + ' giá trị kiểm chứng khớp; ' + manual + ' câu numeric chưa chấm tự động được câu sai.');
