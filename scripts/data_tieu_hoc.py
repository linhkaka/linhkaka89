"""Tiểu học (lớp 1–5). Căn cứ: Chương trình GDPT 2018 môn Toán; thứ tự chủ đề tham khảo bộ SGK
"Kết nối tri thức với cuộc sống". Tên chủ đề là tóm lược, CẦN GIÁO VIÊN ĐỐI CHIẾU với sách đang dùng."""
from vnlib import T, N, C, S

# ----------------------------------------------------------------- Lớp 1
T('1_01', 'Các số từ 0 đến 10', 'Chủ đề 1. Các số từ 0 đến 10', 'so',
  'Đếm, đọc, viết các số từ 0 đến 10; nhận biết số lượng của một nhóm đồ vật.', [], [
    N('b', 'Số liền sau của 4 là số nào?', '5', 'Đếm tiếp sau 4 là 5.', '4+1'),
    N('s', 'Số liền trước của 10 là số nào?', '9', 'Số đứng ngay trước 10 là 9.', '10-1'),
    N('c', 'Có 3 quả cam và 4 quả táo. Tất cả có bao nhiêu quả? (đếm hết)', '7', 'Đếm tất cả: 3 + 4 = 7.', '3+4'),
  ], kind='conceptual')
T('1_02', 'So sánh các số trong phạm vi 10', 'Chủ đề 1. Các số từ 0 đến 10', 'so',
  'Dùng dấu >, <, = để so sánh hai số trong phạm vi 10.', ['1_01'], [
    C('b', 'Chọn dấu thích hợp: 7 ... 5', ['>', '<', '='], 'A', '7 lớn hơn 5 nên 7 > 5.'),
    N('s', 'Số lớn nhất trong các số 3, 9, 6, 8 là số nào?', '9', 'So sánh lần lượt, 9 là lớn nhất.'),
    N('c', 'Có bao nhiêu số lớn hơn 6 và nhỏ hơn 10?', '3', 'Đó là 7, 8, 9.'),
  ], kind='conceptual')
T('1_03', 'Nhận biết hình vuông, hình tròn, hình tam giác, hình chữ nhật', 'Chủ đề 2. Làm quen với một số hình phẳng', 'hinh',
  'Nhận dạng và gọi tên các hình phẳng đơn giản qua đồ vật thật.', [], [
    C('b', 'Mặt đồng hồ treo tường thường có dạng hình gì?', ['Hình tròn', 'Hình vuông', 'Hình tam giác'], 'A', 'Mặt đồng hồ tròn.'),
    N('s', 'Một hình tam giác có mấy cạnh?', '3', 'Tam giác có 3 cạnh, 3 đỉnh.'),
    C('c', 'Hình nào có 4 cạnh dài bằng nhau và 4 góc vuông?', ['Hình chữ nhật dài', 'Hình vuông', 'Hình tròn'], 'B', 'Đó là hình vuông.'),
  ], kind='conceptual')
T('1_04', 'Phép cộng trong phạm vi 10', 'Chủ đề 3. Phép cộng, phép trừ trong phạm vi 10', 'so',
  'Thực hiện phép cộng hai số có tổng không quá 10; hiểu ý nghĩa "gộp lại", "thêm vào".', ['1_01'], [
    N('b', 'Tính: 3 + 2 = ?', '5', '3 thêm 2 là 5.', '3+2'),
    N('s', 'Tính: 6 + 4 = ?', '10', '6 + 4 = 10.', '6+4'),
    N('c', 'Điền số: 5 + ... = 9', '4', 'Vì 5 + 4 = 9.', '9-5'),
  ])
T('1_05', 'Phép trừ trong phạm vi 10', 'Chủ đề 3. Phép cộng, phép trừ trong phạm vi 10', 'so',
  'Thực hiện phép trừ trong phạm vi 10; hiểu ý nghĩa "bớt đi", "tách ra".', ['1_04'], [
    N('b', 'Tính: 7 − 3 = ?', '4', '7 bớt 3 còn 4.', '7-3'),
    N('s', 'Tính: 10 − 6 = ?', '4', '10 − 6 = 4.', '10-6'),
    N('c', 'Lan có 9 cái kẹo, cho bạn 5 cái. Lan còn mấy cái kẹo?', '4', '9 − 5 = 4.', '9-5'),
  ])
T('1_06', 'Các số đến 100: chục và đơn vị', 'Chủ đề 4. Các số trong phạm vi 100', 'so',
  'Đọc, viết, phân tích số có hai chữ số thành chục và đơn vị.', ['1_01'], [
    N('b', 'Số gồm 3 chục và 5 đơn vị là số nào?', '35', '3 chục = 30, thêm 5 đơn vị là 35.', '30+5'),
    N('s', 'Số 72 gồm mấy chục? (chỉ ghi số chục)', '7', '72 = 7 chục và 2 đơn vị.'),
    N('c', 'Số tròn chục lớn nhất có hai chữ số là số nào?', '90', 'Các số tròn chục: 10, 20, …, 90.'),
  ], kind='conceptual')
T('1_07', 'So sánh số có hai chữ số', 'Chủ đề 4. Các số trong phạm vi 100', 'so',
  'So sánh hai số có hai chữ số dựa vào hàng chục rồi hàng đơn vị.', ['1_06', '1_02'], [
    C('b', 'Chọn dấu: 45 ... 54', ['>', '<', '='], 'B', 'Hàng chục 4 < 5 nên 45 < 54.'),
    N('s', 'Số bé nhất trong 67, 76, 61, 70 là số nào?', '61', 'Hàng chục 6 bé nhất có 67, 61; so hàng đơn vị: 61.'),
    N('c', 'Số lớn nhất có hai chữ số khác nhau là số nào?', '98', 'Chục lớn nhất là 9, đơn vị lớn nhất khác 9 là 8.'),
  ])
T('1_08', 'Độ dài và đo độ dài bằng xăng-ti-mét', 'Chủ đề 5. Độ dài và đo độ dài', 'hinh',
  'So sánh dài hơn, ngắn hơn; đo độ dài bằng thước có vạch chia xăng-ti-mét.', ['1_06'], [
    C('b', 'Bút chì dài 15 cm, thước dài 20 cm. Vật nào dài hơn?', ['Bút chì', 'Thước kẻ', 'Bằng nhau'], 'B', '20 cm > 15 cm.'),
    N('s', 'Đoạn thẳng AB dài 8 cm, đoạn CD dài 5 cm. AB dài hơn CD bao nhiêu xăng-ti-mét?', '3', '8 − 5 = 3 (cm).', '8-5', accept=['3 cm']),
    N('c', 'Nối hai đoạn dây dài 12 cm và 7 cm thành một đoạn (không chồng lên nhau). Đoạn mới dài bao nhiêu xăng-ti-mét?', '19', '12 + 7 = 19 (cm).', '12+7', accept=['19 cm']),
  ])
T('1_09', 'Cộng, trừ (không nhớ) trong phạm vi 100', 'Chủ đề 6. Phép cộng, phép trừ (không nhớ) trong phạm vi 100', 'so',
  'Đặt tính và tính cộng, trừ số có hai chữ số không nhớ.', ['1_06', '1_04', '1_05'], [
    N('b', 'Tính: 23 + 15 = ?', '38', 'Cộng đơn vị 3 + 5 = 8, chục 2 + 1 = 3.', '23+15'),
    N('s', 'Tính: 86 − 34 = ?', '52', '6 − 4 = 2; 8 − 3 = 5.', '86-34'),
    N('c', 'Một lớp có 35 học sinh, trong đó có 13 bạn nam. Lớp đó có bao nhiêu bạn nữ?', '22', '35 − 13 = 22.', '35-13'),
  ])
