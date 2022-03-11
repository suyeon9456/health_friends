import React from 'react';
import DatePicker from 'react-datepicker';
import { SwapRightOutlined } from '@ant-design/icons';
import { Control, Controller, FieldError, FieldValues, Path } from 'react-hook-form';

import { RangeTimePickerWrap, RangeSeparator, Separator } from '../../atoms/RangeTimePicker/style';
import { Label, Essential } from '../FormTimePicker/style';
import { CustomPickerInput, CustomCalendar } from '../../atoms';
import { BaseSizeTypeT, PickerType } from '@/../@types/utils';

interface FormRangeTimePickerType<T> {
  label: string;
  essential?: boolean;
  startName: Path<T>;
  endName: Path<T>;
  size?: BaseSizeTypeT;
  control?: Control<T, object>;
  error?: FieldError | undefined;
}

const FormRangeTimePicker = <T extends FieldValues>({
  label,
  startName,
  endName,
  essential,
  size,
  control,
  error
}: FormRangeTimePickerType<T>) => (
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
            name={startName}
            selected={value}
            onChange={onChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="HH:mm"
            customInput={<CustomPickerInput type={PickerType.TIME} size={size} />}
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
        render={({ field: { value, onChange } }) => {
          console.log(value);
          return (
            <DatePicker
              name={endName}
              selected={value}
              onChange={onChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="HH:mm"
              customInput={<CustomPickerInput type={PickerType.TIME} size={size} />}
              calendarContainer={CustomCalendar}
            />
          );
        }}
      />
    </RangeTimePickerWrap>
  </div>
);

export default FormRangeTimePicker;
