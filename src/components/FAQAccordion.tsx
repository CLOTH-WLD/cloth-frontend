
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
    <div className="max-w-7xl mx-auto">      
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
                  href="https://discord.gg/clothcommunity" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-cloth-charcoal/80 hover:text-cloth-charcoal flex items-center gap-1"
                >
                  Discord <ExternalLink size={14} />
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
              Cloth is a curated online clothing store founded in 2025, 
              built on the idea of making quality essentials accessible through a clean, 
              modern shopping experience. We partner with global suppliers to offer 
              timeless, everyday pieces without traditional retail markups. 
              While we don&apos;t manufacture our own items, we focus on selecting 
              products that align with our values: simplicity, comfort, and 
              style that lasts.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default FAQAccordion;
