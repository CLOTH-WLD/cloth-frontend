
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCollections } from '@/lib/backendRequests';
import type { Collection } from '@/types/request';

const CategoryGrid: React.FC = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCollections() {
      setLoading(true);
      setError(null);
      try {
        const data = await getCollections({ first: 28 });
        setCollections(data.slice(0, 28));
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    }
    fetchCollections();
  }, []);

  const handleClick = (handle: string) => {
    navigate(`/collection/${handle}`);
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Favorite categories</h2>
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="bg-cloth-lightgray rounded p-4 animate-pulse h-10" key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {collections.map(collection => (
            <button
              key={collection.id}
              onClick={() => handleClick(collection.handle)}
              className="text-left p-2 hover:bg-cloth-lightbeige transition-colors rounded-md font-helvetica text-sm"
            >
              {collection.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryGrid;
