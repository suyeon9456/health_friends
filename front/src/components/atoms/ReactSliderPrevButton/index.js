import React from 'react';
import PropTypes from 'prop-types';
import { PrevButton } from './style';

const ReactSliderPrevButton = ({ className, style, onClick }) => (
  <PrevButton
    className={className}
    style={style}
    onClick={onClick}
  />
);

ReactSliderPrevButton.propTypes = {
  className: PropTypes.any,
  style: PropTypes.any,
  onClick: PropTypes.func,
};

export default ReactSliderPrevButton;
