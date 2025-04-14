import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { Link } from 'react-router-dom';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const OrdersHistory = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('OrdersHistory component mounted');
    console.log('Current user:', user);

    const fetchOrders = async () => {
      try {
        console.log('Starting to fetch orders...');
        console.log('User ID for query:', user.uid);
        
        // First, let's check if the orders collection exists and has any documents
        const ordersRef = collection(db, 'orders');
        console.log('Collection reference created');
        
        // Let's try a simple query first without filters to see if there are any orders at all
        const allOrdersQuery = query(ordersRef);
        console.log('Checking if orders collection has any documents...');
        const allOrdersSnapshot = await getDocs(allOrdersQuery);
        console.log('Total documents in orders collection:', allOrdersSnapshot.size);
        
        if (allOrdersSnapshot.size > 0) {
          console.log('Sample of first document:', allOrdersSnapshot.docs[0].data());
        }
        
        // Now let's try our filtered query - using phone number instead of userId
        const q = query(
          ordersRef,
          where('phone', '==', user.phoneNumber || ''),
          orderBy('createdAt', 'desc')
        );
        console.log('Query created:', q);
        
        console.log('Executing getDocs...');
        const querySnapshot = await getDocs(q);
        console.log('getDocs completed');
        console.log('Query snapshot empty?', querySnapshot.empty);
        console.log('Number of documents:', querySnapshot.size);
        
        if (querySnapshot.empty) {
          console.log('No matching documents for phone:', user.phoneNumber);
          setOrders([]);
        } else {
          console.log('Raw query snapshot:', querySnapshot);
          
          const ordersData = querySnapshot.docs.map(doc => {
            const data = doc.data();
            console.log('Order document data:', {
              id: doc.id,
              ...data
            });
            return {
              id: doc.id,
              orderId: doc.id.substring(0, 8).toUpperCase(), // Create a short order ID from the document ID
              ...data
            };
          });
          
          console.log('Processed orders data:', ordersData);
          setOrders(ordersData);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError(error.message);
      } finally {
        console.log('Setting loading to false');
        setLoading(false);
      }
    };

    if (user) {
      console.log('User exists, calling fetchOrders');
      fetchOrders();
    } else {
      console.log('No user found, skipping fetchOrders');
      setLoading(false);
    }
  }, [user]);

  const filteredOrders = orders.filter(order => {
    const matches = 
      (order.orderId && order.orderId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.status && order.status.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (order.name && order.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
    console.log('Filtering order:', {
      orderId: order.orderId,
      status: order.status,
      name: order.name,
      searchTerm,
      matches
    });
    return matches;
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate();
    return new Intl.DateTimeFormat('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-4">
                  <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Lịch sử đơn hàng</h1>
          <p className="mt-2 text-sm text-gray-600">
            Xem lại các đơn hàng bạn đã đặt
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm kiếm theo mã đơn hàng, tên hoặc trạng thái..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        {filteredOrders.length > 0 ? (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <div
                key={order.id}
                className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Đơn hàng #{order.orderId}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                    <Link
                      to={`/orders/${order.id}`}
                      className="text-primary hover:text-primary-dark font-medium"
                    >
                      Xem chi tiết
                    </Link>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-600">
                        {order.items?.length || 0} món
                      </p>
                    </div>
                    <p className="text-lg font-semibold text-gray-900">
                      {order.totalAmount?.toLocaleString('vi-VN')}đ
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">
              {searchTerm
                ? 'Không tìm thấy đơn hàng nào phù hợp với tìm kiếm của bạn'
                : 'Bạn chưa có đơn hàng nào'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersHistory; 