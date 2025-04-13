import React, { useState } from 'react';

const MenuPage = () => {
  const [menuItems] = useState([
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Classic tomato sauce, mozzarella, and basil',
      price: 12.99,
      category: 'Pizza',
      image: '/images/margherita.jpg'
    },
    {
      id: 2,
      name: 'Chicken Burger',
      description: 'Grilled chicken breast with lettuce and special sauce',
      price: 9.99,
      category: 'Burgers',
      image: '/images/chicken-burger.jpg'
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce, croutons, parmesan, and Caesar dressing',
      price: 8.99,
      category: 'Salads',
      image: '/images/caesar-salad.jpg'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Pizza', 'Burgers', 'Salads', 'Pasta', 'Desserts'];

  const filteredItems = selectedCategory === 'All' 
    ? menuItems 
    : menuItems.filter(item => item.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Our Menu</h1>
      
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? 'bg-primary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Menu Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200">
              {/* Placeholder for image */}
              <div className="w-full h-full flex items-center justify-center text-gray-500">
                Image Coming Soon
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">{item.name}</h3>
                <span className="text-lg font-bold text-primary">${item.price}</span>
              </div>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{item.category}</span>
                <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-opacity-90">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage; 