import React from 'react';

import { StyledTag } from './style';

const Tag = ({ children, type }: {
  children: React.ReactNode,
  type: string
}) => (
  <StyledTag type={type}>{children}</StyledTag>
);

export default Tag;
