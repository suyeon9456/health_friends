import React from 'react';

import { ColContainer } from './style';

const Col = ({
  span,
  xs,
  md,
  childBlock,
  children,
}: {
  span?: number;
  xs?: number;
  md?: number;
  childBlock?: boolean;
  children: React.ReactNode;
}) => (
  <ColContainer span={span} xs={xs} md={md} childBlock={childBlock}>
    {children}
  </ColContainer>
);

export default Col;
