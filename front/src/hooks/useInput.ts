import { ChangeEvent, Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnTypes<T> = [T, (e: ChangeEvent) => void, Dispatch<SetStateAction<T>>];

const useInput = <T>(defaultValue: T): ReturnTypes<T> => {
  const [value, setValue] = useState(defaultValue);
  const handler = useCallback((e) => {
    setValue(e.target.value);
  }, []);
  return [value, handler, setValue];
};

export default useInput;
