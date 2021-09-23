import React from 'react';
import PropTypes from 'prop-types';
import { CheckOutlined } from '@ant-design/icons';

import { StepTitle, StepContentWrap, StepIconWrap, StepWrap, StepDescription } from './style';

const Step = ({ type, step, title, description, process }) => (
  <StepWrap>
    <StepIconWrap
      type={type}
    >
      {type === 'finished' ? <CheckOutlined /> : <span>{step}</span>}
    </StepIconWrap>
    <StepContentWrap>
      <StepTitle type={type}>
        {title}
      </StepTitle>
      <StepDescription>
        {description}
      </StepDescription>
    </StepContentWrap>
  </StepWrap>
);

Step.propTypes = {
  type: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  process: PropTypes.number.isRequired,
};

export default Step;
