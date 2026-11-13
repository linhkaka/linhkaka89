// Kiểm thử engine: chấm đáp án kiểu Việt Nam và lần ngược tiền đề.
'use strict';
const assert = require('assert');
const E = require('../assets/engine.js');
const ok = (u, r) => assert.strictEqual(E.judgeAnswer(u, r).verdict, 'correct', u + ' ~ ' + r);
const bad = (u, r) => assert.strictEqual(E.judgeAnswer(u, r).verdict, 'wrong', u + ' !~ ' + r);

// Dấu phẩy thập phân, dấu chấm hàng nghìn, phân số, phần trăm, hỗn số, đơn vị
ok('3,5', '7/2'); ok('0,25', '25%'); ok('1.000.000', '1000000'); ok('1 1/2', '3/2');
ok('12 cm', '12'); ok('45 độ', '45°'); ok('-1,2', '−1,2'); ok('2 và 3', '3; 2');
ok('x = 2; y = 3', '2; 3'); ok('(1; 2)', '(1;2)'); bad('3,6', '3,5'); bad('5 kg', '5 g');
assert.strictEqual(E.judgeQuestion({ type: 'choice', answer: 'B', choices: [{ key: 'A', text: 'x' }, { key: 'B', text: 'y' }] }, 'b').verdict, 'correct');
assert.strictEqual(E.judgeQuestion({ type: 'short', answer: '4x^2-3x' }, '4x² − 3x').verdict, 'correct');

// Đồ thị nhỏ: a <- b <- c (c là mục tiêu)
const topics = ['a', 'b', 'c'].map((id, i) => ({ id, name: id, grade: i + 1, chapter: 'Chương I. Thử' }));
const deps = [{ topicId: 'b', prerequisiteId: 'a', strength: 'hard' }, { topicId: 'c', prerequisiteId: 'b', strength: 'hard' }];
const qs = [];
topics.forEach((t) => ['basic', 'standard', 'challenge'].forEach((d, i) => qs.push({ id: t.id + '_q' + (i + 1), topicId: t.id, difficulty: d, type: 'numeric', prompt: '?', answer: '1' })));
const g = E.buildGraph(topics, deps, qs);
let s = E.createSession(g, ['c'], { seed: 't' });
// Sai c hai lần -> c hổng, lần ngược sang b
for (let i = 0; i < 2; i++) s = E.applyAnswer(g, s, E.nextItem(g, s).topicId, 'wrong');
assert.strictEqual(E.statusOf(s, 'c'), 'weak');
assert.strictEqual(E.nextItem(g, s).topicId, 'b');
// Đúng b ba lần -> b vững, kéo theo a vững (suy ra)
for (let i = 0; i < 3; i++) s = E.applyAnswer(g, s, 'b', 'correct');
assert.strictEqual(E.statusOf(s, 'b'), 'mastered');
assert.strictEqual(E.statusOf(s, 'a'), 'mastered');
const sum = E.summarize(g, s);
assert.deepStrictEqual(sum.roots.map((r) => r.id), ['c']);
// Lớp / cấp học
assert.strictEqual(E.gradeTargets(g, 'Lớp 2').ids[0], 'b');
assert.strictEqual(E.gradeTargets(g, 'tieu-hoc').ids.length, 3);
assert.strictEqual(E.parseChapter(topics[0]).chapterNo, 'Chương I');
console.log('test_engine: OK');
