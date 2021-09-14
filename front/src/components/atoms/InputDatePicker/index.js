import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import CustomPickerInput from '../CustomPickerInput';
import CustomCalendar from '../CustomCalendar';

const InputDatePicker = () => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      showTimeSelect
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="time"
      dateFormat="MMMM d, yyyy h:mm aa"
      // withPortal
      customInput={<CustomPickerInput type="date" />}
      calendarContainer={CustomCalendar}
    />
  );
};

export default InputDatePicker;
