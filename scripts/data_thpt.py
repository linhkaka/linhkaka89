"""THPT (lớp 10–12). Căn cứ: Chương trình GDPT 2018 môn Toán (phần bắt buộc, không gồm chuyên đề học tập);
chương theo bộ SGK "Kết nối tri thức với cuộc sống". CẦN GIÁO VIÊN ĐỐI CHIẾU với sách đang dùng."""
from vnlib import T, N, C, S

# ----------------------------------------------------------------- Lớp 10
c = 'Chương I. Mệnh đề và tập hợp'
T('10_01', 'Mệnh đề; mệnh đề phủ định, kéo theo, tương đương', c, 'so',
  'Nhận biết mệnh đề, phủ định, kéo theo, đảo, tương đương; kí hiệu ∀, ∃.', ['9_05~'], [
    C('b', 'Câu nào là mệnh đề?', ['Hôm nay trời đẹp quá!', '2 + 3 = 6', 'Bạn có khỏe không?'], 'B', 'Mệnh đề là câu khẳng định đúng hoặc sai (ở đây là sai).'),
    C('s', 'Phủ định của mệnh đề "∀x ∈ ℝ, x² ≥ 0" là:', ['∀x ∈ ℝ, x² < 0', '∃x ∈ ℝ, x² < 0', '∃x ∈ ℝ, x² ≥ 0'], 'B', 'Phủ định của ∀ là ∃, của ≥ là <.'),
    C('c', 'Mệnh đề "Nếu một số chia hết cho 6 thì nó chia hết cho 3" có mệnh đề đảo:', ['đúng', 'sai'], 'B', 'Ví dụ 3 chia hết cho 3 nhưng không chia hết cho 6.'),
  ], kind='conceptual')
T('10_02', 'Tập hợp và các phép toán trên tập hợp', c, 'so',
  'Tập con, giao, hợp, hiệu, phần bù; các tập con của ℝ (khoảng, đoạn, nửa khoảng).', ['6_01', '7_06'], [
    S('b', 'Cho A = {1; 2; 3; 4}, B = {3; 4; 5}. Tìm A ∩ B.', '{3;4}', 'Phần tử chung.', accept=['{3; 4}', '{4;3}']),
    N('s', 'Tập hợp {a; b; c} có bao nhiêu tập con?', '8', '2³ = 8.', '2**3'),
    S('c', 'Cho A = [−1; 3), B = (1; 5]. Tìm A ∩ B.', '(1;3)', 'Phần chung trên trục số.', accept=['(1; 3)']),
  ], kind='conceptual')
c = 'Chương II. Bất phương trình và hệ bất phương trình bậc nhất hai ẩn'
T('10_03', 'Bất phương trình bậc nhất hai ẩn', c, 'so',
  'Nghiệm và miền nghiệm của ax + by < c; biểu diễn miền nghiệm.', ['9_06', '8_20'], [
    C('b', 'Cặp số nào là nghiệm của 2x + y < 3?', ['(1; 1)', '(2; 0)', '(0; 2)'], 'C', '(0; 2): 0 + 2 = 2 < 3 đúng; (1; 1) cho 3 < 3 sai; (2; 0) cho 4 < 3 sai.'),
    C('s', 'Điểm O(0; 0) thuộc miền nghiệm của bất phương trình nào?', ['x + y > 1', '2x − y < 3', 'x − 3y ≥ 2'], 'B', '0 < 3 đúng.'),
    C('c', 'Miền nghiệm của x − y ≤ 0 là nửa mặt phẳng bờ y = x:', ['chứa điểm (0; 1)', 'chứa điểm (1; 0)', 'chứa cả hai điểm'], 'A', '0 − 1 ≤ 0 đúng; 1 − 0 ≤ 0 sai.'),
  ])
T('10_04', 'Hệ bất phương trình bậc nhất hai ẩn và ứng dụng', c, 'so',
  'Miền nghiệm của hệ; tìm giá trị lớn nhất, nhỏ nhất của F = ax + by trên miền đa giác (bài toán kinh tế).', ['10_03'], [
    C('b', 'Cặp số nào là nghiệm của hệ x ≥ 0; y ≥ 0; x + y ≤ 4?', ['(1; 2)', '(3; 2)', '(−1; 1)'], 'A', '1 + 2 ≤ 4 và cả hai không âm.'),
    N('s', 'Miền nghiệm của hệ x ≥ 0; y ≥ 0; x + y ≤ 4 là tam giác có các đỉnh (0;0), (4;0), (0;4). Giá trị lớn nhất của F = 2x + y trên miền đó là bao nhiêu?', '8', 'Xét tại các đỉnh: 0; 8; 4.', '8'),
    N('c', 'Trên miền có các đỉnh (0;0), (3;0), (2;2), (0;3), giá trị lớn nhất của F = x + 2y là bao nhiêu?', '6', 'F: 0; 3; 6; 6.', '6'),
  ])
c = 'Chương III. Hệ thức lượng trong tam giác'
T('10_05', 'Giá trị lượng giác của một góc từ 0° đến 180°', c, 'hinh',
  'Định nghĩa qua nửa đường tròn đơn vị; sin(180° − α) = sin α, cos(180° − α) = −cos α.', ['9_11'], [
    N('b', 'Tính cos 180°.', '-1', 'Điểm (−1; 0) trên nửa đường tròn đơn vị.'),
    N('s', 'Tính sin 150°.', '1/2', 'sin 150° = sin 30°.', 'F(1,2)', accept=['0,5']),
    N('c', 'Tính cos 120° + sin 30°.', '0', '−1/2 + 1/2.', '0'),
  ])
T('10_06', 'Định lí côsin, định lí sin', c, 'hinh',
  'a² = b² + c² − 2bc cos A; a/sin A = 2R.', ['10_05', '8_25'], [
    N('b', 'Tam giác có b = 3, c = 5, góc A = 60°. Tính a².', '19', '9 + 25 − 2·15·1/2.', '9+25-15'),
    N('s', 'Tam giác ABC có a = 6, góc A = 30°. Tính bán kính đường tròn ngoại tiếp R.', '6', 'a/sin A = 2R ⇒ 12 = 2R.', '6/F(1,2)/2'),
    N('c', 'Tam giác có ba cạnh 5, 7, 8. Góc đối diện cạnh 7 bằng bao nhiêu độ?', '60', 'cos = (25 + 64 − 49)/80 = 1/2.', accept=['60°']),
  ])
T('10_07', 'Giải tam giác; diện tích tam giác', c, 'hinh',
  'S = ½ab sin C; công thức Heron; S = abc/(4R); S = pr; ứng dụng đo đạc.', ['10_06'], [
    N('b', 'Tam giác có a = 4, b = 6, góc C = 30°. Tính diện tích.', '6', '½·4·6·½.', 'F(1,2)*4*6*F(1,2)'),
    N('s', 'Tam giác có ba cạnh 13, 14, 15. Tính diện tích (công thức Heron).', '84', 'p = 21; √(21·8·7·6) = 84.', '84'),
    N('c', 'Tam giác có ba cạnh 13, 14, 15. Tính bán kính đường tròn nội tiếp r.', '4', 'r = S/p = 84/21.', '84/21'),
  ])
c = 'Chương IV. Vectơ'
T('10_08', 'Các khái niệm mở đầu về vectơ', c, 'hinh',
  'Vectơ, độ dài, cùng phương, cùng hướng, hai vectơ bằng nhau, vectơ-không.', ['6_24'], [
    N('b', 'Cho ba điểm phân biệt A, B, C. Có bao nhiêu vectơ khác vectơ-không có điểm đầu, điểm cuối lấy trong ba điểm đó?', '6', 'Mỗi cặp có thứ tự: 3·2.', '3*2'),
    C('s', 'ABCD là hình bình hành. Vectơ nào bằng vectơ AB?', ['vectơ CD', 'vectơ DC', 'vectơ BA'], 'B', 'AB và DC cùng hướng, cùng độ dài.'),
    C('c', 'Hai vectơ cùng phương thì:', ['luôn cùng hướng', 'có giá song song hoặc trùng nhau', 'có độ dài bằng nhau'], 'B', 'Định nghĩa cùng phương.'),
  ], kind='conceptual')
