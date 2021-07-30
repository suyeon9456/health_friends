import React from 'react';
import PropTypes from 'prop-types';

import { StyledTooltipArrow, StyledTooltipArrowWrapper, StyledTooltipWrapper, StyledTootip } from './style';

const Tooltip = ({ children, type }) => (
  <StyledTooltipWrapper>
    <StyledTooltipArrowWrapper>
      <StyledTooltipArrow />
    </StyledTooltipArrowWrapper>
    <StyledTootip>{children}</StyledTootip>
  </StyledTooltipWrapper>
);

Tooltip.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
};

export default Tooltip;
