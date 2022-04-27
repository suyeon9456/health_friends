import React from 'react';

import { ProgressInner, Bar, ProgressOuter, ProgressWrap } from './style';

const ProgressBar = React.memo(({ percent }: { percent: number }) => (
  <ProgressWrap>
    <ProgressOuter>
      <ProgressInner>
        <Bar percent={percent} />
      </ProgressInner>
    </ProgressOuter>
  </ProgressWrap>
));

export default ProgressBar;