T('1_10', 'Xem giờ đúng; các ngày trong tuần', 'Chủ đề 7. Thời gian, giờ và lịch', 'hinh',
  'Đọc giờ đúng trên đồng hồ; biết một tuần có 7 ngày và thứ tự các ngày.', ['1_01'], [
    N('b', 'Một tuần lễ có mấy ngày?', '7', 'Thứ Hai đến Chủ nhật: 7 ngày.'),
    C('s', 'Kim ngắn chỉ số 3, kim dài chỉ số 12. Đồng hồ chỉ mấy giờ?', ['12 giờ', '3 giờ', '3 giờ 12 phút'], 'B', 'Kim dài chỉ 12 là giờ đúng, kim ngắn chỉ giờ: 3 giờ.'),
    C('c', 'Hôm nay là thứ Sáu. Ngày mai là thứ mấy?', ['Thứ Năm', 'Thứ Bảy', 'Chủ nhật'], 'B', 'Sau thứ Sáu là thứ Bảy.'),
  ], kind='conceptual')

# ----------------------------------------------------------------- Lớp 2
T('2_01', 'Số hạng – tổng; số bị trừ – số trừ – hiệu; tia số', 'Chủ đề 1. Ôn tập và bổ sung', 'so',
  'Gọi đúng tên thành phần phép cộng, phép trừ; đọc số trên tia số; số liền trước, liền sau.', ['1_07', '1_09'], [
    N('b', 'Trong phép tính 15 + 4 = 19, tổng là số nào?', '19', 'Kết quả phép cộng gọi là tổng.'),
    N('s', 'Tìm hiệu, biết số bị trừ là 58 và số trừ là 26.', '32', '58 − 26 = 32.', '58-26'),
    N('c', 'Tổng của số liền trước và số liền sau của 40 là bao nhiêu?', '80', '39 + 41 = 80.', '39+41'),
  ], kind='conceptual')
T('2_02', 'Phép cộng (qua 10) trong phạm vi 20', 'Chủ đề 2. Phép cộng, phép trừ trong phạm vi 20', 'so',
  'Cộng có nhớ trong phạm vi 20 bằng cách "làm tròn 10".', ['1_04'], [
    N('b', 'Tính: 8 + 5 = ?', '13', '8 + 2 = 10, thêm 3 là 13.', '8+5'),
    N('s', 'Tính: 9 + 7 = ?', '16', '9 + 1 = 10, thêm 6 là 16.', '9+7'),
    N('c', 'Tính: 6 + 7 + 4 = ?', '17', 'Gộp 6 + 4 = 10 trước rồi cộng 7.', '6+7+4'),
  ])
T('2_03', 'Phép trừ (qua 10) trong phạm vi 20', 'Chủ đề 2. Phép cộng, phép trừ trong phạm vi 20', 'so',
  'Trừ có nhớ trong phạm vi 20 bằng cách tách về 10.', ['2_02', '1_05'], [
    N('b', 'Tính: 12 − 5 = ?', '7', '12 − 2 = 10, 10 − 3 = 7.', '12-5'),
    N('s', 'Tính: 15 − 8 = ?', '7', '15 − 5 = 10, 10 − 3 = 7.', '15-8'),
    N('c', 'Có 17 con gà, bán đi 9 con. Còn lại bao nhiêu con gà?', '8', '17 − 9 = 8.', '17-9'),
  ])
T('2_04', 'Ki-lô-gam, lít', 'Chủ đề 3. Làm quen với khối lượng, dung tích', 'hinh',
  'Nhận biết đơn vị ki-lô-gam (kg) và lít (l); cộng trừ số đo kèm đơn vị.', ['1_09'], [
    N('b', 'Bao gạo 5 kg và bao đường 2 kg. Cả hai bao nặng bao nhiêu ki-lô-gam?', '7', '5 + 2 = 7 (kg).', '5+2', accept=['7 kg']),
    N('s', 'Can có 10 l nước, đã dùng 4 l. Can còn bao nhiêu lít nước?', '6', '10 − 4 = 6 (l).', '10-4', accept=['6 l', '6 lít']),
    C('c', 'Đơn vị nào thích hợp để đo lượng nước trong một chiếc xô?', ['ki-lô-gam', 'lít', 'xăng-ti-mét'], 'B', 'Lượng chất lỏng đo bằng lít.'),
  ])
T('2_05', 'Phép cộng có nhớ trong phạm vi 100', 'Chủ đề 4. Phép cộng, phép trừ (có nhớ) trong phạm vi 100', 'so',
  'Đặt tính và cộng số có hai chữ số có nhớ.', ['2_02', '1_09'], [
    N('b', 'Tính: 36 + 7 = ?', '43', '6 + 7 = 13, viết 3 nhớ 1; 3 thêm 1 là 4.', '36+7'),
    N('s', 'Tính: 48 + 35 = ?', '83', '8 + 5 = 13 viết 3 nhớ 1; 4 + 3 + 1 = 8.', '48+35'),
    N('c', 'Thùng thứ nhất có 27 l dầu, thùng thứ hai nhiều hơn thùng thứ nhất 18 l. Thùng thứ hai có bao nhiêu lít?', '45', '27 + 18 = 45 (l).', '27+18', accept=['45 l']),
  ])
T('2_06', 'Phép trừ có nhớ trong phạm vi 100', 'Chủ đề 4. Phép cộng, phép trừ (có nhớ) trong phạm vi 100', 'so',
  'Đặt tính và trừ số có hai chữ số có nhớ.', ['2_03', '2_05'], [
    N('b', 'Tính: 52 − 8 = ?', '44', '12 − 8 = 4 viết 4 nhớ 1; 5 − 1 = 4.', '52-8'),
    N('s', 'Tính: 71 − 36 = ?', '35', '11 − 6 = 5 nhớ 1; 7 − 3 − 1 = 3.', '71-36'),
    N('c', 'Tìm số, biết số đó cộng với 29 thì được 64.', '35', 'Số cần tìm = 64 − 29 = 35.', '64-29'),
  ])
T('2_07', 'Điểm, đoạn thẳng, đường gấp khúc', 'Chủ đề 5. Làm quen với hình phẳng', 'hinh',
  'Nhận biết điểm, đoạn thẳng, đường thẳng, đường gấp khúc; tính độ dài đường gấp khúc.', ['1_08', '2_05'], [
    N('b', 'Đường gấp khúc ABC có AB = 3 cm, BC = 4 cm. Độ dài đường gấp khúc là bao nhiêu xăng-ti-mét?', '7', '3 + 4 = 7 (cm).', '3+4', accept=['7 cm']),
    N('s', 'Đường gấp khúc gồm 3 đoạn dài 12 cm, 15 cm và 9 cm. Độ dài đường gấp khúc là bao nhiêu xăng-ti-mét?', '36', '12 + 15 + 9 = 36.', '12+15+9', accept=['36 cm']),
    N('c', 'Qua hai điểm phân biệt A và B kẻ được bao nhiêu đường thẳng?', '1', 'Có duy nhất một đường thẳng đi qua hai điểm.'),
  ], kind='conceptual')
T('2_08', 'Ngày – giờ, giờ – phút; ngày – tháng', 'Chủ đề 6. Ngày – giờ, giờ – phút, ngày – tháng', 'hinh',
  'Biết 1 ngày = 24 giờ, 1 giờ = 60 phút; đọc giờ khi kim dài chỉ số 3, số 6; xem lịch tháng.', ['1_10'], [
    N('b', 'Một ngày có bao nhiêu giờ?', '24', '1 ngày = 24 giờ.'),
    N('s', 'Một giờ có bao nhiêu phút?', '60', '1 giờ = 60 phút.'),
    C('c', '8 giờ tối còn gọi là mấy giờ?', ['18 giờ', '20 giờ', '22 giờ'], 'B', '8 + 12 = 20 giờ.'),
  ])
T('2_09', 'Phép nhân; bảng nhân 2, bảng nhân 5', 'Chủ đề 7. Phép nhân, phép chia', 'so',
  'Hiểu phép nhân là tổng các số hạng bằng nhau; thuộc bảng nhân 2, 5.', ['2_05'], [
    N('b', 'Tính: 2 × 6 = ?', '12', '2 được lấy 6 lần là 12.', '2*6'),
    N('s', 'Tính: 5 × 7 = ?', '35', 'Bảng nhân 5: 5 × 7 = 35.', '5*7'),
    N('c', 'Mỗi con gà có 2 chân. 9 con gà có tất cả bao nhiêu chân?', '18', '2 × 9 = 18.', '2*9'),
  ])
