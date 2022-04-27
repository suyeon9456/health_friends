import React from 'react';
import { ErrorWrap } from './style';

const ErrorMessage = React.memo(
  ({ children }: { children: React.ReactNode }) => (
    <ErrorWrap>{children}</ErrorWrap>
  )
);

export default ErrorMessage;
