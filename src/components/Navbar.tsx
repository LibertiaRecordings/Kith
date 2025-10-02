"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession } from "@/components/SessionContextProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

export const Navbar = () => {
  const { session, setShowSpecialDialog } = useSession(); // Get setShowSpecialDialog
  const isMobile = useIsMobile();

  const navLinks = [
    { href: "/book", label: "Book" },
    { href: "/services", label: "Services" },
    { href: "/barbers", label: "Barbers" },
    { href: "/posts", label: "Posts" },
    // Removed /specials as a direct page link
    { href: "/gift-cards", label: "Gift Cards" },
    { href: "/contact", label: "Contact" },
  ];

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

        {isMobile ? (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-ink hover:bg-muted/50">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-paper text-ink border-l border-muted-foreground/20 w-[250px] sm:w-[300px]">
              <nav className="flex flex-col gap-4 pt-8">
                {navLinks.map((link) => (
                  <Link key={link.href} href={link.href} className="text-lg font-medium text-ink hover:text-primary transition-colors">
                    {link.label}
                  </Link>
                ))}
                {/* Add a button for the special dialog in mobile nav */}
                <Button variant="ghost" onClick={() => setShowSpecialDialog(true)} className="text-lg font-medium text-ink hover:text-primary transition-colors justify-start p-0 h-auto">
                  Specials
                </Button>
                {!session && (
                  <Link href="/login" className="text-lg font-medium text-ink hover:text-primary transition-colors">
                    Login
                  </Link>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        ) : (
          <nav className="hidden sm:flex gap-8 items-center">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-ink hover:text-primary transition-colors font-medium">
                {link.label}
              </Link>
            ))}
            {/* Add a button for the special dialog in desktop nav */}
            <Button variant="ghost" onClick={() => setShowSpecialDialog(true)} className="text-ink hover:text-primary transition-colors font-medium p-0 h-auto">
              Specials
            </Button>
            {!session && (
              <Link href="/login" className="text-ink hover:text-primary transition-colors font-medium">
                Login
              </Link>
            )}
          </nav>
        )}
      </div>
    </header>
  );
};