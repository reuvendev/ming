'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import { calculateLevel } from '@/lib/gameLogic';

const UserContext = createContext<any>(null);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        return onSnapshot(userRef, (doc) => {
          if (doc.exists()) {
            const data = doc.data();
            const levels = calculateLevel(data.xp || 0);
            setUserData({ ...data, ...levels, uid: user.uid });
          }
          setLoading(false);
        });
      } else {
        setUserData(null);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={{ userData, loading }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);