T('10_09', 'Tổng và hiệu của hai vectơ', c, 'hinh',
  'Quy tắc ba điểm, quy tắc hình bình hành, quy tắc hiệu; trung điểm, trọng tâm.', ['10_08', '8_09'], [
    S('b', 'Theo quy tắc ba điểm, vectơ AB + vectơ BC bằng vectơ nào?', 'AC', 'AB + BC = AC.', accept=['vectơ AC']),
    S('s', 'Theo quy tắc hiệu, vectơ OB − vectơ OA bằng vectơ nào?', 'AB', 'OB − OA = AB.', accept=['vectơ AB']),
    S('c', 'Tam giác ABC đều cạnh 2. Tính độ dài vectơ AB + vectơ AC.', '2√3', '= 2·AM, AM = √3.', accept=['2 căn 3']),
  ])
T('10_10', 'Tích của một vectơ với một số', c, 'hinh',
  'Vectơ k·a; điều kiện cùng phương; ba điểm thẳng hàng; biểu thị một vectơ qua hai vectơ không cùng phương.', ['10_09'], [
    N('b', 'Vectơ a có độ dài 3. Độ dài của vectơ −2a là bao nhiêu?', '6', '|−2|·3.', '2*3'),
    C('s', 'M là trung điểm AB, O tùy ý. Khi đó OA + OB (vectơ) bằng:', ['OM', '2·OM', '½·OM'], 'B', 'Tính chất trung điểm.'),
    C('c', 'G là trọng tâm tam giác ABC. Khẳng định nào đúng?', ['GA + GB + GC = 0 (vectơ)', 'GA = GB = GC', 'AG = ½AM'], 'A', 'Tính chất trọng tâm.'),
  ])
T('10_11', 'Vectơ trong mặt phẳng tọa độ', c, 'hinh',
  'Tọa độ vectơ, tọa độ điểm; biểu thức tọa độ các phép toán; trung điểm, trọng tâm.', ['10_10', '8_19'], [
    S('b', 'Cho A(1; 2), B(4; 6). Tìm tọa độ vectơ AB.', '(3;4)', '(4 − 1; 6 − 2).', accept=['(3; 4)']),
    N('s', 'Cho A(1; 2), B(4; 6). Tính độ dài AB.', '5', '√(9 + 16).', '5'),
    S('c', 'Tam giác ABC có A(1; 1), B(3; 5), C(5; 0). Tìm tọa độ trọng tâm G.', '(3;2)', '((1 + 3 + 5)/3; (1 + 5 + 0)/3).', accept=['(3; 2)']),
  ])
T('10_12', 'Tích vô hướng của hai vectơ', c, 'hinh',
  'a·b = |a||b|cos(a, b) = x₁x₂ + y₁y₂; góc giữa hai vectơ; a ⊥ b ⇔ a·b = 0.', ['10_11', '10_05'], [
    N('b', 'Cho a = (2; 3), b = (4; −1). Tính a·b.', '5', '8 − 3.', '2*4+3*(-1)'),
    N('s', 'Tìm m để a = (m; 2) vuông góc với b = (3; −6).', '4', '3m − 12 = 0.', '12/3'),
    N('c', 'Cho |a| = 2, |b| = 3, góc giữa a và b là 60°. Tính a·b.', '3', '2·3·½.', '2*3*F(1,2)'),
  ])
c = 'Chương V. Các số đặc trưng của mẫu số liệu không ghép nhóm'
T('10_13', 'Số gần đúng và sai số', c, 'tk',
  'Số gần đúng, sai số tuyệt đối, độ chính xác, sai số tương đối; quy tròn số.', ['6_21'], [
    N('b', 'Quy tròn số 3,14159 đến hàng phần nghìn.', '3,142', 'Chữ số kế tiếp là 5.', 'F(3142,1000)'),
    N('s', 'Số gần đúng a = 2,5 của số đúng 2,47. Sai số tuyệt đối là bao nhiêu?', '0,03', '|2,5 − 2,47|.', 'F(3,100)'),
    N('c', 'Cho a = 1 234 567 ± 300. Quy tròn a theo độ chính xác d = 300 (quy tròn đến hàng nghìn).', '1235000', 'd đến hàng trăm ⇒ quy tròn đến hàng nghìn.', accept=['1 235 000']),
  ])
T('10_14', 'Các số đặc trưng đo xu thế trung tâm', c, 'tk',
  'Số trung bình, trung vị, mốt, tứ phân vị của mẫu số liệu không ghép nhóm.', ['9_21'], [
    N('b', 'Tính số trung bình của mẫu: 4; 6; 8; 10; 12.', '8', '40 : 5.', '(4+6+8+10+12)/5'),
    N('s', 'Tìm trung vị của mẫu: 3; 9; 1; 7; 5; 11.', '6', 'Sắp xếp: 1; 3; 5; 7; 9; 11 ⇒ (5 + 7)/2.', '(5+7)/2'),
    N('c', 'Tìm tứ phân vị thứ nhất Q₁ của mẫu: 1; 3; 5; 7; 9; 11; 13; 15.', '4', 'Nửa dưới 1; 3; 5; 7 có trung vị (3 + 5)/2.', '(3+5)/2'),
  ])
T('10_15', 'Các số đặc trưng đo độ phân tán', c, 'tk',
  'Khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn; giá trị bất thường.', ['10_14', '7_05'], [
    N('b', 'Tính khoảng biến thiên của mẫu: 5; 12; 8; 20; 3.', '17', '20 − 3.', '20-3'),
    N('s', 'Tính phương sai của mẫu: 2; 4; 6.', '8/3', 'TB = 4; (4 + 0 + 4)/3.', 'F(8,3)'),
    S('c', 'Tính độ lệch chuẩn của mẫu: 1; 3; 5; 7.', '√5', 'TB = 4; phương sai = (9 + 1 + 1 + 9)/4 = 5.', accept=['căn 5']),
  ])
c = 'Chương VI. Hàm số, đồ thị và ứng dụng'
T('10_16', 'Hàm số; tập xác định; đồng biến, nghịch biến', c, 'so',
  'Tập xác định, tập giá trị; đồ thị; hàm số đồng biến, nghịch biến trên khoảng.', ['8_19', '10_02'], [
    S('b', 'Tìm tập xác định của y = 1/(x − 3).', 'ℝ\\{3}', 'x − 3 ≠ 0.', accept=['R\\{3}', 'x ≠ 3', 'x≠3']),
    S('s', 'Tìm tập xác định của y = √(4 − x).', '(-∞;4]', '4 − x ≥ 0.', accept=['x ≤ 4', 'x≤4', '(−∞; 4]']),
    C('c', 'Hàm số y = −2x + 5 trên ℝ:', ['đồng biến', 'nghịch biến', 'không đổi'], 'B', 'Hệ số góc âm.'),
  ], kind='conceptual')
T('10_17', 'Hàm số bậc hai', c, 'so',
  'y = ax² + bx + c; đỉnh (−b/2a; −Δ/4a); trục đối xứng; khoảng đồng biến, nghịch biến; vẽ parabol.', ['10_16', '9_17', '9_18'], [
    N('b', 'Parabol y = x² − 4x + 3 có trục đối xứng x = ?', '2', 'x = −b/2a = 4/2.', '4/2'),
    S('s', 'Tìm tọa độ đỉnh của parabol y = x² − 4x + 3.', '(2;-1)', 'x = 2; y = 4 − 8 + 3.', accept=['(2; -1)', '(2; −1)']),
    N('c', 'Giá trị nhỏ nhất của y = 2x² + 8x + 1 là bao nhiêu?', '-7', 'Tại x = −2: 8 − 16 + 1.', '2*4-16+1'),
  ])
T('10_18', 'Dấu của tam thức bậc hai; bất phương trình bậc hai', c, 'so',
  'Định lí về dấu của tam thức bậc hai; giải bất phương trình bậc hai một ẩn.', ['10_17'], [
    S('b', 'Giải bất phương trình x² − 4 < 0.', '(-2;2)', 'Trong khoảng hai nghiệm.', accept=['(−2; 2)', '-2<x<2', '−2 < x < 2']),
    S('s', 'Giải bất phương trình x² − 5x + 6 ≥ 0.', '(-∞;2]∪[3;+∞)', 'Ngoài khoảng hai nghiệm 2 và 3.', accept=['x ≤ 2 hoặc x ≥ 3', 'x≤2;x≥3']),
    S('c', 'Tìm m để x² − 2x + m > 0 với mọi x ∈ ℝ.', 'm>1', 'Δ\' = 1 − m < 0.', accept=['m > 1']),
  ])
