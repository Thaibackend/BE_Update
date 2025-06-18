# Family Management API

Dự án NestJS với hệ thống phân quyền và quản lý người dùng.

## Cài đặt và chạy

1. Cài đặt dependencies:
```bash
npm install
```

2. Khởi động MongoDB (local):
```bash
mongod
```

3. Thiết lập biến môi trường:
Tạo file `.env` với nội dung:
```
MONGODB_URI=mongodb://localhost:27017/family_management
JWT_SECRET=your-jwt-secret-key-change-this-in-production
PORT=3000
NODE_ENV=development
```

4. Chạy ứng dụng:
```bash
npm run start:dev
```

## API Documentation

Swagger documentation có thể truy cập tại: http://localhost:3000/api

## Roles và Permissions

### Roles:
- **ADMIN**: Quyền cao nhất, có thể quản lý tất cả users và phân quyền
- **STAFF**: Có thể xem danh sách users và thông tin chi tiết
- **FAMILY_MEMBER**: Role mặc định khi đăng ký

### Permissions:
- **ADMIN**:
  - Tạo user mới
  - Xem tất cả users
  - Cập nhật roles của users
  - Vô hiệu hóa users
  
- **STAFF**:
  - Xem tất cả users
  - Xem thông tin chi tiết user
  
- **FAMILY_MEMBER**:
  - Chỉ có thể đăng nhập

## API Endpoints

### Authentication
- `POST /auth/register` - Đăng ký tài khoản mới (public)
- `POST /auth/login` - Đăng nhập (public)

### Users Management
- `GET /users` - Lấy danh sách tất cả users (ADMIN, STAFF)
- `GET /users/:id` - Lấy thông tin user theo ID (ADMIN, STAFF)
- `POST /users` - Tạo user mới (ADMIN only)
- `PATCH /users/:id/roles` - Cập nhật roles của user (ADMIN only)
- `PATCH /users/:id/deactivate` - Vô hiệu hóa user (ADMIN only)

## Default Users

Khi chạy lần đầu, hệ thống sẽ tự động tạo các users mặc định:

1. **Admin User**:
   - Email: admin@example.com
   - Password: admin123
   - Role: ADMIN

2. **Staff User**:
   - Email: staff@example.com
   - Password: staff123
   - Role: STAFF

3. **Family Member**:
   - Email: family@example.com
   - Password: family123
   - Role: FAMILY_MEMBER

## Sử dụng API

### 1. Đăng nhập
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "admin123"
  }'
```

Response sẽ trả về access_token:
```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "user_id",
    "email": "admin@example.com",
    "username": "admin",
    "fullName": "System Administrator",
    "roles": ["admin"]
  }
}
```

### 2. Sử dụng token để truy cập protected endpoints
```bash
curl -X GET http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### 3. Tạo user mới (Admin only)
```bash
curl -X POST http://localhost:3000/users \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "newuser",
    "email": "newuser@example.com",
    "password": "password123",
    "fullName": "New User",
    "roles": ["family_member"]
  }'
```

## Database Schema

### User Collection
```typescript
{
  username: string (unique)
  email: string (unique)
  password: string (hashed)
  fullName: string
  roles: Array<'admin' | 'staff' | 'family_member'>
  isActive: boolean
  phoneNumber?: string
  address?: string
  createdAt: Date
  updatedAt: Date
}
```

## Security Features

- Passwords được hash bằng bcrypt
- JWT tokens với thời gian hết hạn 24h
- Role-based access control (RBAC)
- Global authentication guard
- Input validation và sanitization 