import React from 'react';

const Form = ({ children, onSubmit, ...props }: {
  children: React.ReactNode;
  encType?: string;
  onSubmit?: () => void;
}) => (
  <form onSubmit={onSubmit} {...props}>
    {children}
  </form>
);

export default Form;
