"""THCS (lớp 6–9). Căn cứ: Chương trình GDPT 2018 môn Toán; chương theo bộ SGK "Kết nối tri thức với cuộc sống".
Số chương, tên chương CẦN GIÁO VIÊN ĐỐI CHIẾU với sách đang dùng (Chân trời sáng tạo, Cánh Diều có thứ tự khác)."""
from vnlib import T, N, C, S

# ----------------------------------------------------------------- Lớp 6
c = 'Chương I. Tập hợp các số tự nhiên'
T('6_01', 'Tập hợp; phần tử của tập hợp', c, 'so',
  'Mô tả tập hợp bằng liệt kê hoặc chỉ ra tính chất đặc trưng; dùng kí hiệu ∈, ∉.', ['4_01'], [
    N('b', 'Cho A = {2; 4; 6; 8}. Tập A có bao nhiêu phần tử?', '4', 'Đếm các phần tử: 2, 4, 6, 8.'),
    C('s', 'Cho B = {x ∈ ℕ | x < 5}. Khẳng định nào đúng?', ['5 ∈ B', '0 ∈ B', '6 ∈ B'], 'B', 'B = {0; 1; 2; 3; 4}.'),
    N('c', 'Tập hợp các số tự nhiên lớn hơn 3 và không vượt quá 10 có bao nhiêu phần tử?', '7', 'Gồm 4, 5, …, 10.', '10-3'),
  ], lesson='Bài 1. Tập hợp', kind='conceptual')
T('6_02', 'Tập hợp số tự nhiên; ghi số tự nhiên; số La Mã', c, 'so',
  'Phân biệt ℕ và ℕ*; giá trị chữ số theo vị trí trong hệ thập phân; đọc, viết số La Mã đến 30.', ['6_01', '4_01'], [
    N('b', 'Số liền sau của 1 999 trong tập ℕ là số nào?', '2000', '1 999 + 1.', '1999+1'),
    N('s', 'Số La Mã XIV có giá trị là bao nhiêu?', '14', 'X = 10, IV = 4.'),
    S('c', 'Viết số 29 bằng chữ số La Mã.', 'XXIX', '20 = XX, 9 = IX.', accept=['xxix']),
  ], kind='conceptual')
T('6_03', 'Các phép tính với số tự nhiên; luỹ thừa với số mũ tự nhiên', c, 'so',
  'Cộng, trừ, nhân, chia số tự nhiên; aⁿ là tích n thừa số a; aᵐ·aⁿ = aᵐ⁺ⁿ, aᵐ : aⁿ = aᵐ⁻ⁿ.', ['6_02', '4_07'], [
    N('b', 'Tính 2⁵.', '32', '2·2·2·2·2 = 32.', '2**5'),
    N('s', 'Viết 3⁴ · 3² dưới dạng một luỹ thừa của 3 rồi tính giá trị.', '729', '3⁶ = 729.', '3**6'),
    N('c', 'Tìm số tự nhiên n, biết 2ⁿ = 64.', '6', '2⁶ = 64.'),
  ])
T('6_04', 'Thứ tự thực hiện các phép tính', c, 'so',
  'Luỹ thừa → nhân, chia → cộng, trừ; ngoặc tròn, vuông, nhọn từ trong ra ngoài.', ['6_03', '3_08'], [
    N('b', 'Tính: 5 · 2³ − 18 : 3', '34', '5·8 − 6 = 34.', '5*2**3-18/3'),
    N('s', 'Tính: 80 − [130 − (12 − 4)²]', '14', '(8)² = 64; 130 − 64 = 66; 80 − 66 = 14.', '80-(130-(12-4)**2)'),
    N('c', 'Tìm x ∈ ℕ, biết 2x + 3² = 25.', '8', '2x = 16, x = 8.', '(25-9)/2'),
  ])
c = 'Chương II. Tính chia hết trong tập hợp các số tự nhiên'
T('6_05', 'Quan hệ chia hết; dấu hiệu chia hết cho 2, 3, 5, 9', c, 'so',
  'Ước và bội; tính chất chia hết của tổng; dấu hiệu chia hết cho 2, 5, 3, 9.', ['6_03'], [
    C('b', 'Số nào chia hết cho cả 2 và 5?', ['125', '230', '342'], 'B', 'Chữ số tận cùng là 0.'),
    C('s', 'Số nào chia hết cho 9?', ['1 234', '4 518', '7 105'], 'B', '4 + 5 + 1 + 8 = 18 chia hết cho 9.'),
    N('c', 'Tìm chữ số x để số 3x5 chia hết cho 9.', '1', '3 + x + 5 chia hết cho 9 ⇒ x = 1.'),
  ])
T('6_06', 'Số nguyên tố; phân tích một số ra thừa số nguyên tố', c, 'so',
  'Nhận biết số nguyên tố, hợp số; phân tích một số ra thừa số nguyên tố.', ['6_05'], [
    C('b', 'Số nào là số nguyên tố?', ['21', '29', '27'], 'B', '29 chỉ có hai ước là 1 và 29.'),
    S('s', 'Phân tích 60 ra thừa số nguyên tố (viết dạng tích luỹ thừa).', '2^2*3*5', '60 = 2²·3·5.', accept=['2²·3·5', '2^2·3·5', '2.2.3.5', '2*2*3*5']),
    N('c', 'Có bao nhiêu số nguyên tố nhỏ hơn 20?', '8', '2, 3, 5, 7, 11, 13, 17, 19.'),
  ])
T('6_07', 'Ước chung lớn nhất, bội chung nhỏ nhất', c, 'so',
  'Tìm ƯCLN, BCNN bằng phân tích ra thừa số nguyên tố; vận dụng rút gọn phân số, bài toán thực tế.', ['6_06'], [
    N('b', 'Tìm ƯCLN(12, 18).', '6', '12 = 2²·3, 18 = 2·3²; ƯCLN = 2·3.', 'gcd(12,18)'),
    N('s', 'Tìm BCNN(8, 12).', '24', '8 = 2³, 12 = 2²·3; BCNN = 2³·3.', 'lcm(8,12)'),
    N('c', 'Hai xe buýt cùng xuất phát lúc 6 giờ, xe A cứ 10 phút một chuyến, xe B 15 phút một chuyến. Sau ít nhất bao nhiêu phút hai xe lại cùng xuất phát?', '30', 'BCNN(10, 15) = 30.', 'lcm(10,15)'),
  ])
c = 'Chương III. Số nguyên'
T('6_08', 'Tập hợp các số nguyên; so sánh số nguyên', c, 'so',
  'Số nguyên âm, biểu diễn trên trục số; số đối; so sánh hai số nguyên.', ['6_02'], [
    C('b', 'Nhiệt độ 5 độ dưới 0 °C được viết là:', ['5 °C', '−5 °C', '0,5 °C'], 'B', 'Dưới 0 dùng số âm.'),
    N('s', 'Số đối của −12 là số nào?', '12', 'Số đối của a là −a.'),
    N('c', 'Số nguyên lớn nhất nhỏ hơn −3 là số nào?', '-4', 'Trên trục số, ngay bên trái −3 là −4.'),
  ], kind='conceptual')
T('6_09', 'Phép cộng, phép trừ số nguyên', c, 'so',
  'Cộng hai số nguyên cùng dấu, khác dấu; trừ là cộng với số đối.', ['6_08', '6_03'], [
    N('b', 'Tính: (−7) + (−5)', '-12', 'Cùng dấu âm: cộng giá trị tuyệt đối, giữ dấu −.', '-7-5'),
    N('s', 'Tính: 15 − 23', '-8', '15 + (−23) = −8.', '15-23'),
    N('c', 'Tính: (−18) − (−25) + (−4)', '3', '−18 + 25 − 4 = 3.', '-18+25-4'),
  ])
T('6_10', 'Quy tắc dấu ngoặc', c, 'so',
  'Bỏ ngoặc có dấu "−" đằng trước thì đổi dấu các số hạng trong ngoặc.', ['6_09'], [
    N('b', 'Tính: 12 − (5 − 8)', '15', '12 − 5 + 8 = 15.', '12-(5-8)'),
    N('s', 'Tính nhanh: (135 − 47) − (35 − 47)', '100', '135 − 47 − 35 + 47 = 100.', '(135-47)-(35-47)'),
    N('c', 'Tính: −(−20 + 13) − (7 − 30)', '30', '20 − 13 − 7 + 30 = 30.', '-(-20+13)-(7-30)'),
  ])
T('6_11', 'Phép nhân, phép chia hết số nguyên', c, 'so',
  'Quy tắc dấu khi nhân, chia số nguyên; bội và ước của số nguyên.', ['6_09'], [
    N('b', 'Tính: (−6) · 7', '-42', 'Khác dấu: tích âm.', '-6*7'),
    N('s', 'Tính: (−72) : (−8)', '9', 'Cùng dấu: thương dương.', '-72/-8'),
    N('c', 'Tính: (−2)³ · (−5)', '40', '(−2)³ = −8; (−8)·(−5) = 40.', '(-2)**3*(-5)'),
  ])
c = 'Chương IV. Một số hình phẳng trong thực tiễn'
T('6_12', 'Tam giác đều, hình vuông, lục giác đều', c, 'hinh',
  'Nhận biết đặc điểm về cạnh, góc, đường chéo của tam giác đều, hình vuông, lục giác đều.', ['4_04'], [
    N('b', 'Mỗi góc của tam giác đều có số đo bao nhiêu độ?', '60', 'Ba góc bằng nhau, tổng 180°.', '180/3', accept=['60°']),
    N('s', 'Lục giác đều có bao nhiêu đường chéo chính (đi qua tâm)?', '3', 'Lục giác đều có 3 đường chéo chính bằng nhau.'),
    N('c', 'Lục giác đều cạnh 4 cm ghép được từ mấy tam giác đều cạnh 4 cm?', '6', 'Ba đường chéo chính chia lục giác đều thành 6 tam giác đều.'),
  ], kind='conceptual')
T('6_13', 'Hình chữ nhật, hình thoi, hình bình hành, hình thang cân: chu vi và diện tích', c, 'hinh',
  'Đặc điểm các hình; công thức chu vi, diện tích (hình thoi: S = d₁·d₂ : 2; bình hành: S = a·h).', ['6_12', '5_11'], [
    N('b', 'Hình thoi có hai đường chéo 6 cm và 8 cm. Diện tích là bao nhiêu cm²?', '24', '6·8 : 2.', '6*8/2', accept=['24 cm²']),
    N('s', 'Hình bình hành có cạnh đáy 10 cm, chiều cao tương ứng 7 cm. Diện tích là bao nhiêu cm²?', '70', 'S = a·h.', '10*7', accept=['70 cm²']),
    N('c', 'Mảnh vườn hình chữ nhật có chu vi 56 m, chiều dài hơn chiều rộng 4 m. Diện tích mảnh vườn là bao nhiêu m²?', '192', 'Nửa chu vi 28 ⇒ dài 16, rộng 12.', '16*12', accept=['192 m²']),
  ])
T('6_14', 'Hình có trục đối xứng, hình có tâm đối xứng', 'Chương V. Tính đối xứng của hình phẳng trong tự nhiên', 'hinh',
  'Nhận biết trục đối xứng, tâm đối xứng của hình phẳng.', ['6_13'], [
    N('b', 'Hình vuông có bao nhiêu trục đối xứng?', '4', '2 đường chéo và 2 đường nối trung điểm cạnh đối.'),
    C('s', 'Hình nào có tâm đối xứng?', ['Tam giác đều', 'Hình bình hành', 'Hình thang cân'], 'B', 'Giao điểm hai đường chéo là tâm đối xứng của hình bình hành.'),
    N('c', 'Tam giác đều có bao nhiêu trục đối xứng?', '3', 'Ba đường cao (đồng thời là trung trực).'),
  ], kind='conceptual')