T('10_19', 'Phương trình quy về phương trình bậc hai', c, 'so',
  'Phương trình dạng √(ax² + bx + c) = √(dx² + ex + f) và √(ax² + bx + c) = dx + e.', ['10_18', '9_09'], [
    N('b', 'Giải phương trình √(x + 3) = 3.', '6', 'x + 3 = 9.', '6'),
    N('s', 'Giải phương trình √(2x − 1) = x − 2.', '5', 'Bình phương: x² − 6x + 5 = 0 ⇒ x = 1 (loại vì x − 2 < 0) hoặc x = 5.'),
    N('c', 'Giải phương trình √(x² − 3x + 5) = √(x + 2). (các nghiệm ngăn bằng ;)', '1; 3', 'x² − 4x + 3 = 0; cả hai thỏa x + 2 ≥ 0.', unordered=True),
  ])
c = 'Chương VII. Phương pháp tọa độ trong mặt phẳng'
T('10_20', 'Phương trình đường thẳng', c, 'hinh',
  'Vectơ pháp tuyến, chỉ phương; phương trình tổng quát, tham số.', ['10_11', '8_21'], [
    C('b', 'Đường thẳng 2x − 3y + 1 = 0 có một vectơ pháp tuyến là:', ['(2; −3)', '(3; 2)', '(2; 3)'], 'A', 'Hệ số của x và y.'),
    S('s', 'Viết phương trình tổng quát của đường thẳng đi qua A(1; 2) có vectơ pháp tuyến (3; 1).', '3x+y-5=0', '3(x − 1) + (y − 2) = 0.', accept=['3x + y − 5 = 0', '3x + y - 5 = 0']),
    S('c', 'Viết phương trình tổng quát của đường thẳng đi qua A(1; 1) và B(3; 5).', '2x-y-1=0', 'VTCP (2; 4) ⇒ VTPT (2; −1).', accept=['2x − y − 1 = 0', '2x - y - 1 = 0']),
  ])
T('10_21', 'Vị trí tương đối, góc và khoảng cách', c, 'hinh',
  'Vị trí tương đối hai đường thẳng; góc giữa hai đường thẳng; khoảng cách từ điểm đến đường thẳng.', ['10_20', '10_12'], [
    C('b', 'Hai đường thẳng x + 2y − 1 = 0 và 2x + 4y + 3 = 0:', ['cắt nhau', 'song song', 'trùng nhau'], 'B', 'Hệ số tỉ lệ 1/2 = 2/4 ≠ −1/3.'),
    N('s', 'Tính khoảng cách từ M(1; 2) đến đường thẳng 3x + 4y − 1 = 0.', '2', '|3 + 8 − 1|/5.', '(3+8-1)/5'),
    N('c', 'Tính góc giữa hai đường thẳng x − y = 0 và x = 0 (độ).', '45', 'VTPT (1; −1) và (1; 0): cos = 1/√2.', accept=['45°']),
  ])
T('10_22', 'Đường tròn trong mặt phẳng tọa độ', c, 'hinh',
  '(x − a)² + (y − b)² = R²; nhận dạng x² + y² − 2ax − 2by + c = 0; tiếp tuyến.', ['10_21', '9_15'], [
    N('b', 'Đường tròn (x − 1)² + (y + 2)² = 9 có bán kính bằng bao nhiêu?', '3', 'R² = 9.', '3'),
    S('s', 'Tìm tâm của đường tròn x² + y² − 4x + 6y − 3 = 0.', '(2;-3)', 'a = 2, b = −3.', accept=['(2; -3)', '(2; −3)']),
    N('c', 'Tìm bán kính đường tròn tâm I(1; 2) tiếp xúc với đường thẳng 3x + 4y + 4 = 0.', '3', 'R = d(I, Δ) = |3 + 8 + 4|/5.', '(3+8+4)/5'),
  ])
T('10_23', 'Ba đường conic', c, 'hinh',
  'Phương trình chính tắc của elip, hypebol, parabol; các yếu tố cơ bản.', ['10_22'], [
    N('b', 'Elip x²/25 + y²/9 = 1 có độ dài trục lớn bằng bao nhiêu?', '10', '2a = 10.', '2*5'),
    N('s', 'Elip x²/25 + y²/9 = 1 có tiêu cự 2c bằng bao nhiêu?', '8', 'c² = 25 − 9 = 16.', '2*4'),
    S('c', 'Parabol y² = 8x có tiêu điểm là điểm nào?', '(2;0)', '2p = 8 ⇒ F(p/2; 0) = (2; 0).', accept=['(2; 0)']),
  ])
c = 'Chương VIII. Đại số tổ hợp'
T('10_24', 'Quy tắc cộng, quy tắc nhân; sơ đồ hình cây', c, 'tk',
  'Đếm bằng quy tắc cộng, quy tắc nhân, sơ đồ hình cây.', ['6_03'], [
    N('b', 'Có 3 áo và 4 quần. Có bao nhiêu cách chọn một bộ quần áo?', '12', 'Quy tắc nhân 3·4.', '3*4'),
    N('s', 'Có bao nhiêu số tự nhiên có hai chữ số khác nhau được lập từ 1, 2, 3, 4, 5?', '20', '5·4.', '5*4'),
    N('c', 'Có bao nhiêu số tự nhiên chẵn có ba chữ số khác nhau lập từ 0, 1, 2, 3, 4?', '30', 'Tận cùng 0: 4·3 = 12; tận cùng 2 hoặc 4: 2·3·3 = 18.', '12+18'),
  ])
T('10_25', 'Hoán vị, chỉnh hợp, tổ hợp', c, 'tk',
  'Pₙ = n!; Aₙᵏ = n!/(n − k)!; Cₙᵏ = n!/(k!(n − k)!).', ['10_24'], [
    N('b', 'Có bao nhiêu cách xếp 4 bạn ngồi vào một hàng 4 ghế?', '24', '4! = 24.', '24'),
    N('s', 'Có bao nhiêu cách chọn ra 3 bạn từ 10 bạn để đi trực nhật?', '120', 'C₁₀³.', 'comb(10,3)'),
    N('c', 'Có bao nhiêu cách chọn lớp trưởng, lớp phó, thủ quỹ từ 10 bạn (mỗi bạn giữ tối đa một chức)?', '720', 'A₁₀³ = 10·9·8.', '10*9*8'),
  ])
T('10_26', 'Nhị thức Newton', c, 'tk',
  'Khai triển (a + b)ⁿ với n ≤ 5; hệ số trong khai triển.', ['10_25', '8_05'], [
    N('b', 'Khai triển (a + b)⁴ có bao nhiêu số hạng?', '5', 'n + 1 số hạng.'),
    N('s', 'Hệ số của x² trong khai triển (1 + x)⁵ là bao nhiêu?', '10', 'C₅².', 'comb(5,2)'),
    N('c', 'Hệ số của x³ trong khai triển (2x − 1)⁴ là bao nhiêu?', '-32', 'C₄³·2³·(−1) = −32.', 'comb(4,3)*8*(-1)'),
  ])
T('10_27', 'Biến cố và định nghĩa cổ điển của xác suất', 'Chương IX. Tính xác suất theo định nghĩa cổ điển', 'tk',
  'Không gian mẫu, biến cố; P(A) = n(A)/n(Ω); biến cố đối; dùng tổ hợp để đếm.', ['10_25', '9_22', '10_02~'], [
    N('b', 'Gieo hai xúc xắc. Xác suất để hai mặt có số chấm bằng nhau là bao nhiêu?', '1/6', '6/36.', 'F(6,36)'),
    N('s', 'Hộp có 5 bi đỏ và 3 bi xanh. Lấy ngẫu nhiên 2 bi. Xác suất được 2 bi đỏ là bao nhiêu?', '5/14', 'C₅²/C₈² = 10/28.', 'F(comb(5,2),comb(8,2))'),
    N('c', 'Gieo đồng xu 3 lần. Xác suất để có ít nhất một lần mặt sấp là bao nhiêu?', '7/8', '1 − 1/8.', '1-F(1,8)'),
  ])

