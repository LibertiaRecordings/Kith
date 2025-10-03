"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/components/SessionContextProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose } from "@/components/ui/sheet"; // Added SheetContent, SheetHeader, SheetTitle, SheetFooter, SheetClose
import { Menu, Radio, Headphones } from "lucide-react"; // Added Headphones icon
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
              <SheetContent side="right" className="bg-card text-foreground border-l border-muted-foreground/20 w-[250px] sm:w-[300px] flex flex-col">
                <SheetHeader className="text-left">
                  <SheetTitle className="text-3xl font-hero text-foreground">Navigation</SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-4 mt-6 flex-grow">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.href}>
                      <Link href={link.href} className="text-ink hover:text-primary transition-colors font-body font-medium text-lg py-2">
                        {link.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <SheetFooter className="mt-auto pt-6 border-t border-muted-foreground/20 flex flex-col items-center gap-4">
                  <Image
                    src="/images/kith-kin-radio-logo.png"
                    alt="Kith & Kin Radio Logo"
                    width={150}
                    height={150}
                    className="h-auto w-auto max-w-[150px] opacity-70"
                  />
                  <SheetClose asChild>
                    <Button
                      onClick={toggleSheet}
                      className="w-full flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-full text-lg font-medium can-animate hover:bg-primary/90 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                      <Headphones className="h-5 w-5" />
                      Listen Live
                    </Button>
                  </SheetClose>
                </SheetFooter>
              </SheetContent>
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