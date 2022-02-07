import React from 'react';
import { PrevButton } from './style';

const ReactSliderPrevButton = ({ className, style, onClick }: {
  className: any,
  style: any,
  onClick: () => void,
}) => (
  <PrevButton
    className={className}
    style={style}
    onClick={onClick}
  />
);

export default ReactSliderPrevButton;
