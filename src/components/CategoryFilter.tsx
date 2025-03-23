
import React from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

const categories = [
  { id: 'all', name: 'All' },
  { id: 'shirts', name: 'Shirts' },
  { id: 'pants', name: 'Pants' },
  { id: 'accessories', name: 'Accessories' }
];

const CategoryFilter: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';
  
  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', categoryId);
    }
    setSearchParams(searchParams);
  };
  
  return (
    <motion.div 
      className="mb-8"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategoryChange(category.id)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              currentCategory === category.id
                ? 'bg-cloth-charcoal text-white'
                : 'bg-cloth-lightbeige text-cloth-charcoal hover:bg-cloth-beige'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default CategoryFilter;