# ----------------------------------------------------------------- Lớp 11
c = 'Chương I. Hàm số lượng giác và phương trình lượng giác'
T('11_01', 'Góc lượng giác; đơn vị radian', c, 'so',
  'Góc lượng giác, số đo radian; đổi độ ↔ radian; độ dài cung tròn l = Rα.', ['10_05'], [
    S('b', 'Đổi 60° sang radian.', 'π/3', '60·π/180.', accept=['pi/3']),
    N('s', 'Đổi 3π/4 rad sang độ.', '135', '3·180/4.', '3*180/4', accept=['135°']),
    S('c', 'Cung tròn bán kính 6 cm có số đo π/3 rad. Độ dài cung bằng bao nhiêu cm?', '2π', 'l = Rα = 6·π/3.', accept=['2pi', '2π cm']),
  ], kind='conceptual')
T('11_02', 'Giá trị lượng giác của góc lượng giác', c, 'so',
  'Đường tròn lượng giác; sin, cos, tan, cot; hệ thức cơ bản; giá trị góc liên quan đặc biệt.', ['11_01'], [
    N('b', 'Tính sin(π/2).', '1', 'Điểm (0; 1) trên đường tròn lượng giác.'),
    N('s', 'Tính cos(2π/3).', '-1/2', 'cos 120°.', 'F(-1,2)', accept=['-0,5']),
    N('c', 'Biết cos α = 3/5 và −π/2 < α < 0. Tính sin α.', '-4/5', 'sin α < 0; sin² = 16/25.', 'F(-4,5)', accept=['-0,8']),
  ])
T('11_03', 'Các phép biến đổi lượng giác', c, 'so',
  'Công thức cộng, nhân đôi, biến đổi tích thành tổng và tổng thành tích.', ['11_02'], [
    N('b', 'Biết sin α = 3/5, cos α = 4/5. Tính sin 2α.', '24/25', '2·3/5·4/5.', '2*F(3,5)*F(4,5)'),
    S('s', 'Tính cos²(π/8) − sin²(π/8). (dạng √a/b)', '√2/2', 'Bằng cos(π/4).', accept=['căn 2/2', '1/√2']),
    N('c', 'Tính sin 75°·cos 15° + cos 75°·sin 15°.', '1', '= sin 90°.'),
  ])
T('11_04', 'Hàm số lượng giác', c, 'so',
  'Tập xác định, tính chẵn lẻ, tính tuần hoàn, đồ thị của y = sin x, cos x, tan x, cot x.', ['11_02', '10_16'], [
    S('b', 'Chu kì tuần hoàn của hàm số y = sin x là bao nhiêu?', '2π', 'sin(x + 2π) = sin x.', accept=['2pi']),
    S('s', 'Chu kì của hàm số y = tan x là bao nhiêu?', 'π', 'tan(x + π) = tan x.', accept=['pi']),
    N('c', 'Giá trị lớn nhất của y = 3 sin x − 1 là bao nhiêu?', '2', 'sin x ≤ 1.', '3-1'),
  ])
T('11_05', 'Phương trình lượng giác cơ bản', c, 'so',
  'Giải sin x = m, cos x = m, tan x = m, cot x = m.', ['11_04'], [
    C('b', 'Phương trình sin x = 2:', ['vô nghiệm', 'có nghiệm x = π/2', 'có vô số nghiệm'], 'A', '|sin x| ≤ 1.'),
    C('s', 'Nghiệm của cos x = 0 là:', ['x = kπ', 'x = π/2 + kπ', 'x = k2π'], 'B', 'cos x = 0 ⇔ x = π/2 + kπ (k ∈ ℤ).'),
    N('c', 'Phương trình tan x = 1 có bao nhiêu nghiệm thuộc [0; 2π)?', '2', 'x = π/4 và 5π/4.'),
  ])
c = 'Chương II. Dãy số. Cấp số cộng và cấp số nhân'
T('11_06', 'Dãy số', c, 'so',
  'Dãy số hữu hạn, vô hạn; cho bằng công thức số hạng tổng quát, truy hồi; dãy tăng, giảm, bị chặn.', ['10_16'], [
    N('b', 'Dãy uₙ = 2n + 1. Tính u₅.', '11', '2·5 + 1.', '2*5+1'),
    N('s', 'Dãy u₁ = 1, uₙ₊₁ = 2uₙ + 1. Tính u₄.', '15', 'u₂ = 3, u₃ = 7, u₄ = 15.', '15'),
    C('c', 'Dãy uₙ = 1/n là dãy:', ['tăng', 'giảm', 'không tăng không giảm'], 'B', '1/(n + 1) < 1/n.'),
  ], kind='conceptual')
T('11_07', 'Cấp số cộng', c, 'so',
  'uₙ = u₁ + (n − 1)d; Sₙ = n(u₁ + uₙ)/2.', ['11_06'], [
    N('b', 'Cấp số cộng có u₁ = 3, d = 4. Tính u₁₀.', '39', '3 + 9·4.', '3+9*4'),
    N('s', 'Tính tổng 1 + 2 + 3 + … + 100.', '5050', '100·101/2.', '100*101/2'),
    N('c', 'Cấp số cộng có u₃ = 7, u₇ = 19. Tìm công sai d.', '3', '4d = 12.', '12/4'),
  ])
T('11_08', 'Cấp số nhân', c, 'so',
  'uₙ = u₁qⁿ⁻¹; Sₙ = u₁(1 − qⁿ)/(1 − q) (q ≠ 1).', ['11_06', '7_03'], [
    N('b', 'Cấp số nhân có u₁ = 2, q = 3. Tính u₄.', '54', '2·3³.', '2*3**3'),
    N('s', 'Tính tổng 5 số hạng đầu của cấp số nhân u₁ = 1, q = 2.', '31', '(2⁵ − 1)/(2 − 1).', '2**5-1'),
    N('c', 'Cấp số nhân có u₂ = 6, u₅ = 162. Tìm công bội q.', '3', 'q³ = 27.', '3'),
  ])
T('11_09', 'Mẫu số liệu ghép nhóm; số đặc trưng đo xu thế trung tâm', 'Chương III. Các số đặc trưng đo xu thế trung tâm của mẫu số liệu ghép nhóm', 'tk',
  'Bảng tần số ghép nhóm; số trung bình (giá trị đại diện), trung vị, tứ phân vị, mốt.', ['10_14', '9_21'], [
    N('b', 'Nhóm [10; 20) có giá trị đại diện là bao nhiêu?', '15', 'Trung điểm (10 + 20)/2.', '(10+20)/2'),
    N('s', 'Mẫu ghép nhóm: [0;10) tần số 2, [10;20) tần số 5, [20;30) tần số 3. Tính số trung bình.', '16', '(5·2 + 15·5 + 25·3)/10 = 160/10.', '(5*2+15*5+25*3)/10'),
    N('c', 'Mẫu như trên (n = 10). Trung vị thuộc nhóm [10; 20). Tính trung vị theo công thức Me = 10 + (5 − 2)/5 · 10.', '16', '10 + 3/5·10.', '10+F(3,5)*10'),
  ])
c = 'Chương IV. Quan hệ song song trong không gian'
T('11_10', 'Đường thẳng và mặt phẳng trong không gian', c, 'hinh',
  'Các tính chất thừa nhận; cách xác định mặt phẳng; hình chóp, hình tứ diện; giao tuyến.', ['6_23', '7_25'], [
    C('b', 'Một mặt phẳng được xác định duy nhất khi biết:', ['hai điểm', 'ba điểm không thẳng hàng', 'một đường thẳng'], 'B', 'Tính chất thừa nhận.'),
    N('s', 'Hình tứ diện có bao nhiêu cạnh?', '6', 'Tứ diện ABCD: AB, AC, AD, BC, BD, CD.'),
    N('c', 'Hình chóp S.ABCD đáy là tứ giác có bao nhiêu mặt (kể cả đáy)?', '5', '4 mặt bên và 1 đáy.'),
  ], kind='conceptual')
