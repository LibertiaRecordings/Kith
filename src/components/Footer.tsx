"use client";

import Link from "next/link";
import { useSession } from "@/components/SessionContextProvider";

export const Footer = () => {
  const { session } = useSession();

  return (
    <footer className="w-full p-8 text-center bg-card text-muted-foreground border-t border-muted-foreground/20 mt-16">
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <span className="text-sm">
          Created by FREE99STUDIO
        </span>
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
    </footer>
  );
};