import React, { Dispatch, SetStateAction } from 'react';

import { Essential, Label } from './style';
import RangePicker from '../../atoms/RangePicker';
import InputDatePicker from '../../atoms/InputDatePicker';

const FormDatePicker = ({ label, type, placeholder, size, essential, startDate, setStartDate }: {
  label: string;
  type?: string;
  placeholder?: string;
  size?: string;
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
      ? <RangePicker size={size} placeholder={placeholder} />
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
