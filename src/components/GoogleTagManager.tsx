"use client";

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface GoogleTagManagerProps {
  gtmId: string;
}

const GoogleTagManager: React.FC<GoogleTagManagerProps> = ({ gtmId }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!gtmId || gtmId === 'GTM-XXXXXXX') {
      console.warn('Google Tag Manager ID is not set. GTM will not be initialized.');
      return;
    }

    // Ensure dataLayer is initialized
    if (!(window as any).dataLayer) {
      (window as any).dataLayer = [];
    }

    // Push initial pageview for GTM
    (window as any).dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js',
    });

    // Load GTM script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [gtmId]);

  // Track page views for client-side navigations
  useEffect(() => {
    if (gtmId && gtmId !== 'GTM-XXXXXXX') {
      (window as any).dataLayer.push({
        event: 'page_view',
        page_path: pathname + searchParams.toString(),
      });
    }
  }, [pathname, searchParams, gtmId]);

  return null;
};

export default GoogleTagManager;