import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';

import { TabsWrapper } from './style';
import Tab from '../../atoms/Tab';

const Tabs = ({ tabs, size, block, defaultTabValue }) => {
  const [selectedValue, setSelectedValue] = useState(defaultTabValue);

  const onClickTab = useCallback((value) => () => {
    setSelectedValue(value);
  }, []);

  return (
    <TabsWrapper block={block}>
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          size={size}
          selectedValue={selectedValue}
          onClick={onClickTab(tab.value)}
        >
          {tab.text}
        </Tab>
      ))}
    </TabsWrapper>
  );
};

Tabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  size: PropTypes.string,
  block: PropTypes.bool,
  defaultTabValue: PropTypes.string,
};

export default Tabs;
