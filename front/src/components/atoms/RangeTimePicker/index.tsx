import React from 'react';
import DatePicker from 'react-datepicker';

import { RangePickerProps } from '@/../@types/atoms';
import { PickerType } from '@/../@types/constant';
import { BiRightArrowAlt } from 'react-icons/bi';
import { RangeTimePickerWrap, RangeSeparator, Separator } from './style';
import CustomPickerInput from '../CustomPickerInput';
import CustomCalendar from '../CustomCalendar';
import Icon from '../Icon';

const RangeTimePicker = ({
  size,
  startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate,
}: RangePickerProps) => (
  <RangeTimePickerWrap>
    <DatePicker
      selected={startDate}
      onChange={(data) => onChangeStartDate(data)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={15}
      timeCaption="Time"
      dateFormat="HH:mm"
      customInput={<CustomPickerInput type={PickerType.TIME} size={size} />}
      calendarContainer={CustomCalendar}
    />
    <RangeSeparator>
      <Separator>
        <Icon icon={<BiRightArrowAlt />} />
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
      customInput={<CustomPickerInput type={PickerType.TIME} size={size} />}
      calendarContainer={CustomCalendar}
    />
  </RangeTimePickerWrap>
);

export default RangeTimePicker;
