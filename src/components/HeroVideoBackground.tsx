"use client";

import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroVideoBackgroundProps {
  videoSrc: string;
  fallbackImageSrc?: string;
  children: React.ReactNode;
}

const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({ videoSrc, fallbackImageSrc, children }) => {
  const isMobile = useIsMobile();

  // On mobile, we'll use a static image or just the background color for performance/data reasons.
  // The `useIsMobile` hook helps determine this client-side.
  if (isMobile) {
    return (
      <div
        className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: fallbackImageSrc ? `url(${fallbackImageSrc})` : 'none' }}
      >
        <div className="absolute inset-0 bg-background/80 z-0"></div> {/* Dark overlay for readability */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
        poster={fallbackImageSrc} // Use fallback image as poster for video loading
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-background/60 z-0"></div> {/* Subtle overlay for text readability */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default HeroVideoBackground;