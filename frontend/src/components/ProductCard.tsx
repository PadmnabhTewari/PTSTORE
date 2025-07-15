import Image from 'next/image';
import Link from 'next/link';

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

interface ProductCardProps {
  product: Product;
}

// Update the default image path
const defaultImage = '/app/images/default-image.png';

export default function ProductCard({ product }: ProductCardProps) {
  // Always use the default image for all products
  const imageSrc = defaultImage;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={imageSrc} // Use the product image if available, otherwise fall back to the default image
          alt={product.name}
          fill
          className="object-cover"
        />
        {product.stock < 5 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-medium">
            Limited Stock
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-2xl font-bold text-orange-600">₹{product.price.toLocaleString('en-IN')}</span>
            <span className="text-sm text-gray-700 ml-1">/ unit</span>
          </div>
          <div className="flex items-center">
            <span className="text-yellow-500">★</span>
            <span className="text-sm text-gray-700 ml-1">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <Link
          href={`/products/${product.id}`}
          className="mt-4 block w-full text-center bg-orange-600 text-white py-2 rounded-md hover:bg-orange-700 transition-colors font-medium"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}