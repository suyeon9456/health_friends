import { InputNumberType, InputNumberTypeT } from '../@types/utils';

export const rematchRate = (
  rematchingCount: number,
  matchingCount: number
): number => {
  return Math.round((rematchingCount / matchingCount) * 100);
};

export const inputNumber = ({
  type,
  prev,
}: {
  type: InputNumberTypeT;
  prev: string;
}): string => {
  if (type === InputNumberType.MINUS) {
    return (parseInt(prev, 10) - 1).toString();
  }
  return (parseInt(prev, 10) + 1).toString();
};
