import React from 'react';
import PropTypes from 'prop-types';

import { AlertBox, AlertContainer, AlertContent, AlertErrorIcon, AlertIconWrapper, AlertPrimaryIcon, AlertSuccessIcon, AlertWarningIcon } from './style';

const Alert = ({ type, message, action }) => (
  <AlertContainer>
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

Alert.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
  action: PropTypes.node,
};

export default Alert;
