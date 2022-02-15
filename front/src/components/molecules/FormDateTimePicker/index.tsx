import React from 'react';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import { CalendarOutlined, SwapRightOutlined } from '@ant-design/icons';

import { CustomCalendar, CustomPickerInput, ErrorMessage } from '../../atoms';
import { RangeSeparator, RangeTimePickerWrap, Separator } from '../../atoms/RangeTimePicker/style';
import { Essential, Label } from './style';

const FormDateTimePicker = ({ label, control, size, essential, error }: {
  label: string;
  control?: any;
  size?: string;
  essential?: boolean;
  error?: any;
}) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    <RangeTimePickerWrap>
      <Controller
        control={control}
        name="startDate"
        render={({ field: { value, onChange } }) => (
          <DatePicker
            selected={value}
            onChange={onChange}
            showTimeSelect
            timeIntervals={15}
            timeCaption="Time"
            timeFormat="HH:mm"
            dateFormat="yyyy년 MM월 dd일 HH:mm"
            customInput={<CustomPickerInput type="date" size={size} />}
            calendarContainer={CustomCalendar}
          />
        )}
      />
      <RangeSeparator>
        <Separator>
          <SwapRightOutlined />
        </Separator>
      </RangeSeparator>
      <Controller
        control={control}
        name="endDate"
        render={({ field: { value, onChange } }) => (
          <DatePicker
            selected={value}
            onChange={onChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            customInput={<CustomPickerInput type="time" size={size} />}
            calendarContainer={CustomCalendar}
          />
        )}
      />
    </RangeTimePickerWrap>
    {error && (
      <ErrorMessage>
        <CalendarOutlined /> {error.startError?.message || error.endError}
      </ErrorMessage>
    )}
  </div>
);

export default FormDateTimePicker;
