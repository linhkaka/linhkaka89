# SNAKE Production OS

Giao diện tiếng Việt để quản lý, tái sử dụng và điều phối quy trình sản xuất video/phim dài (30–120 phút) cho SNAKE MEDIA.

Đây là **bản thử nghiệm dạng trang tĩnh**: không cần máy chủ, không cần cài đặt. Dữ liệu lưu trong trình duyệt (`localStorage`) trên máy đang dùng.

## Chạy thử

1. Mở `index.html` bằng trình duyệt (Chrome, Edge, Firefox hoặc Safari gần đây).
2. Bấm **+ Dự án mới**, chọn mẫu, thị trường đích, rồi dán kịch bản hoặc nạp file `.txt`.
3. Vào **Kịch bản & Blueprint** → **Khóa nội dung gốc** → **Phân cảnh**.
4. Điền hành động, trạng thái đầu/cuối và thoại cho từng cảnh ở **Bảng cảnh**.

Để kiểm thử logic lõi (cần Node 18+):

```bash
node --test snake-production-os/tests/core.test.js
```

## Màn hình

| Nhóm | Màn hình | Chức năng chính |
|---|---|---|
| Chung | Tổng quan | Danh sách dự án, cổng sản xuất, cảnh báo, nhân bản, xóa, nhập JSON |
| Chung | Mẫu dự án | Mẫu có sẵn (chỉ cấu hình, không chứa kịch bản), sửa mẫu riêng, lưu dự án thành mẫu |
| Dự án | Kịch bản & Blueprint | Nhập nguồn, khóa bằng hash, kiểm dữ kiện/bản quyền/bản địa, bản địa hóa theo thị trường, phân cảnh |
| Dự án | Bảng cảnh | Cảnh 10–20 giây, nguyên văn đoạn nguồn, hành động, trạng thái đầu/cuối, thoại, định tuyến model |
| Dự án | Bible nhân vật & bối cảnh | Nhân vật, bối cảnh, ảnh tham chiếu (chỉ tên đã map), khóa Bible có phiên bản |
| Dự án | Continuity | Lỗi chặn duyệt, cảnh báo, đối chiếu nối cảnh, xác nhận cảnh stale |
| Sản xuất | Prompt Router | Mức xác minh từng model, định tuyến hybrid, prompt và cài đặt theo clip |
| Sản xuất | Voice & âm thanh | Lời đọc nguyên văn, thời lượng đo thật, khóa voice, âm thanh môi trường, nhạc |
| Sản xuất | Ngân sách | Chi phí theo tiền tệ, gồm cả lần thất bại/từ chối, chi phí trên mỗi cảnh đã duyệt |
| Sản xuất | Phân công | Thành viên (ghi chú), người phụ trách và hạn từng cảnh, khối lượng theo người |
| Sản xuất | QC | Chấm 5 hạng mục QC, chọn take đạt cho từng clip, duyệt, từ chối (có lý do) |
| Sản xuất | Checkpoints | Ảnh chụp dự án, khôi phục, tự động tạo khi khóa nguồn/khóa voice/phân cảnh lại |
| Sản xuất | Hàng đợi | Ghi nhận thủ công việc đã gửi, đã nhận kết quả, thất bại; khóa idempotency theo hash prompt |
| Sản xuất | Production OS | 8 cổng sản xuất, việc tiếp theo, nhãn đầu ra |
| Sản xuất | Xuất file | JSON sản xuất, kịch bản, lời đọc sạch, storyboard CSV, prompt Markdown, báo cáo QC, sổ chi phí |

## Nhãn đầu ra

- **DRAFT KIT** — mặc định. Mọi đầu ra chỉ là bản nháp.
- **APPROVED KIT** — đã khóa nguồn, duyệt dữ kiện/bản quyền/bản địa, Bible khóa, phân cảnh đủ 100%, continuity không còn lỗi, voice đã khóa với thời lượng đo thật.
- **FINISHED** — thêm điều kiện: mọi cảnh đã duyệt QC và có take đạt cho từng clip.

Tên file xuất ra luôn kèm nhãn (ví dụ `…_DRAFT_voice_clean.txt`). Gói prompt không bao giờ được gọi là phim hoàn tất.

## Đã xác minh trong ứng dụng này

Các mục dưới đây có kiểm thử tự động (`tests/core.test.js`, 24 ca) hoặc kiểm thử trình duyệt đã chạy (Chromium headless, không có lỗi JavaScript):

