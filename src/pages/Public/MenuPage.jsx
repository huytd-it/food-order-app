import React, { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { collection, getDocs, query, where, orderBy } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { 
  MagnifyingGlassIcon,
  FunnelIcon,
  ArrowUpIcon,
  ArrowDownIcon
} from '@heroicons/react/24/outline';
import AddToCartButton from '../../components/Cart/AddToCartButton';

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        setLoading(true);
        let q = query(collection(db, 'menus'));

        // Apply category filter
        if (selectedCategory !== 'all') {
          q = query(q, where('category', '==', selectedCategory));
        }

        // Apply sorting
        if (sortBy === 'name') {
          q = query(q, orderBy('name', sortOrder));
        } else if (sortBy === 'price') {
          q = query(q, orderBy('price', sortOrder));
        } else if (sortBy === 'rating') {
          q = query(q, orderBy('rating', sortOrder));
        }

        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setMenuItems(items);
      } catch (error) {
        console.error('Error fetching menu items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, [selectedCategory, sortBy, sortOrder]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Menu</h1>
          <p className="mt-2 text-lg text-gray-600">
            Discover our delicious selection of dishes
          </p>
        </div>

        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={handleSearch}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Sort by:</span>
            <button
              onClick={() => handleSort('name')}
              className={`flex items-center space-x-1 text-sm ${
                sortBy === 'name' ? 'text-primary font-medium' : 'text-gray-600'
              }`}
            >
              <span>Name</span>
              {sortBy === 'name' && (
                sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => handleSort('price')}
              className={`flex items-center space-x-1 text-sm ${
                sortBy === 'price' ? 'text-primary font-medium' : 'text-gray-600'
              }`}
            >
              <span>Price</span>
              {sortBy === 'price' && (
                sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={() => handleSort('rating')}
              className={`flex items-center space-x-1 text-sm ${
                sortBy === 'rating' ? 'text-primary font-medium' : 'text-gray-600'
              }`}
            >
              <span>Rating</span>
              {sortBy === 'rating' && (
                sortOrder === 'asc' ? <ArrowUpIcon className="h-4 w-4" /> : <ArrowDownIcon className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>
                  <span className="text-lg font-bold text-primary">${item.price}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-sm text-gray-600">{item.rating}</span>
                  </div>
                  <AddToCartButton 
                    item={{
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                      description: item.description,
                      category: item.category
                    }} 
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No items found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuPage; 