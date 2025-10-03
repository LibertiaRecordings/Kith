"use client";

import Link from "next/link";
import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const FloatingBookButton = () => {
  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null); // Ref for the button container

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Get footer height dynamically. Fallback to a reasonable estimate if not found.
      const footerElement = document.querySelector('footer');
      const footerHeight = footerElement ? footerElement.offsetHeight : 150; 

      // Get button height dynamically. Fallback to a reasonable estimate if not found.
      const buttonHeight = buttonRef.current ? buttonRef.current.offsetHeight : 60; 

      // Define thresholds for visibility
      // Hide if within the top 75% of the viewport (covering the hero section)
      const hideAtTopThreshold = viewportHeight * 0.75; 
      // Hide if the bottom of the viewport is within 24px (bottom-6) + footerHeight of the document's end
      const hideAtBottomThreshold = documentHeight - footerHeight - 24; 

      const shouldBeVisible = scrollY > hideAtTopThreshold && (scrollY + viewportHeight) < hideAtBottomThreshold;
      
      setIsVisible(shouldBeVisible);
    };

    // Initial check on mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll); // Re-evaluate on resize
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <div
      ref={buttonRef}
      className={`fixed bottom-6 right-6 z-50 transition-opacity duration-300 ease-in-out ${
        isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <Link href="/book" passHref>
        <Button
          className="flex items-center gap-2 px-6 py-3 rounded-full shadow-lg bg-primary text-primary-foreground text-lg font-medium can-animate hover:bg-primary/90 transition-all duration-200 ease-in-out"
          size={isMobile ? "lg" : "lg"} {/* Changed "xl" to "lg" */}
        >
          <CalendarDays className="h-5 w-5" />
          Book Now
        </Button>
      </Link>
    </div>
  );
};

export default FloatingBookButton;