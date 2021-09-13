import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined } from '@ant-design/icons';

import { ModalBody, ModalBox, ModalClose, ModalContent, ModalFooter, ModalHeader, ModalMask, ModalRoot, ModalTitle, ModalWrap } from './style';
import Button from '../../atoms/Button';

const Modal = ({ show, title, onCancel, onSubmit, children }) => {
  useEffect(() => {
    if (show) {
      document.body.style.cssText = `
        top: -${window.scrollY}px;
        position: fixed; 
        overflow-y: scroll;
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
    <ModalRoot>
      {show && <ModalMask />}
      <ModalWrap show={show}>
        <ModalBox>
          <ModalContent>
            <ModalClose>
              <CloseOutlined />
            </ModalClose>
            <ModalHeader>
              <ModalTitle>
                {title}
              </ModalTitle>
            </ModalHeader>
            <ModalBody>
              {children}
            </ModalBody>
            <ModalFooter>
              <Button onClick={onCancel}>취소</Button>
              <Button type="primary" onClick={onSubmit}>확인</Button>
            </ModalFooter>
          </ModalContent>
        </ModalBox>
      </ModalWrap>
    </ModalRoot>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default Modal;
