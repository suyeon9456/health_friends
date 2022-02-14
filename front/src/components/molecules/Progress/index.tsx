import React from 'react';

import { Label } from './style';
import ProgressBar from '../../atoms/ProgressBar';

const Progress = ({ label, percent }: {
  label: string,
  percent: number,
}) => (
  <div>
    <Label>{label}: {percent}%</Label>
    <ProgressBar percent={percent} />
  </div>
);

export default Progress;
