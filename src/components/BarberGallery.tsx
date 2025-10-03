"use client";

import React, { useState } from 'react';
import Image from 'next/image';

interface GalleryImage {
  _key: string;
  url: string;
  alt: string;
}

interface BarberGalleryProps {
  gallery: GalleryImage[];
}

const BarberGallery: React.FC<BarberGalleryProps> = ({ gallery }) => {
  const [hoveredImageKey, setHoveredImageKey] = useState<string | null>(null);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {gallery.map((image) => {
        const isHovered = hoveredImageKey === image._key;
        return (
          <div
            key={image._key}
            className={`relative w-full rounded-lg overflow-hidden border border-muted-foreground/30 shadow-ultra-soft transition-all duration-300 ease-in-out
              ${isHovered ? 'h-64 aspect-square' : 'h-48 aspect-video'}
            `}
            onMouseEnter={() => setHoveredImageKey(image._key)}
            onMouseLeave={() => setHoveredImageKey(null)}
          >
            <Image
              src={image.url}
              alt={image.alt}
              fill
              style={{ objectFit: isHovered ? "contain" : "cover" }} // Change objectFit on hover
              sizes="(max-width: 768px) 100vw, 50vw"
              className={`transition-all duration-300 ease-in-out
                ${isHovered ? 'grayscale-0 contrast-100' : 'grayscale contrast-125'}
              `}
            />
          </div>
        );
      })}
    </div>
  );
};

export default BarberGallery;