T('11_11', 'Hai đường thẳng song song; đường thẳng song song với mặt phẳng', c, 'hinh',
  'Vị trí tương đối hai đường thẳng (kể cả chéo nhau); điều kiện đường thẳng song song mặt phẳng.', ['11_10', '7_08'], [
    C('b', 'Hai đường thẳng không cùng nằm trong một mặt phẳng gọi là:', ['song song', 'chéo nhau', 'cắt nhau'], 'B', 'Định nghĩa.'),
    C('s', 'Đường thẳng a không nằm trong (P) và song song với một đường thẳng nằm trong (P). Khi đó:', ['a cắt (P)', 'a // (P)', 'a ⊂ (P)'], 'B', 'Điều kiện song song.'),
    C('c', 'Hình chóp S.ABCD đáy hình bình hành. Đường thẳng AB song song với mặt phẳng:', ['(SCD)', '(SAD)', '(SBC)'], 'A', 'AB // CD ⊂ (SCD).'),
  ])
T('11_12', 'Hai mặt phẳng song song; phép chiếu song song', c, 'hinh',
  'Điều kiện và tính chất hai mặt phẳng song song; hình lăng trụ, hình hộp; phép chiếu song song.', ['11_11'], [
    C('b', 'Mặt phẳng (P) chứa hai đường thẳng cắt nhau cùng song song với (Q). Khi đó:', ['(P) cắt (Q)', '(P) // (Q) hoặc trùng', '(P) ⊥ (Q)'], 'B', 'Điều kiện hai mặt phẳng song song.'),
    N('s', 'Hình hộp có bao nhiêu cặp mặt đối diện song song?', '3', '6 mặt chia thành 3 cặp.'),
    C('c', 'Qua phép chiếu song song, hai đường thẳng song song biến thành:', ['hai đường thẳng vuông góc', 'hai đường thẳng song song hoặc trùng nhau', 'hai đường thẳng chéo nhau'], 'B', 'Tính chất phép chiếu song song.'),
  ], kind='conceptual')
c = 'Chương V. Giới hạn. Hàm số liên tục'
T('11_13', 'Giới hạn của dãy số', c, 'so',
  'lim 1/n = 0; lim qⁿ = 0 (|q| < 1); các phép toán; tổng cấp số nhân lùi vô hạn S = u₁/(1 − q).', ['11_08'], [
    N('b', 'Tính lim (2n + 1)/n.', '2', '2 + 1/n → 2.', '2'),
    N('s', 'Tính lim (3n² − 1)/(n² + 2).', '3', 'Chia tử, mẫu cho n².', '3'),
    N('c', 'Tính tổng 1 + 1/2 + 1/4 + 1/8 + …', '2', 'u₁/(1 − q) = 1/(1/2).', '2'),
  ])
T('11_14', 'Giới hạn của hàm số', c, 'so',
  'Giới hạn hữu hạn tại một điểm, tại vô cực; giới hạn một bên; giới hạn vô cực; dạng 0/0.', ['11_13', '10_16'], [
    N('b', 'Tính lim (x→2) (x² + 1).', '5', 'Thay x = 2.', '5'),
    N('s', 'Tính lim (x→3) (x² − 9)/(x − 3).', '6', 'Rút gọn x + 3.', '6'),
    N('c', 'Tính lim (x→+∞) (2x − 1)/(x + 3).', '2', 'Chia tử, mẫu cho x.', '2'),
  ])
T('11_15', 'Hàm số liên tục', c, 'so',
  'Liên tục tại một điểm, trên khoảng; tính liên tục của hàm sơ cấp.', ['11_14'], [
    C('b', 'Hàm số y = 1/x liên tục trên:', ['ℝ', '(−∞; 0) và (0; +∞)', '[0; +∞)'], 'B', 'Không xác định tại 0.'),
    N('s', 'Tìm a để f(x) = (x² − 1)/(x − 1) khi x ≠ 1 và f(1) = a liên tục tại x = 1.', '2', 'lim = 2.', '2'),
    C('c', 'Hàm số f liên tục trên [a; b] và f(a)·f(b) < 0. Khi đó phương trình f(x) = 0:', ['vô nghiệm trên (a; b)', 'có ít nhất một nghiệm trên (a; b)', 'có đúng hai nghiệm'], 'B', 'Hệ quả của tính liên tục.'),
  ])
c = 'Chương VI. Hàm số mũ và hàm số lôgarit'
T('11_16', 'Luỹ thừa với số mũ thực', c, 'so',
  'Luỹ thừa với số mũ nguyên, hữu tỉ, thực; căn bậc n; tính chất.', ['7_03', '9_10'], [
    N('b', 'Tính 8^(1/3).', '2', '∛8.', '2'),
    N('s', 'Tính 2⁻³.', '1/8', '1/2³.', 'F(1,8)', accept=['0,125']),
    N('c', 'Tính 27^(2/3) + 16^(3/4).', '17', '9 + 8.', '9+8'),
  ])
T('11_17', 'Lôgarit', c, 'so',
  'logₐb = α ⇔ aᵅ = b; tính chất, quy tắc tính; lôgarit thập phân, tự nhiên; đổi cơ số.', ['11_16'], [
    N('b', 'Tính log₂8.', '3', '2³ = 8.', '3'),
    N('s', 'Tính log₃54 − log₃2.', '3', 'log₃27.', '3'),
    N('c', 'Biết log₂3 = a. Tính log₂12 theo a. (ghi dạng a + k với số k cụ thể)', 'a+2', 'log₂(4·3) = 2 + a.', accept=['2+a', 'a + 2']),
  ])
T('11_18', 'Hàm số mũ, hàm số lôgarit', c, 'so',
  'Tập xác định, tính đơn điệu, đồ thị của y = aˣ, y = logₐx.', ['11_17', '10_16'], [
    S('b', 'Tìm tập xác định của y = log₂(x − 1).', '(1;+∞)', 'x − 1 > 0.', accept=['x > 1', 'x>1', '(1; +∞)']),
    C('s', 'Hàm số y = (1/2)ˣ trên ℝ:', ['đồng biến', 'nghịch biến', 'không đơn điệu'], 'B', '0 < a < 1.'),
    C('c', 'Đồ thị hàm số y = 3ˣ luôn đi qua điểm:', ['(0; 1)', '(1; 0)', '(0; 0)'], 'A', '3⁰ = 1.'),
  ], kind='conceptual')
T('11_19', 'Phương trình, bất phương trình mũ và lôgarit', c, 'so',
  'Giải aˣ = b, logₐx = b và các bất phương trình mũ, lôgarit cơ bản.', ['11_18', '9_06'], [
    N('b', 'Giải phương trình 2ˣ = 16.', '4', '2⁴ = 16.', '4'),
    N('s', 'Giải phương trình log₃(x + 1) = 2.', '8', 'x + 1 = 9.', '8'),
    S('c', 'Giải bất phương trình 3ˣ > 9.', 'x>2', '3ˣ > 3², cơ số > 1.', accept=['x > 2', '(2;+∞)']),
  ])
c = 'Chương VII. Quan hệ vuông góc trong không gian'
T('11_20', 'Hai đường thẳng vuông góc', c, 'hinh',
  'Góc giữa hai đường thẳng trong không gian; hai đường thẳng vuông góc.', ['11_11'], [
    N('b', 'Góc giữa hai đường thẳng song song bằng bao nhiêu độ?', '0', 'Theo quy ước.', accept=['0°']),
    N('s', 'Hình lập phương ABCD.A\'B\'C\'D\'. Góc giữa AB và B\'C\' bằng bao nhiêu độ?', '90', 'B\'C\' // BC ⊥ AB.', accept=['90°']),
    N('c', 'Hình lập phương ABCD.A\'B\'C\'D\'. Góc giữa AC và B\'D\' bằng bao nhiêu độ?', '90', 'B\'D\' // BD ⊥ AC.', accept=['90°']),
  ])
