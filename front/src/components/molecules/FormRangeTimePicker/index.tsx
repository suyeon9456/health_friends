import React from 'react';
import DatePicker from 'react-datepicker';
import { SwapRightOutlined } from '@ant-design/icons';
import { Control, Controller } from 'react-hook-form';

import { RangeTimePickerWrap, RangeSeparator, Separator } from '../../atoms/RangeTimePicker/style';
import { Label, Essential } from '../FormTimePicker/style';
import { CustomPickerInput, CustomCalendar } from '../../atoms';

const FormRangeTimePicker = ({ label, essential, size, control, error }: {
  label: string;
  essential?: boolean;
  size?: string;
  control?: Control<{
    startTime: Date;
    endTime: Date;
    gym: string;
    description: string;
  }, object>;
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
        name="startTime"
        render={({ field: { value, onChange } }) => (
          <DatePicker
            name="startTime"
            selected={value}
            // error={error}
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
      <RangeSeparator>
        <Separator>
          <SwapRightOutlined />
        </Separator>
      </RangeSeparator>
      <Controller
        control={control}
        name="endTime"
        render={({ field: { value, onChange } }) => {
          console.log(value);
          return (
            <DatePicker
              name="endTime"
              selected={value}
              // error={error}
              onChange={onChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="HH:mm"
              customInput={<CustomPickerInput type="time" size={size} />}
              calendarContainer={CustomCalendar}
            />
          );
        }}
      />
    </RangeTimePickerWrap>
  </div>
);

export default FormRangeTimePicker;