T('2_10', 'Phép chia; bảng chia 2, bảng chia 5', 'Chủ đề 7. Phép nhân, phép chia', 'so',
  'Hiểu phép chia là chia đều; thuộc bảng chia 2, 5; quan hệ giữa nhân và chia.', ['2_09'], [
    N('b', 'Tính: 10 : 2 = ?', '5', 'Vì 2 × 5 = 10.', '10/2'),
    N('s', 'Tính: 45 : 5 = ?', '9', 'Vì 5 × 9 = 45.', '45/5'),
    N('c', 'Có 40 quyển vở chia đều cho 5 bạn. Mỗi bạn được mấy quyển vở?', '8', '40 : 5 = 8.', '40/5'),
  ])
T('2_11', 'Các số trong phạm vi 1000', 'Chủ đề 8. Các số trong phạm vi 1000', 'so',
  'Đọc, viết, so sánh số có ba chữ số; phân tích theo trăm, chục, đơn vị.', ['1_07'], [
    N('b', 'Số gồm 4 trăm, 0 chục và 6 đơn vị là số nào?', '406', '400 + 0 + 6 = 406.', '400+6'),
    N('s', 'Số liền sau của 599 là số nào?', '600', '599 + 1 = 600.', '599+1'),
    N('c', 'Số bé nhất có ba chữ số khác nhau là số nào?', '102', 'Trăm nhỏ nhất là 1, sau đó 0 rồi 2.'),
  ], kind='conceptual')
T('2_12', 'Đơn vị đo độ dài: mét, đề-xi-mét, ki-lô-mét, mi-li-mét', 'Chủ đề 9. Độ dài và đơn vị đo độ dài', 'hinh',
  'Biết 1 m = 10 dm = 100 cm, 1 dm = 10 cm, 1 km = 1000 m, 1 cm = 10 mm; đổi đơn vị đơn giản.', ['1_08', '2_11'], [
    N('b', '1 dm bằng bao nhiêu xăng-ti-mét?', '10', '1 dm = 10 cm.'),
    N('s', '3 m bằng bao nhiêu xăng-ti-mét?', '300', '1 m = 100 cm nên 3 m = 300 cm.', '3*100'),
    N('c', 'Đổi 2 km = ... m', '2000', '1 km = 1000 m.', '2*1000'),
  ])
T('2_13', 'Phép cộng, phép trừ trong phạm vi 1000', 'Chủ đề 10. Phép cộng, phép trừ trong phạm vi 1000', 'so',
  'Đặt tính và tính cộng, trừ (có nhớ) số có ba chữ số.', ['2_11', '2_06'], [
    N('b', 'Tính: 324 + 152 = ?', '476', 'Cộng từng hàng.', '324+152'),
    N('s', 'Tính: 703 − 258 = ?', '445', 'Trừ có nhớ: 703 − 258 = 445.', '703-258'),
    N('c', 'Trường có 465 học sinh nữ, số học sinh nam ít hơn số nữ 38 bạn. Trường có tất cả bao nhiêu học sinh?', '892', 'Nam: 465 − 38 = 427; tổng 465 + 427 = 892.', '465+465-38'),
  ])
T('2_14', 'Thu thập, kiểm đếm số liệu; biểu đồ tranh; có thể – chắc chắn – không thể', 'Chủ đề 11. Làm quen với yếu tố thống kê, xác suất', 'tk',
  'Kiểm đếm, đọc biểu đồ tranh; mô tả khả năng xảy ra bằng "có thể", "chắc chắn", "không thể".', ['1_06'], [
    C('b', 'Trong hộp chỉ có bi đỏ. Lấy ra một viên bi, viên bi đó ... là màu đỏ.', ['chắc chắn', 'có thể', 'không thể'], 'A', 'Hộp chỉ có bi đỏ.'),
    N('s', 'Biểu đồ tranh: mỗi hình ☺ là 1 bạn. Hàng "thích bóng đá" có 6 hình ☺, hàng "thích bơi" có 4 hình ☺. Số bạn thích bóng đá nhiều hơn thích bơi là bao nhiêu?', '2', '6 − 4 = 2.', '6-4'),
    C('c', 'Tung một đồng xu. Việc đồng xu xuất hiện mặt sấp là sự kiện:', ['chắc chắn', 'có thể', 'không thể'], 'B', 'Có thể sấp, có thể ngửa.'),
  ], kind='conceptual')

# ----------------------------------------------------------------- Lớp 3
T('3_01', 'Bảng nhân 3, 4, 6, 7, 8, 9', 'Chủ đề 1. Ôn tập và bổ sung; Chủ đề 2. Bảng nhân, bảng chia', 'so',
  'Thuộc và vận dụng các bảng nhân từ 2 đến 9.', ['2_09'], [
    N('b', 'Tính: 3 × 8 = ?', '24', 'Bảng nhân 3.', '3*8'),
    N('s', 'Tính: 7 × 6 = ?', '42', 'Bảng nhân 7.', '7*6'),
    N('c', 'Mỗi hộp có 9 cái bánh. 8 hộp như thế có bao nhiêu cái bánh?', '72', '9 × 8 = 72.', '9*8'),
  ])
T('3_02', 'Bảng chia 3, 4, 6, 7, 8, 9', 'Chủ đề 2. Bảng nhân, bảng chia', 'so',
  'Thuộc các bảng chia; dùng quan hệ nhân – chia để tính.', ['3_01', '2_10'], [
    N('b', 'Tính: 24 : 4 = ?', '6', 'Vì 4 × 6 = 24.', '24/4'),
    N('s', 'Tính: 63 : 7 = ?', '9', 'Vì 7 × 9 = 63.', '63/7'),
    N('c', 'Có 56 học sinh xếp đều thành 8 hàng. Mỗi hàng có bao nhiêu học sinh?', '7', '56 : 8 = 7.', '56/8'),
  ])
T('3_03', 'Tìm thành phần chưa biết của phép tính', 'Chủ đề 2. Bảng nhân, bảng chia', 'so',
  'Tìm số hạng, số bị trừ, số trừ, thừa số, số bị chia, số chia chưa biết.', ['3_02'], [
    N('b', 'Tìm x, biết x × 4 = 32.', '8', 'x = 32 : 4 = 8.', '32/4'),
    N('s', 'Tìm x, biết x : 6 = 7.', '42', 'Số bị chia = thương × số chia = 7 × 6.', '7*6'),
    N('c', 'Tìm x, biết 81 : x = 9.', '9', 'Số chia = số bị chia : thương = 81 : 9.', '81/9'),
  ])
T('3_04', 'Gấp một số lên nhiều lần, giảm một số đi một số lần', 'Chủ đề 2. Bảng nhân, bảng chia', 'so',
  'Phân biệt "gấp lên" (nhân), "giảm đi" (chia) với "nhiều hơn", "ít hơn".', ['3_01', '3_02'], [
    N('b', 'Gấp 6 lên 3 lần được bao nhiêu?', '18', '6 × 3 = 18.', '6*3'),
    N('s', 'Giảm 48 đi 6 lần được bao nhiêu?', '8', '48 : 6 = 8.', '48/6'),
    N('c', 'Mẹ 36 tuổi, tuổi con bằng tuổi mẹ giảm đi 4 lần. Con bao nhiêu tuổi?', '9', '36 : 4 = 9.', '36/4'),
  ])
T('3_05', 'Góc vuông, góc không vuông; hình tròn: tâm, bán kính, đường kính', 'Chủ đề 3. Làm quen với hình phẳng, hình khối', 'hinh',
  'Dùng ê-ke nhận biết góc vuông; nhận biết tâm, bán kính, đường kính của hình tròn.', ['1_03', '2_07'], [
    N('b', 'Hình vuông có mấy góc vuông?', '4', 'Cả 4 góc của hình vuông đều vuông.'),
    N('s', 'Hình tròn có bán kính 5 cm. Đường kính dài bao nhiêu xăng-ti-mét?', '10', 'Đường kính = 2 × bán kính.', '2*5', accept=['10 cm']),
    N('c', 'Đường kính của hình tròn là 18 cm. Bán kính dài bao nhiêu xăng-ti-mét?', '9', 'Bán kính = đường kính : 2.', '18/2', accept=['9 cm']),
  ], kind='conceptual')
