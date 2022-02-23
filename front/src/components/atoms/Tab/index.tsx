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
  onClick: () => void;
}) => (
  <TabNav
    key={value}
    value={value}
    selectedValue={selectedValue}
    onClick={onClick}
  >
    <TabNavText>{children}</TabNavText>
  </TabNav>
);

export default Tab;
