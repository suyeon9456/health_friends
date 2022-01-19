import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';
import { Controller } from 'react-hook-form';
import { SwapRightOutlined } from '@ant-design/icons';

import { Essential, Label } from './style';
import { CustomCalendar, CustomPickerInput } from '../../atoms';
import { RangeSeparator, RangeTimePickerWrap, Separator } from '../../atoms/RangeTimePicker/style';

const FormDateTimePicker = ({ label, control, size, essential }) => (
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
  </div>
);

FormDateTimePicker.propTypes = {
  label: PropTypes.string,
  size: PropTypes.string,
  essential: PropTypes.bool,
  control: PropTypes.any,
  // error: PropTypes.any,
};

export default FormDateTimePicker;
