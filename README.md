# LexiLab

Ứng dụng học từ vựng STEM Anh–Việt cho học sinh Việt Nam. Giao diện xanh dương, tiếng Anh trước và tiếng Việt sau; từ vựng được biên soạn độc lập theo chủ đề của **Kết nối tri thức với cuộc sống**, NXB Giáo dục Việt Nam.

- Maths, Engineering, IT: lớp 1–12; Sciences: lớp 1–7; Physics, Chemistry, Biology: lớp 8–12.
- 58 tổ hợp môn–lớp, 428 chủ đề, 2.453 mục từ đang dùng theo môn–lớp, tương ứng 1.598 từ/cụm từ tiếng Anh khác nhau. Một từ có thể xuất hiện trong nhiều chủ đề; tổng 2.518 lượt đưa từ vào các bài.
- Giao diện tập trung: chọn lớp → môn → bài, với hai thao tác Học thẻ từ và Luyện tập. Bốn mục chính Vocabulary/Từ vựng, Ôn tập, Sổ từ và Lớp học.
- Tên chủ đề, các điều khiển và hướng dẫn chính hiển thị Anh trước, Việt sau. Mỗi từ có nghĩa tiếng Việt, ví dụ tiếng Anh và file phát âm AAC/M4A được phát trực tiếp bằng thanh audio của trình duyệt.
- Thẻ lật luôn giữ từ tiếng Anh phía trên nghĩa Việt. Trắc nghiệm riêng theo chủ đề; ôn tổng hợp chọn từ nhiều chủ đề của cùng môn–lớp.
- Sổ từ, tìm kiếm Anh–Việt có hoặc không dấu, mục tiêu ngày, biểu đồ học tập; lịch ôn 1, 3, rồi 7 ngày.

## Đối chiếu sách

Thông tin nguồn vẫn được giữ trong dữ liệu chủ đề. Các nguồn thuộc truonghocsoquocgia.nxbgd.vn và hanhtrangso.nxbgd.vn, kiểm tra ngày 16/11/2026. Giao diện học tập không có mục đối chiếu SGK.

Sciences 1–3 theo Tự nhiên và Xã hội, 4–5 theo Khoa học, 6–7 theo Khoa học tự nhiên. Physics/Chemistry/Biology 8–9 là các mạch trong sách Khoa học tự nhiên. Engineering từ lớp 3 theo Công nghệ; THPT chọn định hướng thiết kế/công nghiệp, IT 11–12 chọn Khoa học máy tính. Engineering và IT 1–2 được ghi rõ là làm quen STEM bổ trợ vì chưa có SGK riêng. Các chủ đề từ vựng không thay thế toàn bộ nội dung, bài tập và hoạt động của SGK.

## Lớp học và báo cáo giáo viên

1. Mở **Classroom / Lớp học → Teacher / Giáo viên**, đăng nhập bằng ChatGPT và tạo lớp. Giáo viên chỉ có quyền đọc lớp do mình tạo, kiểm tra ở máy chủ.
2. Học sinh mở app, chọn **Student / Học sinh**, nhập mã lớp và tên/biệt danh. Không yêu cầu tài khoản ChatGPT ở lớp ứng dụng; Site cũng phải được chia sẻ cho học sinh thì các em mới truy cập được.
3. Giáo viên xem học sinh đã vào, số lần vào, hoạt động gần nhất, chủ đề đã học, lượt tự đánh giá thẻ từ, số lượt hoàn thành trắc nghiệm, câu đúng/tổng câu, lượt đúng toàn bộ và điểm tốt nhất. Lịch sử chi tiết hiển thị 100 kết quả chủ đề gần nhất; bảng tổng hợp tính mọi lượt.

Dữ liệu lớp học lưu chung bằng D1, tách khỏi tiến độ cá nhân trong trình duyệt. Việc theo dõi bắt đầu sau khi tham gia lớp. Một lần vào được ghi khi mở lại app; nhịp cập nhật hoạt động mỗi phút không tăng số lần vào. Điểm gửi sau khi hoàn thành đủ câu; máy chủ tự tính từ đáp án, kiểm tra từ và bài hợp lệ, không lấy số điểm do trình duyệt báo. Gửi lại cùng bản ghi không tăng số lượt. Bài ôn hỗn hợp được chia theo chủ đề đầu tiên có chứa từ đó.

Thẻ từ là tự đánh giá, được tách khỏi điểm trắc nghiệm. Mất mạng sẽ lưu bản ghi chờ trong trình duyệt và thử gửi lại. Học sinh giữ mã học sinh để vào lại đúng hồ sơ trên thiết bị khác; mã này cho phép sử dụng hồ sơ nên cần giữ riêng. Ngày giờ báo cáo hiển thị theo thiết bị; thời điểm bản ghi là khi máy chủ nhận được đồng bộ.

