import React from 'react';
import PropTypes from 'prop-types';

import { RowContainer } from './style';

const Row = ({ justify, children }) => (
  <RowContainer
    justify={justify}
  >
    {children}
  </RowContainer>
);

Row.propTypes = {
  justify: PropTypes.string,
  children: PropTypes.node,
};

export default Row;
