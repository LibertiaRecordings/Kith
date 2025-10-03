"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from 'sonner';

interface RadioChannel {
  id: string;
  name: string;
  youtubePlaylistId: string;
  embedUrl: string;
}

interface RadioPlayerContextType {
  isPlaying: boolean;
  currentChannel: RadioChannel | null;
  play: () => void;
  pause: () => void;
  nextChannel: () => void; // Renamed from nextTrack
  toggleSheet: () => void;
  isSheetOpen: boolean;
  isLoadingChannel: boolean;
}

const RadioPlayerContext = createContext<RadioPlayerContextType | undefined>(undefined);

// Define our predetermined channels
const CHANNELS: RadioChannel[] = [
  {
    id: 'dance-channel',
    name: 'Electronic / Dance',
    youtubePlaylistId: 'RDl_7rlC_L4Rk', // From the user's provided URL
    // Updated embedUrl to hide controls, branding, and prevent fullscreen/keyboard controls
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=RDl_7rlC_L4Rk&autoplay=1&loop=1&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&autohide=1&fs=0',
  },
  // Add more channels here if needed in the future
];

export const RadioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<RadioChannel | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoadingChannel, setIsLoadingChannel] = useState(true); // Renamed from isLoadingTracks

  useEffect(() => {
    // Initialize with the first channel
    if (CHANNELS.length > 0) {
      setCurrentChannel(CHANNELS[0]);
    }
    setIsLoadingChannel(false);
  }, []);

  const play = () => {
    if (!currentChannel) {
      toast.error('No radio channel available.');
      return;
    }
    setIsPlaying(true);
    setIsSheetOpen(true); // Open the sheet when playing
    toast.info(`Now playing: ${currentChannel.name}`);
  };

  const pause = () => {
    setIsPlaying(false);
    // Optionally, you might want to close the sheet here, or let the user close it manually
    // setIsSheetOpen(false);
    toast.info(`Paused: ${currentChannel?.name || 'Radio'}`);
  };

  const nextChannel = () => {
    // For now, with only one channel, this will just "restart" it by re-setting the current channel
    // In the future, this would cycle through CHANNELS array
    if (CHANNELS.length > 0) {
      const currentIndex = CHANNELS.findIndex(c => c.id === currentChannel?.id);
      const nextIndex = (currentIndex + 1) % CHANNELS.length;
      setCurrentChannel(CHANNELS[nextIndex]);
      if (isPlaying) {
        toast.info(`Switching to: ${CHANNELS[nextIndex].name}`);
      }
    } else {
      toast.error('No other channels available.');
    }
  };

  const toggleSheet = () => {
    setIsSheetOpen(prev => {
      if (prev) {
        // If closing the sheet, also pause playback
        setIsPlaying(false);
      } else {
        // If opening the sheet, start playing
        setIsPlaying(true);
      }
      return !prev;
    });
  };

  return (
    <RadioPlayerContext.Provider
      value={{
        isPlaying,
        currentChannel,
        play,
        pause,
        nextChannel,
        toggleSheet,
        isSheetOpen,
        isLoadingChannel,
      }}
    >
      {children}
    </RadioPlayerContext.Provider>
  );
};

export const useRadioPlayer = () => {
  const context = useContext(RadioPlayerContext);
  if (context === undefined) {
    throw new Error('useRadioPlayer must be used within a RadioPlayerProvider');
  }
  return context;
};