import React from 'react';
import Spinner from '@/../public/svg/Spinner.svg';
import styled from 'styled-components';

const SpinnerBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
`;

const SpinnerWrap = styled.div`
  width: 100%;
  background-color: #ffffff;
  height: 100%;
  display: flex;
  align-items: center;
`;

const SpinnerIcon = ({
  width = 50,
  height = 50,
}: {
  width?: number;
  height?: number;
}) => (
  <SpinnerBox>
    <SpinnerWrap>
      <Spinner width={`${width}px`} height={`${height}px`} />
    </SpinnerWrap>
  </SpinnerBox>
);

export default React.memo(SpinnerIcon);
