import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { SwapRightOutlined } from '@ant-design/icons';

import { RangeTimePickerWrap, RangeSeparator, Separator } from './style';
import CustomPickerInput from '../CustomPickerInput';
import CustomCalendar from '../CustomCalendar';

const RangeTimePicker = ({ size, placeholder }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  return (
    <RangeTimePickerWrap>
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
      <RangeSeparator>
        <Separator>
          <SwapRightOutlined />
        </Separator>
      </RangeSeparator>
      <DatePicker
        selected={endDate}
        onChange={(date) => setEndDate(date)}
        showTimeSelect
        showTimeSelectOnly
        timeIntervals={15}
        timeCaption="Time"
        dateFormat="h:mm aa"
        customInput={<CustomPickerInput type="time" />}
        calendarContainer={CustomCalendar}
      />
    </RangeTimePickerWrap>
  );
};

RangeTimePicker.propTypes = {
  size: PropTypes.string,
  placeholder: PropTypes.string,
};

export default RangeTimePicker;