T('11_21', 'Đường thẳng vuông góc với mặt phẳng', c, 'hinh',
  'Điều kiện: vuông góc với hai đường thẳng cắt nhau trong mặt phẳng; tính chất; định lí ba đường vuông góc.', ['11_20'], [
    C('b', 'Đường thẳng d vuông góc với mặt phẳng (P) khi d vuông góc với:', ['một đường thẳng trong (P)', 'hai đường thẳng cắt nhau trong (P)', 'hai đường thẳng song song trong (P)'], 'B', 'Điều kiện đường thẳng vuông góc mặt phẳng.'),
    C('s', 'Hình chóp S.ABCD đáy hình vuông, SA ⊥ (ABCD). Đường thẳng BC vuông góc với mặt phẳng:', ['(SAB)', '(SAC)', '(SCD)'], 'A', 'BC ⊥ AB và BC ⊥ SA.'),
    C('c', 'Hình chóp S.ABCD đáy hình vuông, SA ⊥ (ABCD). Đường thẳng BD vuông góc với mặt phẳng:', ['(SAB)', '(SAC)', '(SAD)'], 'B', 'BD ⊥ AC và BD ⊥ SA.'),
  ])
T('11_22', 'Phép chiếu vuông góc; góc giữa đường thẳng và mặt phẳng', c, 'hinh',
  'Hình chiếu vuông góc; góc giữa đường thẳng và hình chiếu của nó trên mặt phẳng.', ['11_21', '9_11'], [
    N('b', 'Đường thẳng vuông góc với mặt phẳng thì góc giữa chúng bằng bao nhiêu độ?', '90', 'Theo định nghĩa.', accept=['90°']),
    N('s', 'Hình chóp S.ABCD đáy hình vuông cạnh a, SA ⊥ đáy, SA = a. Góc giữa SB và mặt đáy bằng bao nhiêu độ?', '45', 'tan = SA/AB = 1.', accept=['45°']),
    N('c', 'Hình chóp S.ABCD đáy hình vuông cạnh a, SA ⊥ đáy, SA = a√6. Góc giữa SC và mặt đáy bằng bao nhiêu độ?', '60', 'AC = a√2; tan = √6/√2 = √3.', accept=['60°']),
  ])
T('11_23', 'Hai mặt phẳng vuông góc; góc nhị diện', c, 'hinh',
  'Góc giữa hai mặt phẳng; góc nhị diện; điều kiện hai mặt phẳng vuông góc; hình lăng trụ đứng, hình chóp đều.', ['11_22'], [
    C('b', 'Mặt phẳng (P) chứa một đường thẳng vuông góc với (Q) thì:', ['(P) // (Q)', '(P) ⊥ (Q)', '(P) trùng (Q)'], 'B', 'Điều kiện hai mặt phẳng vuông góc.'),
    C('s', 'Hình chóp S.ABC có SA ⊥ (ABC). Mặt phẳng (SAB) vuông góc với:', ['(ABC)', '(SBC) luôn luôn', 'không mặt nào'], 'A', '(SAB) chứa SA ⊥ (ABC).'),
    N('c', 'Hình chóp S.ABCD đáy hình vuông cạnh a, SA ⊥ đáy, SA = a. Số đo góc nhị diện [S, CD, A] bằng bao nhiêu độ?', '45', 'Góc SDA, tan = SA/AD = 1.', accept=['45°']),
  ])
T('11_24', 'Khoảng cách trong không gian', c, 'hinh',
  'Khoảng cách từ điểm đến mặt phẳng, giữa đường và mặt song song, giữa hai đường thẳng chéo nhau (đơn giản).', ['11_23'], [
    N('b', 'Hình lập phương cạnh 2. Khoảng cách giữa hai mặt đối diện bằng bao nhiêu?', '2', 'Bằng độ dài cạnh.', '2'),
    S('s', 'Hình lập phương cạnh a. Khoảng cách từ A đến C\' (đường chéo hình lập phương) là bao nhiêu?', 'a√3', '√(a² + a² + a²).', accept=['a căn 3', '√3a']),
    S('c', 'Hình chóp S.ABCD đáy hình vuông cạnh a, SA ⊥ đáy, SA = a. Khoảng cách từ A đến (SBC) bằng bao nhiêu?', 'a√2/2', 'Đường cao AH của tam giác vuông SAB.', accept=['a/√2', '(a√2)/2']),
  ])
T('11_25', 'Thể tích khối lăng trụ, khối chóp, khối chóp cụt đều', c, 'hinh',
  'V lăng trụ = B·h; V chóp = B·h/3; V chóp cụt = h(B + B\' + √(BB\'))/3.', ['11_24~', '8_27'], [
    N('b', 'Khối chóp có diện tích đáy 9, chiều cao 4. Thể tích bằng bao nhiêu?', '12', '9·4/3.', '9*4/3'),
    S('s', 'Khối lăng trụ đứng tam giác đều cạnh đáy a, cạnh bên a. Thể tích?', 'a^3√3/4', 'B = a²√3/4.', accept=['a³√3/4', '(√3/4)a^3']),
    N('c', 'Khối chóp cụt đều có diện tích hai đáy 4 và 16, chiều cao 3. Thể tích bằng bao nhiêu?', '28', '3(4 + 16 + 8)/3.', '3*(4+16+8)/3'),
  ])
c = 'Chương VIII. Các quy tắc tính xác suất'
T('11_26', 'Biến cố hợp, biến cố giao; biến cố độc lập', c, 'tk',
  'A ∪ B, A ∩ B; biến cố xung khắc; hai biến cố độc lập.', ['10_27'], [
    C('b', 'Gieo xúc xắc. A: "ra mặt chẵn", B: "ra mặt lẻ". A và B là hai biến cố:', ['độc lập', 'xung khắc', 'không xung khắc'], 'B', 'Không thể đồng thời xảy ra.'),
    C('s', 'Tung hai đồng xu khác nhau. A: "đồng xu 1 sấp", B: "đồng xu 2 sấp". A và B là:', ['xung khắc', 'độc lập', 'đối nhau'], 'B', 'Kết quả đồng xu này không ảnh hưởng đồng xu kia.'),
    N('c', 'Gieo xúc xắc. A: "số chấm ≤ 2", B: "số chấm chẵn". Biến cố A ∩ B gồm bao nhiêu kết quả?', '1', 'Chỉ có mặt 2.'),
  ], kind='conceptual')
T('11_27', 'Công thức cộng xác suất; công thức nhân xác suất cho hai biến cố độc lập', c, 'tk',
  'P(A ∪ B) = P(A) + P(B) − P(AB); P(AB) = P(A)P(B) nếu A, B độc lập.', ['11_26'], [
    N('b', 'A, B độc lập, P(A) = 0,5, P(B) = 0,4. Tính P(AB).', '0,2', '0,5·0,4.', 'F(1,2)*F(4,10)'),
    N('s', 'P(A) = 0,5, P(B) = 0,4, P(AB) = 0,2. Tính P(A ∪ B).', '0,7', '0,5 + 0,4 − 0,2.', 'F(7,10)'),
    N('c', 'Hai xạ thủ bắn độc lập, xác suất trúng lần lượt 0,8 và 0,7. Xác suất có ít nhất một người trúng là bao nhiêu?', '0,94', '1 − 0,2·0,3.', '1-F(2,10)*F(3,10)'),
  ])
c = 'Chương IX. Đạo hàm'
T('11_28', 'Định nghĩa và ý nghĩa của đạo hàm', c, 'so',
  'Đạo hàm tại một điểm; ý nghĩa hình học (hệ số góc tiếp tuyến), ý nghĩa vật lí (vận tốc tức thời).', ['11_14'], [
    N('b', 'Cho f(x) = x². Theo định nghĩa, f\'(3) bằng bao nhiêu?', '6', 'lim (x² − 9)/(x − 3) = 6.', '6'),
    N('s', 'Hệ số góc tiếp tuyến của đồ thị y = x² tại điểm có hoành độ x = −1 là bao nhiêu?', '-2', 'y\' = 2x.', '-2'),
    N('c', 'Vật chuyển động theo s(t) = t² + 3t (m). Vận tốc tức thời tại t = 2 s là bao nhiêu m/s?', '7', 's\'(t) = 2t + 3.', '2*2+3', accept=['7 m/s']),
  ])
T('11_29', 'Các quy tắc tính đạo hàm', c, 'so',
  'Đạo hàm của xⁿ, √x, sin, cos, tan, aˣ, logₐx; đạo hàm tổng, tích, thương, hàm hợp.', ['11_28', '11_04', '11_18'], [
    S('b', 'Tính đạo hàm của y = x³ + 2x.', '3x^2+2', '(x³)\' = 3x².', accept=['3x²+2', '3x² + 2']),
    S('s', 'Tính đạo hàm của y = x·sin x.', 'sinx+xcosx', 'Quy tắc tích.', accept=['sin x + x cos x', 'sin(x)+x*cos(x)', 'sinx + xcosx']),
    S('c', 'Tính đạo hàm của y = (2x + 1)⁵.', '10(2x+1)^4', 'Hàm hợp: 5(2x + 1)⁴·2.', accept=['10(2x + 1)⁴', '10(2x+1)⁴']),
  ])
