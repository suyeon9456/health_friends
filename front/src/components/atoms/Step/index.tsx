import React from 'react';
import { CheckOutlined } from '@ant-design/icons';

import { StepTitle, StepContentWrap, StepIconWrap, StepWrap, StepDescription } from './style';

const Step = ({ type, step, title, description }: {
  type: string,
  step: number,
  title: string,
  description: string
}) => (
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

export default Step;
