import React from 'react';

import { ErrorButtonWrap, ErrorContainer, ErrorContent, ErrorContentIcon, ErrorContentText, ErrorRemoveButton, ErrorWrap } from './style';

const Error = ({ name }: { name: string }) => (
  <ErrorContainer>
    <ErrorButtonWrap className="error-button">
      <ErrorRemoveButton />
    </ErrorButtonWrap>
    <ErrorWrap className="error">
      <ErrorContent>
        <ErrorContentIcon />
        <ErrorContentText>{name}</ErrorContentText>
      </ErrorContent>
    </ErrorWrap>
  </ErrorContainer>
);

export default Error;
