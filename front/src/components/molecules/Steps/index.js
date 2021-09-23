import React from 'react';
import PropTypes from 'prop-types';

import { StepsWrapper } from './style';
import Step from '../../atoms/Step';

const Steps = ({ steps, process }) => (
  <StepsWrapper>
    {steps.map((step) => {
      let type = 'wait';
      if (step.step === process) {
        type = 'process';
      } else if (step.step < process) {
        type = 'finished';
      } else {
        type = 'wait';
      }
      return (
        <Step
          key={step.id}
          type={type}
          step={step.step}
          title={step.title}
          description={step.description}
          process={process}
        />
      );
    })}
  </StepsWrapper>
);

Steps.propTypes = {
  steps: PropTypes.array.isRequired,
  process: PropTypes.number.isRequired,
};

export default Steps;
