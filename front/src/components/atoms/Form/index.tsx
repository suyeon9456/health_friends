import React from 'react';

const Form = ({ children, onSubmit, encType, ...props }: {
  children: React.ReactNode;
  encType?: string;
  onSubmit?: () => void;
}) => (
  <form onSubmit={onSubmit} encType={encType} {...props}>
    {children}
  </form>
);

export default Form;
