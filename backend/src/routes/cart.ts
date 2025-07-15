import express from 'express';
import { Cart, CartItem } from '../models/Cart';
import { Product } from '../models/Product';

const router = express.Router();

// Mock cart data - In a real app, this would be stored in a database
let cart: Cart = {
  items: [],
  total: 0
};

// Convert prices to rupees in cart calculations
const conversionRate = 75;

// Get cart
router.get('/', (req, res) => {
  res.json(cart);
});

// Add item to cart
router.post('/add', (req, res) => {
  const { productId, quantity } = req.body;
  
  // In a real app, you would fetch the product from a database
  const product: Product = {
    id: productId,
    name: 'Sample Product',
    description: 'Sample Description',
    price: 99.99,
    image: '/images/sample.jpg',
    category: 'Sample Category',
    stock: 10,
    rating: 4.0
  };

  const existingItem = cart.items.find(item => item.product.id === productId);
  
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product, quantity });
  }

  cart.total = cart.items.reduce((sum, item) => sum + (item.product.price * conversionRate * item.quantity), 0);
  
  res.json(cart);
});

// Remove item from cart
router.delete('/remove/:productId', (req, res) => {
  cart.items = cart.items.filter(item => item.product.id !== req.params.productId);
  cart.total = cart.items.reduce((sum, item) => sum + (item.product.price * conversionRate * item.quantity), 0);
  res.json(cart);
});

// Clear cart
router.delete('/clear', (req, res) => {
  cart = {
    items: [],
    total: 0
  };
  res.json(cart);
});

export default router;