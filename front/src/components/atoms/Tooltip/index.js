import React from 'react';
import PropTypes from 'prop-types';

import { StyledTooltipArrow,
  StyledTooltipArrowWrap,
  StyledTooltipWrap,
  StyledTootip } from './style';

const Tooltip = ({ children }) => (
  <StyledTooltipWrap>
    <StyledTooltipArrowWrap>
      <StyledTooltipArrow />
    </StyledTooltipArrowWrap>
    <StyledTootip>{children}</StyledTootip>
  </StyledTooltipWrap>
);

Tooltip.propTypes = {
  // type: PropTypes.string,
  children: PropTypes.node,
};

export default Tooltip;
