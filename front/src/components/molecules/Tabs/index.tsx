import React from 'react';

import { Tab } from '../../atoms';
import { TabsWrapper } from './style';

const Tabs = ({ tabs, block, selectedTab, onChangeSelectedTab }: {
  tabs: Array<{ value: string; size: string; text: string }>,
  block: boolean,
  selectedTab: string,
  onChangeSelectedTab: (props: string) => void
}) => (
  <TabsWrapper block={block} className="tabs">
    {tabs.map((tab) => (
      <Tab
        key={tab.value}
        value={tab.value}
        selectedValue={selectedTab}
        onClick={() => onChangeSelectedTab(tab.value)}
      >
        {tab.text}
      </Tab>
    ))}
  </TabsWrapper>
);

export default Tabs;