c = 'Chương VI. Phân số'
T('6_15', 'Mở rộng phân số; phân số bằng nhau', c, 'so',
  'Phân số a/b với a, b ∈ ℤ, b ≠ 0; a/b = c/d khi a·d = b·c; tính chất cơ bản.', ['4_14', '6_11'], [
    N('b', 'Tìm x, biết x/12 = 3/4.', '9', 'x·4 = 3·12.', '3*12/4'),
    S('s', 'Rút gọn phân số −18/30 về tối giản.', '-3/5', 'Chia tử và mẫu cho 6.', accept=['−3/5']),
    N('c', 'Tìm số nguyên x, biết −6/x = 9/−12.', '8', '−6·(−12) = 9x ⇒ x = 8.', '72/9'),
  ], kind='conceptual')
T('6_16', 'So sánh phân số; hỗn số dương', c, 'so',
  'Quy đồng mẫu để so sánh phân số (kể cả phân số âm); đổi hỗn số dương.', ['6_15', '6_07'], [
    C('b', 'Chọn dấu: −3/4 ... −2/3', ['>', '<', '='], 'B', '−9/12 < −8/12.'),
    C('s', 'Sắp xếp tăng dần: 1/2; −1/3; 2/5', ['−1/3; 1/2; 2/5', '−1/3; 2/5; 1/2', '2/5; 1/2; −1/3'], 'B', '2/5 = 0,4 < 0,5.'),
    N('c', 'Viết hỗn số 3 2/7 dưới dạng phân số.', '23/7', '3·7 + 2 = 23.', 'F(23,7)'),
  ])
T('6_17', 'Phép cộng, phép trừ phân số', c, 'so',
  'Cộng, trừ phân số (kể cả âm); tính chất giao hoán, kết hợp.', ['6_15', '6_09'], [
    N('b', 'Tính: −2/5 + 4/5', '2/5', 'Cùng mẫu: −2 + 4 = 2.', 'F(-2,5)+F(4,5)'),
    N('s', 'Tính: 3/4 − 5/6', '-1/12', '9/12 − 10/12.', 'F(3,4)-F(5,6)'),
    N('c', 'Tính nhanh: 7/13 + (−5/9) + 6/13 + 5/9', '1', '(7/13 + 6/13) + (−5/9 + 5/9).', 'F(7,13)-F(5,9)+F(6,13)+F(5,9)'),
  ])
T('6_18', 'Phép nhân, phép chia phân số', c, 'so',
  'Nhân, chia phân số; phân số nghịch đảo.', ['6_17', '6_11'], [
    N('b', 'Tính: (−3/4) · 8/9', '-2/3', '−24/36 = −2/3.', 'F(-3,4)*F(8,9)'),
    N('s', 'Tính: 5/6 : (−10/9)', '-3/4', '5/6 · (−9/10) = −45/60.', 'F(5,6)/F(-10,9)'),
    N('c', 'Tìm x, biết 2/3 · x = −4/9.', '-2/3', 'x = −4/9 : 2/3.', 'F(-4,9)/F(2,3)'),
  ])
T('6_19', 'Hai bài toán về phân số', c, 'so',
  'Tìm giá trị phân số của một số (b·m/n); tìm một số khi biết giá trị phân số của nó (a : m/n).', ['6_18'], [
    N('b', 'Tìm 3/5 của 40.', '24', '40 · 3/5.', '40*F(3,5)'),
    N('s', 'Biết 2/3 của một số là 18. Tìm số đó.', '27', '18 : 2/3.', '18/F(2,3)'),
    N('c', 'Lớp 6A có 40 học sinh, 3/8 số học sinh thích bóng đá, 2/5 số còn lại thích cầu lông. Có bao nhiêu bạn thích cầu lông?', '10', 'Bóng đá 15; còn 25; 2/5 · 25 = 10.', '(40-40*F(3,8))*F(2,5)'),
  ])
c = 'Chương VII. Số thập phân'
T('6_20', 'Số thập phân (kể cả âm) và các phép tính', c, 'so',
  'Số thập phân âm, số đối; cộng, trừ, nhân, chia số thập phân.', ['5_07', '6_09'], [
    N('b', 'Tính: −2,5 + 1,3', '-1,2', 'Khác dấu: 2,5 − 1,3 = 1,2, mang dấu −.', 'F(-25,10)+F(13,10)'),
    N('s', 'Tính: (−0,4) · 2,5', '-1', '0,4 · 2,5 = 1.', 'F(-4,10)*F(25,10)'),
    N('c', 'Tính: (−3,6) : 0,12', '-30', '3,6 : 0,12 = 30.', 'F(-36,10)/F(12,100)'),
  ])
T('6_21', 'Làm tròn và ước lượng', c, 'so',
  'Làm tròn số thập phân đến hàng cho trước; ước lượng kết quả phép tính.', ['6_20', '5_03'], [
    N('b', 'Làm tròn 3,14159 đến hàng phần trăm.', '3,14', 'Chữ số hàng phần nghìn là 1 < 5.', 'F(314,100)'),
    N('s', 'Làm tròn −8,765 đến hàng phần mười.', '-8,8', 'Chữ số hàng phần trăm 6 ≥ 5.', 'F(-88,10)'),
    N('c', 'Ước lượng 49,8 · 2,1 bằng cách làm tròn mỗi số đến hàng đơn vị.', '100', '50 · 2 = 100.', '50*2'),
  ])
T('6_22', 'Tỉ số và tỉ số phần trăm', c, 'so',
  'Tỉ số a : b; tỉ số phần trăm a/b · 100%; hai bài toán về tỉ số phần trăm.', ['6_20', '5_09'], [
    N('b', 'Tỉ số phần trăm của 3 và 4 là bao nhiêu?', '75%', '3/4 = 75%.', 'F(3,4)', accept=['75']),
    N('s', 'Giá một chiếc xe đạp là 2 500 000 đồng, được giảm 12%. Số tiền được giảm là bao nhiêu đồng?', '300000', '2 500 000 · 12%.', '2500000*12/100', accept=['300 000', '300.000']),
    N('c', 'Một vật được bán lãi 20% so với giá vốn, giá bán 360 000 đồng. Giá vốn là bao nhiêu đồng?', '300000', '360 000 : 120%.', '360000*100/120', accept=['300 000', '300.000']),
  ])
c = 'Chương VIII. Những hình hình học cơ bản'
T('6_23', 'Điểm, đường thẳng; ba điểm thẳng hàng', c, 'hinh',
  'Điểm thuộc/không thuộc đường thẳng; ba điểm thẳng hàng; hai đường thẳng cắt nhau, song song.', ['2_07'], [
    C('b', 'Ba điểm A, B, C cùng nằm trên một đường thẳng gọi là:', ['ba điểm thẳng hàng', 'ba điểm phân biệt', 'tam giác'], 'A', 'Định nghĩa ba điểm thẳng hàng.'),
    N('s', 'Có 4 điểm, không có ba điểm nào thẳng hàng. Kẻ được bao nhiêu đường thẳng đi qua hai trong bốn điểm?', '6', '4·3 : 2 = 6.', '4*3/2'),
    N('c', 'Có 10 điểm, không có ba điểm nào thẳng hàng. Kẻ được bao nhiêu đường thẳng đi qua từng cặp điểm?', '45', '10·9 : 2 = 45.', '10*9/2'),
  ], kind='conceptual')
T('6_24', 'Đoạn thẳng; độ dài đoạn thẳng; trung điểm', c, 'hinh',
  'Đo, so sánh đoạn thẳng; M là trung điểm AB khi M nằm giữa A, B và MA = MB.', ['6_23'], [
    N('b', 'M là trung điểm của AB, AB = 10 cm. Tính MA (cm).', '5', 'MA = AB : 2.', '10/2', accept=['5 cm']),
    N('s', 'Điểm C nằm giữa A và B, AC = 3 cm, CB = 5 cm. Tính AB (cm).', '8', 'AB = AC + CB.', '3+5', accept=['8 cm']),
    N('c', 'Trên tia Ox lấy A, B với OA = 2 cm, OB = 8 cm. M là trung điểm AB. Tính OM (cm).', '5', 'AB = 6, AM = 3, OM = 2 + 3.', '2+3', accept=['5 cm']),
  ])
T('6_25', 'Tia', c, 'hinh',
  'Tia gốc O; hai tia đối nhau; hai tia trùng nhau.', ['6_23'], [
    C('b', 'Điểm O trên đường thẳng xy chia đường thẳng thành:', ['hai tia đối nhau', 'hai đoạn thẳng', 'một tia'], 'A', 'Ox và Oy là hai tia đối nhau.'),
    C('s', 'Điểm M nằm giữa O và N. Tia nào trùng với tia OM?', ['Tia MO', 'Tia ON', 'Tia NO'], 'B', 'M, N cùng phía với O nên OM, ON trùng nhau.'),
    N('c', 'Trên đường thẳng có 3 điểm phân biệt. Có bao nhiêu tia có gốc là một trong ba điểm đó (nằm trên đường thẳng)?', '6', 'Mỗi điểm là gốc của 2 tia đối nhau.', '3*2'),
  ], kind='conceptual')
T('6_26', 'Góc; số đo góc; các góc đặc biệt', c, 'hinh',
  'Góc tạo bởi hai tia chung gốc; đo góc; góc nhọn, vuông, tù, bẹt.', ['6_25', '4_03'], [
    C('b', 'Góc có số đo 90° là:', ['góc nhọn', 'góc vuông', 'góc tù'], 'B', 'Theo định nghĩa.'),
    N('s', 'Lúc 3 giờ đúng, kim giờ và kim phút tạo thành góc bao nhiêu độ?', '90', '3 khoảng × 30°.', '3*30', accept=['90°']),
    N('c', 'Lúc 2 giờ đúng, kim giờ và kim phút tạo thành góc bao nhiêu độ?', '60', '2 khoảng × 30°.', '2*30', accept=['60°']),
  ], kind='conceptual')
c = 'Chương IX. Dữ liệu và xác suất thực nghiệm'
T('6_27', 'Thu thập, phân loại, biểu diễn dữ liệu; biểu đồ tranh, biểu đồ cột, cột kép', c, 'tk',
  'Phân loại dữ liệu; đọc và vẽ biểu đồ tranh, biểu đồ cột, cột kép; phát hiện dữ liệu không hợp lí.', ['5_17'], [
    C('b', 'Dữ liệu nào là số liệu?', ['Màu sắc yêu thích', 'Chiều cao của học sinh', 'Môn thể thao yêu thích'], 'B', 'Chiều cao đo được bằng số.'),
    N('s', 'Biểu đồ cột kép: lớp 6A có 18 nam, 20 nữ; lớp 6B có 22 nam, 17 nữ. Tổng số học sinh nam hai lớp là bao nhiêu?', '40', '18 + 22.', '18+22'),
    C('c', 'Bảng ghi số học sinh vắng trong tuần: 2; 0; 1; −1; 3. Giá trị nào không hợp lí?', ['0', '−1', '3'], 'B', 'Số học sinh không thể âm.'),
  ], kind='conceptual')
T('6_28', 'Kết quả có thể và sự kiện; xác suất thực nghiệm', c, 'tk',
  'Liệt kê kết quả có thể; xác suất thực nghiệm = số lần sự kiện xảy ra : tổng số lần thực hiện.', ['6_27', '6_22'], [
    N('b', 'Gieo một con xúc xắc. Có bao nhiêu kết quả có thể?', '6', 'Các mặt 1, 2, …, 6.'),
    N('s', 'Tung đồng xu 40 lần, có 18 lần mặt sấp. Xác suất thực nghiệm xuất hiện mặt sấp là bao nhiêu? (viết phân số tối giản)', '9/20', '18/40 = 9/20.', 'F(18,40)', accept=['0,45']),
    N('c', 'Lấy bóng từ hộp 50 lần, có 15 lần bóng đỏ. Xác suất thực nghiệm lấy được bóng KHÔNG đỏ là bao nhiêu? (số thập phân)', '0,7', '35/50 = 0,7.', 'F(35,50)', accept=['7/10']),
  ])

