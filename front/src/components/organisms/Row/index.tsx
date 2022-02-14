import React from 'react';

import { RowContainer } from './style';

const Row = ({ justify, children }: {
  justify?: string;
  children?: React.ReactNode;
}) => (
  <RowContainer
    justify={justify}
  >
    {children}
  </RowContainer>
);

export default Row;