T('11_30', 'Đạo hàm cấp hai', c, 'so',
  'f\'\'(x) = (f\'(x))\'; ý nghĩa: gia tốc tức thời.', ['11_29'], [
    S('b', 'Tính đạo hàm cấp hai của y = x³.', '6x', 'y\' = 3x², y\'\' = 6x.'),
    N('s', 'Cho y = x⁴ − 2x². Tính y\'\'(1).', '8', 'y\'\' = 12x² − 4.', '12-4'),
    N('c', 'Vật chuyển động theo s(t) = t³ − 3t² (m). Gia tốc tại t = 2 s là bao nhiêu m/s²?', '6', 's\'\' = 6t − 6.', '6*2-6'),
  ])

# ----------------------------------------------------------------- Lớp 12
c = 'Chương I. Ứng dụng đạo hàm để khảo sát và vẽ đồ thị của hàm số'
T('12_01', 'Tính đơn điệu và cực trị của hàm số', c, 'so',
  'Xét dấu đạo hàm để tìm khoảng đồng biến, nghịch biến; điểm cực đại, cực tiểu.', ['11_29', '10_18'], [
    S('b', 'Hàm số y = x² − 4x đồng biến trên khoảng nào?', '(2;+∞)', 'y\' = 2x − 4 > 0 ⇔ x > 2.', accept=['(2; +∞)', 'x > 2']),
    N('s', 'Hàm số y = x³ − 3x có điểm cực đại x = ?', '-1', 'y\' = 3x² − 3; y\' đổi dấu + → − tại x = −1.'),
    N('c', 'Giá trị cực tiểu của hàm số y = x³ − 3x là bao nhiêu?', '-2', 'Cực tiểu tại x = 1: 1 − 3.', '1-3'),
  ])
T('12_02', 'Giá trị lớn nhất, giá trị nhỏ nhất của hàm số', c, 'so',
  'Tìm GTLN, GTNN trên đoạn bằng cách so sánh giá trị tại điểm tới hạn và hai đầu mút.', ['12_01'], [
    N('b', 'Giá trị lớn nhất của y = −x² + 4x trên ℝ là bao nhiêu?', '4', 'Đỉnh tại x = 2.', '-4+8'),
    N('s', 'Giá trị lớn nhất của y = x³ − 3x trên [0; 2] là bao nhiêu?', '2', 'y(0) = 0, y(1) = −2, y(2) = 2.', '8-6'),
    N('c', 'Giá trị nhỏ nhất của y = x + 4/x trên (0; +∞) là bao nhiêu?', '4', 'Đạt tại x = 2.', '2+2'),
  ])
T('12_03', 'Đường tiệm cận của đồ thị hàm số', c, 'so',
  'Tiệm cận đứng, tiệm cận ngang, tiệm cận xiên.', ['11_14'], [
    N('b', 'Đồ thị y = (2x + 1)/(x − 3) có tiệm cận đứng x = ?', '3', 'Mẫu bằng 0, tử khác 0.'),
    N('s', 'Đồ thị y = (2x + 1)/(x − 3) có tiệm cận ngang y = ?', '2', 'lim khi x → ±∞.'),
    S('c', 'Tìm tiệm cận xiên của đồ thị y = (x² + 1)/x.', 'y=x', 'y = x + 1/x.', accept=['y = x']),
  ])
T('12_04', 'Khảo sát sự biến thiên và vẽ đồ thị hàm số', c, 'so',
  'Khảo sát hàm bậc ba, y = (ax + b)/(cx + d), y = (ax² + bx + c)/(mx + n); đọc đồ thị.', ['12_01', '12_03'], [
    C('b', 'Đồ thị hàm số bậc ba y = ax³ + … với a > 0 có dạng: khi x → +∞ thì y →', ['+∞', '−∞', '0'], 'A', 'Dấu của a quyết định.'),
    N('s', 'Đồ thị y = x³ − 3x + 1 cắt trục tung tại điểm có tung độ bằng bao nhiêu?', '1', 'Thay x = 0.'),
    N('c', 'Phương trình x³ − 3x = m có 3 nghiệm phân biệt khi m thuộc (a; b). Tính b − a.', '4', 'Cần −2 < m < 2 (giữa cực tiểu và cực đại).', '2-(-2)'),
  ])
T('12_05', 'Ứng dụng đạo hàm giải bài toán thực tiễn', c, 'so',
  'Tối ưu hóa: diện tích, thể tích, chi phí, lợi nhuận lớn nhất / nhỏ nhất.', ['12_02'], [
    N('b', 'Hình chữ nhật có chu vi 20 m. Diện tích lớn nhất là bao nhiêu m²?', '25', 'Hình vuông cạnh 5.', '25', accept=['25 m²']),
    N('s', 'Lợi nhuận P(x) = −x² + 40x − 100 (triệu đồng) khi bán x sản phẩm. Lợi nhuận lớn nhất là bao nhiêu triệu?', '300', 'Tại x = 20: −400 + 800 − 100.', '-400+800-100'),
    N('c', 'Từ tấm tôn vuông cạnh 12 cm, cắt bốn góc hình vuông cạnh x rồi gấp thành hộp không nắp. x bằng bao nhiêu (cm) để thể tích lớn nhất?', '2', 'V = x(12 − 2x)²; V\' = 0 ⇒ x = 2.', '2', accept=['2 cm']),
  ])
c = 'Chương II. Vectơ và hệ trục tọa độ trong không gian'
T('12_06', 'Vectơ trong không gian', c, 'hinh',
  'Các khái niệm, phép cộng, trừ, nhân với số, tích vô hướng của vectơ trong không gian.', ['10_12', '11_12'], [
    S('b', 'Hình hộp ABCD.A\'B\'C\'D\'. Theo quy tắc hình hộp, AB + AD + AA\' (vectơ) bằng vectơ nào?', 'AC\'', 'Quy tắc hình hộp.', accept=["AC'", 'vectơ AC\'']),
    N('s', 'Hình lập phương cạnh 1. Tính tích vô hướng AB · AD (vectơ).', '0', 'AB ⊥ AD.'),
    N('c', 'Tứ diện đều ABCD cạnh 2. Tính tích vô hướng AB · AC (vectơ).', '2', '2·2·cos 60°.', '2*2*F(1,2)'),
  ])
T('12_07', 'Hệ trục tọa độ trong không gian', c, 'hinh',
  'Hệ trục Oxyz; tọa độ điểm, tọa độ vectơ.', ['12_06'], [
    S('b', 'Hình chiếu vuông góc của M(2; −1; 3) lên mặt phẳng (Oxy) là điểm nào?', '(2;-1;0)', 'Giữ x, y; z = 0.', accept=['(2; -1; 0)', '(2; −1; 0)']),
    S('s', 'Cho A(1; 2; 3), B(3; 0; 5). Tìm tọa độ vectơ AB.', '(2;-2;2)', '(3 − 1; 0 − 2; 5 − 3).', accept=['(2; -2; 2)', '(2; −2; 2)']),
    S('c', 'Cho A(1; 2; 3), B(3; 0; 5). Tìm tọa độ trung điểm của AB.', '(2;1;4)', 'Trung bình cộng tọa độ.', accept=['(2; 1; 4)']),
  ])
T('12_08', 'Biểu thức tọa độ của các phép toán vectơ', c, 'hinh',
  'Tổng, hiệu, tích với số, tích vô hướng, độ dài, góc theo tọa độ.', ['12_07'], [
    N('b', 'Cho a = (1; 2; 2). Tính |a|.', '3', '√(1 + 4 + 4).', '3'),
    N('s', 'Cho a = (1; 2; −1), b = (3; 0; 2). Tính a·b.', '1', '3 + 0 − 2.', '3+0-2'),
    N('c', 'Tìm m để a = (1; m; 2) vuông góc với b = (2; 1; −3).', '4', '2 + m − 6 = 0.', '4'),
  ])