# ----------------------------------------------------------------- Lớp 7
c = 'Chương I. Số hữu tỉ'
T('7_01', 'Tập hợp các số hữu tỉ; thứ tự trong tập ℚ', c, 'so',
  'Số hữu tỉ a/b; biểu diễn trên trục số; so sánh số hữu tỉ; số đối.', ['6_16', '6_20'], [
    C('b', 'Số nào KHÔNG phải số hữu tỉ?', ['−0,5', '3/7', '√2'], 'C', '√2 là số vô tỉ.'),
    C('s', 'Chọn dấu: −0,75 ... −2/3', ['>', '<', '='], 'B', '−0,75 = −9/12 < −8/12.'),
    N('c', 'Có bao nhiêu số nguyên x thỏa mãn −5/2 < x < 7/3?', '5', 'x ∈ {−2; −1; 0; 1; 2}.'),
  ], lesson='Bài 1. Tập hợp các số hữu tỉ', kind='conceptual')
T('7_02', 'Cộng, trừ, nhân, chia số hữu tỉ', c, 'so',
  'Thực hiện các phép tính với số hữu tỉ (phân số, số thập phân).', ['7_01', '6_18'], [
    N('b', 'Tính: 0,5 + (−3/4)', '-1/4', '1/2 − 3/4 = −1/4.', 'F(1,2)-F(3,4)', accept=['-0,25']),
    N('s', 'Tính: (−1,2) · 5/6', '-1', '−6/5 · 5/6 = −1.', 'F(-12,10)*F(5,6)'),
    N('c', 'Tính: (2/3 − 1/2) : (−1/6)', '-1', '1/6 : (−1/6) = −1.', '(F(2,3)-F(1,2))/F(-1,6)'),
  ])
T('7_03', 'Luỹ thừa với số mũ tự nhiên của một số hữu tỉ', c, 'so',
  'xⁿ; tích, thương hai luỹ thừa cùng cơ số; luỹ thừa của luỹ thừa.', ['7_02', '6_03'], [
    N('b', 'Tính (−1/2)³.', '-1/8', '(−1)³/2³.', 'F(-1,2)**3'),
    N('s', 'Tính (2/3)⁵ : (2/3)³.', '4/9', '(2/3)².', 'F(2,3)**2'),
    N('c', 'Tìm x, biết (x − 1)² = 9/16 với x > 1.', '7/4', 'x − 1 = 3/4.', '1+F(3,4)', accept=['1,75']),
  ])
T('7_04', 'Thứ tự thực hiện phép tính; quy tắc chuyển vế', c, 'so',
  'Thứ tự phép tính trong ℚ; chuyển một số hạng sang vế kia thì đổi dấu.', ['7_02', '6_10'], [
    N('b', 'Tìm x, biết x + 1/3 = 1/2.', '1/6', 'x = 1/2 − 1/3.', 'F(1,2)-F(1,3)'),
    N('s', 'Tìm x, biết 2/5 − x = −3/10.', '7/10', 'x = 2/5 + 3/10.', 'F(2,5)+F(3,10)', accept=['0,7']),
    N('c', 'Tìm x, biết 3x − 1/2 = 2x + 1/4.', '3/4', 'x = 1/4 + 1/2.', 'F(3,4)', accept=['0,75']),
  ])
c = 'Chương II. Số thực'
T('7_05', 'Số thập phân vô hạn tuần hoàn; căn bậc hai số học', c, 'so',
  'Phân số viết được thành số thập phân hữu hạn hoặc vô hạn tuần hoàn; √a với a ≥ 0.', ['7_01', '6_03'], [
    N('b', 'Tính √49.', '7', '7² = 49 và 7 ≥ 0.', '7'),
    C('s', 'Phân số 1/3 viết được dưới dạng:', ['0,3', '0,(3)', '0,33'], 'B', '1/3 = 0,333… = 0,(3).'),
    N('c', 'Tính √(0,36) + √(1/4).', '1,1', '0,6 + 0,5.', 'F(6,10)+F(1,2)', accept=['11/10']),
  ], kind='conceptual')
T('7_06', 'Số vô tỉ; số thực; giá trị tuyệt đối', c, 'so',
  'Tập ℝ gồm số hữu tỉ và vô tỉ; so sánh số thực; |x|.', ['7_05'], [
    N('b', 'Tính |−4,5|.', '4,5', 'Giá trị tuyệt đối của số âm là số đối của nó.', 'F(45,10)'),
    N('s', 'Tìm các giá trị x thỏa mãn |x| = 3.', '3; -3', '|x| = 3 ⇔ x = 3 hoặc x = −3.', unordered=True, accept=['-3; 3']),
    C('c', 'Sắp xếp tăng dần: √5; 2,2; 9/4', ['2,2; √5; 9/4', '√5; 2,2; 9/4', '2,2; 9/4; √5'], 'A', '√5 ≈ 2,236; 9/4 = 2,25.'),
  ], kind='conceptual')
c = 'Chương III. Góc và đường thẳng song song'
T('7_07', 'Góc ở vị trí đặc biệt; tia phân giác của một góc', c, 'hinh',
  'Hai góc kề bù (tổng 180°), hai góc đối đỉnh (bằng nhau); tia phân giác.', ['6_26'], [
    N('b', 'Hai góc kề bù, một góc bằng 65°. Góc còn lại bằng bao nhiêu độ?', '115', '180 − 65.', '180-65', accept=['115°']),
    N('s', 'Hai đường thẳng cắt nhau tạo một góc 40°. Góc đối đỉnh với nó bằng bao nhiêu độ?', '40', 'Hai góc đối đỉnh thì bằng nhau.', accept=['40°']),
    N('c', 'Tia Ot là tia phân giác của góc xOy = 130°. Góc xOt bằng bao nhiêu độ?', '65', '130 : 2.', '130/2', accept=['65°']),
  ], kind='conceptual')
T('7_08', 'Hai đường thẳng song song; tiên đề Euclid', c, 'hinh',
  'Góc so le trong, đồng vị; dấu hiệu nhận biết; tiên đề Euclid; tính chất hai đường thẳng song song.', ['7_07', '4_04'], [
    C('b', 'Đường thẳng c cắt a và b, tạo cặp góc so le trong bằng nhau. Khi đó:', ['a ⊥ b', 'a // b', 'a cắt b'], 'B', 'Dấu hiệu nhận biết hai đường thẳng song song.'),
    N('s', 'a // b, đường thẳng c cắt a, b. Một góc đồng vị bằng 72°. Góc đồng vị tương ứng bằng bao nhiêu độ?', '72', 'Hai góc đồng vị bằng nhau.', accept=['72°']),
    N('c', 'a // b, c cắt a, b. Hai góc trong cùng phía có tổng bằng bao nhiêu độ?', '180', 'Hai góc trong cùng phía bù nhau.', accept=['180°']),
  ])
T('7_09', 'Định lí và chứng minh định lí', c, 'hinh',
  'Giả thiết, kết luận của định lí; chứng minh bằng lập luận.', ['7_08~'], [
    C('b', 'Định lí "Hai góc đối đỉnh thì bằng nhau". Giả thiết là:', ['hai góc bằng nhau', 'hai góc đối đỉnh', 'hai góc kề bù'], 'B', 'Giả thiết đứng sau "nếu".'),
    C('s', 'Mệnh đề "Nếu a // b và b // c thì a // c". Kết luận là:', ['a // b', 'b // c', 'a // c'], 'C', 'Kết luận đứng sau "thì".'),
    C('c', 'Mệnh đề đảo của "Hai góc đối đỉnh thì bằng nhau" là "Hai góc bằng nhau thì đối đỉnh". Mệnh đề đảo này:', ['đúng', 'sai'], 'B', 'Có hai góc bằng nhau nhưng không đối đỉnh.'),
  ], kind='conceptual')
c = 'Chương IV. Tam giác bằng nhau'
T('7_10', 'Tổng các góc trong một tam giác', c, 'hinh',
  'Tổng ba góc của tam giác bằng 180°; góc ngoài; hai góc nhọn của tam giác vuông phụ nhau.', ['7_08'], [
    N('b', 'Tam giác ABC có góc A = 50°, góc B = 70°. Góc C bằng bao nhiêu độ?', '60', '180 − 50 − 70.', '180-50-70', accept=['60°']),
    N('s', 'Tam giác vuông có một góc nhọn 35°. Góc nhọn còn lại bằng bao nhiêu độ?', '55', '90 − 35.', '90-35', accept=['55°']),
    N('c', 'Tam giác có ba góc tỉ lệ với 1; 2; 3. Góc lớn nhất bằng bao nhiêu độ?', '90', '180 : 6 · 3.', '180/6*3', accept=['90°']),
  ])
T('7_11', 'Các trường hợp bằng nhau của tam giác', c, 'hinh',
  'c.c.c, c.g.c, g.c.g; các trường hợp bằng nhau của tam giác vuông.', ['7_10', '6_24'], [
    C('b', 'Hai tam giác có ba cặp cạnh tương ứng bằng nhau thì bằng nhau theo trường hợp:', ['c.c.c', 'c.g.c', 'g.c.g'], 'A', 'Cạnh – cạnh – cạnh.'),
    C('s', 'ΔABC và ΔDEF có AB = DE, góc B = góc E, BC = EF. Hai tam giác bằng nhau theo trường hợp:', ['c.c.c', 'c.g.c', 'g.c.g'], 'B', 'Góc xen giữa hai cạnh.'),
    N('c', 'ΔABC = ΔMNP, AB = 5 cm, BC = 7 cm, AC = 6 cm. Tính chu vi ΔMNP (cm).', '18', 'Hai tam giác bằng nhau có chu vi bằng nhau.', '5+7+6', accept=['18 cm']),
  ])
T('7_12', 'Tam giác cân; đường trung trực của đoạn thẳng', c, 'hinh',
  'Tam giác cân có hai góc đáy bằng nhau; điểm trên trung trực cách đều hai đầu đoạn thẳng.', ['7_11'], [
    N('b', 'Tam giác ABC cân tại A, góc B = 70°. Góc A bằng bao nhiêu độ?', '40', '180 − 2·70.', '180-2*70', accept=['40°']),
    N('s', 'M thuộc trung trực của AB, MA = 6 cm. Tính MB (cm).', '6', 'Điểm trên trung trực cách đều A và B.', accept=['6 cm']),
    N('c', 'Tam giác cân có góc ở đỉnh 100°. Mỗi góc ở đáy bằng bao nhiêu độ?', '40', '(180 − 100) : 2.', '(180-100)/2', accept=['40°']),
  ])
T('7_13', 'Biểu đồ hình quạt tròn; biểu đồ đoạn thẳng', 'Chương V. Thu thập và biểu diễn dữ liệu', 'tk',
  'Đọc, vẽ biểu đồ hình quạt tròn và đoạn thẳng; phân tích xu hướng dữ liệu.', ['6_27', '6_22'], [
    N('b', 'Biểu đồ hình quạt: 30% số học sinh đi học bằng xe đạp. Góc ở tâm của hình quạt đó bằng bao nhiêu độ?', '108', '30% · 360°.', '360*30/100', accept=['108°']),
    C('s', 'Biểu đồ nào thích hợp nhất để biểu diễn nhiệt độ theo các giờ trong ngày?', ['Biểu đồ hình quạt tròn', 'Biểu đồ đoạn thẳng', 'Biểu đồ tranh'], 'B', 'Biểu đồ đoạn thẳng thể hiện sự thay đổi theo thời gian.'),
    N('c', 'Biểu đồ đoạn thẳng doanh thu (triệu đồng): T1: 20, T2: 25, T3: 22, T4: 30. Doanh thu tăng nhiều nhất giữa hai tháng liên tiếp là bao nhiêu triệu?', '8', 'T3→T4: 30 − 22 = 8.', '30-22'),
  ], kind='conceptual')
