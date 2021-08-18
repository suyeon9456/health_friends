import React from 'react';
import PropTypes from 'prop-types';

import { Label } from './style';
import ProgressBar from '../../atoms/ProgressBar';

const Progress = ({ label, percent }) => (
  <div>
    <Label>{label}: {percent}%</Label>
    <ProgressBar percent={percent} />
  </div>
);

Progress.propTypes = {
  label: PropTypes.string,
  percent: PropTypes.number,
};

export default Progress;
