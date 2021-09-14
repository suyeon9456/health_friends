import React from 'react';
import PropTypes from 'prop-types';

import { ErrorButtonWrap, ErrorContainer, ErrorContent, ErrorContentIcon, ErrorContentText, ErrorRemoveButton, ErrorWrap } from './style';

const Error = ({ name }) => (
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

Error.propTypes = {
  name: PropTypes.string,
};

export default Error;
