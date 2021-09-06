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
  span: PropTypes.string,
  xs: PropTypes.number,
  md: PropTypes.number,
  children: PropTypes.node,
};

export default Col;
