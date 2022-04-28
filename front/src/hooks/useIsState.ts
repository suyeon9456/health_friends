import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnTypes = [boolean, () => void, Dispatch<SetStateAction<boolean>>];

const useIsState = (defaultValue: boolean): ReturnTypes => {
  const [isValue, setIsValue] = useState(defaultValue);
  const handler = useCallback(() => {
    setIsValue((prev) => !prev);
  }, [isValue]);
  return [isValue, handler, setIsValue];
};

export default useIsState;
