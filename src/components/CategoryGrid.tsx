
import React from 'react';
import { useNavigate } from 'react-router-dom';

const categories = [
  "Women's shoes",
  "Women's t-shirts and tops",
  "Women's backpacks",
  "Women's jeans",
  "Women's cardigans",
  "Women's boots",
  "Women's clothing",
  "Women's swimwear",
  "Women's sunglasses",
  "Women's sneakers",
  "Women's evening dresses",
  "Women's casual dresses",
  "Kids' hats",
  "Kids' clothing",
  "Denim dresses",
  "Handbags",
  "Cosmetic bags",
  "Men's shoes",
  "Men's t-shirts",
  "Men's backpacks",
  "Men's cargo pants",
  "Men's jeans",
  "Men's trousers",
  "Men's leather jackets",
  "Men's kidney bags",
  "Men's clothing",
  "Men's belts",
  "Men's jewelry"
];

const CategoryGrid: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    // Convert the category to a URL-friendly format
    const formattedCategory = category.toLowerCase().replace(/['']/g, '').replace(/\s+/g, '-');
    navigate(`/?category=${formattedCategory}`);
  };

  return (
    <div className="py-8 px-4 sm:px-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6">Favorite categories</h2>
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
    </div>
  );
};

export default CategoryGrid;