T('3_06', 'Nhân số có hai, ba chữ số với số có một chữ số', 'Chủ đề 4. Phép nhân, phép chia trong phạm vi 100', 'so',
  'Đặt tính và nhân có nhớ số có hai, ba chữ số với số có một chữ số.', ['3_01', '2_13'], [
    N('b', 'Tính: 23 × 3 = ?', '69', '3 × 3 = 9; 2 × 3 = 6.', '23*3'),
    N('s', 'Tính: 47 × 6 = ?', '282', '7 × 6 = 42 viết 2 nhớ 4; 4 × 6 + 4 = 28.', '47*6'),
    N('c', 'Tính: 128 × 7 = ?', '896', '128 × 7 = 896.', '128*7'),
  ])
T('3_07', 'Chia cho số có một chữ số; phép chia có dư', 'Chủ đề 4. Phép nhân, phép chia trong phạm vi 100', 'so',
  'Đặt tính chia số có hai, ba chữ số cho số có một chữ số; hiểu số dư luôn bé hơn số chia.', ['3_02', '3_06'], [
    N('b', 'Tính: 84 : 4 = ?', '21', '8 : 4 = 2; 4 : 4 = 1.', '84/4'),
    N('s', 'Chia 29 cho 4 được thương là 7. Số dư là bao nhiêu?', '1', '29 = 4 × 7 + 1.', '29-4*7'),
    N('c', 'Tính: 756 : 6 = ?', '126', '756 : 6 = 126.', '756/6'),
  ])
T('3_08', 'Biểu thức số; tính giá trị biểu thức', 'Chủ đề 5. Biểu thức số', 'so',
  'Tính giá trị biểu thức theo thứ tự: trong ngoặc trước, nhân chia trước cộng trừ sau.', ['3_06', '3_07'], [
    N('b', 'Tính: 20 + 5 × 4 = ?', '40', 'Nhân trước: 5 × 4 = 20, rồi 20 + 20.', '20+5*4'),
    N('s', 'Tính: (20 + 5) × 4 = ?', '100', 'Trong ngoặc trước: 25 × 4.', '(20+5)*4'),
    N('c', 'Tính: 90 − 36 : 6 × 2 = ?', '78', '36 : 6 = 6; 6 × 2 = 12; 90 − 12 = 78.', '90-36/6*2'),
  ])
T('3_09', 'Mi-li-mét, gam, mi-li-lít, nhiệt độ', 'Chủ đề 6. Đơn vị đo', 'hinh',
  'Biết 1 cm = 10 mm, 1 kg = 1000 g, 1 l = 1000 ml; đọc nhiệt độ (°C).', ['2_12', '2_04'], [
    N('b', '1 kg bằng bao nhiêu gam?', '1000', '1 kg = 1000 g.'),
    N('s', '2 l bằng bao nhiêu mi-li-lít?', '2000', '1 l = 1000 ml.', '2*1000'),
    N('c', 'Quả táo nặng 250 g, quả lê nặng 320 g. Cả hai quả nặng bao nhiêu gam?', '570', '250 + 320 = 570.', '250+320', accept=['570 g']),
  ])
T('3_10', 'Các số đến 10 000 và 100 000; làm tròn số', 'Chủ đề 7. Các số đến 10 000, 100 000', 'so',
  'Đọc, viết, so sánh số có bốn, năm chữ số; làm tròn đến hàng chục, trăm, nghìn.', ['2_11'], [
    N('b', 'Số gồm 3 nghìn, 4 trăm, 0 chục, 5 đơn vị là số nào?', '3405', '3000 + 400 + 5.', '3000+400+5'),
    N('s', 'Làm tròn số 4 872 đến hàng trăm.', '4900', 'Chữ số hàng chục là 7 ≥ 5 nên làm tròn lên.', accept=['4 900']),
    N('c', 'Số lớn nhất có năm chữ số khác nhau là số nào?', '98765', 'Chọn lần lượt 9, 8, 7, 6, 5.', accept=['98 765']),
  ], kind='conceptual')
T('3_11', 'Chu vi hình tam giác, tứ giác, hình chữ nhật, hình vuông', 'Chủ đề 8. Chu vi, diện tích một số hình phẳng', 'hinh',
  'Tính chu vi bằng tổng độ dài các cạnh; công thức chu vi hình chữ nhật và hình vuông.', ['2_07', '3_06'], [
    N('b', 'Hình vuông có cạnh 6 cm. Chu vi bằng bao nhiêu xăng-ti-mét?', '24', '6 × 4 = 24.', '6*4', accept=['24 cm']),
    N('s', 'Hình chữ nhật có chiều dài 9 cm, chiều rộng 5 cm. Chu vi bằng bao nhiêu xăng-ti-mét?', '28', '(9 + 5) × 2 = 28.', '(9+5)*2', accept=['28 cm']),
    N('c', 'Một hình vuông có chu vi 36 cm. Cạnh hình vuông dài bao nhiêu xăng-ti-mét?', '9', '36 : 4 = 9.', '36/4', accept=['9 cm']),
  ])
T('3_12', 'Diện tích; xăng-ti-mét vuông; diện tích hình chữ nhật, hình vuông', 'Chủ đề 8. Chu vi, diện tích một số hình phẳng', 'hinh',
  'Hiểu diện tích, đơn vị cm²; tính diện tích hình chữ nhật (dài × rộng) và hình vuông (cạnh × cạnh).', ['3_11', '3_01'], [
    N('b', 'Hình vuông cạnh 5 cm có diện tích bao nhiêu xăng-ti-mét vuông?', '25', '5 × 5 = 25 (cm²).', '5*5', accept=['25 cm2', '25 cm²']),
    N('s', 'Hình chữ nhật dài 8 cm, rộng 6 cm có diện tích bao nhiêu xăng-ti-mét vuông?', '48', '8 × 6 = 48.', '8*6', accept=['48 cm²']),
    N('c', 'Hình chữ nhật có diện tích 63 cm², chiều rộng 7 cm. Chiều dài bao nhiêu xăng-ti-mét?', '9', '63 : 7 = 9.', '63/7', accept=['9 cm']),
  ])
T('3_13', 'Cộng, trừ, nhân, chia trong phạm vi 100 000', 'Chủ đề 9. Phép tính trong phạm vi 100 000', 'so',
  'Đặt tính và tính với số có năm chữ số; nhân, chia cho số có một chữ số.', ['3_10', '3_07'], [
    N('b', 'Tính: 23 456 + 12 321 = ?', '35777', 'Cộng từng hàng.', '23456+12321', accept=['35 777']),
    N('s', 'Tính: 12 304 × 3 = ?', '36912', '12 304 × 3 = 36 912.', '12304*3', accept=['36 912']),
    N('c', 'Tính: 48 125 : 5 = ?', '9625', '48 125 : 5 = 9 625.', '48125/5', accept=['9 625']),
  ])
T('3_14', 'Tiền Việt Nam', 'Chủ đề 10. Tiền Việt Nam', 'hinh',
  'Nhận biết các mệnh giá tiền; tính toán đơn giản với tiền (đồng).', ['3_10'], [
    N('b', 'Một quyển vở giá 8 000 đồng, một cái bút giá 5 000 đồng. Mua cả hai hết bao nhiêu đồng?', '13000', '8 000 + 5 000 = 13 000.', '8000+5000', accept=['13 000', '13.000 đồng', '13 000 đồng']),
    N('s', 'Đưa tờ 20 000 đồng để trả 14 500 đồng. Được trả lại bao nhiêu đồng?', '5500', '20 000 − 14 500 = 5 500.', '20000-14500', accept=['5 500', '5.500 đồng']),
    N('c', 'Mua 3 hộp sữa, mỗi hộp 7 500 đồng. Phải trả bao nhiêu đồng?', '22500', '7 500 × 3 = 22 500.', '7500*3', accept=['22 500', '22.500 đồng']),
  ])