c = 'Chương VI. Tỉ lệ thức và đại lượng tỉ lệ'
T('7_14', 'Tỉ lệ thức; dãy tỉ số bằng nhau', c, 'so',
  'a/b = c/d ⇒ ad = bc; tính chất dãy tỉ số bằng nhau.', ['7_02'], [
    N('b', 'Tìm x, biết x/6 = 5/3.', '10', 'x = 6·5 : 3.', '6*5/3'),
    N('s', 'Tìm x, y biết x/2 = y/3 và x + y = 25. Ghi theo thứ tự x; y.', '10; 15', 'x/2 = y/3 = 25/5 = 5.', accept=['x = 10; y = 15']),
    N('c', 'Ba lớp quyên góp sách tỉ lệ với 3; 4; 5, tổng 120 quyển. Lớp quyên góp nhiều nhất được bao nhiêu quyển?', '50', '120 : 12 · 5.', '120/12*5'),
  ])
T('7_15', 'Đại lượng tỉ lệ thuận', c, 'so',
  'y = kx (k ≠ 0); giải bài toán về đại lượng tỉ lệ thuận.', ['7_14'], [
    N('b', 'y tỉ lệ thuận với x theo hệ số 3. Khi x = 4 thì y bằng bao nhiêu?', '12', 'y = 3x.', '3*4'),
    N('s', 'y tỉ lệ thuận với x, khi x = 5 thì y = 15. Khi x = −2 thì y bằng bao nhiêu?', '-6', 'k = 3, y = 3·(−2).', '3*(-2)'),
    N('c', '5 m dây đồng nặng 43 g. Hỏi 12 m dây đồng như thế nặng bao nhiêu gam?', '103,2', '43 : 5 · 12.', 'F(43,5)*12', accept=['103,2 g']),
  ])
T('7_16', 'Đại lượng tỉ lệ nghịch', c, 'so',
  'y = a/x (a ≠ 0); giải bài toán về đại lượng tỉ lệ nghịch.', ['7_14'], [
    N('b', 'y tỉ lệ nghịch với x theo hệ số 12. Khi x = 3 thì y bằng bao nhiêu?', '4', 'y = 12/x.', '12/3'),
    N('s', 'Để làm xong một công việc, 6 người cần 10 ngày. Nếu có 15 người (năng suất như nhau) thì cần bao nhiêu ngày?', '4', '6·10 = 15·x.', '6*10/15'),
    N('c', 'Ô tô đi từ A đến B hết 3 giờ với vận tốc 60 km/h. Nếu đi với vận tốc 45 km/h thì hết bao nhiêu giờ?', '4', '60·3 = 45·t.', '60*3/45'),
  ])
c = 'Chương VII. Biểu thức đại số và đa thức một biến'
T('7_17', 'Biểu thức đại số; giá trị của biểu thức', c, 'so',
  'Biểu thức chứa chữ; tính giá trị biểu thức tại giá trị cho trước của biến.', ['7_04', '7_03'], [
    N('b', 'Tính giá trị của 2x + 5 tại x = −3.', '-1', '2·(−3) + 5.', '2*(-3)+5'),
    N('s', 'Tính giá trị của x² − 3x + 1 tại x = 2.', '-1', '4 − 6 + 1.', '2**2-3*2+1'),
    C('c', 'Biểu thức biểu thị chu vi hình chữ nhật có chiều dài a, chiều rộng ngắn hơn chiều dài 3 đơn vị là:', ['2a − 3', '2(2a − 3)', 'a(a − 3)'], 'B', 'Chu vi = 2(a + a − 3).'),
  ])
T('7_18', 'Đa thức một biến; nghiệm của đa thức', c, 'so',
  'Bậc, hệ số, hệ số tự do; sắp xếp đa thức; x = a là nghiệm nếu P(a) = 0.', ['7_17'], [
    N('b', 'Đa thức P(x) = 5x³ − 2x + 7 có bậc là bao nhiêu?', '3', 'Số mũ cao nhất là 3.'),
    N('s', 'Tìm nghiệm của đa thức 2x − 6.', '3', '2x − 6 = 0 ⇒ x = 3.'),
    N('c', 'Tìm m để x = 2 là nghiệm của P(x) = x² + mx − 6.', '1', '4 + 2m − 6 = 0.', '(6-4)/2'),
  ], kind='conceptual')
T('7_19', 'Cộng, trừ đa thức một biến', c, 'so',
  'Cộng, trừ đa thức theo cột hoặc theo hàng ngang (thu gọn hạng tử đồng dạng).', ['7_18'], [
    S('b', 'Thu gọn: (3x² + 2x) + (x² − 5x).', '4x^2-3x', '3x² + x² = 4x²; 2x − 5x = −3x.', accept=['4x²-3x', '4x² − 3x']),
    S('s', 'Tính (5x³ − x + 2) − (2x³ + 3x − 1).', '3x^3-4x+3', '5x³ − 2x³ = 3x³; −x − 3x; 2 + 1.', accept=['3x³-4x+3', '3x³ − 4x + 3']),
    N('c', 'Cho P(x) = x² + 1, Q(x) = 2x − 3. Tính (P − Q)(2).', '4', 'P(2) = 5, Q(2) = 1.', '5-1'),
  ])
T('7_20', 'Nhân, chia đa thức một biến', c, 'so',
  'Nhân đa thức với đa thức; chia đa thức cho đa thức (chia hết, chia có dư).', ['7_19'], [
    S('b', 'Tính 2x · (3x − 4).', '6x^2-8x', 'Nhân đơn thức với từng hạng tử.', accept=['6x²-8x', '6x² − 8x']),
    S('s', 'Tính (x + 2)(x − 3).', 'x^2-x-6', 'x² − 3x + 2x − 6.', accept=['x²-x-6', 'x² − x − 6']),
    S('c', 'Tính (x² − 9) : (x − 3).', 'x+3', 'x² − 9 = (x − 3)(x + 3).', accept=['x + 3']),
  ])
T('7_21', 'Biến cố; xác suất của biến cố', 'Chương VIII. Làm quen với biến cố và xác suất của biến cố', 'tk',
  'Biến cố chắc chắn, không thể, ngẫu nhiên; xác suất của biến cố trong trường hợp đồng khả năng.', ['6_28'], [
    C('b', 'Gieo xúc xắc. Biến cố "Số chấm xuất hiện nhỏ hơn 7" là biến cố:', ['chắc chắn', 'không thể', 'ngẫu nhiên'], 'A', 'Mọi mặt đều có số chấm < 7.'),
    N('s', 'Gieo xúc xắc cân đối. Xác suất xuất hiện mặt 5 chấm là bao nhiêu?', '1/6', '1 trong 6 kết quả đồng khả năng.', 'F(1,6)'),
    N('c', 'Chọn ngẫu nhiên một số trong các số 1, 2, …, 10. Xác suất chọn được số nguyên tố là bao nhiêu?', '2/5', 'Có 4 số nguyên tố: 2, 3, 5, 7.', 'F(4,10)', accept=['0,4', '4/10']),
  ])
c = 'Chương IX. Quan hệ giữa các yếu tố trong một tam giác'
T('7_22', 'Quan hệ giữa góc và cạnh đối diện; bất đẳng thức tam giác', c, 'hinh',
  'Cạnh lớn hơn đối diện góc lớn hơn; tổng hai cạnh lớn hơn cạnh còn lại.', ['7_11'], [
    C('b', 'Bộ ba độ dài nào là ba cạnh của một tam giác?', ['1 cm, 2 cm, 3 cm', '3 cm, 4 cm, 5 cm', '2 cm, 3 cm, 6 cm'], 'B', '3 + 4 > 5.'),
    C('s', 'Tam giác ABC có AB = 4, BC = 6, AC = 5. Góc lớn nhất là:', ['góc A', 'góc B', 'góc C'], 'A', 'Đối diện cạnh lớn nhất BC là góc A.'),
    N('c', 'Tam giác có hai cạnh 3 cm và 8 cm, cạnh thứ ba là số nguyên (cm). Có bao nhiêu giá trị của cạnh thứ ba?', '5', '5 < x < 11 ⇒ x ∈ {6, …, 10}.'),
  ])
T('7_23', 'Đường vuông góc và đường xiên; sự đồng quy của các đường đặc biệt trong tam giác', c, 'hinh',
  'Đường vuông góc ngắn hơn đường xiên; trọng tâm (AG = 2/3 AM), giao điểm phân giác, trung trực, trực tâm.', ['7_22', '7_12'], [
    N('b', 'G là trọng tâm tam giác ABC, trung tuyến AM = 9 cm. Tính AG (cm).', '6', 'AG = 2/3 · AM.', '9*F(2,3)', accept=['6 cm']),
    C('s', 'Giao điểm ba đường trung trực của tam giác:', ['cách đều ba cạnh', 'cách đều ba đỉnh', 'là trọng tâm'], 'B', 'Điểm trên trung trực cách đều hai đầu đoạn thẳng.'),
    N('c', 'G là trọng tâm tam giác ABC, GM = 2 cm (M là trung điểm BC). Tính AM (cm).', '6', 'GM = 1/3 AM.', '2*3', accept=['6 cm']),
  ])
c = 'Chương X. Một số hình khối trong thực tiễn'
T('7_24', 'Hình hộp chữ nhật, hình lập phương', c, 'hinh',
  'Đỉnh, cạnh, mặt, đường chéo; diện tích xung quanh và thể tích.', ['5_14'], [
    N('b', 'Hình lập phương có bao nhiêu mặt?', '6', '6 mặt là hình vuông bằng nhau.'),
    N('s', 'Hình hộp chữ nhật kích thước 3 cm, 4 cm, 5 cm có thể tích bao nhiêu cm³?', '60', '3·4·5.', '3*4*5', accept=['60 cm³']),
    N('c', 'Một hình lập phương có diện tích xung quanh 64 cm². Thể tích bằng bao nhiêu cm³?', '64', 'Mỗi mặt 16 cm² ⇒ cạnh 4 cm.', '4**3', accept=['64 cm³']),
  ])
T('7_25', 'Hình lăng trụ đứng tam giác, lăng trụ đứng tứ giác', c, 'hinh',
  'Sxq = chu vi đáy · chiều cao; V = S đáy · chiều cao.', ['7_24', '6_13'], [
    N('b', 'Lăng trụ đứng có diện tích đáy 12 cm², chiều cao 5 cm. Thể tích bằng bao nhiêu cm³?', '60', 'V = S·h.', '12*5', accept=['60 cm³']),
    N('s', 'Lăng trụ đứng tam giác có đáy là tam giác cạnh 3, 4, 5 (cm), chiều cao 10 cm. Diện tích xung quanh bằng bao nhiêu cm²?', '120', '(3 + 4 + 5)·10.', '(3+4+5)*10', accept=['120 cm²']),
    N('c', 'Lăng trụ đứng có đáy là tam giác vuông với hai cạnh góc vuông 6 cm và 8 cm, chiều cao 10 cm. Thể tích bằng bao nhiêu cm³?', '240', 'S đáy = 24; V = 240.', '6*8/2*10', accept=['240 cm³']),
  ])

# ----------------------------------------------------------------- Lớp 8
c = 'Chương I. Đa thức'
T('8_01', 'Đơn thức; đa thức nhiều biến', c, 'so',
  'Đơn thức thu gọn, bậc, hệ số; đơn thức đồng dạng; đa thức nhiều biến, bậc của đa thức.', ['7_17'], [
    N('b', 'Đơn thức −3x²y³ có bậc là bao nhiêu?', '5', '2 + 3 = 5.'),
    S('s', 'Thu gọn 2xy · (−3x²y).', '-6x^3y^2', '2·(−3) = −6; x·x² = x³; y·y = y².', accept=['-6x³y²', '−6x³y²']),
    N('c', 'Đa thức x²y + 3xy³ − 5 có bậc là bao nhiêu?', '4', 'Hạng tử 3xy³ có bậc 4.'),
  ], kind='conceptual')
