"use client";

import Link from "next/link";
import { useSession } from "@/components/SessionContextProvider";
import { Instagram, Facebook, Phone, Mail, Music } from "lucide-react"; // Import Lucide icons, including Music

export const Footer = () => {
  const { session } = useSession();
  const spotifyPlaylistUrl = "https://open.spotify.com/embed/playlist/4sNPJf4uGhE7FE0G7pqdAp?utm_source=generator&theme=0";

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
          <Link href="/playlists" aria-label="Spotify Playlist" className="text-muted-foreground hover:text-primary transition-colors">
            <Music className="h-6 w-6" /> {/* Using Music icon as a monochrome Spotify logo */}
          </Link>
        </div>

        <nav className="flex gap-6 text-sm">
          <Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</Link>
          {!session && (
            <Link href="/login" className="hover:text-primary transition-colors font-medium">
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Spotify Playlist Embed */}
      <div className="mt-8 w-full max-w-md mx-auto">
        <h3 className="text-xl font-display font-semibold text-foreground mb-4">Kith & Kin Staff Picks</h3>
        <iframe
          style={{ borderRadius: '12px' }}
          src={spotifyPlaylistUrl}
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen={false}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Kith & Kin Staff Picks Spotify Playlist"
          className="border border-muted-foreground/30"
        ></iframe>
      </div>
    </footer>
  );
};