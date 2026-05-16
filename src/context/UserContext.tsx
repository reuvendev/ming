'use client';

import React, { createContext, useContext, useState } from 'react';

interface UserContextType {
  userStats: {
    level: number;
    xp: number;
    requiredXp: number;
  };
  addXp: (amount: number) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userStats, setUserStats] = useState({
    level: 1,
    xp: 0,
    requiredXp: 100,
  });

  const addXp = (amount: number) => {
    setUserStats((prev) => {
      let newXp = prev.xp + amount;
      let newLevel = prev.level;
      let currentRequiredXp = prev.requiredXp;

      while (newXp >= currentRequiredXp) {
        newXp -= currentRequiredXp;
        newLevel += 1;
        currentRequiredXp = Math.floor(currentRequiredXp * 1.2);
        console.log(`🎉 Level up! Now Level ${newLevel}`);
      }

      return {
        level: newLevel,
        xp: newXp,
        requiredXp: currentRequiredXp,
      };
    });
  };

  return (
    <UserContext.Provider value={{ userStats, addXp }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
