import { db } from "./firebase";
import { doc, updateDoc, increment, setDoc } from "firebase/firestore";

// Function to add XP to a user's profile
export const addStudyXP = async (userId: string, xpAmount: number) => {
  const userRef = doc(db, "users", userId);
  
  try {
    await updateDoc(userRef, {
      xp: increment(xpAmount),
      totalMinutes: increment(xpAmount), 
      lastActive: new Date()
    });
  } catch (error) {
    console.error("Error updating XP:", error);
  }
};

// Function to update a specific daily goal
export const updateDailyGoal = async (userId: string, goalId: string, isCompleted: boolean) => {
  const userRef = doc(db, "users", userId);
  try {
    await updateDoc(userRef, {
      [`dailyGoals.${goalId}`]: isCompleted
    });
  } catch (error) {
    console.error("Error updating goal:", error);
  }
};

// Function to initialize a new user profile
export const createNewUser = async (userId: string, email: string) => {
  const userRef = doc(db, "users", userId);
  await setDoc(userRef, {
    email,
    xp: 0,
    level: 1,
    streak: 0,
    dailyGoals: {
      studyTwoHours: false,
      feedMing: false
    },
    createdAt: new Date(),
    lastActive: new Date()
  }, { merge: true });
};