T('8_02', 'Phép cộng, phép trừ đa thức', c, 'so',
  'Cộng, trừ đa thức nhiều biến bằng cách nhóm hạng tử đồng dạng.', ['8_01', '7_19'], [
    S('b', 'Thu gọn: (2x²y + xy) + (x²y − 3xy).', '3x^2y-2xy', '2x²y + x²y = 3x²y; xy − 3xy = −2xy.', accept=['3x²y-2xy', '3x²y − 2xy']),
    S('s', 'Tính (x² − 2xy + y²) − (x² + y²).', '-2xy', 'x² − x² và y² − y² triệt tiêu.', accept=['−2xy']),
    N('c', 'Tính giá trị của (3x + 2y) − (x − y) tại x = 1, y = 2.', '8', 'Thu gọn 2x + 3y = 2 + 6.', '2*1+3*2'),
  ])
T('8_03', 'Phép nhân đa thức; chia đa thức cho đơn thức', c, 'so',
  'Nhân đơn thức với đa thức, đa thức với đa thức; chia đa thức cho đơn thức (trường hợp chia hết).', ['8_02', '7_20'], [
    S('b', 'Tính 3x(x − 2y).', '3x^2-6xy', 'Nhân 3x với từng hạng tử.', accept=['3x²-6xy', '3x² − 6xy']),
    S('s', 'Tính (x + y)(x − 2y).', 'x^2-xy-2y^2', 'x² − 2xy + xy − 2y².', accept=['x²-xy-2y²', 'x² − xy − 2y²']),
    S('c', 'Tính (6x³y² − 9x²y) : 3x²y.', '2xy-3', '6x³y² : 3x²y = 2xy; −9x²y : 3x²y = −3.', accept=['2xy − 3']),
  ])
c = 'Chương II. Hằng đẳng thức đáng nhớ và ứng dụng'
T('8_04', 'Hiệu hai bình phương; bình phương của một tổng, một hiệu', c, 'so',
  '(a ± b)² = a² ± 2ab + b²; a² − b² = (a − b)(a + b).', ['8_03'], [
    S('b', 'Khai triển (x + 3)².', 'x^2+6x+9', 'x² + 2·x·3 + 9.', accept=['x²+6x+9', 'x² + 6x + 9']),
    N('s', 'Tính nhanh 99² (dùng (100 − 1)²).', '9801', '10 000 − 200 + 1.', '99**2'),
    N('c', 'Tính nhanh 53² − 47².', '600', '(53 − 47)(53 + 47) = 6·100.', '53**2-47**2'),
  ])
T('8_05', 'Lập phương của một tổng, một hiệu; tổng và hiệu hai lập phương', c, 'so',
  '(a ± b)³ = a³ ± 3a²b + 3ab² ± b³; a³ ± b³ = (a ± b)(a² ∓ ab + b²).', ['8_04'], [
    S('b', 'Khai triển (x + 1)³.', 'x^3+3x^2+3x+1', 'Theo hằng đẳng thức.', accept=['x³+3x²+3x+1', 'x³ + 3x² + 3x + 1']),
    S('s', 'Viết x³ − 8 dưới dạng tích.', '(x-2)(x^2+2x+4)', 'a³ − b³ với b = 2.', accept=['(x-2)(x²+2x+4)', '(x − 2)(x² + 2x + 4)']),
    N('c', 'Tính giá trị x³ + 3x² + 3x + 1 tại x = 9.', '1000', 'Bằng (x + 1)³ = 10³.', '10**3'),
  ])
T('8_06', 'Phân tích đa thức thành nhân tử', c, 'so',
  'Đặt nhân tử chung, dùng hằng đẳng thức, nhóm hạng tử.', ['8_04', '8_05~'], [
    S('b', 'Phân tích 5x² − 10x thành nhân tử.', '5x(x-2)', 'Đặt 5x làm nhân tử chung.', accept=['5x(x − 2)']),
    S('s', 'Phân tích x² − 6x + 9 thành nhân tử.', '(x-3)^2', 'Bình phương một hiệu.', accept=['(x-3)²', '(x − 3)²', '(x-3)(x-3)']),
    N('c', 'Tìm x, biết x² − 4x = 0. (ghi các giá trị, ngăn bằng ;)', '0; 4', 'x(x − 4) = 0.', unordered=True),
  ])
c = 'Chương III. Tứ giác'
T('8_07', 'Tứ giác; tổng các góc của tứ giác', c, 'hinh',
  'Tứ giác lồi; tổng bốn góc bằng 360°.', ['7_10'], [
    N('b', 'Tứ giác có ba góc 80°, 90°, 110°. Góc còn lại bằng bao nhiêu độ?', '80', '360 − 280.', '360-80-90-110', accept=['80°']),
    N('s', 'Tứ giác có bốn góc bằng nhau. Mỗi góc bằng bao nhiêu độ?', '90', '360 : 4.', '360/4', accept=['90°']),
    N('c', 'Tứ giác ABCD có góc A : B : C : D = 1 : 2 : 3 : 4. Góc D bằng bao nhiêu độ?', '144', '360 : 10 · 4.', '360/10*4', accept=['144°']),
  ])
T('8_08', 'Hình thang cân', c, 'hinh',
  'Hình thang có hai góc kề một đáy bằng nhau; hai cạnh bên bằng nhau, hai đường chéo bằng nhau.', ['8_07', '7_12'], [
    C('b', 'Trong hình thang cân, hai đường chéo:', ['vuông góc', 'bằng nhau', 'song song'], 'B', 'Tính chất hình thang cân.'),
    N('s', 'Hình thang cân ABCD (AB // CD) có góc D = 65°. Góc C bằng bao nhiêu độ?', '65', 'Hai góc kề đáy lớn bằng nhau.', accept=['65°']),
    N('c', 'Hình thang cân ABCD (AB // CD) có góc D = 65°. Góc A bằng bao nhiêu độ?', '115', 'A + D = 180°.', '180-65', accept=['115°']),
  ])
T('8_09', 'Hình bình hành; hình thoi', c, 'hinh',
  'Tính chất và dấu hiệu nhận biết hình bình hành, hình thoi.', ['8_07', '7_11'], [
    C('b', 'Hai đường chéo của hình bình hành:', ['bằng nhau', 'cắt nhau tại trung điểm mỗi đường', 'vuông góc'], 'B', 'Tính chất hình bình hành.'),
    N('s', 'Hình bình hành ABCD có góc A = 70°. Góc B bằng bao nhiêu độ?', '110', 'Hai góc kề một cạnh bù nhau.', '180-70', accept=['110°']),
    C('c', 'Hình bình hành có hai đường chéo vuông góc là:', ['hình chữ nhật', 'hình thoi', 'hình thang cân'], 'B', 'Dấu hiệu nhận biết hình thoi.'),
  ])
T('8_10', 'Hình chữ nhật; hình vuông', c, 'hinh',
  'Tính chất, dấu hiệu nhận biết hình chữ nhật, hình vuông.', ['8_09'], [
    C('b', 'Hình bình hành có một góc vuông là:', ['hình thoi', 'hình chữ nhật', 'hình thang'], 'B', 'Dấu hiệu nhận biết hình chữ nhật.'),
    N('s', 'Hình chữ nhật có hai cạnh 6 cm và 8 cm. Đường chéo dài bao nhiêu cm?', '10', '√(36 + 64).', '10', accept=['10 cm']),
    C('c', 'Hình chữ nhật có hai đường chéo vuông góc là:', ['hình thoi không vuông', 'hình vuông', 'hình bình hành thường'], 'B', 'Dấu hiệu nhận biết hình vuông.'),
  ])
c = 'Chương IV. Định lí Thalès'
T('8_11', 'Định lí Thalès trong tam giác', c, 'hinh',
  'Đường thẳng song song với một cạnh tam giác định ra trên hai cạnh kia những đoạn thẳng tương ứng tỉ lệ; định lí đảo.', ['7_08', '7_14'], [
    N('b', 'ΔABC, DE // BC (D ∈ AB, E ∈ AC), AD = 2, DB = 3, AE = 4. Tính EC.', '6', 'AD/DB = AE/EC.', '4*3/2'),
    N('s', 'ΔABC, MN // BC (M ∈ AB, N ∈ AC), AM = 3, AB = 9, AC = 12. Tính AN.', '4', 'AM/AB = AN/AC.', '12*3/9'),
    C('c', 'ΔABC có D ∈ AB, E ∈ AC với AD/AB = AE/AC = 2/5. Khi đó:', ['DE ⊥ BC', 'DE // BC', 'DE = BC'], 'B', 'Định lí Thalès đảo.'),
  ])
T('8_12', 'Đường trung bình của tam giác', c, 'hinh',
  'Đường trung bình song song với cạnh thứ ba và bằng nửa cạnh ấy.', ['8_11'], [
    N('b', 'M, N là trung điểm AB, AC; BC = 10 cm. Tính MN (cm).', '5', 'MN = BC/2.', '10/2', accept=['5 cm']),
    N('s', 'Đường trung bình MN của ΔABC dài 7 cm (M ∈ AB, N ∈ AC). Tính BC (cm).', '14', 'BC = 2MN.', '2*7', accept=['14 cm']),
    N('c', 'Tam giác có ba cạnh 6, 8, 10 cm. Tam giác tạo bởi ba đường trung bình có chu vi bao nhiêu cm?', '12', 'Bằng nửa chu vi: 24 : 2.', '24/2', accept=['12 cm']),
  ])
T('8_13', 'Tính chất đường phân giác của tam giác', c, 'hinh',
  'Đường phân giác trong chia cạnh đối diện thành hai đoạn tỉ lệ với hai cạnh kề.', ['8_11'], [
    N('b', 'AD là phân giác ΔABC (D ∈ BC), AB = 6, AC = 9, DB = 4. Tính DC.', '6', 'DB/DC = AB/AC.', '4*9/6'),
    S('s', 'AD là phân giác ΔABC, AB = 5, AC = 7. Tính tỉ số DB/DC.', '5/7', 'DB/DC = AB/AC.'),
    N('c', 'AD là phân giác ΔABC, AB = 4, AC = 6, BC = 5. Tính DB.', '2', 'DB = 5 · 4/10.', '5*F(4,10)'),
  ])
T('8_14', 'Thu thập, phân loại, biểu diễn và phân tích dữ liệu', 'Chương V. Dữ liệu và biểu đồ', 'tk',
  'Chọn dạng biểu diễn phù hợp; chuyển dữ liệu giữa bảng và biểu đồ; phát hiện vấn đề từ số liệu.', ['7_13'], [
    C('b', 'Để so sánh tỉ lệ các phần trong một tổng thể, nên dùng:', ['biểu đồ hình quạt tròn', 'biểu đồ đoạn thẳng', 'bảng thống kê thời gian'], 'A', 'Hình quạt thể hiện phần trăm của tổng thể.'),
    N('s', 'Kết quả khảo sát 40 bạn: 14 bạn thích đọc sách. Tỉ lệ phần trăm là bao nhiêu?', '35%', '14/40 = 35%.', 'F(14,40)', accept=['35']),
    C('c', 'Biểu đồ cột có trục đứng bắt đầu từ 90 thay vì 0 làm cho:', ['chênh lệch trông lớn hơn thực tế', 'số liệu chính xác hơn', 'không ảnh hưởng gì'], 'A', 'Cắt trục làm phóng đại khác biệt.'),
  ], kind='conceptual')
