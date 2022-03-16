import { useCallback, useState } from 'react';

type ReturnTypes = [number, () => void];

const useRate = ({
  total,
  number,
}: {
  total: number;
  number: number;
}): ReturnTypes => {
  const [rate, setRate] = useState<number>(0);

  const handler = useCallback(() => {
    setRate(Math.round((number / total) * 100));
  }, [total, number]);

  return [rate, handler];
};

export default useRate;
