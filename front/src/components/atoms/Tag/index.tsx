import React from 'react';

import { StyledTag } from './style';

const Tag = ({ children, type }: {
  children: React.ReactElement;
  type: 'gender' | 'age' | 'career' | 'position';
}) => (
  <StyledTag type={type}>{children}</StyledTag>
);

export default Tag;
