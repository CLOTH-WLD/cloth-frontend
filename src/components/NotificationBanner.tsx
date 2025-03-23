
import React from 'react';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { Button } from './ui/button';

const NotificationBanner: React.FC = () => {
  const handleEnableNotifications = () => {
    // This would typically integrate with a notification API
    // For demo purposes, we'll just show an alert
    if ("Notification" in window) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          // Success handling would go here
          alert("Notifications enabled! Your 10% discount code is: WELCOME10");
        }
      });
    } else {
      alert("Your browser doesn't support notifications.");
    }
  };

  return (
    <div className="bg-cloth-lightbeige py-12 px-4 sm:px-6 my-8">
      <motion.div 
        className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center md:text-left">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">Get 10% off your first order</h2>
          <p className="text-cloth-charcoal/80 text-base md:text-lg">
            Enable notifications to receive your discount code and stay updated on new arrivals.
          </p>
        </div>
        
        <Button 
          onClick={handleEnableNotifications}
          className="bg-black hover:bg-black/90 text-white px-6 py-6 h-auto gap-3 text-base"
        >
          <Bell className="w-5 h-5" />
          Enable Notifications
        </Button>
      </motion.div>
    </div>
  );
};

export default NotificationBanner;
