import React from 'react';
import { BiCheck } from 'react-icons/bi';

import { Process, ProcessType } from '@/../@types/constant';
import {
  StepTitle,
  StepContentWrap,
  StepIconWrap,
  StepWrap,
  StepDescription,
} from './style';
import Icon from '../Icon';

const Step = ({
  type,
  step,
  title,
  description,
}: {
  type: ProcessType;
  step: number;
  title: string;
  description: string;
}) => (
  <StepWrap>
    <StepIconWrap type={type}>
      {type === Process.FINISHED ? (
        <Icon icon={<BiCheck />} />
      ) : (
        <span>{step}</span>
      )}
    </StepIconWrap>
    <StepContentWrap>
      <StepTitle type={type}>{title}</StepTitle>
      <StepDescription>{description}</StepDescription>
    </StepContentWrap>
  </StepWrap>
);

export default React.memo(Step);
