import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

import { ButtonWrap, ConfirmBox, ConfirmContainer, ConfirmContent, ConfirmIconWrapper, ConfirmPrimaryIcon } from './style';
import { Button } from '../../atoms';

const Confirm = ({ show, message, action, onCancel }) => {
  useEffect(() => {
    if (show) {
      document.body.style.cssText = `
        top: -${window.scrollY}px;
        position: fixed; 
        overflow-y: ${window.scrollY !== 0 ? 'scroll' : 'none'};
        width: 100%;
      `;
    }
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    };
  }, [show]);
  return (
    <ConfirmContainer show={show}>
      <ConfirmBox>
        <ConfirmIconWrapper>
          <ConfirmPrimaryIcon />
        </ConfirmIconWrapper>
        <ConfirmContent>{message}</ConfirmContent>
        <ButtonWrap>
          {action}
          <Button type="warning" onClick={onCancel}>취소</Button>
        </ButtonWrap>
      </ConfirmBox>
    </ConfirmContainer>
  );
};

Confirm.propTypes = {
  show: PropTypes.bool,
  message: PropTypes.string,
  action: PropTypes.node,
  onCancel: PropTypes.func,
};

export default Confirm;
