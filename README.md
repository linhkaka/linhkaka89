# Bản đồ kiến thức Toán (Việt Nam, lớp 1–12)

Bản đồ kiến thức Toán theo **Chương trình giáo dục phổ thông 2018** (Thông tư 32/2018/TT-BGDĐT), kèm **công cụ chẩn đoán lỗ hổng kiến thức**: khi học sinh làm sai, hệ thống tự lần ngược về các kiến thức nền ở lớp dưới để tìm **nguyên nhân gốc**, rồi đưa ra **lộ trình học** từ thấp đến cao.

Dự án là bản Việt hoá và phát triển cho Việt Nam, dựa trên lõi của [cn-math-taxonomy](https://github.com/xiaoyang111222/cn-math-taxonomy) (xiaoyang111222).

| Cấp học | Kiến thức | Câu hỏi |
| --- | ---: | ---: |
| Tiểu học (lớp 1–5) | 75 | 225 |
| THCS (lớp 6–9) | 107 | 321 |
| THPT (lớp 10–12) | 74 | 222 |
| **Tổng** | **256** (380 quan hệ tiền đề) | **768** |

## Dùng thử trên máy

```bash
python3 -m http.server 8000
# mở http://localhost:8000
```

- `index.html` — trang chủ
- `kham-pha/` — bản đồ: xem tiền đề và kiến thức tiếp nối của từng kiến thức (`?id=vnm_09_18`)
- `chan-doan/` — chẩn đoán một kiến thức (`?muc-tieu=vnm_09_18`) hoặc sàng lọc cả lớp (`?lop=9`)

Không cần cài đặt hay máy chủ riêng: đây là trang tĩnh, có thể đăng lên GitHub Pages. Kết quả chỉ lưu trong trình duyệt (localStorage).

## Lõi được giữ lại và phần thay đổi

**Giữ nguyên thuật toán** (`assets/engine.js`, đã dịch chú thích sang tiếng Việt):

- Mỗi kiến thức cần đúng liên tiếp 3 câu (chọn được 2/3/5) mới tính là *đã vững*; đúng thì suy ra các kiến thức nền cũng vững.
- Sai lần đầu → ra một câu xác nhận dễ hơn. Đúng → *chưa chắc*; vẫn sai → *bị hổng* và lần ngược về tiền đề (tiền đề bắt buộc trước, tiền đề "nên biết" sau).
- Chọn câu theo độ khó (Cơ bản / Vận dụng / Nâng cao), có hạt giống ngẫu nhiên nên phát lại được, hoàn tác được.
- Kết quả: nguyên nhân gốc, lộ trình học xếp theo lớp, tổng hợp theo chương.

**Viết lại cho Việt Nam:**

- Chấm đáp án theo cách viết số ở Việt Nam: **dấu phẩy thập phân** (`3,5`), **dấu chấm hàng nghìn** (`1.000.000`), nhiều đáp án ngăn bằng `;` hoặc chữ "và"/"hoặc", toạ độ `(1; 2)`, đơn vị đo tiếng Việt (mét, ki-lô-gam, lít, đồng, giờ, phút, độ…).
- Lớp 1–12 và ba cấp học (`tieu-hoc`, `thcs`, `thpt`) thay cho cách chia "lớp/tập/sách" của Trung Quốc.
- Toàn bộ dữ liệu mới, biên soạn theo GDPT 2018: mạch *Số và Đại số*, *Hình học và Đo lường*, *Thống kê và Xác suất*.
- Giao diện tiếng Việt, tìm kiếm không cần gõ dấu.
- Bỏ các môn khác và các tính năng ngoài lõi (hồ sơ học sinh, chia sẻ ảnh, PWA) để gọn nhẹ; có thể bổ sung sau.

## Cấu trúc dữ liệu

Định dạng giống bản gốc (`topics` + `dependencies` + `questions`), sinh ra từ các file Python dễ sửa:

```
scripts/data_tieu_hoc.py   scripts/data_thcs.py   scripts/data_thpt.py   ← sửa ở đây
scripts/build.py           → data/topics.json, data/dependencies.json, data/questions.json
scripts/check.js           → chấm lại mọi đáp án bằng chính engine
```

Một kiến thức được khai báo như sau:

```python
T('9_18', 'Phương trình bậc hai một ẩn; công thức nghiệm', 'Chương VI. ...', 'so',
  'ax² + bx + c = 0; biệt thức Δ; số nghiệm và công thức nghiệm.',
  ['9_07', '8_06'],                  # tiền đề; thêm "~" (vd '8_05~') nếu chỉ là "nên biết"
  [N('b', 'Giải x² − 9 = 0.', '3; -3', 'x² = 9.', unordered=True),
   N('s', ..., verify='...'),        # verify: biểu thức Python tính lại đáp số để đối chiếu
   C('c', 'Câu hỏi', ['A', 'B', 'C'], 'B', 'Giải thích')])
```

Mã kiến thức: `vnm_<lớp>_<số thứ tự>`, ví dụ `vnm_09_18`.

## Kiểm tra

```bash
npm test
```

- Không có chu trình; mọi tiền đề tồn tại và không ở lớp cao hơn.
- Mỗi kiến thức có ít nhất 3 câu (cơ bản, vận dụng, nâng cao).
- Đáp án chuẩn và mọi cách viết được chấp nhận đều được engine chấm "đúng".
- 446 câu có biểu thức kiểm chứng tính lại bằng phân số chính xác và phải khớp đáp án.

## Giới hạn — cần giáo viên rà soát

- Nội dung bám theo yêu cầu cần đạt của GDPT 2018, nhưng **tên chương, thứ tự bài tham khảo bộ "Kết nối tri thức với cuộc sống"** và chưa đối chiếu từng trang với sách. Trường dùng *Chân trời sáng tạo* hoặc *Cánh Diều* cần điều chỉnh trường `chapter`.
- Quan hệ tiền đề (bắt buộc / nên biết) và câu hỏi do nhóm biên soạn, **chưa được giáo viên thẩm định**. Đừng dùng để đánh giá, xếp loại chính thức.
- Câu trả lời dạng biểu thức (ví dụ `4x² − 3x`) chỉ được chấm tự động khi khớp cách viết; nếu không, học sinh tự đối chiếu với đáp án.
- Chưa có phần chuyên đề học tập THPT và các bài "Hoạt động thực hành trải nghiệm".

Rất hoan nghênh thầy cô góp ý: sửa file `scripts/data_*.py` rồi gửi pull request, hoặc mở issue.

## Giấy phép

Dự án kế thừa lõi của [cn-math-taxonomy](https://github.com/xiaoyang111222/cn-math-taxonomy), phát hành theo **[CC BY-NC 4.0](LICENSE)**: được dùng miễn phí cho học tập, giảng dạy, nghiên cứu; **không dùng cho mục đích thương mại** (khoá học thu phí, ứng dụng trả phí, dịch vụ thu tiền…) nếu chưa có thoả thuận riêng với tác giả gốc. Khi chia sẻ lại, cần ghi nguồn cả dự án gốc và dự án này.

Thư viện bên thứ ba trong `assets/vendor/` (Cytoscape.js, dagre, cytoscape-dagre) giữ giấy phép MIT của chúng.
