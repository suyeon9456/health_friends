import React from 'react';
import PropTypes from 'prop-types';

import { ProgressInner, Bar, ProgressOuter, ProgressWrapper } from './style';

const ProgressBar = ({ percent }) => (
  <ProgressWrapper>
    <ProgressOuter>
      <ProgressInner>
        <Bar percent={percent} />
      </ProgressInner>
    </ProgressOuter>
    {/* <ProgressText>{percent}%</ProgressText> */}
  </ProgressWrapper>
);

ProgressBar.propTypes = {
  percent: PropTypes.number,
};

export default ProgressBar;
