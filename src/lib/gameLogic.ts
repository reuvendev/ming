export const calculateLevel = (totalXp: number) => {
  const xpPerLevel = 100;
  const level = Math.floor(totalXp / xpPerLevel) + 1;
  const xpInCurrentLevel = totalXp % xpPerLevel;
  const progressPercentage = (xpInCurrentLevel / xpPerLevel) * 100;
  
  return { level, xpInCurrentLevel, progressPercentage };
};