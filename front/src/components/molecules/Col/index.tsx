import React from 'react';

import { ColContainer } from './style';

const Col = ({
  span,
  xs,
  md,
  children,
}: {
  span?: number;
  xs?: number;
  md?: number;
  children: React.ReactNode;
}) => (
  <ColContainer span={span} xs={xs} md={md}>
    {children}
  </ColContainer>
);

export default Col;
