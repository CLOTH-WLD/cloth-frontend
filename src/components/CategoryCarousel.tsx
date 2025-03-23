
import React, { useState, useCallback, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';
import useEmblaCarousel from 'embla-carousel-react';

const carouselItems = [
  {
    id: 'women',
    title: 'Where do you want to start?',
    subtitle: 'What will I wear?',
    description: 'With the new season comes a new collection full of stylish pieces for your wardrobe.',
    bgColor: 'bg-[#4285F4]', // Blue
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1600&h=900'
  },
  {
    id: 'men',
    title: 'Where do you want to start?',
    subtitle: 'Style that defines you',
    description: 'Discover the latest trends for men with our new seasonal collection.',
    bgColor: 'bg-[#34A853]', // Green
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&h=900'
  },
  {
    id: 'kids',
    title: 'Where do you want to start?',
    subtitle: 'Fun and colorful choices',
    description: 'Playful designs and comfortable clothes for the little ones.',
    bgColor: 'bg-[#FBBC05]', // Yellow
    image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=1600&h=900'
  }
];

const CategoryCarousel: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: false,
    duration: 20,
    dragFree: false, // Use 'dragFree' instead of 'draggable'
  });
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleCategoryClick = (category: string) => {
    navigate(`/?category=${category.toLowerCase()}`);
  };

  const ctaButtons = [
    { id: 'women', buttonText: 'Women' },
    { id: 'men', buttonText: 'Men' },
    { id: 'kids', buttonText: 'Kids' }
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  const handlePrev = () => {
    if (isAnimating || !canScrollPrev || !emblaApi) return;
    setIsAnimating(true);
    
    // Get the current slide and apply fade-out animation
    const currentSlide = document.querySelector(`.carousel-item-${currentIndex}`);
    if (currentSlide) {
      currentSlide.classList.add('animate-fade-out');
      
      setTimeout(() => {
        emblaApi.scrollPrev();
        currentSlide.classList.remove('animate-fade-out');
        
        // Get the new slide and apply fade-in animation
        const newIndex = currentIndex - 1;
        const newSlide = document.querySelector(`.carousel-item-${newIndex}`);
        if (newSlide) {
          newSlide.classList.add('animate-fade-in');
          setTimeout(() => {
            newSlide.classList.remove('animate-fade-in');
            setIsAnimating(false);
          }, 300);
        } else {
          setIsAnimating(false);
        }
      }, 300);
    } else {
      setIsAnimating(false);
    }
  };

  const handleNext = () => {
    if (isAnimating || !canScrollNext || !emblaApi) return;
    setIsAnimating(true);
    
    // Get the current slide and apply fade-out animation
    const currentSlide = document.querySelector(`.carousel-item-${currentIndex}`);
    if (currentSlide) {
      currentSlide.classList.add('animate-fade-out');
      
      setTimeout(() => {
        emblaApi.scrollNext();
        currentSlide.classList.remove('animate-fade-out');
        
        // Get the new slide and apply fade-in animation
        const newIndex = currentIndex + 1;
        const newSlide = document.querySelector(`.carousel-item-${newIndex}`);
        if (newSlide) {
          newSlide.classList.add('animate-fade-in');
          setTimeout(() => {
            newSlide.classList.remove('animate-fade-in');
            setIsAnimating(false);
          }, 300);
        } else {
          setIsAnimating(false);
        }
      }, 300);
    } else {
      setIsAnimating(false);
    }
  };

  return (
    <div className="w-full mb-8">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {carouselItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`carousel-item-${index} min-w-0 shrink-0 grow-0 basis-full transition-opacity duration-300`}
            >
              <div className={`${item.bgColor} relative w-full h-[60vh] md:h-[450px] text-white`}>
                <div className="absolute inset-0 z-10 p-4 md:p-8 flex flex-col">
                  <h1 className="text-lg font-helvetica mb-4 md:mb-6">{item.title}</h1>
                  
                  <div className="flex space-x-2 md:space-x-4">
                    {ctaButtons.map((btn) => (
                      <Button
                        key={btn.id}
                        variant="outline"
                        className="bg-black hover:bg-black/80 text-white border-none"
                        onClick={() => handleCategoryClick(btn.id)}
                      >
                        {btn.buttonText}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="flex-1 relative mt-6 flex justify-end pr-0">
                    <img 
                      src={item.image} 
                      alt={`${item.id} category`} 
                      className="h-full max-h-[50vh] md:max-h-[350px] object-cover"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <h2 className="text-xl md:text-2xl font-bold font-helvetica mb-2">{item.subtitle}</h2>
                    <p className="text-base md:text-xl font-tiempos">{item.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {carouselItems.length > 1 && (
        <>
          {canScrollPrev && (
            <button 
              onClick={handlePrev} 
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white text-black hover:bg-white/90 h-10 w-10 flex items-center justify-center"
              disabled={isAnimating}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
          )}
          
          {canScrollNext && (
            <button 
              onClick={handleNext} 
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white text-black hover:bg-white/90 h-10 w-10 flex items-center justify-center"
              disabled={isAnimating}
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