T('12_09', 'Số đặc trưng đo mức độ phân tán của mẫu số liệu ghép nhóm', 'Chương III. Các số đặc trưng đo mức độ phân tán cho mẫu số liệu ghép nhóm', 'tk',
  'Khoảng biến thiên, khoảng tứ phân vị, phương sai, độ lệch chuẩn của mẫu ghép nhóm.', ['11_09', '10_15'], [
    N('b', 'Mẫu ghép nhóm có các nhóm [10; 15), [15; 20), [20; 25). Khoảng biến thiên là bao nhiêu?', '15', '25 − 10.', '25-10'),
    N('s', 'Mẫu ghép nhóm có Q₁ = 12,5 và Q₃ = 20. Khoảng tứ phân vị là bao nhiêu?', '7,5', 'Q₃ − Q₁.', 'F(75,10)'),
    N('c', 'Mẫu ghép nhóm có phương sai 6,25. Độ lệch chuẩn là bao nhiêu?', '2,5', '√6,25.', 'F(25,10)'),
  ])
c = 'Chương IV. Nguyên hàm và tích phân'
T('12_10', 'Nguyên hàm', c, 'so',
  'F\'(x) = f(x); nguyên hàm của các hàm số sơ cấp cơ bản; tính chất.', ['11_29'], [
    S('b', 'Tìm một nguyên hàm của f(x) = 2x.', 'x^2', '(x²)\' = 2x.', accept=['x²', 'x^2+C', 'x² + C']),
    S('s', 'Tìm ∫(3x² + 1)dx.', 'x^3+x+C', 'Nguyên hàm từng hạng tử.', accept=['x³ + x + C', 'x³+x+C']),
    S('c', 'Tìm ∫cos x dx.', 'sinx+C', '(sin x)\' = cos x.', accept=['sin x + C', 'sin(x)+C']),
  ])
T('12_11', 'Tích phân', c, 'so',
  '∫ₐᵇ f(x)dx = F(b) − F(a); tính chất của tích phân.', ['12_10'], [
    N('b', 'Tính ∫₀¹ 2x dx.', '1', 'x² từ 0 đến 1.', '1'),
    N('s', 'Tính ∫₁² 3x² dx.', '7', 'x³ từ 1 đến 2: 8 − 1.', '8-1'),
    N('c', 'Biết ∫₀² f(x)dx = 3. Tính ∫₀² (2f(x) + 1)dx.', '8', '2·3 + 2.', '2*3+2'),
  ])
T('12_12', 'Ứng dụng hình học của tích phân', c, 'so',
  'Diện tích hình phẳng; thể tích vật thể, khối tròn xoay.', ['12_11'], [
    N('b', 'Tính diện tích hình phẳng giới hạn bởi y = x², trục Ox, x = 0, x = 3.', '9', '∫₀³ x² dx = 9.', '9'),
    N('s', 'Tính diện tích hình phẳng giới hạn bởi y = x² và y = x.', '1/6', '∫₀¹ (x − x²)dx.', 'F(1,6)'),
    S('c', 'Thể tích khối tròn xoay khi quay hình giới hạn bởi y = x, Ox, x = 0, x = 3 quanh Ox (theo π)?', '9π', 'π∫₀³ x² dx = 9π.', accept=['9pi']),
  ])
c = 'Chương V. Phương pháp tọa độ trong không gian'
T('12_13', 'Phương trình mặt phẳng', c, 'hinh',
  'Vectơ pháp tuyến; phương trình tổng quát Ax + By + Cz + D = 0; khoảng cách từ điểm đến mặt phẳng.', ['12_08'], [
    S('b', 'Mặt phẳng 2x − y + 3z − 1 = 0 có một vectơ pháp tuyến là:', '(2;-1;3)', 'Hệ số của x, y, z.', accept=['(2; -1; 3)', '(2; −1; 3)']),
    S('s', 'Viết phương trình mặt phẳng qua A(1; 0; 2) có vectơ pháp tuyến (1; 1; 1).', 'x+y+z-3=0', '(x − 1) + y + (z − 2) = 0.', accept=['x + y + z − 3 = 0', 'x + y + z - 3 = 0']),
    N('c', 'Tính khoảng cách từ M(1; 2; 3) đến mặt phẳng 2x + y − 2z + 4 = 0.', '2/3', '|2 + 2 − 6 + 4|/3.', 'F(2,3)'),
  ])
T('12_14', 'Phương trình đường thẳng trong không gian', c, 'hinh',
  'Phương trình tham số, chính tắc; vị trí tương đối; góc giữa đường thẳng và mặt phẳng.', ['12_13'], [
    S('b', 'Đường thẳng x = 1 + 2t, y = −t, z = 3 + t có một vectơ chỉ phương là:', '(2;-1;1)', 'Hệ số của t.', accept=['(2; -1; 1)', '(2; −1; 1)']),
    C('s', 'Đường thẳng d có VTCP (1; 2; 3), mặt phẳng (P) có VTPT (1; 2; 3). Khi đó:', ['d // (P)', 'd ⊥ (P)', 'd ⊂ (P)'], 'B', 'VTCP cùng phương với VTPT.'),
    S('c', 'Tìm giao điểm của đường thẳng x = t, y = t, z = t với mặt phẳng x + y + z − 6 = 0.', '(2;2;2)', '3t = 6.', accept=['(2; 2; 2)']),
  ])
T('12_15', 'Phương trình mặt cầu', c, 'hinh',
  '(x − a)² + (y − b)² + (z − c)² = R²; nhận dạng phương trình mặt cầu.', ['12_08', '10_22'], [
    N('b', 'Mặt cầu (x − 1)² + y² + (z + 2)² = 16 có bán kính bằng bao nhiêu?', '4', 'R² = 16.', '4'),
    S('s', 'Tìm tâm mặt cầu x² + y² + z² − 2x + 4y − 6z = 0.', '(1;-2;3)', 'a = 1, b = −2, c = 3.', accept=['(1; -2; 3)', '(1; −2; 3)']),
    S('c', 'Mặt cầu x² + y² + z² − 2x + 4y − 6z = 0 có bán kính bằng bao nhiêu?', '√14', 'R² = 1 + 4 + 9.', accept=['căn 14']),
  ])
c = 'Chương VI. Xác suất có điều kiện'
T('12_16', 'Xác suất có điều kiện', c, 'tk',
  'P(A|B) = P(AB)/P(B); công thức nhân xác suất.', ['11_27'], [
    N('b', 'P(AB) = 0,2, P(B) = 0,5. Tính P(A|B).', '0,4', '0,2 : 0,5.', 'F(2,5)'),
    N('s', 'Gieo xúc xắc, biết đã ra mặt chẵn. Xác suất ra mặt 6 là bao nhiêu?', '1/3', 'Trong {2; 4; 6}.', 'F(1,3)'),
    N('c', 'Hộp có 4 bi đỏ, 6 bi xanh. Lấy lần lượt 2 bi không hoàn lại. Xác suất cả hai bi đều đỏ là bao nhiêu?', '2/15', '4/10 · 3/9.', 'F(4,10)*F(3,9)'),
  ])
T('12_17', 'Công thức xác suất toàn phần; công thức Bayes', c, 'tk',
  'P(A) = P(B)P(A|B) + P(B̄)P(A|B̄); P(B|A) = P(B)P(A|B)/P(A).', ['12_16'], [
    N('b', 'P(B) = 0,6, P(A|B) = 0,5, P(A|B̄) = 0,25. Tính P(A).', '0,4', '0,6·0,5 + 0,4·0,25.', 'F(6,10)*F(1,2)+F(4,10)*F(1,4)'),
    N('s', 'Với số liệu trên, tính P(B|A).', '0,75', '0,3 : 0,4.', 'F(3,4)', accept=['3/4']),
    N('c', 'Một xét nghiệm có tỉ lệ bệnh 1%, độ nhạy 90%, tỉ lệ dương tính giả 5%. Xác suất có bệnh khi dương tính là bao nhiêu? (phân số tối giản)', '2/13', '0,009 : (0,009 + 0,0495) = 18/117 = 2/13.', 'F(9,1000)/(F(9,1000)+F(495,10000))', accept=['18/117']),
  ])
