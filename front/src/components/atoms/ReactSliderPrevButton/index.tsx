import { SliderButtonProps } from '@/../@types/atoms';
import React from 'react';
import { PrevButton } from './style';

const ReactSliderPrevButton = ({
  className,
  style,
  onClick,
}: SliderButtonProps) => (
  <PrevButton className={className} style={style} onClick={onClick} />
);

export default ReactSliderPrevButton;
