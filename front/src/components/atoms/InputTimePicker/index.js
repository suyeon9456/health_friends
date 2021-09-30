import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import CustomCalendar from '../CustomCalendar';
import CustomPickerInput from '../CustomPickerInput';

const InputTimePicker = ({ size, value, onChange }) => (
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

InputTimePicker.propTypes = {
  size: PropTypes.string,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

export default InputTimePicker;
