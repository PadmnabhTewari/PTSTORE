'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface CartItem {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    rating: number;
  };
  quantity: number;
}

interface Cart {
  items: CartItem[];
  total: number;
}

export default function Cart() {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/cart');
      const data = await response.json();
      setCart(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId: string) => {
    try {
      await fetch(`http://localhost:5000/api/cart/remove/${productId}`, {
        method: 'DELETE',
      });
      fetchCart();
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  const clearCart = async () => {
    try {
      await fetch('http://localhost:5000/api/cart/clear', {
        method: 'DELETE',
      });
      fetchCart();
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        {cart.items.length > 0 && (
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          >
            Clear Cart
          </button>
        )}
      </div>

      {cart.items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">Your cart is empty</p>
          <Link
            href="/products"
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div
              key={item.product.id}
              className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-24 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{item.product.name}</h3>
                <p className="text-gray-600">{item.product.description}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xl font-bold">${item.product.price * item.quantity}</span>
                  <span className="text-gray-500">Quantity: {item.quantity}</span>
                </div>
              </div>
              <button
                onClick={() => removeItem(item.product.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="bg-white p-4 rounded-lg shadow mt-6">
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">Total:</span>
              <span className="text-2xl font-bold">${cart.total.toFixed(2)}</span>
            </div>
            <button className="w-full mt-4 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 