c = 'Chương VI. Phân thức đại số'
T('8_15', 'Phân thức đại số; tính chất cơ bản', c, 'so',
  'Điều kiện xác định; phân thức bằng nhau; rút gọn phân thức.', ['8_06'], [
    N('b', 'Tìm giá trị của x làm phân thức 3/(x − 2) không xác định.', '2', 'Mẫu bằng 0 khi x = 2.'),
    S('s', 'Rút gọn (x² − 1)/(x + 1) (với x ≠ −1).', 'x-1', '(x − 1)(x + 1)/(x + 1).', accept=['x − 1']),
    S('c', 'Rút gọn (2x² − 4x)/(x² − 4) (với x ≠ ±2).', '2x/(x+2)', '2x(x − 2)/[(x − 2)(x + 2)].', accept=['2x/(x + 2)']),
  ])
T('8_16', 'Phép cộng, phép trừ phân thức đại số', c, 'so',
  'Quy đồng mẫu thức; cộng, trừ phân thức.', ['8_15'], [
    S('b', 'Tính x/3 + 2x/3.', 'x', '3x/3 = x.'),
    S('s', 'Tính 1/x + 1/(x + 1) (viết một phân thức).', '(2x+1)/(x(x+1))', 'Mẫu chung x(x + 1).', accept=['(2x+1)/(x^2+x)', '(2x + 1)/(x² + x)']),
    S('c', 'Tính 2/(x − 1) − 2/(x + 1).', '4/(x^2-1)', '2(x + 1) − 2(x − 1) = 4.', accept=['4/(x²-1)', '4/((x-1)(x+1))']),
  ])
T('8_17', 'Phép nhân, phép chia phân thức đại số', c, 'so',
  'Nhân tử với tử, mẫu với mẫu; chia là nhân với phân thức nghịch đảo.', ['8_15'], [
    S('b', 'Tính (x/2) · (4/x) (x ≠ 0).', '2', '4x/2x = 2.'),
    S('s', 'Tính (x² − 9)/x : (x + 3)/x² (x ≠ 0, x ≠ −3).', 'x(x-3)', '(x − 3)(x + 3)/x · x²/(x + 3).', accept=['x^2-3x', 'x² − 3x']),
    N('c', 'Tính giá trị (x + 1)/(x − 1) · (x² − 1)/(x + 1)² tại x = 5.', '1', 'Rút gọn bằng 1 (x ≠ ±1).'),
  ])
c = 'Chương VII. Phương trình bậc nhất và hàm số bậc nhất'
T('8_18', 'Phương trình bậc nhất một ẩn; giải bài toán bằng cách lập phương trình', c, 'so',
  'Giải ax + b = 0 (a ≠ 0); phương trình đưa được về dạng bậc nhất; lập phương trình từ bài toán thực tế.', ['7_04', '7_18'], [
    N('b', 'Giải phương trình 3x − 12 = 0.', '4', 'x = 12/3.', '12/3'),
    N('s', 'Giải phương trình 2(x − 1) = x + 5.', '7', '2x − 2 = x + 5.', '7'),
    N('c', 'Tổng hai số là 80, số này gấp 3 lần số kia. Số lớn là bao nhiêu?', '60', 'x + 3x = 80 ⇒ x = 20.', '3*20'),
  ])
T('8_19', 'Khái niệm hàm số; mặt phẳng tọa độ; đồ thị hàm số', c, 'so',
  'Hàm số cho bằng bảng, công thức; tọa độ điểm; đồ thị là tập điểm (x; f(x)).', ['7_15', '7_17'], [
    N('b', 'Cho f(x) = 2x − 1. Tính f(3).', '5', '2·3 − 1.', '2*3-1'),
    C('s', 'Điểm M(−2; 3) nằm ở góc phần tư thứ mấy?', ['I', 'II', 'III', 'IV'], 'B', 'Hoành độ âm, tung độ dương.'),
    C('c', 'Điểm nào thuộc đồ thị y = −x + 2?', ['(1; 3)', '(3; −1)', '(0; −2)'], 'B', '−3 + 2 = −1.'),
  ], kind='conceptual')
T('8_20', 'Hàm số bậc nhất y = ax + b và đồ thị', c, 'so',
  'Nhận biết hàm bậc nhất (a ≠ 0); vẽ đồ thị là đường thẳng; giao điểm với các trục.', ['8_19'], [
    C('b', 'Hàm số nào là hàm số bậc nhất?', ['y = 3 − 2x', 'y = x² + 1', 'y = 2/x'], 'A', 'Dạng ax + b với a = −2 ≠ 0.'),
    S('s', 'Đồ thị y = 2x − 4 cắt trục hoành tại điểm có tọa độ nào? (viết (x; y))', '(2;0)', '2x − 4 = 0 ⇒ x = 2.', accept=['(2; 0)']),
    N('c', 'Đồ thị y = ax + 3 đi qua điểm (2; 7). Tìm a.', '2', '7 = 2a + 3.', '(7-3)/2'),
  ])
T('8_21', 'Hệ số góc của đường thẳng; hai đường thẳng song song, cắt nhau', c, 'so',
  'a là hệ số góc; d // d\' ⇔ a = a\', b ≠ b\'; d cắt d\' ⇔ a ≠ a\'.', ['8_20'], [
    N('b', 'Hệ số góc của đường thẳng y = −3x + 5 là bao nhiêu?', '-3', 'Hệ số của x.'),
    N('s', 'Tìm m để đường thẳng y = (m − 1)x + 2 song song với y = 3x − 1.', '4', 'm − 1 = 3 và 2 ≠ −1.', '3+1'),
    S('c', 'Tìm tọa độ giao điểm của y = x + 1 và y = −x + 5 (viết (x; y)).', '(2;3)', 'x + 1 = −x + 5 ⇒ x = 2.', accept=['(2; 3)']),
  ])
c = 'Chương VIII. Mở đầu về tính xác suất của biến cố'
T('8_22', 'Kết quả thuận lợi; tính xác suất bằng tỉ số', c, 'tk',
  'P(A) = số kết quả thuận lợi cho A : tổng số kết quả có thể (đồng khả năng).', ['7_21'], [
    N('b', 'Hộp có 3 bi đỏ, 5 bi xanh. Lấy ngẫu nhiên 1 viên. Xác suất lấy được bi đỏ là bao nhiêu?', '3/8', '3 trên 8.', 'F(3,8)', accept=['0,375']),
    N('s', 'Gieo một xúc xắc. Xác suất xuất hiện mặt có số chấm chia hết cho 3 là bao nhiêu?', '1/3', 'Mặt 3 và 6.', 'F(2,6)', accept=['2/6']),
    N('c', 'Chọn ngẫu nhiên một số có hai chữ số. Xác suất số đó chia hết cho 9 là bao nhiêu?', '1/9', 'Có 10 số (18, …, 99) trong 90 số.', 'F(10,90)', accept=['10/90']),
  ])
T('8_23', 'Mối liên hệ giữa xác suất thực nghiệm và xác suất', c, 'tk',
  'Khi số lần thử lớn, xác suất thực nghiệm gần bằng xác suất; dùng để ước lượng.', ['8_22'], [
    C('b', 'Tung đồng xu cân đối rất nhiều lần, xác suất thực nghiệm mặt sấp sẽ gần:', ['0', '0,5', '1'], 'B', 'Xác suất lý thuyết là 0,5.'),
    N('s', 'Tỉ lệ nảy mầm của một loại hạt là 0,85. Gieo 200 hạt, ước tính có bao nhiêu hạt nảy mầm?', '170', '200 · 0,85.', '200*F(85,100)'),
    N('c', 'Kiểm tra 500 sản phẩm thấy 15 sản phẩm lỗi. Ước tính số sản phẩm lỗi trong lô 10 000 sản phẩm.', '300', '10 000 · 15/500.', '10000*15/500'),
  ])
c = 'Chương IX. Tam giác đồng dạng'
T('8_24', 'Tam giác đồng dạng; các trường hợp đồng dạng', c, 'hinh',
  'Định nghĩa, tỉ số đồng dạng; trường hợp c.c.c, c.g.c, g.g.', ['8_11'], [
    N('b', 'ΔABC ∽ ΔDEF theo tỉ số 2, AB = 6 cm. Tính DE (cm).', '3', 'AB/DE = 2.', '6/2', accept=['3 cm']),
    C('s', 'Hai tam giác có hai cặp góc tương ứng bằng nhau thì đồng dạng theo trường hợp:', ['c.c.c', 'c.g.c', 'g.g'], 'C', 'Góc – góc.'),
    N('c', 'ΔABC ∽ ΔA\'B\'C\' với tỉ số 3/2, chu vi ΔABC là 24 cm. Chu vi ΔA\'B\'C\' bằng bao nhiêu cm?', '16', 'Tỉ số chu vi bằng tỉ số đồng dạng.', '24*F(2,3)', accept=['16 cm']),
  ])
T('8_25', 'Định lí Pythagore và ứng dụng', c, 'hinh',
  'Tam giác vuông: bình phương cạnh huyền bằng tổng bình phương hai cạnh góc vuông; định lí đảo.', ['7_05', '7_11'], [
    N('b', 'Tam giác vuông có hai cạnh góc vuông 6 cm và 8 cm. Cạnh huyền dài bao nhiêu cm?', '10', '√(36 + 64).', '10', accept=['10 cm']),
    N('s', 'Tam giác vuông có cạnh huyền 13 cm, một cạnh góc vuông 5 cm. Cạnh còn lại dài bao nhiêu cm?', '12', '√(169 − 25).', '12', accept=['12 cm']),
    C('c', 'Bộ ba nào là độ dài ba cạnh của tam giác vuông?', ['4; 5; 6', '7; 24; 25', '5; 6; 8'], 'B', '49 + 576 = 625.'),
  ])
T('8_26', 'Các trường hợp đồng dạng của tam giác vuông; hình đồng dạng', c, 'hinh',
  'Tam giác vuông đồng dạng khi có một góc nhọn bằng nhau hoặc hai cạnh góc vuông tỉ lệ…; ứng dụng đo chiều cao.', ['8_24', '8_25'], [
    C('b', 'Hai tam giác vuông có một góc nhọn bằng nhau thì:', ['bằng nhau', 'đồng dạng', 'không có quan hệ'], 'B', 'Trường hợp g.g cho tam giác vuông.'),
    N('s', 'Cây cọc cao 1,5 m có bóng 2 m. Cùng lúc, cái cây có bóng 12 m. Cây cao bao nhiêu mét?', '9', '1,5/2 = h/12.', 'F(15,10)*12/2', accept=['9 m']),
    N('c', 'Tam giác vuông ABC (vuông tại A), đường cao AH, BH = 4, CH = 9. Tính AH.', '6', 'AH² = BH·CH = 36.', '6'),
  ])
T('8_27', 'Hình chóp tam giác đều, hình chóp tứ giác đều', 'Chương X. Một số hình khối trong thực tiễn', 'hinh',
  'Sxq = nửa chu vi đáy · trung đoạn; V = 1/3 · S đáy · chiều cao.', ['7_25', '8_25'], [
    N('b', 'Hình chóp tứ giác đều có đáy là hình vuông cạnh 6 cm, chiều cao 5 cm. Thể tích bằng bao nhiêu cm³?', '60', '1/3 · 36 · 5.', 'F(1,3)*36*5', accept=['60 cm³']),
    N('s', 'Hình chóp tứ giác đều cạnh đáy 4 cm, trung đoạn 6 cm. Diện tích xung quanh bằng bao nhiêu cm²?', '48', 'Nửa chu vi 8 · 6.', '8*6', accept=['48 cm²']),
    N('c', 'Hình chóp tứ giác đều cạnh đáy 6 cm, chiều cao 4 cm. Tính trung đoạn (cm).', '5', '√(4² + 3²).', '5', accept=['5 cm']),
  ])

