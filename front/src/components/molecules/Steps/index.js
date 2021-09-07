import React from 'react';
import PropTypes from 'prop-types';

import { StepsWrapper } from './style';
import Step from '../../atoms/Step';

const Steps = ({ steps }) => (
  <StepsWrapper>
    {steps.map((step) => (
      <Step
        key={step.id}
        type={step.type}
        step={step.step}
        title={step.title}
        description={step.description}
      />
    ))}
  </StepsWrapper>
);

Steps.propTypes = {
  steps: PropTypes.array.isRequired,
};

export default Steps;
