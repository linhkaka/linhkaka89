"""Công cụ khai báo dữ liệu gọn cho đồ thị kiến thức Toán Việt Nam.

T(...)  khai báo một kiến thức (topic) cùng tiền đề và câu hỏi.
N(...)  câu trả lời bằng số   (numeric)
C(...)  câu trắc nghiệm        (choice)
S(...)  câu trả lời ngắn       (short)

Mã kiến thức: vnm_<lớp 2 chữ số>_<số thứ tự 2 chữ số>, ví dụ vnm_06_03.
Tiền đề viết gọn "6_03" (hard) hoặc "6_03~" (soft).
"""

TOPICS = []

DIFF = {'b': 'basic', 's': 'standard', 'c': 'challenge'}

DOMAINS = {
    'tieu-hoc': {'so': 'Số và Phép tính', 'hinh': 'Hình học và Đo lường', 'tk': 'Một số yếu tố Thống kê và Xác suất'},
    'thcs': {'so': 'Số và Đại số', 'hinh': 'Hình học và Đo lường', 'tk': 'Thống kê và Xác suất'},
    'thpt': {'so': 'Đại số và Một số yếu tố Giải tích', 'hinh': 'Hình học và Đo lường', 'tk': 'Thống kê và Xác suất'},
}


def stage(grade):
    return 'tieu-hoc' if grade <= 5 else ('thcs' if grade <= 9 else 'thpt')


def tid(code):
    g, n = code.split('_')
    return 'vnm_%02d_%s' % (int(g), n)


def N(d, prompt, answer, expl, verify=None, accept=None, unordered=False):
    q = {'difficulty': DIFF[d], 'type': 'numeric', 'prompt': prompt, 'answer': answer, 'explanation': expl}
    if verify:
        q['verify'] = verify
    if accept:
        q['accept'] = accept
    if unordered:
        q['unordered'] = True
    return q


def C(d, prompt, choices, answer, expl):
    keys = 'ABCD'
    return {'difficulty': DIFF[d], 'type': 'choice', 'prompt': prompt,
            'choices': [{'key': keys[i], 'text': t} for i, t in enumerate(choices)],
            'answer': answer, 'explanation': expl}


def S(d, prompt, answer, expl, accept=None):
    q = {'difficulty': DIFF[d], 'type': 'short', 'prompt': prompt, 'answer': answer, 'explanation': expl}
    if accept:
        q['accept'] = accept
    return q


def T(code, name, chapter, dom, desc, pre=(), qs=(), lesson=None, kind='procedural', volume=None):
    grade = int(code.split('_')[0])
    t = {
        'id': tid(code), 'subject': 'math', 'name': name, 'grade': grade, 'stage': stage(grade),
        'domain': DOMAINS[stage(grade)][dom], 'chapter': chapter, 'type': kind, 'description': desc,
        '_pre': list(pre), '_qs': list(qs),
    }
    if lesson:
        t['lesson'] = lesson
    if volume:
        t['volume'] = volume
    TOPICS.append(t)
    return t
