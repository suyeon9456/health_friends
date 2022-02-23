import React, { Dispatch, SetStateAction } from 'react';

import { Essential, Label } from './style';
import RangePicker from '../../atoms/RangePicker';
import InputDatePicker from '../../atoms/InputDatePicker';

const FormDatePicker = ({ label, type, placeholder, essential, startDate, setStartDate }: {
  label: string;
  type?: 'range';
  placeholder?: string;
  essential?: boolean;
  startDate: Date;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
}) => (
  <div>
    <Label>
      {label}
      {essential && <Essential />}
    </Label>
    {type === 'range'
      ? <RangePicker placeholder={placeholder} />
      : (
        <InputDatePicker
          placeholder={placeholder}
          startDate={startDate}
          setStartDate={setStartDate}
        />
      )}
  </div>
);

export default FormDatePicker;
