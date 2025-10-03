"use client";

import React from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Play, Pause, SkipForward, Music, Loader2 } from 'lucide-react';
import { useRadioPlayer } from './RadioPlayerProvider';

const RadioStationSheet = () => {
  const { isPlaying, currentTrack, play, pause, nextTrack, isSheetOpen, toggleSheet, isLoadingTracks } = useRadioPlayer();

  return (
    <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
      <SheetContent side="right" className="bg-card text-foreground border-l border-muted-foreground/20 w-[300px] sm:w-[350px] flex flex-col">
        <SheetHeader className="text-left">
          <SheetTitle className="text-3xl font-hero text-foreground flex items-center gap-2">
            <Music className="h-7 w-7 text-primary" /> Live Radio
          </SheetTitle>
        </SheetHeader>
        <div className="flex-grow flex flex-col justify-center items-center text-center p-4">
          {isLoadingTracks ? (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="h-10 w-10 animate-spin text-primary" />
              <p className="text-muted-foreground font-body text-lg">Loading tracks...</p>
            </div>
          ) : currentTrack ? (
            <>
              <Music className="h-20 w-20 text-primary mb-6" />
              <h3 className="text-2xl font-hero text-foreground mb-2">{currentTrack.title}</h3>
              <p className="text-muted-foreground font-body text-lg">{currentTrack.artist || 'Unknown Artist'}</p>
              <div className="flex items-center gap-4 mt-8">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={isPlaying ? pause : play}
                  className="h-14 w-14 rounded-full text-primary hover:bg-primary/10 transition-colors"
                >
                  {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
                  <span className="sr-only">{isPlaying ? 'Pause' : 'Play'}</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextTrack}
                  className="h-12 w-12 rounded-full text-primary hover:bg-primary/10 transition-colors"
                >
                  <SkipForward className="h-6 w-6" />
                  <span className="sr-only">Next Track</span>
                </Button>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground font-body text-lg">No tracks available yet.</p>
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