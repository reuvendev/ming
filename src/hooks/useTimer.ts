'use client';
import { useState, useEffect, useRef } from 'react';
import { auth } from '@/lib/firebase'; // Import your auth instance
import { addStudyXP } from '@/lib/db';    // Import the database function

export const useTimer = (initialMinutes = 25) => {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  
  const totalSecondsFocused = useRef(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
        if (!isBreak) totalSecondsFocused.current += 1;
      }, 1000);
    } else if (secondsLeft === 0) {
      handleSessionEnd();
    }

    return () => clearInterval(interval);
  }, [isActive, secondsLeft, isBreak]);

  const handleSessionEnd = async () => {
    setIsActive(false);
    
    // Calculate the XP based on actual time spent focusing
    const xpEarned = Math.floor(totalSecondsFocused.current / 60);
    
    // Check if a user is logged in and if they actually earned XP
    if (auth.currentUser && xpEarned > 0 && !isBreak) {
      try {
        await addStudyXP(auth.currentUser.uid, xpEarned);
        console.log(`Successfully saved ${xpEarned} XP to Firestore!`);
      } catch (error) {
        console.error("Failed to save XP:", error);
      }
    }

    alert(`Session complete! You earned ${xpEarned} XP.`);
    
    setIsBreak(!isBreak);
    setSecondsLeft(isBreak ? 25 * 60 : 5 * 60);
    totalSecondsFocused.current = 0;
  };

  const toggleTimer = () => setIsActive(!isActive);
  
  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setSecondsLeft(25 * 60);
    totalSecondsFocused.current = 0;
  };

  return { secondsLeft, isActive, isBreak, toggleTimer, resetTimer };
};