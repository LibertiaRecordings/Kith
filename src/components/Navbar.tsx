"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/components/SessionContextProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet"; // Removed SheetContent as it's now in RadioStationSheet
import { Menu, Radio } from "lucide-react"; // Added Radio icon
import { useIsMobile } from "@/hooks/use-mobile";
import { useRadioPlayer } from "./radio/RadioPlayerProvider"; // Import useRadioPlayer

export const Navbar = () => {
  const { session } = useSession();
  const isMobile = useIsMobile();
  const { toggleSheet, isPlaying } = useRadioPlayer(); // Use toggleSheet and isPlaying from context

  const navLinks = [
    { href: "/book", label: "Book" },
    { href: "/services", label: "Services" },
    { href: "/contact", label: "Location" },
    { href: "/barbers", label: "Barbers" },
    { href: "/gift-cards", label: "Gift Cards" },
  ];

  // Add profile link if session exists
  if (session) {
    navLinks.push({ href: "/profile", label: "Profile" });
  }

  return (
    <header className="w-full p-4 sm:p-6 bg-paper text-ink border-b border-muted-foreground/20 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center group">
          <Image
            src="/kith-kin-logo.png"
            alt="Kith & Kin Barbershop Logo"
            width={120}
            height={40}
            className="h-auto transition-transform duration-150 ease-out group-hover:scale-105"
            priority
          />
        </Link>

        <div className="flex items-center gap-4"> {/* Wrapper for nav and radio button */}
          {isMobile ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-ink hover:bg-muted/50">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              {/* SheetContent is now part of RadioStationSheet, so it's not here */}
            </Sheet>
          ) : (
            <nav className="hidden sm:flex gap-8 items-center">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-ink hover:text-primary transition-colors font-body font-medium text-lg">
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Live Radio Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSheet}
            className="text-ink hover:bg-muted/50 relative"
            aria-label="Open Live Radio"
          >
            <Radio className={`h-6 w-6 ${isPlaying ? 'text-primary animate-pulse' : ''}`} />
            {isPlaying && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary animate-ping-slow" />
            )}
            <span className="sr-only">Live Radio</span>
          </Button>
        </div>
      </div>
    </header>
  );
};