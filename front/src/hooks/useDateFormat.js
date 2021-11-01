import { format } from 'date-fns';

const useDateFormat = (date, type) => {
  const formatDate = format(date, type);
  return formatDate;
};

export default useDateFormat;
