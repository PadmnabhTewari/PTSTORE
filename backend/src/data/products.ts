// Convert prices from dollars to rupees (1 USD = 75 INR)
const conversionRate = 75;

// Update all product images to use the correct default photo
const defaultImage = '/app/images/default-image.png';

// Reduce all product prices by 1000 for higher-priced items and 100 for lower-priced items
const productsRaw = [
  {
    id: '1',
    name: 'Banarasi Saree',
    description: 'Authentic Banarasi silk saree with intricate zari work and traditional motifs. Perfect for weddings and special occasions.',
    price: (15999 * conversionRate) - 1000,
    image: defaultImage,
    category: 'Traditional Wear',
    stock: 15,
    rating: 4.8
  },
  {
    id: '2',
    name: 'Handcrafted Brass Diya Set',
    description: 'Set of 5 beautifully crafted brass diyas with traditional designs. Perfect for home decoration and festivals.',
    price: (1299 * conversionRate) - 100,
    image: defaultImage,
    category: 'Home Decor',
    stock: 25,
    rating: 4.6
  },
  {
    id: '3',
    name: 'Kanjivaram Silk Saree',
    description: 'Classic Kanjivaram silk saree with temple border design and rich colors. A timeless piece of traditional wear.',
    price: (24999 * conversionRate) - 1000,
    image: defaultImage,
    category: 'Traditional Wear',
    stock: 8,
    rating: 4.9
  },
  {
    id: '4',
    name: 'Handwoven Cotton Kurti',
    description: 'Comfortable and stylish handwoven cotton kurti with traditional block prints. Perfect for everyday wear.',
    price: (1999 * conversionRate) - 100,
    image: defaultImage,
    category: 'Traditional Wear',
    stock: 30,
    rating: 4.5
  },
  {
    id: '5',
    name: 'Silver Anklet Set',
    description: 'Elegant silver anklet set with traditional bells and patterns. A perfect accessory for traditional attire.',
    price: (2999 * conversionRate) - 100,
    image: defaultImage,
    category: 'Jewelry',
    stock: 20,
    rating: 4.7
  },
  {
    id: '6',
    name: 'Handmade Terracotta Wall Art',
    description: 'Beautiful terracotta wall art depicting traditional Indian motifs. Adds cultural charm to your home.',
    price: (3999 * conversionRate) - 100,
    image: defaultImage,
    category: 'Home Decor',
    stock: 12,
    rating: 4.4
  },
  {
    id: '7',
    name: 'Premium Spice Set',
    description: 'Collection of premium Indian spices including cardamom, cinnamon, and saffron. Perfect for authentic Indian cooking.',
    price: (2499 * conversionRate) - 100,
    image: defaultImage,
    category: 'Spices & Food',
    stock: 40,
    rating: 4.8
  },
  {
    id: '8',
    name: 'Handcrafted Leather Jutti',
    description: 'Traditional Indian jutti with intricate embroidery. Comfortable and stylish footwear for all occasions.',
    price: (1999 * conversionRate) - 100,
    image: defaultImage,
    category: 'Footwear',
    stock: 18,
    rating: 4.6
  },
  {
    id: '9',
    name: 'Brass Temple Bell',
    description: 'Beautifully crafted brass temple bell with traditional designs. Perfect for home temple or meditation room.',
    price: (899 * conversionRate) - 100,
    image: defaultImage,
    category: 'Home Decor',
    stock: 15,
    rating: 4.5
  },
  {
    id: '10',
    name: 'Handwoven Silk Stole',
    description: 'Elegant silk stole with traditional patterns and tassels. A versatile accessory for any occasion.',
    price: (1499 * conversionRate) - 100,
    image: defaultImage,
    category: 'Accessories',
    stock: 25,
    rating: 4.7
  },
  // Electronics
  {
    id: '11',
    name: 'Wireless Bluetooth Headphones',
    description: 'High-quality over-ear headphones with noise cancellation and long battery life.',
    price: (2999 * conversionRate) - 100,
    image: defaultImage,
    category: 'Electronics',
    stock: 20,
    rating: 4.7
  },
  {
    id: '12',
    name: 'Smart LED Desk Lamp',
    description: 'Adjustable LED desk lamp with touch controls and USB charging port.',
    price: (1499 * conversionRate) - 100,
    image: defaultImage,
    category: 'Electronics',
    stock: 30,
    rating: 4.5
  },
  // Clothing
  {
    id: '13',
    name: 'Men\'s Cotton T-Shirt',
    description: 'Soft and breathable cotton t-shirt available in multiple colors.',
    price: (799 * conversionRate) - 100,
    image: defaultImage,
    category: 'Clothing',
    stock: 50,
    rating: 4.4
  },
  {
    id: '14',
    name: 'Women\'s Denim Jacket',
    description: 'Trendy denim jacket with a comfortable fit and stylish look.',
    price: (2499 * conversionRate) - 100,
    image: defaultImage,
    category: 'Clothing',
    stock: 25,
    rating: 4.6
  },
  // Books
  {
    id: '15',
    name: 'The Art of Mindfulness',
    description: 'A practical guide to mindfulness and meditation for everyday life.',
    price: (499 * conversionRate) - 100,
    image: defaultImage,
    category: 'Books',
    stock: 40,
    rating: 4.8
  },
  {
    id: '16',
    name: 'Modern JavaScript Essentials',
    description: 'Comprehensive book covering modern JavaScript concepts and best practices.',
    price: (899 * conversionRate) - 100,
    image: defaultImage,
    category: 'Books',
    stock: 35,
    rating: 4.7
  },
  // Home & Garden
  {
    id: '17',
    name: 'Indoor Plant Set',
    description: 'Set of 3 easy-to-maintain indoor plants with decorative pots.',
    price: (1299 * conversionRate) - 100,
    image: defaultImage,
    category: 'Home & Garden',
    stock: 28,
    rating: 4.9
  },
  {
    id: '18',
    name: 'Garden Tool Kit',
    description: 'Complete garden tool kit including trowel, pruner, and gloves.',
    price: (1599 * conversionRate) - 100,
    image: defaultImage,
    category: 'Home & Garden',
    stock: 18,
    rating: 4.6
  }
];

// Adjust product prices to be in the range of 100s and 1000s
export const products = productsRaw.map((product) => ({
  ...product,
  price: product.price > 10000 ? 1000 : 100
}));