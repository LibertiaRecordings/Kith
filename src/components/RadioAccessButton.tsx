"use client";

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Headphones } from 'lucide-react';
import { useRadioPlayer } from './radio/RadioPlayerProvider';

const RadioAccessButton: React.FC = () => {
  const { toggleSheet, isPlaying } = useRadioPlayer();

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <Button
        variant="ghost"
        onClick={toggleSheet}
        className="relative p-0 h-auto w-auto rounded-full overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        aria-label="Open Live Radio"
      >
        <Image
          src="/images/kith-kin-radio-avatar.png"
          alt="Kith & Kin Radio Avatar"
          width={150}
          height={150}
          className="h-auto w-auto max-w-[150px] opacity-80 transition-opacity duration-200 ease-in-out group-hover:opacity-100"
          priority
        />
        {isPlaying && (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-primary animate-ping-slow opacity-75" />
        )}
        <Headphones className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 ${isPlaying ? 'text-primary' : 'text-ink/70'} transition-colors duration-200 ease-in-out group-hover:text-primary`} />
      </Button>
      <p className="mt-4 text-muted-foreground font-body text-lg">
        {isPlaying ? `Now Playing: ${useRadioPlayer().currentChannel?.name}` : 'Tune into Kith & Kin Radio'}
      </p>
    </div>
  );
};

export default RadioAccessButton;