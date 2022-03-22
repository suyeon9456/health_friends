const useRematchRate = (
  rematchingCount: number,
  matchingCount: number
): number => {
  return Math.round((rematchingCount / matchingCount) * 100);
};

export default useRematchRate;
