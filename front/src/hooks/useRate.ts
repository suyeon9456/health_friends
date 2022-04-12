import { useCallback, useEffect, useState } from 'react';

type ReturnTypes = [number, (t: number, n: number) => void];

const useRate = ({
  total,
  number,
}: {
  total: number;
  number: number;
}): ReturnTypes => {
  const [rate, setRate] = useState<number>(0);

  const handler = useCallback((t, n) => {
    setRate(Math.round((n / t) * 100));
  }, []);

  useEffect(() => {
    handler(total, number);
  }, []);

  return [rate, handler];
};

export default useRate;
