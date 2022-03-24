import React from 'react';

import { RowContainer } from './style';

const Row = ({
  justify,
  childBlock,
  children,
}: {
  justify?: 'center';
  childBlock?: boolean;
  children?: React.ReactNode;
}) => (
  <RowContainer justify={justify} childBlock={childBlock}>
    {children}
  </RowContainer>
);

export default Row;
