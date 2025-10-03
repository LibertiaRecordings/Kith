"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarDays } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const FloatingBookButton = () => {
  const isMobile = useIsMobile();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="/book" passHref>
        <Button
          className="flex items-center gap-2 px-6 py-3 rounded-full shadow-lg bg-primary text-primary-foreground text-lg font-medium can-animate hover:bg-primary/90 transition-all duration-200 ease-in-out"
          size={isMobile ? "lg" : "xl"} // Adjust size based on mobile
        >
          <CalendarDays className="h-5 w-5" />
          Book Now
        </Button>
      </Link>
    </div>
  );
};

export default FloatingBookButton;