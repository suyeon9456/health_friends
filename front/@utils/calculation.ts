import { InputNumberType, InputNumberTypeT } from '../@types/constant';

export const rematchRate = (
  matchingCount: number,
  rematchingCount?: number
): number => {
  return rematchingCount
    ? Math.round((rematchingCount / matchingCount) * 100)
    : 0;
};

export const responseRate = (
  resSchedule?: Array<{ isPermitted: boolean }>
): number => {
  if (!resSchedule?.[0]) return 0;
  const total = resSchedule.length;
  const number =
    resSchedule.filter((f: { isPermitted: boolean }) => f.isPermitted).length ||
    0;

  return Math.round((number / total) * 100);
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
