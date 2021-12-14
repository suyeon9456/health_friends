import React from 'react';
import PropTypes from 'prop-types';
import { BasicCheckBoxInner, BasicCheckBox, BasicCheckBoxWrap, Label, BasicCheckBoxText } from './style';

const CheckBox = ({ label, value, onChange, checked }) => (
  <Label>
    <BasicCheckBoxWrap>
      <BasicCheckBox type="checkbox" value={value} checked={checked} onChange={onChange} />
      <BasicCheckBoxInner checked={checked} />
    </BasicCheckBoxWrap>
    <BasicCheckBoxText>{label}</BasicCheckBoxText>
  </Label>
);

CheckBox.propTypes = {
  label: PropTypes.string,
  value: PropTypes.node,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
};

export default CheckBox;
