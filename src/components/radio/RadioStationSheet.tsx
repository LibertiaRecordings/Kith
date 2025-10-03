"use client";

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, Music, Loader2 } from 'lucide-react';
import { useRadioPlayer } from './RadioPlayerProvider';
import Image from 'next/image'; // Import Image component

const RadioStationSheet = () => {
  const { isPlaying, currentChannel, play, pause, nextChannel, isSheetOpen, toggleSheet, isLoadingChannel } = useRadioPlayer();

  // The YouTube iframe will only be rendered when the sheet is open and a channel is selected.
  // We use a key prop on the iframe to force a re-render and restart autoplay if the channel changes.
  const youtubeIframeKey = currentChannel ? `${currentChannel.id}-${isPlaying}` : 'no-channel';

  return (
    <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
      <SheetContent side="right" className="bg-card text-foreground border-l border-muted-foreground/20 w-[300px] sm:w-[350px] flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle className="text-3xl font-hero text-foreground flex items-center gap-2">
            <Music className="h-7 w-7 text-primary" /> Radio
          </SheetTitle>
        </SheetHeader>
        <div className="flex-grow flex flex-col justify-center items-center text-center p-4">
          {isLoadingChannel ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground font-body text-lg">Loading channel...</p>
            </div>
          ) : currentChannel && isPlaying ? (
            <>
              <div className="relative w-0 h-0 opacity-0 overflow-hidden"> {/* Visually hide the iframe */}
                {/* YouTube iframe for the dance channel */}
                <iframe
                  key={youtubeIframeKey} // Key to force re-render on channel change or play/pause toggle
                  src={currentChannel.embedUrl}
                  title={currentChannel.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
              <h3 className="text-2xl font-hero text-foreground mb-2">{currentChannel.name}</h3>
              <p className="text-muted-foreground font-body text-lg">Live Stream</p>
              <div className="flex items-center gap-4 mt-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={pause} // Pause will now just set isPlaying to false
                  className="h-14 w-14 rounded-full text-primary hover:bg-primary/10 transition-colors"
                >
                  <Pause className="h-8 w-8" />
                  <span className="sr-only">Pause</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextChannel} // Next will cycle channels or restart current
                  className="h-12 w-12 rounded-full text-primary hover:bg-primary/10 transition-colors"
                >
                  <SkipForward className="h-6 w-6" />
                  <span className="sr-only">Next Channel</span>
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Image
                src="/images/kith-kin-radio-avatar.png"
                alt="Kith & Kin Radio Avatar"
                width={150}
                height={150}
                className="h-auto w-auto max-w-[150px] opacity-70 mb-6"
                priority
              />
              <h3 className="text-2xl font-hero text-foreground mb-2">Radio Offline</h3>
              <p className="text-muted-foreground font-body text-lg">Press play to start the stream.</p>
              <Button
                variant="ghost"
                size="icon"
                onClick={play} // Play will now just set isPlaying to true
                className="h-14 w-14 rounded-full text-primary hover:bg-primary/10 transition-colors mt-8"
              >
                <Play className="h-8 w-8" />
                <span className="sr-only">Play</span>
              </Button>
            </div>
          )}
        </div>
        <div className="mt-auto text-center text-muted-foreground text-sm font-body">
          <p>Curated by Kith & Kin</p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RadioStationSheet;