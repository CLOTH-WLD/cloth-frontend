
import React from 'react';
import { ExternalLink, HelpCircle, Users, MessageCircle } from 'lucide-react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from '@/components/ui/accordion';

const FAQAccordion = () => {
  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-2xl font-semibold mb-6 text-center">Customer Support</h2>
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="help">
          <AccordionTrigger className="flex items-center">
            <div className="flex items-center gap-2">
              <HelpCircle size={18} />
              <span>Help</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 pl-7">
              <li>
                <a href="/faq/shipping" className="text-cloth-charcoal/80 hover:text-cloth-charcoal flex items-center gap-1">
                  Shipping Information <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="/faq/returns" className="text-cloth-charcoal/80 hover:text-cloth-charcoal flex items-center gap-1">
                  Returns & Exchanges <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="/faq/sizing" className="text-cloth-charcoal/80 hover:text-cloth-charcoal flex items-center gap-1">
                  Sizing Guide <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a href="/faq/orders" className="text-cloth-charcoal/80 hover:text-cloth-charcoal flex items-center gap-1">
                  Order Status <ExternalLink size={14} />
                </a>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="contact">
          <AccordionTrigger className="flex items-center">
            <div className="flex items-center gap-2">
              <MessageCircle size={18} />
              <span>Contact</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-2 pl-7">
              <li>
                <a 
                  href="https://t.me/clothsupport" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cloth-charcoal/80 hover:text-cloth-charcoal flex items-center gap-1"
                >
                  Telegram <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a 
                  href="https://twitter.com/clothapparel" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cloth-charcoal/80 hover:text-cloth-charcoal flex items-center gap-1"
                >
                  Twitter <ExternalLink size={14} />
                </a>
              </li>
              <li>
                <a 
                  href="https://discord.gg/clothcommunity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cloth-charcoal/80 hover:text-cloth-charcoal flex items-center gap-1"
                >
                  Discord <ExternalLink size={14} />
                </a>
              </li>
            </ul>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="about">
          <AccordionTrigger className="flex items-center">
            <div className="flex items-center gap-2">
              <Users size={18} />
              <span>About Us</span>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <div className="pl-7 pr-4">
              <p className="text-cloth-charcoal/80">
                Cloth is a minimalist clothing brand founded in 2023 with a mission to provide high-quality, 
                sustainable essentials for the modern wardrobe. We believe in timeless design, ethical 
                manufacturing, and creating pieces that last beyond seasonal trends.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
