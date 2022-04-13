import { InputNumberType, InputNumberTypeT } from '@/../@types/utils';

const useInputNumber = ({
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

export default useInputNumber;
