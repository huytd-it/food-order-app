# Food Order App

Ứng dụng đặt món ăn trực tuyến với các tính năng:
- Xem danh sách món ăn
- Thêm món vào giỏ hàng
- Tùy chọn kích thước và toppings
- Thanh toán

## Cấu trúc dữ liệu

### MenuItem
```typescript
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  isPopular: boolean;
}
```

### CartItem
```typescript
interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  size: {
    id: string;
    name: string;
    price: number;
  };
  toppings: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  totalPrice: number;
}
```

### Order
```typescript
interface Order {
  id: string;
  userId: string | null;
  name: string;
  phone: string;
  address: string;
  note: string;
  paymentMethod: 'cash' | 'bank';
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    size: {
      id: string;
      name: string;
      price: number;
    };
    toppings: Array<{
      id: string;
      name: string;
      price: number;
    }>;
    totalPrice: number;
  }>;
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### User
```typescript
interface User {
  uid: string;
  email: string;
  displayName: string;
  phoneNumber: string;
  address: string;
  photoURL: string;
  role: 'user' | 'admin';
}
```

## Redux Store Structure

```typescript
interface RootState {
  cart: {
    items: CartItem[];
    totalAmount: number;
  };
  auth: {
    user: User | null;
    loading: boolean;
    error: string | null;
  };
}
```

## Features
- Đặt món ăn trực tuyến
- Quản lý giỏ hàng
- Thanh toán và theo dõi đơn hàng
- Đăng nhập/Đăng ký tài khoản
- Quản lý thông tin cá nhân
- Xem lịch sử đơn hàng

## Technologies
- React
- Redux Toolkit
- Firebase (Authentication, Firestore, Storage)
- Tailwind CSS
- React Router
- React Hook Form
- React Icons

## Getting Started
1. Clone repository
2. Install dependencies: `npm install`
3. Create `.env` file with Firebase config
4. Start development server: `npm run dev`

## Cấu trúc MenuItem

Mỗi món ăn trong menu có cấu trúc như sau:

```javascript
{
  id: string,              // ID duy nhất của món ăn
  name: string,            // Tên món ăn
  description: string,     // Mô tả món ăn
  price: number,          // Giá cơ bản (VND)
  image: string,          // URL hình ảnh
  category: string,       // Danh mục món ăn
  rating: number,         // Đánh giá (1-5)
  isPopular: boolean,     // Có phải món phổ biến không
  size: {                 // Các tùy chọn kích thước
    id: string,           // ID kích thước
    name: string,         // Tên kích thước
    price: number         // Giá thêm (VND)
  },
  toppings: [{           // Các tùy chọn toppings
    id: string,          // ID topping
    name: string,        // Tên topping
    price: number        // Giá thêm (VND)
  }]
}
```

## Ví dụ về giá tiền

- Giá cơ bản của món ăn: 50,000đ - 150,000đ
- Giá thêm cho kích thước:
  - Nhỏ: +0đ
  - Vừa: +10,000đ
  - Lớn: +20,000đ
- Giá thêm cho toppings: +5,000đ - 15,000đ mỗi topping

## Cách sử dụng

1. Cài đặt dependencies:
```bash
npm install
```

2. Chạy ứng dụng:
```bash
npm start
```

3. Populate dữ liệu menu:
```bash
node src/scripts/populateMenu.js
```

## Tính năng

- Xem danh sách món ăn theo danh mục
- Thêm món vào giỏ hàng
- Tùy chọn kích thước và toppings
- Xem giỏ hàng và tổng tiền
- Thanh toán đơn hàng

## Công nghệ sử dụng

- React
- Redux Toolkit
- Firebase
- Tailwind CSS
- Heroicons