- Phân cảnh bao phủ 100% nguồn, không mất, không lặp ký tự; ghép lại đúng nguyên văn.
- Unicode: emoji ZWJ, tiếng Việt tổ hợp, tiếng Nhật, CRLF; không cắt giữa cặp thay thế. Offset được ghi cả UTF-16 và code point.
- Clip theo giới hạn model: Flow 20s = 10+10; Seedance 20s = 15+5; Muse 12s = 10+2.
- Thoại mỗi câu chỉ xuất hiện một lần trong các clip; thoại phải nằm nguyên văn trong đoạn nguồn của cảnh.
- Cổng duyệt: không duyệt khi thiếu QC, thiếu take đạt cho từng clip, chưa đối chiếu nối cảnh hoặc cảnh stale.
- Khóa voice tự mất hiệu lực khi nguồn đổi.
- Ngân sách tách theo tiền tệ, không chia cho 0.
- Quy trình end-to-end: tạo dự án → khóa → phân cảnh → Bible → hàng đợi → QC → duyệt → xuất JSON/Markdown/CSV; mẫu, nhân bản, checkpoint, khóa voice, nhập/xuất JSON, xóa dự án.
- Bố cục desktop và điện thoại (390px) không tràn ngang.

## Chưa xác minh / chưa có

| Hạng mục | Trạng thái |
|---|---|
| Google Flow | Chỉ có ghi nhận tài liệu công khai ngày 12/11/2026 trong gói bàn giao. **Chưa kiểm tài khoản. Không có API.** |
| Muse.ai | **Chưa xác minh** sản phẩm, model và API. 10 giây là mục tiêu biên tập tạm tính, không phải giới hạn nhà cung cấp. Chỉ xuất bản nháp thủ công. |
| Seedance 2.0 (Runway) | Ghi nhận tài liệu Runway ngày 12/11/2026. Chưa kiểm tài khoản hoặc API. Không suy cho nhà cung cấp khác. |
| Gửi job tự động | **Không có.** Hàng đợi chỉ ghi nhận thủ công. Không có worker, lease hay retry tự động. |
| TTS và đo thời lượng | **Không có.** Thời lượng voice ước tính chỉ để tham khảo; phải nhập số đo thật. |
| Cộng tác nhiều người theo thời gian thực | **Chưa bật trên project thật.** Có thiết kế và bản nháp trên Supabase của OPS (xem mục Đồng bộ nhóm). Hiện chỉ có xuất/nhập JSON. |
| Kiểm hình ảnh bằng AI | **Không triển khai.** QC là người duyệt. |
| Tỷ giá tiền tệ | Không quy đổi. Mỗi tiền tệ tính riêng. |
| Hash nguồn | FNV-1a 32-bit: chỉ phát hiện thay đổi, không phải mã bảo mật. |
| Tích hợp ArcReel, snakemoi, snake-media-system, Video Prompt Router, Batch Video Director | **Chưa tích hợp.** Cần inspect source, license và runtime trước khi kết nối (xem gói bàn giao). |

## Lưu ý vận hành

- Dữ liệu nằm trong `localStorage` của trình duyệt. Xóa dữ liệu trình duyệt sẽ mất dự án. Hãy xuất **Sao lưu dự án (JSON)** định kỳ.
- Mỗi checkpoint chứa toàn bộ dự án. Giới hạn 10 checkpoint mỗi dự án để tránh vượt bộ nhớ trình duyệt (khoảng 5MB).
- Khi nạp kịch bản bằng cách dán, một số trình duyệt đổi CRLF thành LF. Nên nạp file `.txt` để giữ nguyên byte trước khi khóa.
- Nhân vật và bối cảnh chỉ ghi **tên ảnh tham chiếu đã map**; ứng dụng không tạo hay lưu mã tham chiếu của nhà cung cấp.

## Đồng bộ nhóm (Supabase của SNAKE OPS)

Dự án có thể lưu lên Supabase của SNAKE OPS để nhiều người cùng làm. Mặc định vẫn chỉ lưu trên trình duyệt.

### Trạng thái

| Phần | Trạng thái |
|---|---|
| `supabase/sql/004_pop_shared_projects.sql` | **Bản nháp đã review, CHƯA áp dụng vào project nào.** Theo `docs/SUPABASE_DEV_GATE.md` của OPS, chỉ áp dụng sau khi project DEV riêng của SNAKE OPS được xác nhận. |
| Kiểm thử RLS/RPC trên PostgreSQL 16 cục bộ | **Đã chạy**: 27 khẳng định đạt, trên môi trường giả lập Supabase với file lõi OPS `001_ops_core.sql`. Một đột biến cố ý (nới quyền ghi trực tiếp) bị bộ test bắt được. |
| Kiểm tra tĩnh bất biến bảo mật | Đã chạy (8 ca). |
| Logic revision/xung đột (`shared-store.js`) | Đã chạy (7 ca Node). |
| Kết nối trình duyệt (`shared.js`) | Viết xong, **chưa chạy với Supabase thật** (chưa có project, chưa có email đăng nhập). |
| Live RLS và E2E trên project DEV | **Chưa chạy.** Cần project DEV đã xác nhận. |

