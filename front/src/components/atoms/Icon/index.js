import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ icon }) => (
  <span className="icon">
    {icon}
  </span>
);

Icon.propTypes = {
  icon: PropTypes.node.isRequired,
};

export default Icon;
