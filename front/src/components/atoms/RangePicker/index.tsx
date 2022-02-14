import React, { useState } from 'react';
import DatePicker from 'react-datepicker';

import CustomRangePickerInput from '../CustomRangePickerInput';
import CustomCalendar from '../CustomCalendar';

const RangePicker = ({ type, size, placeholder }: {
  type?: string;
  size?: string;
  placeholder?: string;
}) => {
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <DatePicker
      selectsRange
      showTimeSelect
      startDate={startDate}
      endDate={endDate}
      placeholderText={placeholder}
      onChange={(update: [Date | null, Date | null]) => {
        setDateRange(update);
      }}
      // isClearable
      customInput={<CustomRangePickerInput type={type} size={size} placeholder={placeholder} />}
      calendarContainer={CustomCalendar}
    />
  );
};

export default RangePicker;