## Chạy và kiểm tra trên máy

Yêu cầu Node.js 24 trở lên, không cần cài thư viện:

```sh
node scripts/build.cjs
node verify.cjs
node scripts/verify-classroom.mjs
node scripts/verify-audio.mjs
node scripts/preview.mjs
```

Mở http://127.0.0.1:4318. Bản xem thử dùng SQLite ở `.local/classroom.sqlite`, tách khỏi D1 sản xuất. Bộ điều hợp xem thử cung cấp danh tính giáo viên thử cục bộ; tệp này không được triển khai. Xóa dữ liệu thử chỉ khi không cần giữ bản xem thử nữa.

`worker/index.js` là mã máy chủ; `dist/` cấp cao chứa giao diện. Build nhúng các tài nguyên và danh mục vào `dist/server/index.js`. `.openai/hosting.json` khai báo D1 `DB`; thư mục `drizzle/` chứa migration cấu trúc được nền tảng áp dụng lúc xuất bản. Không tạo bảng trong lúc xử lý yêu cầu. Không chỉnh SQL migration đã áp dụng; bổ sung migration mới khi đổi cấu trúc.

Kiểm tra bao gồm 58 khóa, 428 chủ đề, toàn bộ 2.453 bộ đáp án, giới hạn môn theo lớp, thứ tự Anh–Việt, tương phản chữ/nút chính, lịch ôn, giữ mã từ cũ; kiểm tra SQLite thật cho phân quyền giáo viên, tham gia lớp, khôi phục hồ sơ, đồng bộ lặp, chấm điểm máy chủ và tổng hợp báo cáo.

## Lưu dữ liệu cá nhân

Giữ nguyên khóa localStorage `lexilab-v1` và toàn bộ 1.970 mã từ của bản cũ. Những từ trước đây đã lưu vẫn mở được trong sổ từ. Các khóa học mới chỉ dùng từ đang hoạt động theo đối chiếu SGK. Tiến độ cá nhân, mục tiêu và sổ từ vẫn lưu trên trình duyệt hiện tại, không tự chuyển lịch sử cũ thành kết quả lớp học.

## Âm thanh trên iPhone và các trình duyệt khác

Có 1.772 file phát âm tiếng Anh Anh cho toàn bộ từ đang học và từ đã lưu từ bản cũ. Giọng Daniel, tốc độ 155 từ/phút, tổng hợp độc lập bằng công cụ hệ thống macOS. File AAC/M4A lưu trong R2, truy cập từ cùng miền của app; máy chủ hỗ trợ HEAD và byte ranges để trình phát trên iPhone đọc được file. Âm thanh chỉ phát khi người học bấm Play hoặc nút loa.

Thẻ từ có thanh phát trực tiếp. Bấm loa trong danh sách từ mở thanh phát nhỏ, với nút nghe lại và phần trợ giúp có liên kết mở file audio. Giọng đọc trên thiết bị được giữ làm lựa chọn phụ. Người học có thể tăng âm lượng phát nội dung và kiểm tra đường ra tai nghe/Bluetooth nếu chưa nghe được.

Để tạo lại audio trên macOS có sẵn giọng Daniel:

```sh
node scripts/generate-pronunciations.cjs
```

File cục bộ ở `.local/pronunciations/` (không đưa lên Git); danh mục `dist/audio-manifest.js` được lưu cùng mã nguồn. `scripts/preview.mjs` đọc audio cục bộ qua bộ điều hợp R2. Xuất bản các clip bằng `scripts/upload-pronunciations.mjs` sau khi khai báo R2 `BUCKET` và cấu hình secret `PRONUNCIATION_UPLOAD_KEY` trong Sites. Script chỉ nhận credential qua stdin ẩn, không nhận qua tham số dòng lệnh và không ghi secret ra tệp. Tuyến tải lên kiểm tra credential, mã clip và định dạng; các tuyến xem báo cáo giáo viên vẫn kiểm tra quyền sở hữu lớp như trước.

Kiểm tra audio bao gồm đầy đủ danh mục từ cũ/mới, nội dung M4A thực, byte-range probe của iPhone, HEAD/ETag, phân quyền tải lên, phát trong thao tác bấm và hướng dẫn khi trình duyệt chặn phát. Kiểm tra bằng khung nhìn điện thoại không thay thế thử nghiệm loa trên iPhone thật.

Phông Be Vietnam Pro tải từ Google Fonts, có phông hệ thống dự phòng. Biểu tượng và minh họa là SVG nội bộ.
