"use client";

import React, { createContext, useContext, useState, useEffect, useRef, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

interface RadioTrack {
  id: string;
  title: string;
  artist: string | null;
  file_path: string;
  duration_seconds: number | null;
  is_dj_mix: boolean;
}

interface RadioPlayerContextType {
  isPlaying: boolean;
  currentTrack: RadioTrack | null;
  play: () => void;
  pause: () => void;
  nextTrack: () => void;
  toggleSheet: () => void;
  isSheetOpen: boolean;
  isLoadingTracks: boolean;
}

const RadioPlayerContext = createContext<RadioPlayerContextType | undefined>(undefined);

export const RadioPlayerProvider = ({ children }: { children: ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState<RadioTrack | null>(null);
  const [tracks, setTracks] = useState<RadioTrack[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isLoadingTracks, setIsLoadingTracks] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const fetchTracks = async () => {
      setIsLoadingTracks(true);
      const { data, error } = await supabase
        .from('radio_tracks')
        .select('*')
        .order('created_at', { ascending: true }); // Order by creation date or add a 'sort_order' column

      if (error) {
        console.error('Error fetching radio tracks:', error);
        toast.error('Failed to load radio tracks.');
      } else {
        setTracks(data || []);
        if (data && data.length > 0) {
          setCurrentTrack(data[0]);
        }
      }
      setIsLoadingTracks(false);
    };

    fetchTracks();
  }, []);

  useEffect(() => {
    if (currentTrack && audioRef.current) {
      const { data: { publicUrl } } = supabase.storage.from('radio-music').getPublicUrl(currentTrack.file_path);
      audioRef.current.src = publicUrl;
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      }
    } else if (audioRef.current) {
      audioRef.current.src = ''; // Clear source if no track
    }
  }, [currentTrack, isPlaying]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Error playing audio:", e));
      setIsPlaying(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const nextTrack = () => {
    if (tracks.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % tracks.length;
    setCurrentTrackIndex(nextIndex);
    setCurrentTrack(tracks[nextIndex]);
    // If currently playing, automatically play the next track
    if (isPlaying) {
      setTimeout(() => { // Small delay to ensure src is set before playing
        audioRef.current?.play().catch(e => console.error("Error playing next track:", e));
      }, 50);
    }
  };

  const handleAudioEnded = () => {
    nextTrack();
  };

  const toggleSheet = () => {
    setIsSheetOpen(prev => !prev);
  };

  return (
    <RadioPlayerContext.Provider
      value={{
        isPlaying,
        currentTrack,
        play,
        pause,
        nextTrack,
        toggleSheet,
        isSheetOpen,
        isLoadingTracks,
      }}
    >
      {children}
      <audio ref={audioRef} onEnded={handleAudioEnded} />
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