T('3_15', 'Bảng số liệu thống kê; khả năng xảy ra của một sự kiện', 'Chủ đề 11. Làm quen với yếu tố thống kê, xác suất', 'tk',
  'Đọc, mô tả bảng số liệu; nhận xét khả năng xảy ra (có thể, chắc chắn, không thể).', ['2_14'], [
    N('b', 'Bảng số liệu: lớp 3A có 32 bạn, 3B có 30 bạn, 3C có 35 bạn. Lớp nào đông nhất? (ghi số học sinh của lớp đó)', '35', '35 lớn nhất, đó là lớp 3C.'),
    N('s', 'Theo bảng trên, cả ba lớp có bao nhiêu học sinh?', '97', '32 + 30 + 35 = 97.', '32+30+35'),
    C('c', 'Hộp có 5 bi xanh và 1 bi đỏ. Lấy ngẫu nhiên 1 viên. Câu nào đúng?', ['Chắc chắn lấy được bi xanh', 'Không thể lấy được bi đỏ', 'Có thể lấy được bi đỏ'], 'C', 'Có bi đỏ nên có thể lấy được.'),
  ], kind='conceptual')
T('3_16', 'Tháng – năm; xem đồng hồ chính xác đến phút', 'Chủ đề 12. Thời gian', 'hinh',
  'Biết số ngày trong các tháng, 1 năm có 12 tháng; đọc giờ chính xác đến phút.', ['2_08'], [
    N('b', 'Một năm có bao nhiêu tháng?', '12', '1 năm = 12 tháng.'),
    N('s', 'Tháng 4 có bao nhiêu ngày?', '30', 'Tháng 4, 6, 9, 11 có 30 ngày.'),
    C('c', 'Đồng hồ chỉ 7 giờ 45 phút. Còn bao nhiêu phút nữa thì đến 8 giờ?', ['15 phút', '45 phút', '5 phút'], 'A', '60 − 45 = 15.'),
  ])

# ----------------------------------------------------------------- Lớp 4
T('4_01', 'Số có nhiều chữ số; hàng và lớp; lớp triệu', 'Chủ đề 2. Các số có nhiều chữ số', 'so',
  'Đọc, viết số đến lớp triệu; nêu giá trị của chữ số theo hàng.', ['3_10'], [
    N('b', 'Viết số: Ba triệu hai trăm nghìn.', '3200000', '3 000 000 + 200 000.', '3000000+200000', accept=['3 200 000']),
    N('s', 'Trong số 5 482 917, chữ số 4 có giá trị là bao nhiêu?', '400000', 'Chữ số 4 ở hàng trăm nghìn.', accept=['400 000']),
    N('c', 'Số bé nhất có bảy chữ số là số nào?', '1000000', 'Đó là 1 000 000 (một triệu).', accept=['1 000 000']),
  ], kind='conceptual')
T('4_02', 'So sánh và làm tròn số có nhiều chữ số', 'Chủ đề 2. Các số có nhiều chữ số', 'so',
  'So sánh, sắp xếp số có nhiều chữ số; làm tròn đến hàng trăm nghìn.', ['4_01'], [
    C('b', 'Chọn dấu: 1 234 567 ... 1 243 567', ['>', '<', '='], 'B', 'Khác nhau ở hàng chục nghìn: 3 < 4.'),
    N('s', 'Làm tròn 2 361 845 đến hàng trăm nghìn.', '2400000', 'Hàng chục nghìn là 6 ≥ 5 nên làm tròn lên.', accept=['2 400 000']),
    N('c', 'Làm tròn 7 549 999 đến hàng triệu.', '8000000', 'Hàng trăm nghìn là 5 ≥ 5 nên làm tròn lên.', accept=['8 000 000']),
  ])
T('4_03', 'Góc nhọn, góc tù, góc bẹt; đo góc, đơn vị độ', 'Chủ đề 3. Góc và đơn vị đo góc', 'hinh',
  'Nhận biết góc nhọn, vuông, tù, bẹt; dùng thước đo góc; đơn vị độ (°).', ['3_05'], [
    N('b', 'Góc vuông có số đo bao nhiêu độ?', '90', 'Góc vuông = 90°.', accept=['90°', '90 độ']),
    C('s', 'Góc có số đo 120° là góc gì?', ['Góc nhọn', 'Góc tù', 'Góc bẹt'], 'B', 'Lớn hơn 90° và bé hơn 180° là góc tù.'),
    N('c', 'Góc bẹt có số đo bao nhiêu độ?', '180', 'Góc bẹt = 180°.', accept=['180°']),
  ], kind='conceptual')
T('4_04', 'Hai đường thẳng vuông góc; hai đường thẳng song song', 'Chủ đề 6. Đường thẳng vuông góc, đường thẳng song song', 'hinh',
  'Nhận biết, vẽ hai đường thẳng vuông góc, song song bằng thước và ê-ke.', ['4_03'], [
    C('b', 'Hai đường thẳng vuông góc với nhau tạo thành mấy góc vuông?', ['2', '4', '1'], 'B', 'Tạo thành 4 góc vuông chung đỉnh.'),
    C('s', 'Trong hình chữ nhật ABCD, cạnh AB song song với cạnh nào?', ['BC', 'CD', 'AD'], 'B', 'Cạnh đối diện của AB là CD.'),
    C('c', 'Hai đường thẳng song song thì:', ['cắt nhau tại một điểm', 'không bao giờ cắt nhau', 'tạo thành góc vuông'], 'B', 'Đường thẳng song song không có điểm chung.'),
  ], kind='conceptual')
T('4_05', 'Cộng, trừ số có nhiều chữ số; tính chất giao hoán, kết hợp', 'Chủ đề 5. Phép cộng và phép trừ', 'so',
  'Đặt tính cộng, trừ số có nhiều chữ số; dùng tính chất giao hoán, kết hợp để tính nhanh.', ['4_01', '3_13'], [
    N('b', 'Tính: 452 318 + 247 561 = ?', '699879', 'Cộng từng hàng.', '452318+247561', accept=['699 879']),
    N('s', 'Tính: 800 000 − 356 250 = ?', '443750', 'Trừ có nhớ.', '800000-356250', accept=['443 750']),
    N('c', 'Tính nhanh: 287 + 145 + 13 + 55 = ?', '500', '(287 + 13) + (145 + 55) = 300 + 200.', '287+145+13+55'),
  ])
T('4_06', 'Nhân với số có hai chữ số; tính chất phân phối', 'Chủ đề 7. Phép nhân và phép chia', 'so',
  'Nhân với số có hai chữ số; nhân với 10, 100, 1000; tính chất a × (b + c) = a × b + a × c.', ['4_05', '3_06'], [
    N('b', 'Tính: 245 × 10 = ?', '2450', 'Thêm một chữ số 0.', '245*10'),
    N('s', 'Tính: 136 × 24 = ?', '3264', '136 × 24 = 3 264.', '136*24', accept=['3 264']),
    N('c', 'Tính nhanh: 37 × 98 + 37 × 2 = ?', '3700', '37 × (98 + 2) = 37 × 100.', '37*98+37*2', accept=['3 700']),
  ])
T('4_07', 'Chia cho số có hai chữ số', 'Chủ đề 7. Phép nhân và phép chia', 'so',
  'Đặt tính và chia cho số có hai chữ số; ước lượng thương.', ['4_06', '3_07'], [
    N('b', 'Tính: 672 : 21 = ?', '32', '21 × 32 = 672.', '672/21'),
    N('s', 'Tính: 9 750 : 25 = ?', '390', '25 × 390 = 9 750.', '9750/25'),
    N('c', 'Có 1 000 quyển sách xếp vào các hộp, mỗi hộp 24 quyển. Cần ít nhất bao nhiêu hộp?', '42', '1000 = 24 × 41 + 16, còn dư nên cần 42 hộp.'),
  ])
T('4_08', 'Số trung bình cộng', 'Chủ đề 8. Số trung bình cộng', 'so',
  'Tính trung bình cộng của nhiều số: tổng chia cho số các số hạng.', ['4_05', '4_07'], [
    N('b', 'Tìm số trung bình cộng của 12 và 18.', '15', '(12 + 18) : 2.', '(12+18)/2'),
    N('s', 'Tìm số trung bình cộng của 36, 42 và 57.', '45', '(36 + 42 + 57) : 3 = 135 : 3.', '(36+42+57)/3'),
    N('c', 'Trung bình cộng của ba số là 20. Hai số đầu là 15 và 22. Số thứ ba là bao nhiêu?', '23', 'Tổng = 60; 60 − 15 − 22 = 23.', '20*3-15-22'),
  ])
