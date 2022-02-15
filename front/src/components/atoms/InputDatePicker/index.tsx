import React, { Dispatch, SetStateAction } from 'react';
import DatePicker from 'react-datepicker';

import CustomPickerInput from '../CustomPickerInput';
import CustomCalendar from '../CustomCalendar';

const InputDatePicker = ({ startDate, setStartDate }: {
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  placeholder?: string;
}) => (
  <DatePicker
    selected={startDate}
    onChange={(date) => setStartDate(date)}
    showTimeSelect
    timeFormat="HH:mm"
    timeIntervals={15}
    timeCaption="time"
    dateFormat="yyyy년 MM월 dd일 HH:mm"
    // withPortal
    customInput={<CustomPickerInput type="date" />}
    calendarContainer={CustomCalendar}
  />
);

export default InputDatePicker;
