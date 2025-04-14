import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { collection, getDocs, query, limit } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import { 
  ShoppingBagIcon, 
  FireIcon, 
  StarIcon, 
  ClockIcon 
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const [featuredItems, setFeaturedItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchFeaturedItems = async () => {
      try {
        const q = query(collection(db, 'foods'), limit(6));
        const querySnapshot = await getDocs(q);
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFeaturedItems(items);
      } catch (error) {
        console.error('Error fetching featured items:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedItems();
  }, []);

  const categories = [
    { name: 'Burgers', icon: '🍔', count: 12 },
    { name: 'Pizzas', icon: '🍕', count: 8 },
    { name: 'Sushi', icon: '🍣', count: 15 },
    { name: 'Desserts', icon: '🍰', count: 10 },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-primary to-secondary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Delicious Food Delivered to Your Door
            </h1>
            <p className="mt-3 max-w-md mx-auto text-base sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Order your favorite meals from the best restaurants in town. Fast delivery and great prices!
            </p>
            <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
              <div className="rounded-md shadow">
                <Link
                  to="/menu"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
                >
                  View Menu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={`/menu?category=${category.name.toLowerCase()}`}
              className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 text-center"
            >
              <span className="text-4xl mb-2 block">{category.icon}</span>
              <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
              <p className="text-sm text-gray-500">{category.count} items</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Featured Items Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Featured Items</h2>
          <Link to="/menu" className="text-primary hover:text-primary-dark">
            View All
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="relative h-48">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
                {item.isPopular && (
                  <div className="absolute top-2 left-2 bg-primary text-white px-2 py-1 rounded-full text-xs">
                    Popular
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                  <span className="text-primary font-bold">${item.price}</span>
                </div>
                <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-600">{item.rating || '4.5'}</span>
                  </div>
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-primary text-white px-4 py-2 rounded-full text-sm hover:bg-primary-dark transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Promotions Section */}
      <div className="bg-primary text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Special Offers</h2>
            <p className="text-xl mb-8">Get 20% off on your first order!</p>
            <Link
              to="/menu"
              className="bg-white text-primary px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Order Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 