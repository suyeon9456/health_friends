import React from 'react';
import PropTypes from 'prop-types';
import { ErrorWrap } from './style';

const ErrorMessage = ({ children }) => (
  <ErrorWrap>
    { children }
  </ErrorWrap>
);

ErrorMessage.propTypes = {
  children: PropTypes.node,
};

export default ErrorMessage;
