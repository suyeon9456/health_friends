import React from 'react';
import DatePicker from 'react-datepicker';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';
import { CalendarOutlined, SwapRightOutlined } from '@ant-design/icons';

import { CustomCalendar, CustomPickerInput, ErrorMessage } from '../../atoms';
import { RangeSeparator, RangeTimePickerWrap, Separator } from '../../atoms/RangeTimePicker/style';
import { Essential, Label } from './style';

interface FormDateTimeType<T> {
  label: string;
  startName: Path<T>;
  endName: Path<T>;
  control?: Control<T, object>;
  size?: 'small' | 'large';
  essential?: boolean;
  error?: {
    startError: FieldError | undefined,
    endError: FieldError | undefined,
  };
}

const FormDateTimePicker = <T extends FieldValues>({
  label,
  startName,
  endName,
  control,
  size,
  essential,
  error
}: FormDateTimeType<T>) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    <RangeTimePickerWrap>
      <Controller
        control={control}
        name={startName}
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
        name={endName}
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
