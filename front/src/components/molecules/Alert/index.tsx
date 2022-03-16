import React from 'react';
import { AlertProps } from '@/../@types/molecules';
import { ModalStatus } from '@/../@types/utils';

import {
  AlertBox,
  AlertContainer,
  AlertContent,
  AlertErrorIcon,
  AlertIconWrapper,
  AlertPrimaryIcon,
  AlertSuccessIcon,
  AlertWarningIcon,
} from './style';

const Alert = ({ type = ModalStatus.PRIMARY, message, action }: AlertProps) => (
  <AlertContainer>
    <AlertBox>
      <AlertIconWrapper>
        {
          {
            [ModalStatus.ERROR]: <AlertErrorIcon />,
            [ModalStatus.WARNING]: <AlertWarningIcon />,
            [ModalStatus.SUCCESS]: <AlertSuccessIcon />,
            [ModalStatus.PRIMARY]: <AlertPrimaryIcon />,
          }[type]
        }
      </AlertIconWrapper>
      <AlertContent>{message}</AlertContent>
      {action}
    </AlertBox>
  </AlertContainer>
);

export default Alert;
