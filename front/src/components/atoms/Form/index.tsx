import React from 'react';
import { FormProps } from '@/../@types/atoms';

const Form = ({ children, onSubmit, encType, ...props }: FormProps) => (
  <form onSubmit={onSubmit} encType={encType} {...props}>
    {children}
  </form>
);

export default Form;
