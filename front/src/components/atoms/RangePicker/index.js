import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import CustomRangePickerInput from '../CustomRangePickerInput';

const RangePicker = ({ type, size, placeholder }) => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  return (
    <DatePicker
      selectsRange
      startDate={startDate}
      endDate={endDate}
      placeholderText={placeholder}
      onChange={(update) => {
        setDateRange(update);
      }}
      // isClearable
      withPortal
      customInput={<CustomRangePickerInput type={type} size={size} placeholder={placeholder} />}
    />
  );
};

RangePicker.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  placeholder: PropTypes.string,
};

export default RangePicker;