### Thiết kế

- Quyền lấy từ `organization_members` của OPS (không dùng `user_metadata`). Bảng `pop_projects` lưu toàn bộ dự án dạng jsonb kèm `revision`.
- Bảng và hàm không có quyền ghi trực tiếp; mọi thay đổi qua RPC `pop_create_project`, `pop_save_project`, `pop_delete_project` có kiểm quyền và kiểm revision.
- Vai trò: đọc là mọi thành viên; ghi là mọi vai trò trừ `VIEWER`; xóa và mở khóa nguồn là quản lý (`EXECUTIVE`, `OPS_MANAGER`, `TEAM_LEAD`); chuyển cảnh sang "Đã duyệt" là người duyệt (`QA` trở lên) và cảnh phải có QC đủ 5 mục đạt, có take đã chọn và take đạt.
- Mọi thay đổi ghi vào `pop_project_events` (chỉ thêm, có trigger chặn sửa và xóa).
- Xung đột: `REVISION_CONFLICT` khi base khác revision hiện tại. Khi tải bản nhóm, bản local được lưu thành checkpoint trước.

### Giới hạn đã biết

- Ghi là thủ công (nút "Lưu dự án đang mở lên nhóm"), không tự đồng bộ.
- Mỗi lần lưu ghi cả dự án; không gộp thay đổi từng trường. Hai người sửa cùng dự án sẽ có một người phải tải bản nhóm.
- Checkpoint vẫn chỉ nằm trên trình duyệt, chưa lên máy chủ.
- Kiểm tra server chỉ bao quát các luật diễn đạt được bằng SQL (quyền, revision, QC tối thiểu của cảnh đã duyệt). Luật nghiệp vụ đầy đủ vẫn nằm ở `core.js`.
- Theo quy tắc của OPS, mọi migration phải tạo bằng `supabase migration new <tên>` và qua Supabase advisors trước khi dùng.

### Cách bật (khi project DEV đã xác nhận)

1. Đặt `SUPABASE_PROJECT_ID`, cài Supabase CLI hiện hành.
2. `supabase migration new pop_shared_projects`, copy `004_pop_shared_projects.sql` vào migration vừa tạo (không tự đặt timestamp).
3. Áp dụng vào DEV; chạy security và performance advisors.
4. Điền `config.js` bằng URL và khóa **anon/publishable** của project DEV. Không đặt khóa service_role.
5. Tạo người dùng thử và membership trong `organization_members`; đăng nhập qua email rồi thử luồng lưu/tải/xung đột.
6. Chạy lại `supabase/tests/run-local-db.sh` và viết kiểm thử RLS chạy trên DEV trước khi dùng thật.

Chạy kiểm thử cục bộ:

```bash
OPS_REPO=/duong/dan/snake-control-center PGHOST=127.0.0.1 PGPORT=5432 ./supabase/tests/run-local-db.sh
node --test tests/shared-store.test.js supabase/tests/pop-static.test.mjs
```

## Cấu trúc

```
snake-production-os/
├── index.html        # khung trang
├── styles.css        # giao diện, có chế độ tối và bố cục điện thoại
├── core.js           # logic thuần: phân cảnh, prompt, continuity, cổng, xuất file
├── app.js            # giao diện tiếng Việt, trạng thái, sự kiện
├── shared-store.js   # logic revision/xung đột cho đồng bộ nhóm (thuần)
├── shared.js         # kết nối Supabase (chỉ tải khi có config.js)
├── config.js         # cấu hình Supabase (mặc định trống)
├── supabase/sql/004_pop_shared_projects.sql   # bản nháp, chưa áp dụng
├── supabase/tests/   # kiểm thử RLS/RPC cục bộ và kiểm tra tĩnh
├── tests/core.test.js
├── tests/shared-store.test.js
└── README.md
```

## Hướng phát triển đề xuất

1. Áp dụng đồng bộ nhóm vào project DEV của SNAKE OPS khi được xác nhận (xem mục Đồng bộ nhóm).
2. Adapter model: chỉ thêm khi đã kiểm tài khoản, API và giới hạn thật của từng model.
3. Đo thời lượng TTS thật theo chunk, và chỉ khóa voice sau khi nghe duyệt phát âm.
4. Tích hợp dần các module đã có (Batch Video Director, ArcReel) qua hợp đồng dữ liệu một chiều trước.
