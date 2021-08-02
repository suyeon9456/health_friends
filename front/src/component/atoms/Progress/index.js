import React from 'react';
import PropTypes from 'prop-types';

import { ProgressInner, ProgressBar, ProgressText, ProgressOuter, ProgressWrapper } from './style';

const Progress = ({ percent }) => (
  <ProgressWrapper>
    <ProgressOuter>
      <ProgressInner>
        <ProgressBar percent={percent} />
      </ProgressInner>
    </ProgressOuter>
    <ProgressText>{percent}%</ProgressText>
  </ProgressWrapper>
);

Progress.propTypes = {
  percent: PropTypes.number,
};

export default Progress;
