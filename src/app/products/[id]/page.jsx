'use client';

import { useParams } from 'next/navigation';
// import ProductDetailPage from '@/app/straight-suit/components/ProductDetailPage';
import { useState, useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock product data - replace with API call
const getProductData = (id) => {
  const products = {
    1: {
      id: 1,
      title: 'Tunics Set',
      price: '₹1200 to ₹1500',
      styleCode: 'ART2024-LIMEGREEN',
      description: 'Crafted for modern versatility, this set features a relaxed top and wide-leg trousers. Perfect for both casual and formal occasions.',
      note: 'Color may vary slightly due to screen lighting and resolution.',
      images: [
        'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=500',
        'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=500',
        'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=500',
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500',
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=500',
      ],
      sizes: ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL', '4XL', '5XL'],
      colors: [
        { name: 'Lime Green', code: 'bg-green-500' },
        { name: 'Navy Blue', code: 'bg-blue-900' },
        { name: 'Coral Pink', code: 'bg-pink-400' },
        { name: 'Classic Black', code: 'bg-gray-900' },
        { name: 'Ivory White', code: 'bg-gray-100' },
      ],
      details: {
        material: '100% Cotton',
        care: 'Machine Wash Cold',
        delivery: '5-7 Business Days',
        return: '15 Days Exchange',
        fabric: 'Premium Cotton Twill',
        pattern: 'Solid',
        occasion: 'Casual, Formal',
        length: 'Ankle Length',
        packaging: 'Premium Gift Box'
      }
    },
    2: {
      id: 2,
      title: 'Designer Suit Set',
      price: '₹1999 to ₹2499',
      styleCode: 'ART2024-NAVYBLUE',
      description: 'Elegant designer suit set with intricate embroidery and premium fabric for special occasions.',
      note: 'Handcrafted with attention to detail.',
      images: [
        'https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=500',
        'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?q=80&w=500',
        'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=500',
      ],
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      colors: [
        { name: 'Navy Blue', code: 'bg-blue-900' },
        { name: 'Burgundy', code: 'bg-red-800' },
        { name: 'Emerald Green', code: 'bg-green-600' },
      ],
      details: {
        material: 'Silk Blend',
        care: 'Dry Clean Only',
        delivery: '7-10 Business Days',
        return: '10 Days Exchange',
        fabric: 'Silk Georgette',
        pattern: 'Embroidered',
        occasion: 'Wedding, Party',
        length: 'Floor Length',
        packaging: 'Premium Packaging'
      }
    }
  };
  
  return products[id] || products[1]; // Default to first product if not found
};

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError('Failed to load product');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) {
      fetchProduct();
    }
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-300 border-t-black"></div>
        <p className="mt-4 text-gray-600">Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been moved.</p>
          <div className="flex gap-4 justify-center">
            <button 
              onClick={() => router.push('/')}
              className="bg-[#1a1a3a] text-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-[#2a2a4a] transition"
            >
              Back to Home
            </button>
            <button 
              onClick={() => router.push('/products')}
              className="border border-gray-300 px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-50 transition"
            >
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-4">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back to Products
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-100 p-4 rounded-md">
          {product.images && product.images.length ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={product.images[0]} alt={product.title} className="w-full h-96 object-cover rounded-md" />
          ) : (
            <div className="h-96 flex items-center justify-center text-gray-400">No Image</div>
          )}
        </div>

        <div>
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <div className="text-xl text-gray-800 font-semibold mb-4">₹{product.price}</div>
          <p className="text-gray-700 mb-4">{product.description}</p>

          {product.sizes && (
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-600">Sizes</div>
              <div className="flex gap-2 mt-2 flex-wrap">
                {product.sizes.map((s) => (
                  <div key={s} className="px-3 py-1 border rounded text-sm">{s}</div>
                ))}
              </div>
            </div>
          )}

          {product.colors && (
            <div className="mb-4">
              <div className="text-sm font-medium text-gray-600">Colors</div>
              <div className="flex gap-2 mt-2">
                {product.colors.map((c) => (
                  <div key={c.name} className={`w-6 h-6 rounded-full ${c.code}`} title={c.name}></div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}