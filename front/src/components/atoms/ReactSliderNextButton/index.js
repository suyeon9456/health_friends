import React from 'react';
import PropTypes from 'prop-types';
import { NextButton } from './style';

const ReactSliderNextButton = ({ className, style, onClick }) => (
  <NextButton
    className={className}
    style={style}
    onClick={onClick}
  />
);

ReactSliderNextButton.propTypes = {
  className: PropTypes.any,
  style: PropTypes.any,
  onClick: PropTypes.func,
};

export default ReactSliderNextButton;
