import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import CustomPickerInput from '../CustomPickerInput';

const InputTimePicker = () => {
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
      customInput={<CustomPickerInput type="time" />}
    />
  );
};

export default InputTimePicker;
