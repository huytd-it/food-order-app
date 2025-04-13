import { useCart } from '../hooks/useCart';

const CartPage = () => {
  const { items, total, removeItem, updateQuantity } = useCart();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <a
            href="/"
            className="mt-4 inline-block text-primary hover:text-primary-dark"
          >
            Continue shopping
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <ul className="divide-y divide-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-16 w-16 rounded-full object-cover"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-medium text-gray-900">
                            {item.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            ${item.price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            -
                          </button>
                          <span className="mx-2">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="text-gray-500 hover:text-gray-700"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white shadow overflow-hidden sm:rounded-lg p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Order Summary
              </h2>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-900">${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-gray-900">Free</span>
                </div>
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <span className="text-lg font-medium text-gray-900">Total</span>
                    <span className="text-lg font-medium text-gray-900">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
                <button
                  className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 