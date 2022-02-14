import React from 'react';
import { NextButton } from './style';

const ReactSliderNextButton = ({ className, style, onClick }: {
  className?: any,
  style?: any,
  onClick?: () => void,
}) => (
  <NextButton
    className={className}
    style={style}
    onClick={onClick}
  />
);

export default ReactSliderNextButton;
