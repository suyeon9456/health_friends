import React from 'react';

import { Process, ProcessType, SignupMenuType } from '@/../@types/utils';
import { StepsWrapper } from './style';
import { Step } from '../../atoms';

const Steps = ({
  steps,
  process,
  target,
}: {
  steps: ReadonlyArray<{
    readonly step: SignupMenuType;
    readonly title: string;
    readonly description: string;
  }>;
  process: SignupMenuType;
  target: number;
}) => {
  return (
    <StepsWrapper>
      {steps.map(({ step, title, description }, index) => {
        console.log('test', target);
        let type: ProcessType = Process.WAIT;
        if (index === target) {
          type = Process.PROCESS;
        }
        if (step !== process && index) {
          type = Process.FINISHED;
        }
        return (
          <Step
            key={step}
            type={type}
            step={index + 1}
            title={title}
            description={description}
          />
        );
      })}
    </StepsWrapper>
  );
};

export default Steps;
