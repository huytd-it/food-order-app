import React, { useState, useEffect } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../firebaseConfig';
import { collection, query, where, orderBy, getDocs } from 'firebase/firestore';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const OrderHistoryPage = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef,
          where('userId', '==', user?.uid),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate()
        }));
        setOrders(ordersData);
      } catch (err) {
        setError('Không thể tải lịch sử đơn hàng');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handlePrint = (order) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Đơn hàng #${order.id}</title>
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
            <h1>Đơn hàng #${order.id}</h1>
            <p>Ngày đặt: ${format(order.createdAt, 'dd/MM/yyyy HH:mm', { locale: vi })}</p>
          </div>
          <div class="info">
            <p><strong>Khách hàng:</strong> ${order.name}</p>
            <p><strong>Điện thoại:</strong> ${order.phone}</p>
            <p><strong>Địa chỉ:</strong> ${order.address}</p>
            <p><strong>Ghi chú:</strong> ${order.note || 'Không có'}</p>
          </div>
          <table class="items">
            <thead>
              <tr>
                <th>Tên món</th>
                <th>Kích thước</th>
                <th>Toppings</th>
                <th>Số lượng</th>
                <th>Giá</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => `
                <tr>
                  <td>${item.name}</td>
                  <td>${item.size.name} (+${item.size.price.toLocaleString('vi-VN')}đ)</td>
                  <td>${item.toppings.map(t => t.name).join(', ') || 'Không có'}</td>
                  <td>${item.quantity}</td>
                  <td>${item.totalPrice.toLocaleString('vi-VN')}đ</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
          <div class="total">
            <p>Tổng cộng: ${order.totalAmount.toLocaleString('vi-VN')}đ</p>
          </div>
          <button class="no-print" onclick="window.print()">In đơn hàng</button>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Đang tải lịch sử đơn hàng...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Lịch sử đơn hàng</h1>
        
        {orders.length === 0 ? (
          <div className="text-center text-gray-600">
            Bạn chưa có đơn hàng nào
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-xl font-semibold">Đơn hàng #{order.id}</h2>
                    <p className="text-gray-600">
                      {format(order.createdAt, 'dd/MM/yyyy HH:mm', { locale: vi })}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      order.status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status === 'completed' ? 'Đã hoàn thành' :
                       order.status === 'processing' ? 'Đang xử lý' :
                       order.status === 'cancelled' ? 'Đã hủy' :
                       'Chờ xử lý'}
                    </span>
                    <button
                      onClick={() => handlePrint(order)}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors duration-300"
                    >
                      In đơn hàng
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Thông tin giao hàng</h3>
                    <p className="text-gray-600">{order.name}</p>
                    <p className="text-gray-600">{order.phone}</p>
                    <p className="text-gray-600">{order.address}</p>
                    {order.note && (
                      <p className="text-gray-600 mt-2">
                        <span className="font-medium">Ghi chú:</span> {order.note}
                      </p>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-2">Chi tiết đơn hàng</h3>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              {item.size.name} {item.toppings.length > 0 && 
                                `(+${item.toppings.map(t => t.name).join(', ')})`}
                            </p>
                          </div>
                          <div className="text-right">
                            <p>{item.quantity} x {item.totalPrice.toLocaleString('vi-VN')}đ</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 pt-4 border-t">
                      <p className="text-lg font-semibold text-right">
                        Tổng cộng: {order.totalAmount.toLocaleString('vi-VN')}đ
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistoryPage; 