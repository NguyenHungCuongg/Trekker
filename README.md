# 🌍 Trekker - Travel & Accommodation Booking Mobile App

![React Native](https://img.shields.io/badge/React_Native-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Expo](https://img.shields.io/badge/expo-%23000020.svg?style=for-the-badge&logo=expo&logoColor=white)
![NestJS](https://img.shields.io/badge/nestjs-%23E0234E.svg?style=for-the-badge&logo=nestjs&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)

**Trekker** là một ứng dụng di động hiện đại giúp người dùng tối ưu hóa trải nghiệm du lịch. Dự án tận dụng hệ sinh thái **Expo** để tăng tốc quá trình phát triển và đảm bảo hiệu suất mượt mà trên cả hai nền tảng iOS và Android.

---

## 🎨 UI/UX Design (Figma)

---

## 🚀 Key Features
- **Discovery:** Tìm kiếm và lọc tour/chỗ ở thông minh.
- **Booking Flow:** Quy trình đặt chỗ chặt chẽ, cập nhật trạng thái thời gian thực.
- **Payment Integration:** Xử lý thanh toán an toàn.
- **Admin Dashboard:** API hỗ trợ CRUD danh mục tour và phòng.

---

## 🛠️ Tech Stack

### Frontend (Mobile App)
- **React Native & Expo**: Framework chính để phát triển ứng dụng di động.
- **Expo Go**: Hỗ trợ xem trước và kiểm thử ứng dụng nhanh chóng trên thiết bị thật.
- **React Navigation**: Quản lý điều hướng.

### Backend (API Server)
- **NestJS**: Kiến trúc server-side mạnh mẽ và có tính module hóa cao.
- **TypeORM & PostgreSQL**: Quản lý cơ sở dữ liệu quan hệ và thực thể.

---

## 🏗️ Technical Highlights (Key Contributions)

* **Expo Workflow Integration:** Tối ưu hóa quy trình phát triển bằng cách sử dụng **Expo SDK**, giúp quản lý các thư viện native và build ứng dụng hiệu quả mà không cần can thiệp sâu vào code Java/Objective-C.
* **Cross-Platform UI:** Triển khai giao diện nhất quán bằng **React Native**, đảm bảo các thành phần UI hoạt động ổn định trên cả hệ điều hành khác nhau.
* **Scalable Backend:** Xây dựng hệ thống RESTful API với **NestJS**, áp dụng kiến trúc module giúp tách biệt logic và dễ dàng mở rộng.
* **Database Integrity:** Thiết kế cấu trúc DB trong **PostgreSQL**, xử lý các mối quan hệ many-to-many phức tạp giữa Users, Bookings và Tours.

---

## 📸 Screenshots

| Home Screen | Tour Detail | Booking History |
| :---: | :---: | :---: |
| ![Home](https://res.cloudinary.com/dilgcxa7l/image/upload/v1769767373/Picture2_drns3n.png) | ![Detail](https://res.cloudinary.com/dilgcxa7l/image/upload/v1769767373/Picture3_jscz64.png) | ![Booking](https://res.cloudinary.com/dilgcxa7l/image/upload/v1769767374/Picture4_r0xdop.png) |

---

## ⚙️ Installation & Setup

### 1. Backend Setup (NestJS)
```bash
cd backend
npm install
# Configure your .env file with PostgreSQL credentials
npm run start:dev
```

### 2. Frontend Setup (NestJS)
```bash
cd frontend
npm install
# Configure your .env file with PostgreSQL credentials
npx expo start --clear
```
### Tip: Bạn có thể quét mã QR bằng ứng dụng Expo Go trên điện thoại để trải nghiệm app trực tiếp.

## ⭐ Nếu bạn thấy dự án này hữu ích, hãy tặng chúng mình 1 Star nhé!
