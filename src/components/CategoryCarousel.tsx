
import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Button } from './ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

const carouselItems = [
  {
    id: 'women',
    title: 'Where do you want to start?',
    subtitle: 'What will I wear?',
    description: 'With the new season comes a new collection full of stylish pieces for your wardrobe.',
    bgColor: 'bg-[#4285F4]', // Blue
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?auto=format&fit=crop&w=1600&h=900'
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

  const handleCategoryClick = (category: string) => {
    navigate(`/?category=${category.toLowerCase()}`);
  };

  const ctaButtons = [
    { id: 'women', buttonText: 'Women' },
    { id: 'men', buttonText: 'Men' },
    { id: 'kids', buttonText: 'Kids' }
  ];

  return (
    <div className="w-full mb-8">
      <Carousel 
        className="w-full" 
        opts={{
          loop: true,
          duration: 20,
        }}
      >
        <CarouselContent>
          {carouselItems.map((item, index) => (
            <CarouselItem key={item.id} className="transition-opacity duration-500">
              <div className={`${item.bgColor} relative w-full h-[80vh] md:h-[450px] text-white`}>
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
                  
                  <div className="flex-1 relative mt-6 flex justify-end">
                    <img 
                      src={item.image} 
                      alt={`${item.id} category`} 
                      className="h-full max-h-[60vh] md:max-h-[350px] object-cover"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <h2 className="text-xl md:text-2xl font-bold font-helvetica mb-2">{item.subtitle}</h2>
                    <p className="text-base md:text-xl font-tiempos">{item.description}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        {carouselItems.length > 1 && (
          <>
            <CarouselPrevious className="left-4 z-20 bg-white text-black hover:bg-white/90 border-none h-10 w-10 rounded-none" />
            <CarouselNext className="right-4 z-20 bg-white text-black hover:bg-white/90 border-none h-10 w-10 rounded-none" />
          </>
        )}
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