T('4_09', 'Tìm hai số khi biết tổng và hiệu', 'Chủ đề 8. Số trung bình cộng; bài toán liên quan', 'so',
  'Số lớn = (tổng + hiệu) : 2; số bé = (tổng − hiệu) : 2.', ['4_05', '3_07'], [
    N('b', 'Tổng hai số là 30, hiệu là 6. Số lớn là bao nhiêu?', '18', '(30 + 6) : 2 = 18.', '(30+6)/2'),
    N('s', 'Tổng hai số là 100, hiệu là 24. Số bé là bao nhiêu?', '38', '(100 − 24) : 2 = 38.', '(100-24)/2'),
    N('c', 'Tuổi bố và tuổi con cộng lại là 50, bố hơn con 28 tuổi. Con bao nhiêu tuổi?', '11', '(50 − 28) : 2 = 11.', '(50-28)/2'),
  ])
T('4_10', 'Yến, tạ, tấn; giây, thế kỉ', 'Chủ đề 4. Một số đơn vị đo đại lượng', 'hinh',
  '1 yến = 10 kg, 1 tạ = 100 kg, 1 tấn = 1000 kg; 1 phút = 60 giây; 1 thế kỉ = 100 năm.', ['3_09'], [
    N('b', '1 tạ bằng bao nhiêu ki-lô-gam?', '100', '1 tạ = 100 kg.'),
    N('s', '3 tấn 50 kg bằng bao nhiêu ki-lô-gam?', '3050', '3 000 + 50.', '3*1000+50', accept=['3 050']),
    N('c', '2 phút 15 giây bằng bao nhiêu giây?', '135', '2 × 60 + 15.', '2*60+15'),
  ])
T('4_11', 'Đề-xi-mét vuông, mét vuông, mi-li-mét vuông', 'Chủ đề 4. Một số đơn vị đo đại lượng', 'hinh',
  '1 dm² = 100 cm², 1 m² = 100 dm², 1 cm² = 100 mm²; đổi đơn vị diện tích.', ['3_12'], [
    N('b', '1 m² bằng bao nhiêu đề-xi-mét vuông?', '100', '1 m² = 100 dm².'),
    N('s', '5 dm² bằng bao nhiêu xăng-ti-mét vuông?', '500', '5 × 100.', '5*100'),
    N('c', '2 m² 30 dm² bằng bao nhiêu đề-xi-mét vuông?', '230', '200 + 30.', '200+30'),
  ])
T('4_12', 'Hình bình hành, hình thoi', 'Chủ đề 6. Đường thẳng vuông góc, đường thẳng song song', 'hinh',
  'Nhận biết đặc điểm hình bình hành (hai cặp cạnh đối song song, bằng nhau) và hình thoi (bốn cạnh bằng nhau).', ['4_04'], [
    C('b', 'Hình có hai cặp cạnh đối diện song song và bằng nhau là:', ['Hình bình hành', 'Hình tam giác', 'Hình tròn'], 'A', 'Đó là đặc điểm hình bình hành.'),
    N('s', 'Hình thoi có cạnh 7 cm. Chu vi hình thoi bằng bao nhiêu xăng-ti-mét?', '28', '4 cạnh bằng nhau: 7 × 4.', '7*4', accept=['28 cm']),
    C('c', 'Câu nào đúng?', ['Mọi hình bình hành đều là hình thoi', 'Hình thoi là hình bình hành có bốn cạnh bằng nhau', 'Hình thoi không có cạnh song song'], 'B', 'Hình thoi là trường hợp riêng của hình bình hành.'),
  ], kind='conceptual')
T('4_13', 'Khái niệm phân số; phân số và phép chia số tự nhiên', 'Chủ đề 10. Phân số', 'so',
  'Đọc, viết phân số; tử số, mẫu số; thương của phép chia số tự nhiên viết được dưới dạng phân số.', ['3_02'], [
    S('b', 'Viết phân số "ba phần năm".', '3/5', 'Tử số 3, mẫu số 5.'),
    S('s', 'Viết thương 7 : 9 dưới dạng phân số.', '7/9', 'a : b = a/b (b khác 0).'),
    C('c', 'Phân số nào bằng 1?', ['5/6', '6/6', '6/5'], 'B', 'Tử số bằng mẫu số thì phân số bằng 1.'),
  ], kind='conceptual')
T('4_14', 'Tính chất cơ bản của phân số; rút gọn, quy đồng mẫu số', 'Chủ đề 10. Phân số', 'so',
  'Nhân/chia cả tử và mẫu cho cùng một số khác 0; rút gọn và quy đồng mẫu số.', ['4_13', '4_07'], [
    S('b', 'Rút gọn phân số 6/8 thành phân số tối giản.', '3/4', 'Chia cả tử và mẫu cho 2.'),
    S('s', 'Rút gọn phân số 18/24 thành phân số tối giản.', '3/4', 'Chia cả tử và mẫu cho 6.'),
    N('c', 'Quy đồng mẫu số 2/3 và 3/4 với mẫu số chung là 12. Tử số mới của 2/3 là bao nhiêu?', '8', '2/3 = 8/12.', '2*4'),
  ])
T('4_15', 'So sánh phân số', 'Chủ đề 10. Phân số', 'so',
  'So sánh hai phân số cùng mẫu, khác mẫu (quy đồng), so sánh với 1.', ['4_14'], [
    C('b', 'Chọn dấu: 3/7 ... 5/7', ['>', '<', '='], 'B', 'Cùng mẫu, tử nào bé hơn thì bé hơn.'),
    C('s', 'Chọn dấu: 2/3 ... 3/5', ['>', '<', '='], 'A', '2/3 = 10/15, 3/5 = 9/15.'),
    C('c', 'Phân số nào lớn nhất?', ['5/8', '3/4', '7/12'], 'B', 'Quy đồng mẫu 24: 15/24, 18/24, 14/24.'),
  ])
T('4_16', 'Cộng, trừ phân số', 'Chủ đề 11. Phép cộng, phép trừ phân số', 'so',
  'Cộng, trừ hai phân số cùng mẫu và khác mẫu.', ['4_14'], [
    N('b', 'Tính: 2/7 + 3/7 = ?', '5/7', 'Cùng mẫu: cộng tử, giữ mẫu.', 'F(2,7)+F(3,7)'),
    N('s', 'Tính: 1/2 + 1/3 = ?', '5/6', '3/6 + 2/6 = 5/6.', 'F(1,2)+F(1,3)'),
    N('c', 'Tính: 5/6 − 3/4 = ?', '1/12', '10/12 − 9/12.', 'F(5,6)-F(3,4)'),
  ])
T('4_17', 'Nhân, chia phân số', 'Chủ đề 12. Phép nhân, phép chia phân số', 'so',
  'Nhân tử với tử, mẫu với mẫu; chia cho phân số là nhân với phân số đảo ngược.', ['4_13', '4_16~', '4_06'], [
    N('b', 'Tính: 2/3 × 4/5 = ?', '8/15', 'Tử × tử, mẫu × mẫu.', 'F(2,3)*F(4,5)'),
    N('s', 'Tính: 3/4 : 1/2 = ?', '3/2', '3/4 × 2/1 = 6/4 = 3/2.', 'F(3,4)/F(1,2)', accept=['1 1/2', '6/4']),
    N('c', 'Một tấm vải dài 3/4 m, cắt thành các mảnh dài 1/8 m. Được bao nhiêu mảnh?', '6', '3/4 : 1/8 = 6.', 'F(3,4)/F(1,8)'),
  ])
