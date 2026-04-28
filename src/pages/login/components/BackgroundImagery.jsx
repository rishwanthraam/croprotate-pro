import React from 'react';
import Image from '../../../components/AppImage';

const BackgroundImagery = () => {
  const backgroundImages = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=1200&h=800&fit=crop',
      alt: 'Healthy crop field with green plants in rows',
      position: 'top-left'
    },
    {
      id: 2,
      src: 'https://images.pexels.com/photos/2132227/pexels-photo-2132227.jpeg?w=1200&h=800&fit=crop',
      alt: 'Farmer examining soil in agricultural field',
      position: 'top-right'
    },
    {
      id: 3,
      src: 'https://images.pixabay.com/photo-2016/08/10/21/33/agriculture-1584544_1280.jpg?w=1200&h=800&fit=crop',
      alt: 'Agricultural machinery working in field during harvest',
      position: 'bottom-left'
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop',
      alt: 'Sustainable farming with crop rotation patterns',
      position: 'bottom-right'
    }
  ];

  const getPositionClasses = (position) => {
    switch (position) {
      case 'top-left':
        return 'top-0 left-0';
      case 'top-right':
        return 'top-0 right-0';
      case 'bottom-left':
        return 'bottom-0 left-0';
      case 'bottom-right':
        return 'bottom-0 right-0';
      default:
        return 'top-0 left-0';
    }
  };

  return (
    <div className="hidden lg:block fixed inset-0 z-0">
      {/* Main Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      {/* Background Images Grid */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-4 p-8">
        {backgroundImages?.map((image) => (
          <div
            key={image?.id}
            className="relative overflow-hidden rounded-2xl opacity-20 hover:opacity-30 transition-opacity duration-700"
          >
            <Image
              src={image?.src}
              alt={image?.alt}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
          </div>
        ))}
      </div>
      {/* Overlay Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="crop-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <circle cx="20" cy="20" r="2" fill="currentColor" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#crop-pattern)" />
        </svg>
      </div>
      {/* Floating Elements */}
      <div className="absolute top-20 left-20 w-16 h-16 bg-success/10 rounded-full animate-pulse" />
      <div className="absolute top-40 right-32 w-12 h-12 bg-warning/10 rounded-full animate-pulse delay-1000" />
      <div className="absolute bottom-32 left-40 w-20 h-20 bg-primary/10 rounded-full animate-pulse delay-2000" />
      <div className="absolute bottom-20 right-20 w-14 h-14 bg-secondary/10 rounded-full animate-pulse delay-500" />
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-background/80" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-transparent to-background/60" />
    </div>
  );
};

export default BackgroundImagery;