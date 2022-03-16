import { SliderButtonProps } from '@/../@types/atoms';
import React from 'react';
import { NextButton } from './style';

const ReactSliderNextButton = ({
  className,
  style,
  onClick,
}: SliderButtonProps) => (
  <NextButton className={className} style={style} onClick={onClick} />
);

export default ReactSliderNextButton;
