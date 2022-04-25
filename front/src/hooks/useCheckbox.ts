import { Dispatch, SetStateAction, useCallback, useState } from 'react';

type ReturnTypes<T> = [
  T[],
  (checked: boolean, value: T) => void,
  Dispatch<SetStateAction<T[]>>
];

const useCheckbox = <T>(defaultValue: T[]): ReturnTypes<T> => {
  const [value, setValue] = useState<T[]>(defaultValue);
  // eslint-disable-next-line no-shadow
  const handler = useCallback(
    (checked, v) => {
      if (checked) {
        setValue([...value, v]);
      } else {
        // 체크 해제
        setValue(value.filter((el: T) => el !== v));
      }
    },
    [value]
  );
  return [value, handler, setValue];
};

export default useCheckbox;