# ----------------------------------------------------------------- Lớp 9
c = 'Chương I. Phương trình và hệ hai phương trình bậc nhất hai ẩn'
T('9_01', 'Phương trình bậc nhất hai ẩn; hệ hai phương trình bậc nhất hai ẩn', c, 'so',
  'Nghiệm của ax + by = c; hệ hai phương trình; kiểm tra một cặp số có là nghiệm.', ['8_18', '8_20'], [
    C('b', 'Cặp số nào là nghiệm của phương trình 2x + y = 5?', ['(1; 2)', '(2; 1)', '(0; 4)'], 'B', '2·2 + 1 = 5.'),
    C('s', 'Cặp số (1; −1) là nghiệm của hệ nào?', ['x + y = 0 và x − y = 2', 'x + y = 1 và x − y = 0', 'x − y = 0 và 2x = 1'], 'A', '1 − 1 = 0; 1 + 1 = 2.'),
    C('c', 'Hệ x + y = 2 và 2x + 2y = 5 có:', ['một nghiệm', 'vô số nghiệm', 'vô nghiệm'], 'C', 'Hai đường thẳng song song.'),
  ], kind='conceptual')
T('9_02', 'Giải hệ hai phương trình bậc nhất hai ẩn', c, 'so',
  'Phương pháp thế, phương pháp cộng đại số.', ['9_01'], [
    N('b', 'Giải hệ x + y = 5 và x − y = 1. Ghi x; y.', '3; 2', 'Cộng vế: 2x = 6.', accept=['x = 3; y = 2']),
    N('s', 'Giải hệ 2x + y = 7 và x − y = 2. Ghi x; y.', '3; 1', 'Cộng vế: 3x = 9.', accept=['x = 3; y = 1']),
    N('c', 'Giải hệ 3x + 2y = 12 và 2x − 3y = −5. Ghi x; y.', '2; 3', 'Nhân để khử y: 13x = 26.', accept=['x = 2; y = 3']),
  ])
T('9_03', 'Giải bài toán bằng cách lập hệ phương trình', c, 'so',
  'Chọn ẩn, lập hệ, giải và đối chiếu điều kiện.', ['9_02'], [
    N('b', 'Tổng hai số là 30, hiệu là 4. Tìm số lớn.', '17', 'x + y = 30, x − y = 4.', '(30+4)/2'),
    N('s', 'Mua 3 bút và 2 vở hết 26 000 đồng; 1 bút và 4 vở hết 32 000 đồng. Giá một quyển vở là bao nhiêu đồng?', '7000', '3b + 2v = 26, b + 4v = 32 (nghìn) ⇒ v = 7.', accept=['7 000', '7.000']),
    N('c', 'Một mảnh đất hình chữ nhật có chu vi 60 m. Nếu tăng chiều rộng 5 m và giảm chiều dài 5 m thì thành hình vuông. Tính chiều dài (m).', '20', 'd + r = 30, d − 5 = r + 5.', '20', accept=['20 m']),
  ])
c = 'Chương II. Phương trình và bất phương trình bậc nhất một ẩn'
T('9_04', 'Phương trình quy về phương trình bậc nhất một ẩn', c, 'so',
  'Phương trình tích (ax + b)(cx + d) = 0; phương trình chứa ẩn ở mẫu (điều kiện xác định).', ['8_18', '8_06', '8_16'], [
    N('b', 'Giải (x − 2)(x + 5) = 0. (ghi các nghiệm, ngăn bằng ;)', '2; -5', 'x − 2 = 0 hoặc x + 5 = 0.', unordered=True),
    N('s', 'Giải phương trình 2/(x − 1) = 1.', '3', 'ĐKXĐ x ≠ 1; x − 1 = 2.'),
    N('c', 'Giải phương trình x/(x − 2) − 1/x = 1 (ĐKXĐ x ≠ 0; x ≠ 2).', '-2', 'Quy đồng: x² − (x − 2) = x(x − 2) ⇒ x = −2.'),
  ])
T('9_05', 'Bất đẳng thức và tính chất', c, 'so',
  'Liên hệ thứ tự với phép cộng, phép nhân (nhân với số âm thì đổi chiều).', ['7_06'], [
    C('b', 'Cho a > b. Bất đẳng thức nào đúng?', ['a − 3 < b − 3', 'a + 2 > b + 2', '−a > −b'], 'B', 'Cộng cùng một số không đổi chiều.'),
    C('s', 'Cho a < b. Khi đó −2a ... −2b', ['<', '>', '='], 'B', 'Nhân với số âm đổi chiều.'),
    C('c', 'Với mọi số thực a, b ta luôn có:', ['a² + b² ≥ 2ab', 'a² + b² < 2ab', 'a + b > ab'], 'A', '(a − b)² ≥ 0.'),
  ], kind='conceptual')
T('9_06', 'Bất phương trình bậc nhất một ẩn', c, 'so',
  'Giải ax + b > 0 (≥, <, ≤), biểu diễn tập nghiệm.', ['9_05', '8_18'], [
    S('b', 'Giải bất phương trình 2x − 6 > 0.', 'x>3', '2x > 6.', accept=['x > 3']),
    S('s', 'Giải bất phương trình −3x + 9 ≥ 0.', 'x≤3', '−3x ≥ −9 ⇒ x ≤ 3 (đổi chiều).', accept=['x ≤ 3', 'x<=3']),
    N('c', 'Tìm số nguyên x lớn nhất thỏa mãn 5 − 2x > 1.', '1', '−2x > −4 ⇒ x < 2.'),
  ])
c = 'Chương III. Căn bậc hai và căn bậc ba'
T('9_07', 'Căn bậc hai và căn thức bậc hai', c, 'so',
  'Căn bậc hai của số không âm; điều kiện xác định của √A; √(A²) = |A|.', ['7_05', '8_04'], [
    N('b', 'Tính √(1,44).', '1,2', '1,2² = 1,44.', 'F(12,10)'),
    S('s', 'Tìm điều kiện xác định của √(2x − 4).', 'x≥2', '2x − 4 ≥ 0.', accept=['x ≥ 2', 'x>=2']),
    S('c', 'Tính √((3 − √10)²) + 3, biết √10 > 3. (Đáp số dạng √a)', '√10', '|3 − √10| = √10 − 3.', accept=['căn 10', 'sqrt(10)']),
  ])
T('9_08', 'Khai căn bậc hai với phép nhân và phép chia', c, 'so',
  '√(AB) = √A·√B; √(A/B) = √A/√B với A ≥ 0, B > 0.', ['9_07'], [
    N('b', 'Tính √2 · √8.', '4', '√16.', '4'),
    N('s', 'Tính √75 : √3.', '5', '√25.', '5'),
    N('c', 'Tính √(0,9) · √(160).', '12', '√144.', '12'),
  ])
T('9_09', 'Biến đổi đơn giản và rút gọn biểu thức chứa căn bậc hai', c, 'so',
  'Đưa thừa số ra ngoài/vào trong dấu căn; trục căn thức ở mẫu; rút gọn.', ['9_08'], [
    S('b', 'Đưa thừa số ra ngoài dấu căn: √50.', '5√2', '50 = 25·2.', accept=['5 căn 2', '5sqrt(2)']),
    S('s', 'Rút gọn √12 + √27 − √3 (đáp số dạng a√3).', '4√3', '2√3 + 3√3 − √3.', accept=['4 căn 3']),
    S('c', 'Trục căn thức ở mẫu: 2/(√3 − 1).', '√3+1', 'Nhân tử và mẫu với √3 + 1: 2(√3 + 1)/2.', accept=['√3 + 1', '1+√3']),
  ])
T('9_10', 'Căn bậc ba', c, 'so',
  '∛a là số x sao cho x³ = a; tính căn bậc ba.', ['7_05', '8_05~'], [
    N('b', 'Tính ∛27.', '3', '3³ = 27.', '3'),
    N('s', 'Tính ∛(−125).', '-5', '(−5)³ = −125.', '-5'),
    N('c', 'Tính ∛8 + ∛(−64) − ∛1.', '-3', '2 − 4 − 1.', '2-4-1'),
  ])
c = 'Chương IV. Hệ thức lượng trong tam giác vuông'
T('9_11', 'Tỉ số lượng giác của góc nhọn', c, 'hinh',
  'sin, cos, tan, cot của góc nhọn; giá trị đặc biệt (30°, 45°, 60°); tỉ số lượng giác của hai góc phụ nhau.', ['8_26'], [
    N('b', 'Tính sin 30°.', '1/2', 'Giá trị đặc biệt.', 'F(1,2)', accept=['0,5']),
    N('s', 'Tam giác ABC vuông tại A, AB = 3, AC = 4. Tính sin B.', '4/5', 'BC = 5; sin B = AC/BC.', 'F(4,5)', accept=['0,8']),
    N('c', 'Biết sin α = 0,6 (α nhọn). Tính cos α.', '0,8', 'sin² + cos² = 1.', 'F(8,10)', accept=['4/5']),
  ])
T('9_12', 'Một số hệ thức giữa cạnh, góc trong tam giác vuông', c, 'hinh',
  'Cạnh góc vuông = cạnh huyền · sin góc đối = cạnh huyền · cos góc kề…; giải tam giác vuông; ứng dụng đo đạc.', ['9_11'], [
    N('b', 'Tam giác vuông có cạnh huyền 10 cm, một góc nhọn 30°. Cạnh đối diện góc 30° dài bao nhiêu cm?', '5', '10 · sin 30°.', '10*F(1,2)', accept=['5 cm']),
    N('s', 'Thang dài 4 m đặt nghiêng tạo với mặt đất góc 60°. Chân thang cách tường bao nhiêu mét?', '2', '4 · cos 60°.', '4*F(1,2)', accept=['2 m']),
    N('c', 'Tam giác ABC vuông tại A, BC = 12, góc B = 45°. Diện tích tam giác bằng bao nhiêu?', '36', 'AB = AC = 12·cos 45° = 6√2; S = 72/2.', '36'),
  ])
c = 'Chương V. Đường tròn'
T('9_13', 'Mở đầu về đường tròn; cung và dây', c, 'hinh',
  'Tâm đối xứng, trục đối xứng; quan hệ đường kính và dây; góc ở tâm, số đo cung.', ['5_12', '7_12'], [
    N('b', 'Đường tròn bán kính 5 cm có dây lớn nhất dài bao nhiêu cm?', '10', 'Dây lớn nhất là đường kính.', '2*5', accept=['10 cm']),
    N('s', 'Góc ở tâm chắn cung nhỏ AB bằng 80°. Số đo cung lớn AB là bao nhiêu độ?', '280', '360 − 80.', '360-80', accept=['280°']),
    N('c', 'Đường tròn (O; 5 cm), dây AB = 8 cm. Khoảng cách từ O đến AB bằng bao nhiêu cm?', '3', '√(25 − 16).', '3', accept=['3 cm']),
  ], kind='conceptual')
T('9_14', 'Độ dài cung tròn; diện tích hình quạt tròn, hình vành khuyên', c, 'hinh',
  'l = πRn/180; S quạt = πR²n/360; S vành khuyên = π(R² − r²).', ['9_13'], [
    S('b', 'Tính độ dài cung 90° của đường tròn bán kính 4 cm (theo π).', '2π', 'π·4·90/180.', accept=['2pi', '2π cm']),
    S('s', 'Tính diện tích hình quạt bán kính 6 cm, góc 60° (theo π).', '6π', 'π·36·60/360.', accept=['6pi', '6π cm²']),
    S('c', 'Tính diện tích hình vành khuyên giới hạn bởi hai đường tròn đồng tâm bán kính 5 cm và 3 cm (theo π).', '16π', 'π(25 − 9).', accept=['16pi', '16π cm²']),
  ])
