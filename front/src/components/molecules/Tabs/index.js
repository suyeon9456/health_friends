import React from 'react';
import PropTypes from 'prop-types';

import { TabsWrapper } from './style';
import Tab from '../../atoms/Tab';

const Tabs = ({ tabs, size, block, selectedTab, onChangeSelectedTab }) => (
  <TabsWrapper block={block} className="tabs">
    {tabs.map((tab) => (
      <Tab
        key={tab.value}
        value={tab.value}
        size={size}
        selectedValue={selectedTab}
        onClick={onChangeSelectedTab(tab.value)}
      >
        {tab.text}
      </Tab>
    ))}
  </TabsWrapper>
);

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  size: PropTypes.string,
  block: PropTypes.bool,
  selectedTab: PropTypes.string,
  onChangeSelectedTab: PropTypes.func,
  // defaultTabValue: PropTypes.string,
};

export default Tabs;
