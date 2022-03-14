import React from 'react';
import ReactDOM from 'react-dom';

const ModalPortal = ({ children }: { 
  children: React.ReactNode,
 }) => {
  const el = typeof window !== "undefined" && document.querySelector('#modal');
  return el && children ? ReactDOM.createPortal(children, el) : null;
};

export default ModalPortal;
