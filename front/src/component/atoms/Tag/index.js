import React from 'react';
import PropTypes from 'prop-types';

import { StyledTag } from './style';

const Tag = ({ children, type }) => (
  <StyledTag type={type}>{children}</StyledTag>
);

Tag.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node,
};

export default Tag;
