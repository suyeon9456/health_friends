import React from 'react';
import DatePicker from 'react-datepicker';

import CustomCalendar from '../CustomCalendar';
import CustomPickerInput from '../CustomPickerInput';

import { Size } from '../../../../@types/atoms';

const InputTimePicker = ({ name, size, value, onChange }: {
  name: string;
  size?: Size;
  value: Date;
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
    value={String(value)}
    onChange={(data) => onChange(data)}
  />
);

export default InputTimePicker;
