import React from 'react';
import DatePicker from 'react-datepicker';

import CustomCalendar from '../CustomCalendar';
import CustomPickerInput from '../CustomPickerInput';

const InputTimePicker = ({ size, value, onChange }: {
  size?: string;
  value: any;
  onChange: (data: Date | null) => void;
}) => (
  <DatePicker
    selected={value}
    showTimeSelect
    showTimeSelectOnly
    timeIntervals={15}
    timeCaption="Time"
    dateFormat="h:mm aa"
    customInput={<CustomPickerInput type="time" size={size} />}
    calendarContainer={CustomCalendar}
    value={value}
    onChange={(data) => onChange(data)}
  />
);

export default InputTimePicker;
