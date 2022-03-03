import React from 'react';

import { RowContainer } from './style';

const Row = ({ justify, children }: {
  justify?: 'center';
  children?: React.ReactNode;
}) => (
  <RowContainer
    justify={justify}
  >
    {children}
  </RowContainer>
);

export default Row;
