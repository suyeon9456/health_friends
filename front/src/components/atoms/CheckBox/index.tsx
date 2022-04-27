import React from 'react';

import { CheckBoxProps } from '@/../@types/atoms';
import {
  BasicCheckBoxInner,
  BasicCheckBox,
  BasicCheckBoxWrap,
  Label,
  BasicCheckBoxText,
} from './style';

const CheckBox = React.memo(
  ({ label, value, onChange, checked }: CheckBoxProps) => (
    <Label>
      <BasicCheckBoxWrap>
        <BasicCheckBox
          type="checkbox"
          value={value}
          checked={checked}
          onChange={onChange}
        />
        <BasicCheckBoxInner checked={checked} />
      </BasicCheckBoxWrap>
      <BasicCheckBoxText>{label}</BasicCheckBoxText>
    </Label>
  )
);

export default CheckBox;
