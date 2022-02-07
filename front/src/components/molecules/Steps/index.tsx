import React from 'react';

import { StepsWrapper } from './style';
import { Step } from '../../atoms';

const Steps = ({ steps, process }: {
  steps: Array<{ step: number; id: number | string; title: string; description: string }>,
  process: number,
}) => (
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
        />
      );
    })}
  </StepsWrapper>
);

export default Steps;
