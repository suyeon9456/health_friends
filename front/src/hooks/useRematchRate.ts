const useRematchRate = (rematchingCount: number, matchingCount: number): number => {
  return (rematchingCount / matchingCount) * 100;
};

export default useRematchRate;
