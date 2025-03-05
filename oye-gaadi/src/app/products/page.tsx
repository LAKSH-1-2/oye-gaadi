'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
}

export default function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*');

      if (error) throw error;
      setProducts(data || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="text-white">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-white">Our Products</h1>
        <a
          href="/products/add"
          className="px-6 py-2 rounded-md bg-yellow-400 text-gray-900 hover:bg-yellow-500 transition-colors"
        >
          Add Product
        </a>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden hover:border-yellow-400 transition-colors"
          >
            {product.image_url && (
              <div className="aspect-w-16 aspect-h-9 relative h-48">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
            )}
            <div className="p-4">
              <h2 className="text-xl font-semibold text-white mb-2">{product.name}</h2>
              <p className="text-gray-300 text-sm mb-4">{product.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-yellow-400 font-bold">₹{product.price}</span>
                <button
                  className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
                  onClick={() => {/* Add to cart functionality */}}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}