# Hướng dẫn tích hợp Database Webhook (Điểm cộng tuyệt đối)

Để đạt điểm cộng "Tích hợp kiểm tra tính hợp lệ dữ liệu người dùng gửi về Webhook thực tế", bạn hãy cấu hình Supabase tự động gửi thông báo khi có người điền form.

### Bước 1: Chuẩn bị Webhook URL
Bạn có thể dùng:
- **Telegram Bot**: Dùng `https://api.telegram.org/bot<TOKEN>/sendMessage`
- **Slack/Discord**: Dùng Incoming Webhook URL.
- **Dịch vụ test**: `https://webhook.site` (để demo nhanh).

### Bước 2: Cấu hình trên Supabase Dashboard
1. Truy cập vào dự án Supabase của bạn.
2. Đi tới **Database** -> **Webhooks**.
3. Nhấn **Enable Webhooks** (nếu chưa bật).
4. Nhấn **Create a new webhook**.
5. Cấu hình như sau:
   - **Name**: `notify_new_lead`
   - **Table**: `leads`
   - **Events**: Chọn `INSERT` (Kích hoạt khi có dữ liệu mới).
   - **Webhook configuration**: 
     - Method: `POST`
     - URL: (Dán URL từ Bước 1 vào).
6. Nhấn **Create webhook**.

### Bước 3: Kiểm tra
Bây giờ, mỗi khi có khách hàng điền form trên Landing Page của bạn:
1. Dữ liệu sẽ được lưu vào bảng `leads` trong Supabase.
2. Supabase sẽ tự động "bắn" một thông báo đến Webhook bạn đã cài đặt.

**Tại sao đây là điểm cộng lớn?**
Nó chứng minh bạn không chỉ biết code Frontend mà còn hiểu về **Event-driven Architecture** (Kiến trúc hướng sự kiện) - một kỹ năng cao cấp của Senior Developer.
