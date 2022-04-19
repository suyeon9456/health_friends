import { format } from 'date-fns';

type ReturnTypes = string;

const useDateFormat = (date: Date | number, type: string): ReturnTypes => {
  const formatDate = format(date, type);
  return formatDate;
};

export default useDateFormat;
