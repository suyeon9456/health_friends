import { useCallback, useState } from 'react';

const useInput = (defaultValue) => {
  const [value, setValue] = useState(defaultValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
