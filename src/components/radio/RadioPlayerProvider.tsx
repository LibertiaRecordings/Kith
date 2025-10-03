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
  nextChannel: () => void;
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
    youtubePlaylistId: 'RD0FkLT4fd_d0', // Updated playlist ID
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=RD0FkLT4fd_d0&autoplay=1&loop=1&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&autohide=1&fs=0', // Updated embed URL
  },
  {
    id: 'soul-channel',
    name: '60\'s 70\'s Soul',
    youtubePlaylistId: 'RD3C01eaL5_Xw',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=RD3C01eaL5_Xw&autoplay=1&loop=1&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&autohide=1&fs=0',
  },
];

export const RadioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<RadioChannel | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoadingChannel, setIsLoadingChannel] = useState(true);

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
    toast.info(`Paused: ${currentChannel?.name || 'Radio'}`);
  };

  const nextChannel = () => {
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
        setIsPlaying(false);
      } else {
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