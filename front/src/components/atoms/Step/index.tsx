import React from 'react';
import { CheckOutlined } from '@ant-design/icons';

import { StepTitle, StepContentWrap, StepIconWrap, StepWrap, StepDescription } from './style';
import { Process, ProcessType } from '@/../@types/utils';

const Step = ({ type, step, title, description }: {
  type: ProcessType;
  step: number;
  title: string;
  description: string;
}) => (
  <StepWrap>
    <StepIconWrap
      type={type}
    >
      {type === Process.FINISHED ? <CheckOutlined /> : <span>{step}</span>}
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

export default Step;
