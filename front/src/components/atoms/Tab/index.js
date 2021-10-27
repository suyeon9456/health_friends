import React from 'react';
import PropTypes from 'prop-types';
import { TabNav, TabNavText } from './style';

const Tab = ({
  children,
  value,
  size,
  selectedValue,
  onClick,
}) => (
  <TabNav
    value={value}
    size={size}
    selectedValue={selectedValue}
    onClick={onClick}
  >
    <TabNavText>{children}</TabNavText>
  </TabNav>
);

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.number.isRequired,
  size: PropTypes.string,
  selectedValue: PropTypes.string,
  onClick: PropTypes.func,
};

export default Tab;
