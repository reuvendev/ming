'use client';

import Image from 'next/image';

interface MascotProps {
  action?: 'idle' | 'studying' | 'levelUp' | 'sleeping';
}

export default function MingMascot({ action = 'idle' }: MascotProps) {
  const sprites = {
    idle: '/assets/mascot/idle.png',
    studying: '/assets/mascot/focus.png',
    levelUp: '/assets/mascot/level-up.png',
    sleeping: '/assets/mascot/sleep.png',
  };

  const quotes = {
    idle: "Ready to get some work done?",
    studying: "You're doing great. Stay locked in.",
    levelUp: "New height reached. Keep that momentum!",
    sleeping: "Rest is part of the process."
  };

  return (
    <div className="relative flex flex-col items-center justify-center">
      <div className={`absolute inset-0 blur-[100px] rounded-full transition-colors duration-1000 opacity-10
        ${action === 'studying' ? 'bg-blue-600' : 'bg-slate-400'}`} 
      />
      
      <div className="relative transition-transform duration-500 transform hover:scale-105">
        <Image
          src={sprites[action] || sprites.idle}
          alt={`Mascot: ${action}`}
          width={220}
          height={220}
          className="object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]"
          priority
        />
      </div>

      <div className="mt-2 w-20 h-1 bg-slate-900/5 blur-md rounded-[100%] mx-auto" />

      <div className="mt-4 text-center"> {/* Reduced margin from mt-8 to mt-4 */}
        <p className="text-slate-400 font-bold text-[9px] uppercase tracking-[0.3em] mb-0.5">Status: {action}</p>
        <h3 className="text-slate-600 font-medium italic text-base tracking-tight leading-tight">
          "{quotes[action] || quotes.idle}"
        </h3>
      </div>
    </div>
  );
}