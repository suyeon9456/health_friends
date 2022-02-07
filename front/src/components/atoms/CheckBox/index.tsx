import React from 'react';
import { BasicCheckBoxInner, BasicCheckBox, BasicCheckBoxWrap, Label, BasicCheckBoxText } from './style';

const CheckBox = ({ label, value, onChange, checked }: {
  label: string,
  value: string,
  onChange: void,
  checked: boolean,
}) => (
  <Label>
    <BasicCheckBoxWrap>
      <BasicCheckBox
        type="checkbox"
        value={value}
        checked={checked}
        onChange={() => onChange}
      />
      <BasicCheckBoxInner checked={checked} />
    </BasicCheckBoxWrap>
    <BasicCheckBoxText>{label}</BasicCheckBoxText>
  </Label>
);

export default CheckBox;
