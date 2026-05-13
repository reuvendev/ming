'use client';

import { useState, useEffect } from 'react';
import { addStudyXP } from '@/lib/db';
import { useUser } from '@/context/userContext';

interface StudyRoomProps {
  onStatusChange: (isRunning: boolean) => void;
}

export default function StudyRoom({ onStatusChange }: StudyRoomProps) {
  const { userData } = useUser();
  const [seconds, setSeconds] = useState(1500); // 25 mins
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((s) => s - 1);
      }, 1000);
    } else if (seconds === 0) {
      setIsActive(false);
      onStatusChange(false);
      if (userData?.uid) addStudyXP(userData.uid, 25);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds, userData, onStatusChange]);

  const toggleTimer = () => {
    const nextState = !isActive;
    setIsActive(nextState);
    onStatusChange(nextState); 
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="text-8xl font-black text-slate-900 mb-10 tracking-tighter tabular-nums">
        {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}
      </div>
      <button 
        onClick={toggleTimer}
        className={`w-full max-w-xs py-5 rounded-[2rem] font-black text-lg transition-all transform active:scale-95 shadow-2xl
          ${isActive 
            ? 'bg-rose-500 shadow-rose-200 text-white' 
            : 'bg-slate-900 shadow-slate-200 text-white hover:bg-blue-600'}`}
      >
        {isActive ? 'Pause' : 'Start'}
      </button>
    </div>
  );
}