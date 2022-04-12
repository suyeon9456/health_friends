import { format } from 'date-fns';

type ReturnTypes = string;

const useDateFormat = (date: Date | number, type: string): ReturnTypes => {
  console.log(date);
  const formatDate = format(date, type);
  return formatDate;
};

export default useDateFormat;
