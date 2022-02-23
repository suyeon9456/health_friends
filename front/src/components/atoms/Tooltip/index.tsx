import React from 'react';

import { StyledTooltipArrow, StyledTooltipArrowWrap, StyledTooltipWrap, StyledTootip } from './style';

const Tooltip = ({ children }: { children: React.ReactElement }) => (
  <StyledTooltipWrap>
    <StyledTooltipArrowWrap>
      <StyledTooltipArrow />
    </StyledTooltipArrowWrap>
    <StyledTootip>{children}</StyledTootip>
  </StyledTooltipWrap>
);

export default Tooltip;
