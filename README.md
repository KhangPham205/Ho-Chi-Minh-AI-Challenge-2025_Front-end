
# 🎉AI Challenge 2025 - Giao diện Tìm kiếm Đa phương tiện

Đây là project frontend cho hệ thống Tìm kiếm và Truy xuất Sự kiện/Khoảnh khắc từ cơ sở dữ liệu đa phương tiện, được phát triển cho cuộc thi AI Challenge. Giao diện được xây dựng bằng React, Vite, Tailwind CSS và được đóng gói bằng Docker.



## ✍️Features

- Giao diện tìm kiếm trực quan: Cho phép người dùng dễ dàng chuyển đổi giữa các chế độ tìm kiếm.
- Tìm kiếm bằng Văn bản (Text Search): Nhập một câu mô tả để tìm các keyframe tương ứng.
- Tìm kiếm bằng Hình ảnh (Image Search): Tải lên một hình ảnh để tìm các keyframe tương đồng về mặt thị giác.
- Tìm kiếm theo Thời gian (Temporal Search): Tìm kiếm các sự kiện diễn ra theo một trình tự thời gian.
- Bộ lọc nâng cao: Lọc kết quả dựa trên văn bản trong ảnh (OCR) hoặc lời thoại (ASR).
- Hiển thị kết quả: Dạng lưới (grid) tối ưu cho việc xem nhiều keyframe cùng lúc.
- Chatbot tích hợp: Hỗ trợ người dùng và trả lời các câu hỏi.

## 🛠️Tech Stack
- Framework: React (sử dụng Vite)
- Styling: Tailwind CSS
- Gọi API: Axios
- Đóng gói: Docker & Docker Compose


## ✅Installation
Dự án này được thiết kế để chạy dưới dạng một service trong hệ thống Docker Compose, kết nối với các service backend đã có.

### Yêu cầu
- Docker Desktop đã được cài đặt và đang chạy.
- Hệ thống backend (FastAPI, Milvus, Elasticsearch,...) đang chạy.

### Các bước khởi chạy
#### 1. Clone Repository:

```bash
git clone https://github.com/KhangPham205/Ho-Chi-Minh-AI-Challenge-2025_Front-end.git
cd ai-challenge-frontend
```
#### 2. Khởi động Backend:
Đảm bảo rằng bạn đã khởi động toàn bộ các service backend từ thư mục backend. Mạng Docker có tên ai-challenge-network phải được tạo ra từ bước này.

```bash
# Di chuyển đến thư mục backend
cd ../<your-backend-repo-name>

# Khởi động backend
docker-compose up -d
```
Bạn có thể clone repo backend ở đây:
[Link github backend](https://github.com/BaryuH/Ho-Chi-Minh-AI-Challenge-2025.git)

#### 3. Khởi động Frontend:
Quay trở lại thư mục của project frontend và chạy lệnh sau:

```bash
docker-compose up --build -d
```

#### 4. Truy cập ứng dụng:
Sau khi container khởi động thành công, hãy mở trình duyệt và truy cập:

```bash
http://localhost:3000

```

### Chạy ở chế độ Development (Không dùng Docker)

Nếu bạn muốn phát triển và xem các thay đổi ngay lập tức mà không cần build lại Docker image, bạn có thể chạy frontend ở chế độ development.

#### 1. Cài đặt dependencies:

```bash
npm install
```
#### 2. Chỉnh sửa file ```.env.development``` (Tùy chọn, có thể không cần thiết):
Tạo một file tên là ```.env.development``` ở thư mục gốc để định nghĩa địa chỉ API.
```bash
VITE_API_BASE_URL=http://localhost:8000
```
Sau đó, trong code gọi ```axios```, bạn sẽ dùng ```import.meta.env.VITE_API_BASE_URL```.

#### 3. Khởi động server dev:

```bash
npm run dev
```
Ứng dụng sẽ có sẵn tại ```http://localhost:5173``` (hoặc một port khác do Vite chỉ định).

## Cấu trúc thư mục
```
ai-challenge-frontend/
├── public/               # Chứa các file tĩnh (favicon, logo).
├── src/
│   ├── api/              # (Đề xuất) Chứa logic gọi API.
│   │   ├── apiClient.js
│   │   └── searchService.js
│   ├── assets/           # Chứa tài sản như hình ảnh, SVG.
│   │   └── react.svg
│   ├── components/       # Chứa các component con có thể tái sử dụng.
│   │   ├── AsrResultGroup.jsx
│   │   ├── ResultItem.jsx
│   │   ├── TemporalResultGroup.jsx
│   │   └── VideoPlayerModal.jsx
│   ├── hooks/            # Chứa các custom hook (logic tách biệt).
│   │   └── useSearch.js
│   ├── models/           # Chứa các model hoặc cấu trúc dữ liệu phía frontend.
│   │   └── SearchModels.js
│   ├── pages/            # Chứa các component chính của từng trang.
│   │   └── SearchPage.jsx
│   ├── utils/            # Chứa các hàm tiện ích.
│   ├── App.jsx           # Component gốc của ứng dụng.
│   ├── App.css
│   └── main.jsx          # Điểm khởi đầu của ứng dụng React.
├── .gitignore            # Cấu hình bỏ qua các file không cần thiết.
├── docker-compose.yml    # Cấu hình Docker.
├── Dockerfile            # Cấu hình docker
├── index.html            # File HTML gốc.
├── package.json          # Quản lý các thư viện và script của Node.js.
└── vite.config.js        # File cấu hình cho Vite.
```
## 🔖Acknowledgements
Dự án này được thực hiện trong khuôn khổ cuộc thi **Ho Chi Minh AI Challenge 2025**. Xin gửi lời cảm ơn chân thành đến Ban tổ chức đã tạo ra một môi trường học hỏi và thi đấu đầy thử thách.

Chúng tôi cũng xin cảm ơn các dự án mã nguồn mở đã cung cấp những công cụ mạnh mẽ, bao gồm:
- [React](https://react.dev/) & [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Docker](https://www.docker.com/)
- [Milvus](https://milvus.io/) & [Elasticsearch](https://www.elastic.co/)


## 🧾Documentation

Để biết thêm chi tiết về cách hoạt động của hệ thống, vui lòng tham khảo các tài liệu dưới đây:

- **API Backend Documentation:** Sau khi khởi động hệ thống backend, tài liệu API tương tác (Swagger UI) có sẵn tại: [http://localhost:8000/docs](http://localhost:8000/docs).
- **Backend Repository:** https://github.com/BaryuH/Ho-Chi-Minh-AI-Challenge-2025.git

## 🔸Contributor
- [Phạm Tuấn Khang](https://github.com/KhangPham205)
- [Trần Thị Hồng Thanh](https://github.com/ThankTran)
