
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface CategoryListProps {
  categories: string[];
}

const CategoryList: React.FC<CategoryListProps> = ({ categories }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    // Convert the category to a URL-friendly format
    const formattedCategory = category.toLowerCase().replace(/['']/g, '').replace(/\s+/g, '-');
    navigate(`/?category=${formattedCategory}`);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => handleCategoryClick(category)}
          className="text-left p-2 hover:bg-cloth-lightbeige transition-colors rounded-md font-helvetica text-sm"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryList;
