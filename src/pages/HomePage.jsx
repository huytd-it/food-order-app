import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { SearchIcon } from '@heroicons/react/24/outline';

const HomePage = () => {
  const [menus, setMenus] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const menusRef = collection(db, 'menus');
        const q = searchTerm
          ? query(menusRef, where('name', '>=', searchTerm), where('name', '<=', searchTerm + '\uf8ff'))
          : menusRef;
        
        const querySnapshot = await getDocs(q);
        const menusData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMenus(menusData);
      } catch (err) {
        setError('Failed to fetch menus');
        console.error('Error fetching menus:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Welcome to Food Order App
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Discover and order your favorite meals from our extensive menu
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent sm:text-sm"
              placeholder="Search for your favorite food..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Menu Grid */}
        {loading ? (
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            <p className="mt-4 text-gray-500">Loading menus...</p>
          </div>
        ) : error ? (
          <div className="text-center text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {menus.map((menu) => (
              <div
                key={menu.id}
                className="bg-white overflow-hidden shadow rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      {menu.imageUrl ? (
                        <img
                          className="h-16 w-16 rounded-full object-cover"
                          src={menu.imageUrl}
                          alt={menu.name}
                        />
                      ) : (
                        <div className="h-16 w-16 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-xl">🍽️</span>
                        </div>
                      )}
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-medium text-gray-900">{menu.name}</h3>
                      <p className="text-sm text-gray-500">{menu.category}</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-600">{menu.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-lg font-semibold text-primary">
                        ${menu.price.toFixed(2)}
                      </span>
                      <button
                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors duration-300"
                        onClick={() => {
                          // Add to cart functionality will be implemented here
                          console.log('Add to cart:', menu);
                        }}
                      >
                        Add to Cart
                      </button>
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

export default HomePage; 