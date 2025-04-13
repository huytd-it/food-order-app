import React from 'react';

const Logo = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`flex items-center ${sizeClasses[size]}`}>
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Plate */}
        <circle cx="12" cy="12" r="10" fill="#F3F4F6" />
        <circle cx="12" cy="12" r="8" fill="#E5E7EB" />
        
        {/* Utensils */}
        <path
          d="M8 6L8 18"
          stroke="#4B5563"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M10 8L6 8"
          stroke="#4B5563"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M16 6L16 18"
          stroke="#4B5563"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M18 8L14 8"
          stroke="#4B5563"
          strokeWidth="2"
          strokeLinecap="round"
        />
        
        {/* Food */}
        <circle cx="12" cy="12" r="4" fill="#F59E0B" />
      </svg>
      <span className="ml-2 text-xl font-bold text-gray-800">FoodOrder</span>
    </div>
  );
};

export default Logo; 