import React from 'react';
import PropTypes from 'prop-types';

import { ProgressInner, Bar, ProgressOuter, ProgressWrap } from './style';

const ProgressBar = ({ percent }) => (
  <ProgressWrap>
    <ProgressOuter>
      <ProgressInner>
        <Bar percent={percent} />
      </ProgressInner>
    </ProgressOuter>
  </ProgressWrap>
);

ProgressBar.propTypes = {
  percent: PropTypes.number,
};

export default ProgressBar;
