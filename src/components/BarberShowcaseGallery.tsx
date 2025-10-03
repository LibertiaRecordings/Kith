"use client";

import React from 'react';
import InteractiveImageCard from './InteractiveImageCard';

interface GalleryImage {
  src: string;
  alt: string;
  linkHref?: string;
}

interface BarberShowcaseGalleryProps {
  images: GalleryImage[];
}

const BarberShowcaseGallery: React.FC<BarberShowcaseGalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((image, index) => (
        <InteractiveImageCard
          key={index}
          src={image.src}
          alt={image.alt}
          linkHref={image.linkHref}
          initialAspectRatio="aspect-square" // Maintain square aspect ratio for a uniform grid
          initialHeight="h-64" // Consistent height for grid items
        />
      ))}
    </div>
  );
};

export default BarberShowcaseGallery;