T('9_15', 'Vị trí tương đối của đường thẳng và đường tròn; tiếp tuyến', c, 'hinh',
  'So sánh d và R; tiếp tuyến vuông góc với bán kính tại tiếp điểm; tính chất hai tiếp tuyến cắt nhau.', ['9_13', '8_25'], [
    C('b', 'Đường tròn (O; 5) và đường thẳng a cách O một khoảng 3. Vị trí tương đối là:', ['cắt nhau', 'tiếp xúc', 'không giao nhau'], 'A', 'd < R.'),
    N('s', 'Từ điểm A cách tâm O là 10 cm kẻ tiếp tuyến AB tới (O; 6 cm). Tính AB (cm).', '8', '√(100 − 36).', '8', accept=['8 cm']),
    N('c', 'Từ A ngoài (O) kẻ hai tiếp tuyến AB, AC. Biết AB = 7 cm. Tính AC (cm).', '7', 'Hai tiếp tuyến cắt nhau: AB = AC.', accept=['7 cm']),
  ])
T('9_16', 'Vị trí tương đối của hai đường tròn', c, 'hinh',
  'So sánh OO\' với R + r và |R − r|.', ['9_13'], [
    C('b', 'Hai đường tròn (O; 3) và (O\'; 5) có OO\' = 8. Hai đường tròn:', ['cắt nhau', 'tiếp xúc ngoài', 'ở ngoài nhau'], 'B', 'OO\' = R + r.'),
    C('s', 'Hai đường tròn (O; 4) và (O\'; 6) có OO\' = 5. Hai đường tròn:', ['cắt nhau', 'tiếp xúc trong', 'đựng nhau'], 'A', '2 < 5 < 10.'),
    N('c', 'Hai đường tròn tiếp xúc trong, bán kính 9 cm và 4 cm. Tính khoảng cách hai tâm (cm).', '5', 'OO\' = R − r.', '9-4', accept=['5 cm']),
  ])
c = 'Chương VI. Hàm số y = ax² (a ≠ 0). Phương trình bậc hai một ẩn'
T('9_17', 'Hàm số y = ax² (a ≠ 0) và đồ thị', c, 'so',
  'Tính giá trị; đồ thị là parabol đỉnh O, nhận Oy làm trục đối xứng.', ['8_19'], [
    N('b', 'Cho y = 2x². Tính y khi x = −3.', '18', '2·9.', '2*9'),
    N('s', 'Đồ thị y = ax² đi qua điểm (2; −8). Tìm a.', '-2', '−8 = 4a.', '-8/4'),
    C('c', 'Với a < 0, đồ thị y = ax²:', ['nằm phía trên trục hoành', 'nằm phía dưới trục hoành, O là điểm cao nhất', 'là đường thẳng'], 'B', 'Parabol quay bề lõm xuống.'),
  ])
T('9_18', 'Phương trình bậc hai một ẩn; công thức nghiệm', c, 'so',
  'ax² + bx + c = 0; biệt thức Δ (hoặc Δ\'); số nghiệm và công thức nghiệm.', ['9_07', '8_06'], [
    N('b', 'Giải x² − 9 = 0. (các nghiệm ngăn bằng ;)', '3; -3', 'x² = 9.', unordered=True),
    N('s', 'Giải x² − 5x + 6 = 0. (các nghiệm ngăn bằng ;)', '2; 3', 'Δ = 1; x = (5 ± 1)/2.', unordered=True),
    N('c', 'Tìm m để phương trình x² − 4x + m = 0 có nghiệm kép.', '4', 'Δ\' = 4 − m = 0.', '4'),
  ])
T('9_19', 'Định lí Viète và ứng dụng', c, 'so',
  'x₁ + x₂ = −b/a, x₁x₂ = c/a; nhẩm nghiệm; tìm hai số biết tổng và tích.', ['9_18'], [
    N('b', 'Phương trình x² − 7x + 10 = 0 có hai nghiệm x₁, x₂. Tính x₁ + x₂.', '7', '−b/a = 7.', '7'),
    N('s', 'Phương trình 2x² + 6x − 5 = 0 có hai nghiệm. Tính tích hai nghiệm.', '-5/2', 'c/a = −5/2.', 'F(-5,2)', accept=['-2,5']),
    N('c', 'Phương trình x² − 3x − 1 = 0 có hai nghiệm x₁, x₂. Tính x₁² + x₂².', '11', '(x₁ + x₂)² − 2x₁x₂ = 9 + 2.', '9+2'),
  ])
T('9_20', 'Giải bài toán bằng cách lập phương trình bậc hai', c, 'so',
  'Lập phương trình bậc hai từ bài toán thực tế; đối chiếu điều kiện của ẩn.', ['9_18'], [
    N('b', 'Tìm số dương x biết x² = 2x + 15.', '5', 'x² − 2x − 15 = 0 ⇒ x = 5 hoặc −3.'),
    N('s', 'Mảnh vườn hình chữ nhật có chiều dài hơn chiều rộng 3 m, diện tích 40 m². Tính chiều rộng (m).', '5', 'x(x + 3) = 40 ⇒ x = 5.', '5', accept=['5 m']),
    N('c', 'Tích hai số tự nhiên liên tiếp là 156. Số lớn là bao nhiêu?', '13', 'x(x + 1) = 156 ⇒ x = 12.', '13'),
  ])
T('9_21', 'Bảng tần số, tần số tương đối; mẫu số liệu ghép nhóm', 'Chương VII. Tần số và tần số tương đối', 'tk',
  'Lập bảng tần số, tần số tương đối; biểu đồ tần số tương đối; bảng tần số ghép nhóm.', ['8_14'], [
    N('b', 'Điểm kiểm tra của 10 bạn: 7; 8; 7; 9; 6; 7; 8; 10; 7; 9. Tần số của điểm 7 là bao nhiêu?', '4', 'Đếm số lần xuất hiện của 7.'),
    N('s', 'Theo dãy trên, tần số tương đối của điểm 8 là bao nhiêu phần trăm?', '20%', '2/10 = 20%.', 'F(2,10)', accept=['20']),
    N('c', 'Mẫu 40 số liệu, nhóm [150; 160) có tần số tương đối 25%. Tần số của nhóm đó là bao nhiêu?', '10', '40 · 25%.', '40*25/100'),
  ])
T('9_22', 'Phép thử ngẫu nhiên, không gian mẫu; xác suất của biến cố', 'Chương VIII. Xác suất của biến cố trong một số mô hình xác suất đơn giản', 'tk',
  'Mô tả không gian mẫu (liệt kê, bảng, sơ đồ cây); tính xác suất trong mô hình đồng khả năng.', ['8_22'], [
    N('b', 'Tung hai đồng xu. Không gian mẫu có bao nhiêu phần tử?', '4', 'SS, SN, NS, NN.'),
    N('s', 'Gieo hai xúc xắc. Xác suất tổng số chấm bằng 7 là bao nhiêu?', '1/6', '6 trong 36 kết quả.', 'F(6,36)', accept=['6/36']),
    N('c', 'Chọn ngẫu nhiên 2 bạn trong nhóm 3 nam, 2 nữ. Xác suất chọn được 2 bạn nữ là bao nhiêu?', '1/10', 'Có 10 cặp, chỉ 1 cặp nữ – nữ.', 'F(1,10)', accept=['0,1']),
  ])
c = 'Chương IX. Đường tròn ngoại tiếp và đường tròn nội tiếp'
T('9_23', 'Góc nội tiếp', c, 'hinh',
  'Góc nội tiếp bằng nửa số đo cung bị chắn; góc nội tiếp chắn nửa đường tròn là góc vuông.', ['9_13'], [
    N('b', 'Góc nội tiếp chắn cung 100°. Số đo góc đó là bao nhiêu độ?', '50', 'Bằng nửa số đo cung.', '100/2', accept=['50°']),
    N('s', 'Góc nội tiếp chắn nửa đường tròn có số đo bao nhiêu độ?', '90', 'Nửa của 180°.', accept=['90°']),
    N('c', 'Góc ở tâm AOB = 120°. Góc nội tiếp ACB (C thuộc cung lớn AB) bằng bao nhiêu độ?', '60', 'Bằng nửa góc ở tâm cùng chắn cung.', '120/2', accept=['60°']),
  ])
T('9_24', 'Đường tròn ngoại tiếp và đường tròn nội tiếp của một tam giác', c, 'hinh',
  'Tâm ngoại tiếp là giao ba trung trực; tâm nội tiếp là giao ba phân giác; tam giác vuông, tam giác đều.', ['9_23', '7_23'], [
    N('b', 'Tam giác vuông có cạnh huyền 10 cm. Bán kính đường tròn ngoại tiếp bằng bao nhiêu cm?', '5', 'Tâm là trung điểm cạnh huyền.', '10/2', accept=['5 cm']),
    S('s', 'Tam giác đều cạnh 6 cm. Bán kính đường tròn ngoại tiếp bằng bao nhiêu cm?', '2√3', 'R = a√3/3.', accept=['2 căn 3', '2√3 cm']),
    S('c', 'Tam giác đều cạnh 6 cm. Bán kính đường tròn nội tiếp bằng bao nhiêu cm?', '√3', 'r = a√3/6.', accept=['căn 3', '√3 cm']),
  ])
T('9_25', 'Tứ giác nội tiếp', c, 'hinh',
  'Tứ giác nội tiếp có tổng hai góc đối bằng 180°; hình chữ nhật, hình vuông nội tiếp.', ['9_23', '8_07'], [
    N('b', 'Tứ giác ABCD nội tiếp, góc A = 75°. Góc C bằng bao nhiêu độ?', '105', 'A + C = 180°.', '180-75', accept=['105°']),
    C('s', 'Hình nào luôn nội tiếp được đường tròn?', ['Hình thoi', 'Hình chữ nhật', 'Hình bình hành'], 'B', 'Tổng hai góc đối bằng 180°.'),
    S('c', 'Hình vuông cạnh 4 cm nội tiếp đường tròn. Bán kính đường tròn bằng bao nhiêu cm? (dạng a√2)', '2√2', 'R = nửa đường chéo = 4√2/2.', accept=['2 căn 2', '2√2 cm']),
  ])
T('9_26', 'Đa giác đều; phép quay', c, 'hinh',
  'Đa giác đều; phép quay giữ nguyên đa giác đều.', ['9_25'], [
    N('b', 'Mỗi góc của ngũ giác đều bằng bao nhiêu độ?', '108', '(5 − 2)·180 : 5.', '(5-2)*180/5', accept=['108°']),
    N('s', 'Phép quay tâm O góc nhỏ nhất bao nhiêu độ (khác 0°) biến lục giác đều tâm O thành chính nó?', '60', '360 : 6.', '360/6', accept=['60°']),
    N('c', 'Đa giác đều có mỗi góc 140°. Đa giác đó có bao nhiêu cạnh?', '9', 'Góc ngoài 40°; 360 : 40.', '360/40'),
  ])
T('9_27', 'Hình trụ, hình nón, hình cầu', 'Chương X. Một số hình khối trong thực tiễn', 'hinh',
  'Trụ: Sxq = 2πrh, V = πr²h; nón: Sxq = πrl, V = πr²h/3; cầu: S = 4πR², V = 4πR³/3.', ['5_12', '8_27~'], [
    S('b', 'Hình trụ bán kính đáy 3 cm, chiều cao 5 cm. Thể tích (theo π, đơn vị cm³)?', '45π', 'π·9·5.', accept=['45pi', '45π cm³']),
    S('s', 'Hình nón bán kính đáy 3 cm, chiều cao 4 cm. Diện tích xung quanh (theo π, cm²)?', '15π', 'l = 5; π·3·5.', accept=['15pi', '15π cm²']),
    S('c', 'Hình cầu bán kính 3 cm. Thể tích (theo π, cm³)?', '36π', '4/3·π·27.', accept=['36pi', '36π cm³']),
  ])
