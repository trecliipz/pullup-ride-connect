
import React, { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
}

const Notification: React.FC<NotificationProps> = ({ message }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  if (!message || !isVisible) return null;

  return (
    <div className="fixed top-5 right-5 bg-orange-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 animate-slide-in">
      {message}
    </div>
  );
};

export default Notification;
