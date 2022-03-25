import React from 'react';

import { TabNav, TabNavText } from './style';

const Tab = ({
  children,
  value,
  selectedValue,
  onClick,
}: {
  children: React.ReactNode;
  value: string;
  selectedValue: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
}) => (
  <TabNav
    key={value}
    type="button"
    value={value}
    selectedValue={selectedValue}
    onClick={onClick}
  >
    <TabNavText>{children}</TabNavText>
  </TabNav>
);

export default Tab;
