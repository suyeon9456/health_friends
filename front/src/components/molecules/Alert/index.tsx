import { AlertProps } from '@/../@types/molecules';
import React from 'react';

import { AlertBox, AlertContainer, AlertContent, AlertErrorIcon, AlertIconWrapper, AlertPrimaryIcon, AlertSuccessIcon, AlertWarningIcon } from './style';

const Alert = ({ show, type, message, action }: AlertProps) => (
  <AlertContainer show={show}>
    <AlertBox>
      <AlertIconWrapper>
        {(
          () => {
            if (type === 'error') {
              return <AlertErrorIcon />;
            }
            if (type === 'warning') {
              return <AlertWarningIcon />;
            }
            if (type === 'success') {
              return <AlertSuccessIcon />;
            }
            return <AlertPrimaryIcon />;
          }
        )()}
      </AlertIconWrapper>
      <AlertContent>{message}</AlertContent>
      {action}
    </AlertBox>
  </AlertContainer>
);

export default Alert;