T('4_18', 'Dãy số liệu; biểu đồ cột; số lần lặp lại của một sự kiện', 'Chủ đề 13. Làm quen với yếu tố thống kê, xác suất', 'tk',
  'Đọc, mô tả dãy số liệu và biểu đồ cột; kiểm đếm số lần lặp lại của một sự kiện.', ['3_15'], [
    N('b', 'Biểu đồ cột cho số cây trồng: 4A trồng 25 cây, 4B trồng 32 cây. 4B trồng nhiều hơn 4A bao nhiêu cây?', '7', '32 − 25 = 7.', '32-25'),
    N('s', 'Dãy số liệu chiều cao (cm): 130, 135, 128, 140. Chênh lệch giữa bạn cao nhất và thấp nhất là bao nhiêu xăng-ti-mét?', '12', '140 − 128 = 12.', '140-128'),
    N('c', 'Tung xúc xắc 20 lần, mặt 6 chấm xuất hiện 4 lần. Số lần không xuất hiện mặt 6 chấm là bao nhiêu?', '16', '20 − 4 = 16.', '20-4'),
  ], kind='conceptual')

# ----------------------------------------------------------------- Lớp 5
T('5_01', 'Hỗn số', 'Chủ đề 1. Ôn tập và bổ sung', 'so',
  'Đọc, viết hỗn số; chuyển hỗn số thành phân số và ngược lại.', ['4_13', '4_16'], [
    N('b', 'Chuyển hỗn số 2 1/3 thành phân số.', '7/3', '2 × 3 + 1 = 7, giữ mẫu 3.', 'F(7,3)'),
    N('s', 'Chuyển phân số 17/5 thành hỗn số.', '3 2/5', '17 = 5 × 3 + 2.', 'F(17,5)', accept=['17/5']),
    N('c', 'Tính: 1 1/2 + 2 1/4 = ?', '15/4', '3/2 + 9/4 = 15/4.', 'F(3,2)+F(9,4)', accept=['3 3/4']),
  ])
T('5_02', 'Số thập phân: khái niệm, đọc, viết, các hàng', 'Chủ đề 2. Số thập phân', 'so',
  'Phân số thập phân và số thập phân; phần nguyên, phần thập phân; giá trị theo hàng.', ['4_13', '4_01'], [
    N('b', 'Viết phân số thập phân 7/10 dưới dạng số thập phân.', '0,7', '7/10 = 0,7.', 'F(7,10)'),
    N('s', 'Viết số thập phân: "hai mươi ba phẩy không năm".', '23,05', 'Phần nguyên 23, phần thập phân 05.', 'F(2305,100)'),
    N('c', 'Trong số 41,368, chữ số 6 thuộc hàng phần trăm. Giá trị của nó là bao nhiêu? (viết số thập phân)', '0,06', '6 phần trăm = 0,06.', 'F(6,100)'),
  ], kind='conceptual')
T('5_03', 'So sánh số thập phân; làm tròn số thập phân', 'Chủ đề 2. Số thập phân', 'so',
  'So sánh, sắp xếp số thập phân; làm tròn đến số tự nhiên, hàng phần mười, phần trăm.', ['5_02'], [
    C('b', 'Chọn dấu: 3,45 ... 3,5', ['>', '<', '='], 'B', '3,45 < 3,50.'),
    N('s', 'Làm tròn 7,486 đến hàng phần trăm.', '7,49', 'Chữ số hàng phần nghìn là 6 ≥ 5.', 'F(749,100)'),
    N('c', 'Làm tròn 12,95 đến hàng phần mười.', '13', '12,95 → 13,0.', '13', accept=['13,0']),
  ])
T('5_04', 'Viết số đo đại lượng dưới dạng số thập phân', 'Chủ đề 2. Số thập phân', 'hinh',
  'Viết số đo độ dài, khối lượng, diện tích dưới dạng số thập phân.', ['5_02', '4_10', '2_12'], [
    N('b', '3 m 5 dm = ... m', '3,5', '5 dm = 0,5 m.', 'F(35,10)'),
    N('s', '2 kg 50 g = ... kg', '2,05', '50 g = 0,05 kg.', 'F(205,100)'),
    N('c', '4 tấn 25 kg = ... tấn', '4,025', '25 kg = 0,025 tấn.', 'F(4025,1000)'),
  ])
T('5_05', 'Cộng, trừ số thập phân', 'Chủ đề 3. Các phép tính với số thập phân', 'so',
  'Đặt tính thẳng dấu phẩy và cộng, trừ số thập phân.', ['5_02'], [
    N('b', 'Tính: 3,5 + 2,4 = ?', '5,9', 'Cộng như số tự nhiên, giữ dấu phẩy.', 'F(35,10)+F(24,10)'),
    N('s', 'Tính: 12,6 − 4,75 = ?', '7,85', '12,60 − 4,75 = 7,85.', 'F(126,10)-F(475,100)'),
    N('c', 'Tính nhanh: 4,68 + 6,03 + 5,32 = ?', '16,03', '(4,68 + 5,32) + 6,03 = 10 + 6,03.', 'F(468,100)+F(603,100)+F(532,100)'),
  ])
T('5_06', 'Nhân số thập phân', 'Chủ đề 3. Các phép tính với số thập phân', 'so',
  'Nhân số thập phân với số tự nhiên, với số thập phân; nhân với 10, 100, 0,1; 0,01.', ['5_05', '4_06'], [
    N('b', 'Tính: 2,5 × 4 = ?', '10', '2,5 × 4 = 10.', 'F(25,10)*4'),
    N('s', 'Tính: 1,2 × 0,3 = ?', '0,36', '12 × 3 = 36, có hai chữ số ở phần thập phân.', 'F(12,10)*F(3,10)'),
    N('c', 'Tính: 45,6 × 0,01 = ?', '0,456', 'Nhân với 0,01: dời dấu phẩy sang trái hai chữ số.', 'F(456,10)*F(1,100)'),
  ])
T('5_07', 'Chia số thập phân', 'Chủ đề 3. Các phép tính với số thập phân', 'so',
  'Chia số thập phân cho số tự nhiên, cho số thập phân; chia số tự nhiên có thương thập phân.', ['5_06', '4_07'], [
    N('b', 'Tính: 8,4 : 4 = ?', '2,1', '8,4 : 4 = 2,1.', 'F(84,10)/4'),
    N('s', 'Tính: 7 : 4 = ?', '1,75', 'Viết thêm chữ số 0 để chia tiếp.', 'F(7,4)'),
    N('c', 'Tính: 2,16 : 0,6 = ?', '3,6', '21,6 : 6 = 3,6.', 'F(216,100)/F(6,10)'),
  ])
T('5_08', 'Tỉ số; tìm hai số khi biết tổng (hiệu) và tỉ số', 'Chủ đề 4. Tỉ số và các bài toán liên quan', 'so',
  'Hiểu tỉ số a : b; giải bài toán tổng – tỉ, hiệu – tỉ bằng sơ đồ đoạn thẳng.', ['4_13', '4_09'], [
    S('b', 'Lớp có 12 bạn nam và 18 bạn nữ. Tỉ số của số bạn nam và số bạn nữ (viết phân số tối giản) là bao nhiêu?', '2/3', '12 : 18 = 2/3.'),
    N('s', 'Tổng hai số là 45, tỉ số của số bé và số lớn là 2/3. Số lớn là bao nhiêu?', '27', 'Tổng số phần 5; số lớn = 45 : 5 × 3.', '45/5*3'),
    N('c', 'Hiệu hai số là 24, số lớn gấp 4 lần số bé. Số bé là bao nhiêu?', '8', 'Hiệu số phần 3; số bé = 24 : 3.', '24/3'),
  ])
T('5_09', 'Tỉ số phần trăm', 'Chủ đề 5. Tỉ số phần trăm', 'so',
  'Tìm tỉ số phần trăm của hai số; tìm giá trị phần trăm của một số; tìm một số khi biết giá trị phần trăm.', ['5_07', '5_08'], [
    N('b', 'Tìm tỉ số phần trăm của 15 và 60.', '25%', '15 : 60 = 0,25 = 25%.', 'F(15,60)', accept=['25']),
    N('s', 'Tìm 20% của 350.', '70', '350 × 20 : 100.', '350*20/100'),
    N('c', 'Một cửa hàng giảm giá 10% nên một chiếc áo còn 180 000 đồng. Giá ban đầu là bao nhiêu đồng?', '200000', '180 000 : 90 × 100.', '180000/90*100', accept=['200 000', '200.000 đồng']),
  ])
