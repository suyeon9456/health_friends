import React from 'react';
import PropTypes from 'prop-types';

const Form = ({ children, onSubmit, ...props }: {
  children: React.ReactNode,
  onSubmit: () => void
}) => (
  <form onSubmit={onSubmit} {...props}>
    {children}
  </form>
);

Form.propTypes = {
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
  props: PropTypes.any,
};

export default Form;
