"use client";

import React, { useState, useEffect } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface HeroVideoBackgroundProps {
  videoSrc: string;
  fallbackImageSrc?: string;
  children: React.ReactNode;
}

const HeroVideoBackground: React.FC<HeroVideoBackgroundProps> = ({ videoSrc, fallbackImageSrc, children }) => {
  const [hasMounted, setHasMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // On the server, and during the initial client render before useEffect runs,
  // we always render the video version to ensure consistency.
  // The `isMobile` check will only apply after the component has mounted on the client.
  if (!hasMounted) {
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
        <div className="absolute inset-0 bg-ink/70 z-0"></div> {/* Darker overlay for text readability */}
        <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
          {children}
        </div>
      </div>
    );
  }

  // After the component has mounted on the client, we can safely use the `isMobile` state
  // to conditionally render the mobile-specific fallback image.
  if (isMobile) {
    return (
      <div
        className="relative w-full min-h-screen flex items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: fallbackImageSrc ? `url(${fallbackImageSrc})` : 'none' }}
      >
        <div className="absolute inset-0 bg-ink/70 z-0"></div> {/* Darker overlay for readability */}
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
      <div className="absolute inset-0 bg-ink/70 z-0"></div> {/* Darker overlay for text readability */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {children}
      </div>
    </div>
  );
};

export default HeroVideoBackground;