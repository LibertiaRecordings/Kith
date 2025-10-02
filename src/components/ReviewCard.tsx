"use client";

import React from 'react';
import { Star } from 'lucide-react';

interface ReviewCardProps {
  review: string;
  author: string;
  rating: number; // Assuming a 5-star rating for top reviews
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review, author, rating }) => {
  return (
    <div className="bg-card rounded-2xl p-6 shadow-ultra-soft flex flex-col h-full border border-muted-foreground/20 can-animate group">
      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-5 w-5 ${i < rating ? 'text-primary' : 'text-muted-foreground/50'} fill-current`}
          />
        ))}
      </div>
      <p className="text-muted-foreground leading-relaxed text-base flex-grow mb-4 font-body">
        "{review}"
      </p>
      <p className="text-foreground font-medium text-base mt-auto font-body">
        - {author}
      </p>
    </div>
  );
};

export default ReviewCard;