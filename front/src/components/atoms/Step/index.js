import React from 'react';
import PropTypes from 'prop-types';
import { CheckOutlined } from '@ant-design/icons';

import { StepTitle, StepContentWrapper, StepIconWrapper, StepWrapper, StepDescription } from './style';

const Step = ({ type, step, title, description }) => (
  <StepWrapper>
    <StepIconWrapper
      type={type}
    >
      {type === 'finished' ? <CheckOutlined /> : <span>{step}</span>}
    </StepIconWrapper>
    <StepContentWrapper>
      <StepTitle>
        {title}
      </StepTitle>
      <StepDescription>
        {description}
      </StepDescription>
    </StepContentWrapper>
  </StepWrapper>
);

Step.propTypes = {
  type: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
};

export default Step;
