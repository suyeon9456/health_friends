import { compareAsc, format } from 'date-fns';
import { stringOrDate } from 'react-big-calendar';

export const rangeDate = (startDate?: Date, endDate?: Date) => {
  const formatStart = format(startDate ?? new Date(), 'yyyy년 MM월 dd일 HH:mm');
  const formatEnd = format(endDate ?? new Date(), 'HH:mm');
  return [formatStart, ' ~ ', formatEnd].join('');
};

export const createEndDate = (date: string, time: string | Date) => {
  const formatDate = format(new Date(date), 'yyyy-MM-dd');
  const formatTime = format(new Date(time), 'HH:mm');
  return new Date([formatDate, formatTime].join(' '));
};

export const formatDate = (date: Date | stringOrDate) => {
  if (typeof date === 'string') {
    return format(new Date(date), 'yyyy-MM-dd');
  }
  return format(date, 'yyyy-MM-dd');
};
export const formatTime = (date: Date) => format(date, 'HH:mm');
export const formatDateTime = (date: Date) => format(date, 'yyyy-MM-dd HH:mm');

export const createTimeToDateTime = (time: string) => {
  const date = format(new Date(), 'yyyy-MM-dd');
  return new Date([date, time].join(' '));
};

export const profileRangeTime = (startTime: string, endTime: string) => {
  return `${startTime || '00:00'} ~ ${endTime || '00:00'}`;
};

export const isLastDate = (date: Date) => {
  return compareAsc(date, new Date()) < 0;
};
