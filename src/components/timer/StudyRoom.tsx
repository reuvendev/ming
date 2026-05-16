'use client';

import React, { useState, useEffect } from 'react';
import { useUser } from '@/context/UserContext';
import MingMascot from '@/components/pet/MingMascot';

export default function StudyRoom() {
  const { addXp, userStats } = useUser();
  
  const FOCUS_TIME = 25 * 60;
  const [timeLeft, setTimeLeft] = useState(FOCUS_TIME);
  const [isRunning, setIsRunning] = useState(false);
  const [mascotAction, setMascotAction] = useState<'idle' | 'studying' | 'sleeping'>('idle');
  const [hasLeveledUp, setHasLeveledUp] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  useEffect(() => {
    if (timeLeft > 0 || !isRunning) return;
    if (hasLeveledUp) return;

    setHasLeveledUp(true);
    setIsRunning(false);
    setMascotAction('idle');

    console.log("Timer finished! Awarding 25 XP.");
    addXp(25);

  }, [timeLeft, isRunning, hasLeveledUp, addXp]);

  const startTimer = () => {
    setIsRunning(true);
    setMascotAction('studying');
  };

  const pauseTimer = () => {
    setIsRunning(false);
    setMascotAction('idle');
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(FOCUS_TIME);
    setHasLeveledUp(false);
    setMascotAction('idle');
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-slate-50 rounded-2xl shadow-md max-w-md mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-800">Level {userStats.level}</h2>
        <p className="text-sm text-slate-500">XP: {userStats.xp} / {userStats.requiredXp}</p>
      </div>

      <div className="p-4 bg-white rounded-full shadow-inner">
        <MingMascot action={mascotAction} />
      </div>

      <div className="text-6xl font-mono font-bold text-slate-900 tracking-wider">
        {formatTime(timeLeft)}
      </div>

      <div className="flex space-x-4">
        {!isRunning ? (
          <button 
            onClick={startTimer}
            disabled={timeLeft === 0}
            className="px-6 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-300 text-white font-medium rounded-lg shadow transition"
          >
            Start
          </button>
        ) : (
          <button 
            onClick={pauseTimer}
            className="px-6 py-2 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-lg shadow transition"
          >
            Pause
          </button>
        )}
        <button 
          onClick={resetTimer}
          className="px-6 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg shadow transition"
        >
          Reset
        </button>
      </div>
    </div>
  );
}