import { addDays, endOfMonth, startOfMonth } from 'date-fns';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { stringOrDate } from 'react-big-calendar';

type ReturnTypes = [
  {
    start: stringOrDate;
    end: stringOrDate;
  },
  (e: Date[] | { start: stringOrDate; end: stringOrDate }) => void,
  Dispatch<
    SetStateAction<{
      start: stringOrDate;
      end: stringOrDate;
    }>
  >
];

const useSelectRage = (): ReturnTypes => {
  const [value, setValue] = useState<{
    start: stringOrDate;
    end: stringOrDate;
  }>({
    start: addDays(startOfMonth(new Date()), -7),
    end: addDays(endOfMonth(new Date()), 7),
  });
  const handler = useCallback(
    (eventRange: Date[] | { start: stringOrDate; end: stringOrDate }) => {
      if (!eventRange || Array.isArray(eventRange)) return;
      setValue(eventRange);
    },
    []
  );
  return [value, handler, setValue];
};

export default useSelectRage;
