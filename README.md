# Food Order App

Ứng dụng đặt món ăn trực tuyến với các tính năng:
- Xem danh sách món ăn
- Thêm món vào giỏ hàng
- Tùy chọn kích thước và toppings
- Thanh toán

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
