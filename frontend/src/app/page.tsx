'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FadeIn, SlideIn, BounceIn, Float, Pulse } from '@/components/AnimatedComponents';

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

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-600"></div>
      </div>
    );
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="space-y-8">
      <section className="relative py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeIn>
            <h1 className="text-5xl font-bold mb-6 tracking-tight">
              Welcome to <span className="text-orange-200">PT-Store</span>
            </h1>
          </FadeIn>
          <SlideIn delay={0.2}>
            <p className="text-xl text-orange-100 max-w-2xl mx-auto">
              Kanpur's Premier Shopping Destination. Discover amazing products at great prices.
            </p>
          </SlideIn>
          <BounceIn delay={0.4}>
            <Link
              href="/products"
              className="mt-8 inline-block px-8 py-3 bg-white text-orange-600 rounded-full font-semibold hover:bg-orange-100 transition-colors"
            >
              Start Shopping
            </Link>
          </BounceIn>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.6}>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Products</h2>
        </FadeIn>
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {products.slice(0, 6).map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <Float>
                  <motion.img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Float>
                <div className="p-6">
                  <motion.h3 
                    className="text-xl font-semibold text-gray-900 mb-2"
                    whileHover={{ color: '#ea580c' }}
                  >
                    {product.name}
                  </motion.h3>
                  <motion.p 
                    className="text-gray-600 mb-4"
                    initial={{ opacity: 0.8 }}
                    whileHover={{ opacity: 1 }}
                  >
                    {product.description}
                  </motion.p>
                  <div className="flex justify-between items-center">
                    <motion.span 
                      className="text-2xl font-bold text-orange-600"
                      whileHover={{ scale: 1.1 }}
                    >
                      ₹{product.price}
                    </motion.span>
                    <Pulse>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Link
                          href={`/products/${product.id}`}
                          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                        >
                          View Details
                        </Link>
                      </motion.div>
                    </Pulse>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      <section className="py-12 bg-gradient-to-r from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              className="text-center p-6"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Free Delivery in Kanpur</h3>
              <p className="text-gray-600">Free shipping on orders over ₹499</p>
            </motion.div>
            <motion.div 
              className="text-center p-6"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">💳</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payment</h3>
              <p className="text-gray-600">100% secure payment processing</p>
            </motion.div>
            <motion.div 
              className="text-center p-6"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
            >
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Returns</h3>
              <p className="text-gray-600">7-day money-back guarantee</p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
