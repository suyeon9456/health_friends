import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

import CustomCalendar from '../CustomCalendar';
import CustomPickerInput from '../CustomPickerInput';

const InputTimePicker = ({ size }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
      customInput={<CustomPickerInput type="time" size={size} />}
      calendarContainer={CustomCalendar}
    />
  );
};

InputTimePicker.propTypes = {
  size: PropTypes.string,
};

export default InputTimePicker;
