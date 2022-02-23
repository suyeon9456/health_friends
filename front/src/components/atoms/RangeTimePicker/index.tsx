import React from 'react';
import DatePicker from 'react-datepicker';
import { SwapRightOutlined } from '@ant-design/icons';

import { RangeTimePickerWrap, RangeSeparator, Separator } from './style';
import CustomPickerInput from '../CustomPickerInput';
import CustomCalendar from '../CustomCalendar';

const RangeTimePicker = ({ size, startDate, endDate, onChangeStartDate, onChangeEndDate }: {
  size?: 'small' | 'large';
  startDate: Date;
  endDate: Date;
  onChangeStartDate: (data: Date | null) => void;
  onChangeEndDate: (data: Date | null) => void;
}) => (
  <RangeTimePickerWrap>
    <DatePicker
      selected={startDate}
      onChange={(data) => onChangeStartDate(data)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="HH:mm"
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
      onChange={onChangeEndDate}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="HH:mm"
      customInput={<CustomPickerInput type="time" size={size} />}
      calendarContainer={CustomCalendar}
    />
  </RangeTimePickerWrap>
);

export default RangeTimePicker;
