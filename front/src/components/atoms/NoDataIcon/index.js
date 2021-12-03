import React from 'react';
import PropTypes from 'prop-types';
import Drawer from '../../../../public/svg/drawer.svg';

const NoDataIcon = ({ width = 100, height = 100, color = '#00000040' }) => (
  <Drawer
    width={`${width}px`}
    height={`${height}px`}
    fill={color}
  />
);

NoDataIcon.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  color: PropTypes.string,
};

export default NoDataIcon;
