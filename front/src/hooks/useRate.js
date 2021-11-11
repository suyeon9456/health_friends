import { useCallback, useState } from 'react';

const useRate = ({ total, number }) => {
  const [rate, setRate] = useState(0);

  const handler = useCallback(() => {
    setRate((number / total) * 100);
  }, [total, number]);

  return [rate, handler];
};

export default useRate;
