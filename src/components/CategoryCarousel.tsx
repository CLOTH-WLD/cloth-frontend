
import React, { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import { AnimatePresence, motion } from 'framer-motion';

const carouselItems = [
  {
    id: 'women',
    title: 'Where do you want to start?',
    subtitle: 'What will I wear?',
    description: 'With the new season comes a new collection full of stylish pieces for your wardrobe.',
    bgColor: 'bg-[#4285F4]', // Blue
    color: '#4285F4', // Color value for animation
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&h=900'
  },
  {
    id: 'men',
    title: 'Where do you want to start?',
    subtitle: 'Style that defines you',
    description: 'Discover the latest trends for men with our new seasonal collection.',
    bgColor: 'bg-[#34A853]', // Green
    color: '#34A853', // Color value for animation
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&h=900'
  },
  {
    id: 'kids',
    title: 'Where do you want to start?',
    subtitle: 'Fun and colorful choices',
    description: 'Playful designs and comfortable clothes for the little ones.',
    bgColor: 'bg-[#FBBC05]', // Yellow
    color: '#FBBC05', // Color value for animation
    image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=1600&h=900'
  }
];

const CategoryCarousel: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(carouselItems[0].color);

  const handleCategoryClick = (category: string) => {
    // Save user preference
    localStorage.setItem('userPreference', category.toLowerCase());
    
    // Navigate to the appropriate landing page
    switch(category.toLowerCase()) {
      case 'women':
        navigate('/women');
        break;
      case 'men':
        navigate('/men');
        break;
      case 'kids':
        navigate('/kids');
        break;
      default:
        navigate(`/?category=${category.toLowerCase()}`);
    }
  };

  const ctaButtons = [
    { id: 'women', buttonText: 'Women' },
    { id: 'men', buttonText: 'Men' },
    { id: 'kids', buttonText: 'Kids' }
  ];

  const goToPrevSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newIndex = currentIndex === 0 ? carouselItems.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
    
    // Start background color transition
    setBackgroundColor(carouselItems[newIndex].color);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Reduced from 500ms to 300ms for quicker animation
  }, [isAnimating, currentIndex]);

  const goToNextSlide = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const newIndex = currentIndex === carouselItems.length - 1 ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
    
    // Start background color transition
    setBackgroundColor(carouselItems[newIndex].color);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 300); // Reduced from 500ms to 300ms for quicker animation
  }, [isAnimating, currentIndex]);

  // Check if current slide is first or last
  const isFirstSlide = currentIndex === 0;
  const isLastSlide = currentIndex === carouselItems.length - 1;
  
  // Check for stored preference and redirect on initial load
  useEffect(() => {
    const storedPreference = localStorage.getItem('userPreference');
    if (storedPreference) {
      // Wait a short time to avoid immediate redirect
      const timer = setTimeout(() => {
        switch(storedPreference) {
          case 'women':
            navigate('/women');
            break;
          case 'men':
            navigate('/men');
            break;
          case 'kids':
            navigate('/kids');
            break;
          // Default case does nothing (stays on current page)
        }
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [navigate]);

  return (
    <div className="w-full mb-8 category-carousel relative">
      <div 
        className="overflow-hidden relative h-[80vh] md:h-[450px] transition-colors duration-700"
        style={{ backgroundColor }}
      >
        <div className="absolute inset-0 z-10 pt-4 pl-4 pb-4 pr-0 flex flex-col text-white">
          <h1 className="text-lg font-helvetica font-bold text-black mb-4 md:mb-6">{carouselItems[currentIndex].title}</h1>
          
          <div className="flex space-x-2 md:space-x-4">
            {ctaButtons.map((btn) => (
              <Button
                key={btn.id}
                variant="outline"
                className="bg-black hover:bg-black/80 text-white border-none font-helvetica font-bold w-24"
                onClick={() => handleCategoryClick(btn.id)}
              >
                {btn.buttonText}
              </Button>
            ))}
          </div>
          
          <div className="flex-1 relative mt-6 flex justify-end pr-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div 
                key={`img-${currentIndex}`}
                className="h-full flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={carouselItems[currentIndex].image} 
                  alt={`${carouselItems[currentIndex].id} category`} 
                  className="h-full max-h-[435px] object-cover w-auto" 
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="pt-4 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={`content-${currentIndex}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-xl md:text-2xl font-bold font-helvetica mb-2">{carouselItems[currentIndex].subtitle}</h2>
                <p className="text-base md:text-xl font-tiempos">{carouselItems[currentIndex].description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
      
      {carouselItems.length > 1 && (
        <>
          {!isFirstSlide && (
            <button 
              onClick={goToPrevSlide} 
              disabled={isAnimating}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white text-black hover:bg-white/90 h-10 w-10 flex items-center justify-center disabled:opacity-50"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          
          {!isLastSlide && (
            <button 
              onClick={goToNextSlide}
              disabled={isAnimating}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white text-black hover:bg-white/90 h-10 w-10 flex items-center justify-center disabled:opacity-50"
            >
              <ArrowRight className="w-6 h-6" />
            </button>
          )}
        </>
      )}
    </div>
  );
};

export default CategoryCarousel;
