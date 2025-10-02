import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Playlists | Kith & Kin Barbershop",
  description: "Discover the music curated by the staff at Kith & Kin Barbershop. Featuring selections from our DJs and music enthusiasts.",
};

export default function PlaylistsPage() {
  const spotifyPlaylistUrl = "https://open.spotify.com/embed/playlist/4sNPJf4uGhE7FE0G7pqdAp?utm_source=generator&theme=0";

  return (
    <main id="main" className="container mx-auto px-6 py-16 min-h-screen bg-background text-foreground">
      <h1 className="text-4xl md:text-5xl font-display font-normal tracking-tight text-foreground">Our Playlists</h1>
      <p className="mt-3 text-muted-foreground font-body text-lg">The soundtrack to your next cut, curated by our staff.</p>

      <section className="mt-8 bg-card rounded-2xl p-4 shadow-ultra-soft">
        <h2 className="text-2xl font-display font-medium text-foreground mb-4">Kith & Kin Staff Picks</h2>
        <p className="text-muted-foreground leading-relaxed mb-6 text-base font-body">
          Get a taste of the vibes at Kith & Kin with this selection made by our talented team of barbers and music enthusiasts.
        </p>
        <iframe
          data-testid="embed-iframe"
          style={{ borderRadius: '12px' }}
          src={spotifyPlaylistUrl}
          width="100%"
          height="352"
          frameBorder="0"
          allowFullScreen={true} // Changed to true as 'allowfullscreen=""' implies true
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          title="Kith & Kin Staff Picks Spotify Playlist"
          className="border border-muted-foreground/30"
        ></iframe>
      </section>
    </main>
  );
}