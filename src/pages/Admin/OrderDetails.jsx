import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderRef = doc(db, 'orders', orderId);
        const orderDoc = await getDoc(orderRef);
        
        if (orderDoc.exists()) {
          const orderData = {
            id: orderDoc.id,
            ...orderDoc.data(),
            createdAt: orderDoc.data().createdAt?.toDate()
          };
          setOrder(orderData);
        } else {
          setError('Đơn hàng không tồn tại');
        }
      } catch (err) {
        setError('Không thể tải thông tin đơn hàng');
        console.error('Error fetching order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Hóa đơn #${order.id}</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
            .header { text-align: center; margin-bottom: 20px; }
            .info { margin-bottom: 20px; }
            .items { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
            .items th, .items td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            .total { text-align: right; font-weight: bold; }
            @media print {
              .no-print { display: none; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>HÓA ĐƠN</h1>
            <p>Mã đơn hàng: #${order.id}</p>
            <p>Ngày: ${format(order.createdAt, 'dd/MM/yyyy HH:mm', { locale: vi })}</p>
          </div>
          <div class="info">
            <p><strong>Khách hàng:</strong> ${order.name}</p>
            <p><strong>Điện thoại:</strong> ${order.phone}</p>
            <p><strong>Địa chỉ:</strong> ${order.address}</p>
            <p><strong>Phương thức thanh toán:</strong> ${order.paymentMethod}</p>
          </div>
          <table class="items">
            <thead>
              <tr>
                <th>Sản phẩm</th>
                <th>Size</th>
                <th>Topping</th>
                <th>Số lượng</th>
                <th>Đơn giá</th>
                <th>Thành tiền</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.selectedSize?.name || '-'}</td>
                  <td>${item.selectedToppings?.map(t => t.name).join(', ') || '-'}</td>
                  <td>${item.quantity}</td>
                  <td>${item.price.toLocaleString('vi-VN')}đ</td>
                  <td>${(item.price * item.quantity).toLocaleString('vi-VN')}đ</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">
            <p>Tổng cộng: ${order.totalAmount.toLocaleString('vi-VN')}đ</p>
          </div>
          <div class="no-print" style="text-align: center; margin-top: 20px;">
            <button onclick="window.print()">In hóa đơn</button>
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Đang tải thông tin đơn hàng...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Chi tiết đơn hàng #{order.id}
              </h1>
              <button
                onClick={handlePrint}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark"
              >
                In hóa đơn
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Thông tin khách hàng</h2>
                <p><span className="font-medium">Tên:</span> {order.name}</p>
                <p><span className="font-medium">Điện thoại:</span> {order.phone}</p>
                <p><span className="font-medium">Địa chỉ:</span> {order.address}</p>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Thông tin đơn hàng</h2>
                <p><span className="font-medium">Ngày đặt:</span> {format(order.createdAt, 'dd/MM/yyyy HH:mm', { locale: vi })}</p>
                <p><span className="font-medium">Phương thức thanh toán:</span> {order.paymentMethod}</p>
                <p><span className="font-medium">Trạng thái:</span> 
                  <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'completed' ? 'bg-green-100 text-green-800' :
                    order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                    order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status === 'pending' ? 'Chờ xử lý' :
                     order.status === 'processing' ? 'Đang xử lý' :
                     order.status === 'completed' ? 'Đã hoàn thành' :
                     'Đã hủy'}
                  </span>
                </p>
              </div>
            </div>

            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-2">Chi tiết sản phẩm</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Sản phẩm
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Size
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Topping
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Số lượng
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Đơn giá
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Thành tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.items.map((item, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.selectedSize?.name || '-'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {item.selectedToppings?.map(t => t.name).join(', ') || '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{item.quantity}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {item.price.toLocaleString('vi-VN')}đ
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {(item.price * item.quantity).toLocaleString('vi-VN')}đ
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="text-right">
                <p className="text-lg font-semibold">
                  Tổng cộng: {order.totalAmount.toLocaleString('vi-VN')}đ
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;