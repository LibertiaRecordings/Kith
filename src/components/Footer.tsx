"use client";

import Link from "next/link";
import { useSession } from "@/components/SessionContextProvider";
import { Instagram, Facebook, Phone, Mail } from "lucide-react"; // Import Lucide icons

export const Footer = () => {
  const { session } = useSession();

  return (
    <footer className="w-full p-8 text-center bg-card text-muted-foreground border-t border-muted-foreground/20 mt-16">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-6">
        <span className="text-sm">
          Created by FREE99STUDIO
        </span>
        
        {/* Social and Contact Links */}
        <div className="flex gap-4">
          <Link href="https://www.instagram.com/kithkinbarberco/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
            <Instagram className="h-6 w-6" />
          </Link>
          <Link href="http://facebook.com/kithkinbarberco" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-colors">
            <Facebook className="h-6 w-6" />
          </Link>
          <Link href="tel:+14034524590" aria-label="Call Us" className="text-muted-foreground hover:text-primary transition-colors">
            <Phone className="h-6 w-6" />
          </Link>
          <Link href="mailto:info@kithkin.family" aria-label="Email Us" className="text-muted-foreground hover:text-primary transition-colors">
            <Mail className="h-6 w-6" />
          </Link>
        </div>

        <nav className="flex gap-6 text-sm">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
          <Link href="/playlists" className="hover:text-primary transition-colors">Playlists</Link> {/* Added Playlists link */}
          {!session && (
            <Link href="/login" className="hover:text-primary transition-colors font-medium">
              Login
            </Link>
          )}
        </nav>
      </div>
    </footer>
  );
};