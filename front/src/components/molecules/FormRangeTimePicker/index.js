import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { SwapRightOutlined } from '@ant-design/icons';
import { Controller } from 'react-hook-form';

import { RangeTimePickerWrap, RangeSeparator, Separator } from '../../atoms/RangeTimePicker/style';
import { Label, Essential } from '../FormTimePicker/style';
import { CustomPickerInput, CustomCalendar } from '../../atoms';

const FormRangeTimePicker = ({ label, essential, size, control, error }) => (
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
            error={error}
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
        render={({ field: { value, onChange } }) => (
          <DatePicker
            name="startTime"
            selected={value}
            error={error}
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
  </div>
);

FormRangeTimePicker.propTypes = {
  label: PropTypes.string,
  essential: PropTypes.bool,
  size: PropTypes.string,
  control: PropTypes.any,
  error: PropTypes.any,
};

export default FormRangeTimePicker;
