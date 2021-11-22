import React from 'react';
import PropTypes from 'prop-types';
import { ColContainer } from './style';

const Col = ({ span, xs, md, children }) => (
  <ColContainer
    span={span}
    xs={xs}
    md={md}
  >
    {children}
  </ColContainer>
);

Col.propTypes = {
  span: PropTypes.node,
  xs: PropTypes.number,
  md: PropTypes.node,
  children: PropTypes.node,
};

export default Col;
