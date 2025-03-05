'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export default function SearchForm() {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [modelNo, setModelNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let query = supabase
        .from('parts')
        .select('*');

      if (make) query = query.eq('vehicle_make', make);
      if (model) query = query.eq('vehicle_model', model);
      if (year) query = query.eq('vehicle_year', year);
      if (modelNo) query = query.eq('model_number', modelNo);

      const { data, error } = await query;

      if (error) throw error;
      setResults(data || []);
    } catch (error) {
      console.error('Error searching parts:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg border border-gray-700 shadow-xl">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-300">
              Vehicle Make
            </label>
            <input
              id="make"
              type="text"
              value={make}
              onChange={(e) => setMake(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-yellow-400"
              placeholder="e.g., Toyota"
            />
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-300">
              Vehicle Model
            </label>
            <input
              id="model"
              type="text"
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-yellow-400"
              placeholder="e.g., Camry"
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-sm font-medium text-gray-300">
              Year
            </label>
            <input
              id="year"
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-yellow-400"
              placeholder="e.g., 2020"
            />
          </div>
          <div>
            <label htmlFor="modelNo" className="block text-sm font-medium text-gray-300">
              Model Number
            </label>
            <input
              id="modelNo"
              type="text"
              value={modelNo}
              onChange={(e) => setModelNo(e.target.value)}
              className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:border-yellow-400"
              placeholder="e.g., ABC123"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 rounded-md text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Searching...' : 'Search Parts'}
          </button>
        </div>
      </form>

      {results.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Search Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {results.map((part) => (
              <div
                key={part.id}
                className="p-4 bg-gray-700 rounded-lg border border-gray-600"
              >
                <h3 className="text-lg font-medium text-white">{part.name}</h3>
                <p className="text-gray-300 mt-2">{part.description}</p>
                <p className="text-yellow-400 mt-2 font-medium">₹{part.price}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}