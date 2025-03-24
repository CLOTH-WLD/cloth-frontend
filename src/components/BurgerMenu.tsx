
import React, { useState } from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Category data structure
type CategoryType = 'women' | 'men' | 'kids';

interface Category {
  name: string;
  image: string;
  type: CategoryType;
}

const categories: Category[] = [
  { name: "Women's shoes", image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=400&auto=format", type: 'women' },
  { name: "Women's t-shirts and tops", image: "https://images.unsplash.com/photo-1551048632-8df86a9f1695?q=80&w=400&auto=format", type: 'women' },
  { name: "Women's jeans", image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=400&auto=format", type: 'women' },
  { name: "Men's shoes", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format", type: 'men' },
  { name: "Men's t-shirts", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=400&auto=format", type: 'men' },
  { name: "Men's jeans", image: "https://images.unsplash.com/photo-1511196044526-5cb3bcb7071b?q=80&w=400&auto=format", type: 'men' },
  { name: "Kids' clothing", image: "https://images.unsplash.com/photo-1543269664-56d93c1b41a6?q=80&w=400&auto=format", type: 'kids' },
  { name: "Kids' shoes", image: "https://images.unsplash.com/photo-1551854838-212c50b4c184?q=80&w=400&auto=format", type: 'kids' },
];

const BurgerMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<CategoryType | 'all'>('all');
  const navigate = useNavigate();

  const handleCategoryClick = (category: Category) => {
    // Convert the category to a URL-friendly format
    const formattedCategory = category.name.toLowerCase().replace(/['']/g, '').replace(/\s+/g, '-');
    navigate(`/?category=${formattedCategory}`);
    setOpen(false);
  };

  const filteredCategories = selectedType === 'all' 
    ? categories 
    : categories.filter(category => category.type === selectedType);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button className="p-3 flex flex-col space-y-1.5" aria-label="Open menu">
          <div className="w-5 h-0.5 bg-black"></div>
          <div className="w-5 h-0.5 bg-black"></div>
          <div className="w-5 h-0.5 bg-black"></div>
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-full p-0 sm:max-w-full border-none">
        <div className="h-full flex flex-col bg-white">
          {/* Header with only one close button */}
          <div className="flex justify-between items-center p-4 border-b">
            <span className="text-xl font-semibold">Cloth</span>
            <button onClick={() => setOpen(false)}>
              <X className="h-6 w-6" />
            </button>
          </div>
          
          {/* Filter tabs */}
          <div className="flex border-b">
            {(['all', 'women', 'men', 'kids'] as const).map((type) => (
              <button
                key={type}
                className={`flex-1 py-3 text-center ${
                  selectedType === type 
                    ? 'border-b-2 border-cloth-charcoal font-medium' 
                    : 'text-cloth-mediumgray'
                }`}
                onClick={() => setSelectedType(type)}
              >
                {type === 'all' ? 'All' : type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
          
          {/* Categories */}
          <div className="flex-grow overflow-y-auto p-4">
            <div className="grid grid-cols-2 gap-4">
              <AnimatePresence>
                {filteredCategories.map((category, index) => (
                  <motion.div
                    key={category.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="cursor-pointer"
                    onClick={() => handleCategoryClick(category)}
                  >
                    <div className="bg-cloth-lightbeige rounded-lg overflow-hidden">
                      <div className="aspect-[4/3] relative">
                        <img 
                          src={category.image} 
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-2">
                        <p className="text-sm font-medium">{category.name}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BurgerMenu;
