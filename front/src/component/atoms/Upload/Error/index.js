import React from 'react';
import PropTypes from 'prop-types';

import { ErrorButtonWrapper, ErrorContainer, ErrorContent, ErrorContentIcon, ErrorContentText, ErrorRemoveButton, ErrorWrapper } from './style';

const Error = ({ name }) => (
  <ErrorContainer>
    <ErrorButtonWrapper className="error-button">
      <ErrorRemoveButton />
    </ErrorButtonWrapper>
    <ErrorWrapper className="error">
      <ErrorContent>
        <ErrorContentIcon />
        <ErrorContentText>{name}</ErrorContentText>
      </ErrorContent>
    </ErrorWrapper>
  </ErrorContainer>
);

Error.propTypes = {
  name: PropTypes.string,
};

export default Error;