T('5_10', 'Tỉ lệ bản đồ', 'Chủ đề 4. Tỉ số và các bài toán liên quan', 'hinh',
  'Hiểu tỉ lệ bản đồ 1 : n; tính độ dài thật từ độ dài trên bản đồ và ngược lại.', ['5_08'], [
    N('b', 'Bản đồ tỉ lệ 1 : 1000. Độ dài 1 cm trên bản đồ ứng với bao nhiêu xăng-ti-mét thật?', '1000', 'Tỉ lệ 1 : 1000.'),
    N('s', 'Bản đồ tỉ lệ 1 : 10 000, quãng đường đo được 5 cm. Quãng đường thật dài bao nhiêu mét?', '500', '5 × 10 000 = 50 000 cm = 500 m.', '5*10000/100'),
    N('c', 'Quãng đường thật 12 km, bản đồ tỉ lệ 1 : 200 000. Trên bản đồ dài bao nhiêu xăng-ti-mét?', '6', '1 200 000 cm : 200 000 = 6 cm.', '1200000/200000'),
  ])
T('5_11', 'Diện tích hình tam giác, hình thang', 'Chủ đề 6. Hình phẳng: tam giác, hình thang', 'hinh',
  'S tam giác = đáy × chiều cao : 2; S hình thang = (đáy lớn + đáy bé) × chiều cao : 2.', ['4_11', '4_12'], [
    N('b', 'Tam giác có đáy 8 cm, chiều cao 5 cm. Diện tích bao nhiêu xăng-ti-mét vuông?', '20', '8 × 5 : 2 = 20.', '8*5/2', accept=['20 cm²']),
    N('s', 'Hình thang có hai đáy 6 cm và 10 cm, chiều cao 4 cm. Diện tích bao nhiêu xăng-ti-mét vuông?', '32', '(6 + 10) × 4 : 2.', '(6+10)*4/2', accept=['32 cm²']),
    N('c', 'Tam giác có diện tích 36 cm², đáy 9 cm. Chiều cao bao nhiêu xăng-ti-mét?', '8', 'h = 2S : đáy = 72 : 9.', '2*36/9', accept=['8 cm']),
  ])
T('5_12', 'Hình tròn: chu vi, diện tích', 'Chủ đề 6. Hình phẳng: hình tròn', 'hinh',
  'C = d × 3,14 = r × 2 × 3,14; S = r × r × 3,14.', ['5_06', '3_05'], [
    N('b', 'Hình tròn đường kính 10 cm. Chu vi bằng bao nhiêu xăng-ti-mét? (lấy π = 3,14)', '31,4', '10 × 3,14.', '10*F(314,100)', accept=['31,4 cm']),
    N('s', 'Hình tròn bán kính 5 cm. Diện tích bằng bao nhiêu xăng-ti-mét vuông? (π = 3,14)', '78,5', '5 × 5 × 3,14.', '5*5*F(314,100)', accept=['78,5 cm²']),
    N('c', 'Một hình tròn có chu vi 18,84 cm. Bán kính bằng bao nhiêu xăng-ti-mét? (π = 3,14)', '3', 'r = 18,84 : (2 × 3,14).', 'F(1884,100)/(2*F(314,100))', accept=['3 cm']),
  ])
T('5_13', 'Thể tích; xăng-ti-mét khối, đề-xi-mét khối, mét khối', 'Chủ đề 7. Thể tích, đơn vị đo thể tích', 'hinh',
  'Hiểu thể tích; 1 dm³ = 1000 cm³, 1 m³ = 1000 dm³; đổi đơn vị thể tích.', ['4_11'], [
    N('b', '1 dm³ bằng bao nhiêu xăng-ti-mét khối?', '1000', '1 dm³ = 1000 cm³.'),
    N('s', '2,5 m³ bằng bao nhiêu đề-xi-mét khối?', '2500', '2,5 × 1000.', 'F(25,10)*1000'),
    N('c', '1 lít nước chiếm bao nhiêu đề-xi-mét khối?', '1', '1 l = 1 dm³.'),
  ])
T('5_14', 'Hình hộp chữ nhật, hình lập phương: diện tích xung quanh, toàn phần, thể tích', 'Chủ đề 7. Hình khối', 'hinh',
  'Sxq hộp = chu vi đáy × chiều cao; V hộp = dài × rộng × cao; hình lập phương: Sxq = a × a × 4, Stp = a × a × 6, V = a × a × a.', ['5_13', '3_12', '5_06'], [
    N('b', 'Hình lập phương cạnh 3 cm có thể tích bao nhiêu xăng-ti-mét khối?', '27', '3 × 3 × 3.', '3**3', accept=['27 cm³']),
    N('s', 'Hình hộp chữ nhật dài 5 cm, rộng 4 cm, cao 3 cm có diện tích xung quanh bao nhiêu xăng-ti-mét vuông?', '54', '(5 + 4) × 2 × 3.', '(5+4)*2*3', accept=['54 cm²']),
    N('c', 'Bể nước hình hộp chữ nhật dài 2 m, rộng 1,5 m, cao 1 m. Bể chứa đầy được bao nhiêu lít nước?', '3000', 'V = 3 m³ = 3000 dm³ = 3000 l.', '2*F(15,10)*1*1000', accept=['3000 l', '3 000']),
  ])
T('5_15', 'Vận tốc, quãng đường, thời gian', 'Chủ đề 8. Chuyển động đều', 'hinh',
  'v = s : t; s = v × t; t = s : v; đổi đơn vị km/giờ, m/phút.', ['5_07', '3_16'], [
    N('b', 'Ô tô đi 120 km trong 3 giờ. Vận tốc ô tô là bao nhiêu ki-lô-mét/giờ?', '40', '120 : 3.', '120/3', accept=['40 km/h', '40 km/giờ']),
    N('s', 'Xe máy đi với vận tốc 36 km/giờ trong 2,5 giờ. Quãng đường đi được bao nhiêu ki-lô-mét?', '90', '36 × 2,5.', '36*F(25,10)', accept=['90 km']),
    N('c', 'Một người đi bộ 4,5 km với vận tốc 5 km/giờ. Thời gian đi là bao nhiêu phút?', '54', '4,5 : 5 = 0,9 giờ = 54 phút.', 'F(45,10)/5*60', accept=['54 phút']),
  ])
T('5_16', 'Số đo thời gian; cộng, trừ số đo thời gian', 'Chủ đề 8. Số đo thời gian', 'hinh',
  'Đổi đơn vị thời gian; cộng, trừ, nhân, chia số đo thời gian.', ['3_16', '4_10'], [
    N('b', '1,5 giờ bằng bao nhiêu phút?', '90', '1,5 × 60.', 'F(15,10)*60'),
    C('s', 'Tính: 2 giờ 45 phút + 1 giờ 30 phút', ['3 giờ 75 phút', '4 giờ 15 phút', '4 giờ 75 phút'], 'B', '3 giờ 75 phút = 4 giờ 15 phút.'),
    N('c', 'Tàu khởi hành lúc 7 giờ 50 phút và đến nơi lúc 10 giờ 20 phút. Tàu đi hết bao nhiêu phút?', '150', '2 giờ 30 phút = 150 phút.', '(10*60+20)-(7*60+50)'),
  ])
T('5_17', 'Biểu đồ hình quạt tròn; tỉ số mô tả số lần lặp lại', 'Chủ đề 9. Một số yếu tố thống kê và xác suất', 'tk',
  'Đọc biểu đồ hình quạt tròn (tỉ số phần trăm); dùng tỉ số để mô tả số lần lặp lại của một sự kiện.', ['5_09', '4_18'], [
    N('b', 'Biểu đồ hình quạt: 40% học sinh thích Toán. Lớp có 30 học sinh. Có bao nhiêu bạn thích Toán?', '12', '30 × 40 : 100.', '30*40/100'),
    S('s', 'Tung đồng xu 50 lần, mặt ngửa xuất hiện 23 lần. Viết tỉ số của số lần xuất hiện mặt ngửa và tổng số lần tung.', '23/50', 'Tỉ số = 23 : 50.'),
    N('c', 'Biểu đồ hình quạt có ba phần 25%, 35% và x%. Tìm x.', '40', 'Tổng 100%: 100 − 25 − 35.', '100-25-35', accept=['40%']),
  ], kind='conceptual')
