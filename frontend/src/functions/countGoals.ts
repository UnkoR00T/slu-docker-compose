import type { goalType } from '@/types/goalType.ts'
/**
 * Counts the number of goals that occurred in a given third.
 * @param {string[]} goalsList - Array of goal times in "MM:SS" format.
 * @param {number} third - The third to check (1, 2, or 3).
 * @param {number} thirdLength - Length of one third in minutes.
 * @returns {number} - Number of goals in the specified third.
 */
function countGoals(goalsList: goalType[], third: number, thirdLength: number) {
  const thirdStart = (third - 1) * thirdLength * 60;
  const thirdEnd = third * thirdLength * 60;

  return goalsList.reduce((count, goal) => {
    const [min, sec] = goal.time.split(":").map(Number);
    const totalSeconds = min * 60 + sec;
    return (totalSeconds >= thirdStart && totalSeconds < thirdEnd)
      ? count + 1
      : count;
  }, 0);
}

export {countGoals};
