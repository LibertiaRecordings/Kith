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
    youtubePlaylistId: 'RD0FkLT4fd_d0',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=RD0FkLT4fd_d0&autoplay=1&loop=1&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&autohide=1&fs=0',
  },
  {
    id: 'soul-channel',
    name: '60\'s 70\'s Soul',
    youtubePlaylistId: 'RD3C01eaL5_Xw',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=RD3C01eaL5_Xw&autoplay=1&loop=1&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&autohide=1&fs=0',
  },
  {
    id: 'soundcloud-gems-channel',
    name: 'Soundcloud Gems',
    youtubePlaylistId: 'RDLcN8QINjvWM',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=RDLcN8QINjvWM&autoplay=1&loop=1&controls=0&modestbranding=1&rel=0&disablekb=1&iv_load_policy=3&autohide=1&fs=0',
  },
  // Removed 'classic-hip-hop-channel' as requested
];

export const RadioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentChannel, setCurrentChannel] = useState<RadioChannel | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoadingChannel, setIsLoadingChannel] = useState(true);

  // Effect to load state from localStorage on mount
  useEffect(() => {
    const savedIsPlaying = localStorage.getItem('radioIsPlaying') === 'true';
    const savedChannelId = localStorage.getItem('radioCurrentChannelId');

    let initialChannel = CHANNELS[0];
    if (savedChannelId) {
      const foundChannel = CHANNELS.find(c => c.id === savedChannelId);
      if (foundChannel) {
        initialChannel = foundChannel;
      }
    }
    setCurrentChannel(initialChannel);
    setIsPlaying(savedIsPlaying); // Set initial playing state from localStorage
    setIsLoadingChannel(false);
  }, []);

  // Effect to save isPlaying to localStorage
  useEffect(() => {
    localStorage.setItem('radioIsPlaying', String(isPlaying));
  }, [isPlaying]);

  // Effect to save currentChannel.id to localStorage
  useEffect(() => {
    if (currentChannel) {
      localStorage.setItem('radioCurrentChannelId', currentChannel.id);
    }
  }, [currentChannel]);

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
        setIsPlaying(false); // Pause when sheet is closed
      } else {
        setIsPlaying(true); // Play when sheet is opened
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
        isSheetOpen,
        toggleSheet,
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