"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface InteractiveImageCardProps {
  src: string;
  alt: string;
  linkHref?: string; // Optional link for the card
  initialAspectRatio?: 'aspect-video' | 'aspect-square';
  initialHeight?: string; // e.g., 'h-48', 'h-64'
  hoverHeight?: string; // e.g., 'h-64', 'h-80'
}

const InteractiveImageCard: React.FC<InteractiveImageCardProps> = ({
  src,
  alt,
  linkHref,
  initialAspectRatio = 'aspect-video',
  initialHeight = 'h-48',
  hoverHeight = 'h-64',
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const content = (
    <div
      className={`relative w-full rounded-2xl overflow-hidden shadow-ultra-soft border border-muted-foreground/30 transition-all duration-300 ease-in-out
        ${isHovered ? `${hoverHeight} aspect-square` : `${initialHeight} ${initialAspectRatio}`}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        style={{ objectFit: isHovered ? "contain" : "cover" }} // Change objectFit on hover
        sizes="(max-width: 768px) 100vw, 33vw"
        className={`transition-all duration-300 ease-in-out
          ${isHovered ? 'grayscale-0 contrast-100' : 'grayscale contrast-125'}
        `}
      />
    </div>
  );

  return linkHref ? <Link href={linkHref}>{content}</Link> : content;
};

export default InteractiveImageCard;