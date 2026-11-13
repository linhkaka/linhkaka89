#!/usr/bin/env python3
"""Sinh data/topics.json, data/dependencies.json, data/questions.json từ các file data_*.py.

Chạy:  python3 scripts/build.py
Sau đó: node scripts/check.js   (kiểm tra đáp án bằng chính engine chấm bài)
"""
import json
import os
import sys
from fractions import Fraction
from math import comb, gcd, lcm

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)

import vnlib  # noqa: E402
import data_tieu_hoc  # noqa: E402,F401
import data_thcs  # noqa: E402,F401
import data_thpt  # noqa: E402,F401

ROOT = os.path.dirname(HERE)
OUT = os.path.join(ROOT, 'data')


def F(a, b=1):
    return Fraction(a, b)


def eval_verify(expr):
    v = eval(expr, {'__builtins__': {}}, {'F': F, 'gcd': gcd, 'lcm': lcm, 'comb': comb})
    v = Fraction(v)
    return '%d/%d' % (v.numerator, v.denominator)


def main():
    topics, deps, questions, checks = [], [], [], []
    ids = {t['id'] for t in vnlib.TOPICS}
    errors = []
    if len(ids) != len(vnlib.TOPICS):
        errors.append('Trùng mã kiến thức')
    for t in vnlib.TOPICS:
        pre, qs = t.pop('_pre'), t.pop('_qs')
        for p in pre:
            soft = p.endswith('~')
            pid = vnlib.tid(p.rstrip('~'))
            if pid not in ids:
                errors.append('%s: tiền đề không tồn tại %s' % (t['id'], pid))
                continue
            pt = next(x for x in vnlib.TOPICS if x['id'] == pid)
            if pt['grade'] > t['grade']:
                errors.append('%s: tiền đề %s ở lớp cao hơn' % (t['id'], pid))
            deps.append({
                'topicId': t['id'], 'prerequisiteId': pid, 'strength': 'soft' if soft else 'hard',
                'reason': 'Học «%s» cần %s «%s».' % (t['name'], 'nên biết trước' if soft else 'nắm vững trước', pt['name'])
            })
        if len(qs) < 3:
            errors.append('%s: cần ít nhất 3 câu hỏi' % t['id'])
        for i, q in enumerate(qs, 1):
            q = dict(q)
            q['id'] = '%s_q%d' % (t['id'], i)
            q['topicId'] = t['id']
            if q['type'] == 'choice' and q['answer'] not in [c['key'] for c in q['choices']]:
                errors.append('%s: đáp án trắc nghiệm không có trong lựa chọn' % q['id'])
            if q['type'] == 'numeric' and any(ch in q['answer'] for ch in '√πx'):
                errors.append('%s: câu numeric nhưng đáp án không phải số' % q['id'])
            if 'verify' in q:
                try:
                    checks.append({'id': q['id'], 'value': eval_verify(q['verify'])})
                except Exception as e:  # noqa: BLE001
                    errors.append('%s: lỗi biểu thức kiểm chứng %s' % (q['id'], e))
            questions.append(q)
        t['diagnostic_question'] = {'question': qs[0]['prompt'], 'answer': qs[0]['answer']}
        topics.append(t)

    # Không có chu trình
    pre_of = {}
    for d in deps:
        pre_of.setdefault(d['topicId'], []).append(d['prerequisiteId'])
    state = {}

    def visit(n, stack):
        if state.get(n) == 1:
            errors.append('Chu trình: ' + ' -> '.join(stack + [n]))
            return
        if state.get(n) == 2:
            return
        state[n] = 1
        for p in pre_of.get(n, []):
            visit(p, stack + [n])
        state[n] = 2
    for t in topics:
        visit(t['id'], [])

    if errors:
        print('\n'.join(errors))
        sys.exit(1)

    os.makedirs(OUT, exist_ok=True)

    def dump(name, obj):
        with open(os.path.join(OUT, name), 'w', encoding='utf-8') as f:
            json.dump(obj, f, ensure_ascii=False, indent=1)
            f.write('\n')
    dump('topics.json', topics)
    dump('dependencies.json', deps)
    dump('questions.json', questions)
    with open(os.path.join(HERE, '.verify.json'), 'w', encoding='utf-8') as f:
        json.dump(checks, f)
    by_grade = {}
    for t in topics:
        by_grade[t['grade']] = by_grade.get(t['grade'], 0) + 1
    print('Kiến thức: %d · Cạnh tiền đề: %d · Câu hỏi: %d · Biểu thức kiểm chứng: %d' % (
        len(topics), len(deps), len(questions), len(checks)))
    print('Theo lớp: ' + ', '.join('L%d=%d' % (g, by_grade[g]) for g in sorted(by_grade)))


if __name__ == '__main__':
    main()
