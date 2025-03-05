import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

interface Part {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  stock: number;
}

export default function PartsListing() {
  const [parts, setParts] = useState<Part[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const categories = [
    'all',
    'engine',
    'brakes',
    'suspension',
    'body',
    'electrical',
    'transmission'
  ];

  useEffect(() => {
    fetchParts();
  }, [category, sortBy, page]);

  const fetchParts = async () => {
    try {
      let query = supabase
        .from('parts')
        .select('*')
        .range((page - 1) * itemsPerPage, page * itemsPerPage - 1);

      if (category !== 'all') {
        query = query.eq('category', category);
      }

      switch (sortBy) {
        case 'price-asc':
          query = query.order('price', { ascending: true });
          break;
        case 'price-desc':
          query = query.order('price', { ascending: false });
          break;
        default:
          query = query.order('name');
      }

      const { data, error } = await query;
      if (error) throw error;
      setParts(data || []);
    } catch (error) {
      console.error('Error fetching parts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
      <h1 className="text-4xl font-bold text-white mb-8">Car Parts Catalog</h1>

      {/* Filters and Sorting */}
      <div className="flex flex-wrap gap-4 mb-8">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-yellow-400 focus:outline-none"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-yellow-400 focus:outline-none"
        >
          <option value="name">Name (A-Z)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
        </select>
      </div>

      {/* Parts Grid */}
      {loading ? (
        <div className="text-white text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {parts.map((part) => (
            <div
              key={part.id}
              className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:border-yellow-400 transition-colors"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-700">
                {part.image_url ? (
                  <img
                    src={part.image_url}
                    alt={part.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-500">
                    No Image
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-white mb-2">{part.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{part.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-yellow-400 font-bold">₹{part.price}</span>
                  <span className="text-gray-400 text-sm">
                    {part.stock > 0 ? `${part.stock} in stock` : 'Out of stock'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="mt-8 flex justify-center gap-2">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 hover:bg-gray-600"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-white">{page}</span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={parts.length < itemsPerPage}
          className="px-4 py-2 bg-gray-700 text-white rounded-md disabled:opacity-50 hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
}