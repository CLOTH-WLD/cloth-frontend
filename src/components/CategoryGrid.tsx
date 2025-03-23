
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const categories = [
  {
    id: 'women',
    title: 'Women',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&h=800',
    color: 'bg-cloth-beige',
  },
  {
    id: 'men',
    title: 'Men',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&h=800',
    color: 'bg-cloth-lightbeige',
  },
  {
    id: 'kids',
    title: 'Kids',
    image: 'https://images.unsplash.com/photo-1596870230751-ebdfce98ec42?auto=format&fit=crop&w=800&h=800',
    color: 'bg-cloth-offwhite',
  },
  {
    id: 'accessories',
    title: 'Accessories',
    image: 'https://images.unsplash.com/photo-1608042314453-ae338d80c427?auto=format&fit=crop&w=800&h=800',
    color: 'bg-cloth-lightgray',
  }
];

const CategoryGrid: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/?category=${categoryId}`);
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`${category.color} rounded-md overflow-hidden cursor-pointer group`}
            onClick={() => handleCategoryClick(category.id)}
          >
            <div className="aspect-square relative overflow-hidden">
              <img 
                src={category.image} 
                alt={category.title}
                className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 flex items-end p-4">
                <h3 className="text-white text-xl font-medium">{category.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryGrid;
