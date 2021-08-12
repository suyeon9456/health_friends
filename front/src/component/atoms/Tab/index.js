import React from 'react';
import PropTypes from 'prop-types';
import { TabNav, TabNavText } from './style';

const Tab = ({
  children,
  value,
  size,
  block,
  selectedTabValue,
}) => (
  <TabNav
    value={value}
    size={size}
    block={block}
    selectedTabValue={selectedTabValue}
  >
    <TabNavText>{children}</TabNavText>
  </TabNav>
);

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  size: PropTypes.string,
  block: PropTypes.bool,
  // defaultActiveKey: PropTypes.string,
  selectedTabValue: PropTypes.string,
};

export default Tab;
