
import React from 'react';
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

const carouselItems = [
  {
    id: 'women',
    title: 'Where do you want to start?',
    buttonText: 'Women',
    subtitle: 'What will I wear?',
    description: 'With the new season comes a new collection full of stylish pieces for your wardrobe.',
    bgColor: 'bg-[#4285F4]', // Blue
    image: '/lovable-uploads/6603031a-dbcb-422d-afff-9411a7338d54.png'
  },
  {
    id: 'men',
    title: 'Where do you want to start?',
    buttonText: 'Men',
    subtitle: 'Style that defines you',
    description: 'Discover the latest trends for men with our new seasonal collection.',
    bgColor: 'bg-[#34A853]', // Green
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&w=1600&h=900'
  },
  {
    id: 'kids',
    title: 'Where do you want to start?',
    buttonText: 'Kids',
    subtitle: 'Fun and colorful choices',
    description: 'Playful designs and comfortable clothes for the little ones.',
    bgColor: 'bg-[#FBBC05]', // Yellow
    image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a?auto=format&fit=crop&w=1600&h=900'
  }
];

const CategoryCarousel: React.FC = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category: string) => {
    navigate(`/?category=${category.toLowerCase()}`);
  };

  return (
    <div className="w-full mb-12">
      <Carousel className="w-full">
        <CarouselContent>
          {carouselItems.map((item) => (
            <CarouselItem key={item.id}>
              <div className={`${item.bgColor} relative w-full h-[600px] text-white`}>
                <div className="absolute inset-0 z-10 p-8 flex flex-col">
                  <h1 className="text-3xl font-bold mb-6">{item.title}</h1>
                  
                  <div className="flex space-x-4 mb-6">
                    {carouselItems.map((btn) => (
                      <Button
                        key={btn.id}
                        variant="outline"
                        className={`bg-black hover:bg-black/80 text-white border-none ${btn.id === item.id ? 'opacity-100' : 'opacity-70'}`}
                        onClick={() => handleCategoryClick(btn.id)}
                      >
                        {btn.buttonText}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="flex-1 relative">
                    <img 
                      src={item.image} 
                      alt={item.buttonText} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <h2 className="text-2xl font-bold mb-2">{item.subtitle}</h2>
                    <p className="text-lg">{item.description}</p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <CarouselPrevious className="left-4 z-20 bg-black/50 text-white hover:bg-black/70 border-none" />
        <CarouselNext className="right-4 z-20 bg-black/50 text-white hover:bg-black/70 border-none" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
