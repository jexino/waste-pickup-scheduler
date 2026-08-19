import { useState } from 'react';
import { searchAddress } from '../api/api';
import { FaSearch } from 'react-icons/fa';

export default function AddressSearch({ onZoneFound }) {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!query.trim()) return;
    setLoading(true);
    try {
      const result = await searchAddress(query.trim());
      onZoneFound(result.zoneId);
    } catch (err) {
      console.error(err);
      setError('Address not found. Try "123 Lafia North", "456 Shabu-Assakio", "789 City Centre", or "10 Kwandare-danka"');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter your street address..."
            className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="flex-shrink-0 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 
                      transition flex items-center gap-1"
          >
            <FaSearch size={14} />
              <span className="hidden sm:inline">{loading ? '...' : 'Search'}</span>
          </button>
        </div>
      </form>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
      <p className="text-xs text-gray-400 mt-2">
        Try: 123 Lafia north, 456 Shabu, 789 City centre, or 10 kwandare
      </p>
    </div>
  );
}