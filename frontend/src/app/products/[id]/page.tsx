'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
}

export default function ProductDetail() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${params.id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  const addToCart = async () => {
    try {
      await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product?.id,
          quantity,
        }),
      });
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart');
    }
  };

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center">Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
        {/* Image gallery */}
        <div className="flex flex-col">
          <div className="aspect-w-1 aspect-h-1 w-full">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-center object-cover sm:rounded-lg"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
          <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl text-gray-900">${product.price}</p>
            <div className="mt-3">
              <span className="text-sm text-gray-500">Rating: {product.rating}/5</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <div className="text-base text-gray-700 space-y-6">
              <p>{product.description}</p>
            </div>
          </div>

          <div className="mt-8 flex">
            <div className="flex items-center">
              <label htmlFor="quantity" className="mr-4 text-sm font-medium text-black">
                Quantity
              </label>
              <select
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base text-black focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
              >
                {[...Array(Math.min(10, product.stock))].map((_, i) => (
                  <option key={i + 1} value={i + 1} >
                    {i + 1}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-8 flex">
            <button
              onClick={addToCart}
              className="w-full bg-blue-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Category</h3>
            <p className="mt-2 text-sm text-gray-500">{product.category}</p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Stock</h3>
            <p className="mt-2 text-sm text-gray-500">{product.stock} units available</p>
          </div>
        </div>
      </div>
    </div>
  );
} 