import React from 'react';
import { NextButton } from './style';

const ReactSliderNextButton = ({ className, style, onClick }: {
  className?: string,
  style?: React.CSSProperties,
  onClick?: () => void,
}) => (
  <NextButton
    className={className}
    style={style}
    onClick={onClick}
  />
);

export default ReactSliderNextButton;
