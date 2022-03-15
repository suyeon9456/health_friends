import React from 'react';
import DatePicker from 'react-datepicker';

import { DatePickerInputProps } from '@/../@types/atoms';
import { PickerType } from '@/../@types/utils';
import CustomPickerInput from '../CustomPickerInput';
import CustomCalendar from '../CustomCalendar';

const DatePickerInput = ({ startDate, setStartDate }: DatePickerInputProps) => (
  <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    showTimeSelect
    timeFormat="HH:mm"
    timeIntervals={15}
    timeCaption="time"
    dateFormat="yyyy년 MM월 dd일 HH:mm"
    customInput={<CustomPickerInput type={PickerType.DATE} />}
    calendarContainer={CustomCalendar}
  />
);

export default DatePickerInput;
