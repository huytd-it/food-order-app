import React from 'react';

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">Welcome to Food Order App</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured items will go here */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Featured Items</h2>
          <p className="text-gray-600">Discover our delicious menu items</p>
        </div>
      </div>
    </div>
  );
};

export default HomePage; 