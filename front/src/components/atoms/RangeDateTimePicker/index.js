import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { SwapRightOutlined } from '@ant-design/icons';

import { RangeTimePickerWrap, RangeSeparator, Separator } from './style';
import CustomPickerInput from '../CustomPickerInput';
import CustomCalendar from '../CustomCalendar';

const RangeDateTimePicker = ({ size, startDate, endDate, onChangeStartDate, onChangeEndDate }) => (
  <RangeTimePickerWrap>
    <DatePicker
      selected={startDate}
      onChange={(data) => onChangeStartDate(data)}
      showTimeSelect
      // showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      timeFormat="HH:mm"
      dateFormat="yyyy년 MM월 dd일 HH:mm"
      // placeholderText={placeholder}
      customInput={<CustomPickerInput type="date" size={size} />}
      calendarContainer={CustomCalendar}
    />
    <RangeSeparator>
      <Separator>
        <SwapRightOutlined />
      </Separator>
    </RangeSeparator>
    <DatePicker
      selected={endDate}
      onChange={(data) => onChangeEndDate(data)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="h:mm aa"
      customInput={<CustomPickerInput type="time" size={size} />}
      calendarContainer={CustomCalendar}
    />
  </RangeTimePickerWrap>
);

RangeDateTimePicker.propTypes = {
  size: PropTypes.string,
  startDate: PropTypes.any,
  onChangeStartDate: PropTypes.func,
  endDate: PropTypes.any,
  onChangeEndDate: PropTypes.func,
};

export default RangeDateTimePicker;
