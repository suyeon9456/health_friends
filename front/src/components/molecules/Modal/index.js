import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import * as _ from 'lodash';
import { CloseOutlined } from '@ant-design/icons';

import { ModalBody, ModalBox, ModalClose, ModalContent, ModalFooter, ModalHeader, ModalMask, ModalRoot, ModalTitle, ModalWrap } from './style';
import Button from '../../atoms/Button';
import { Form } from '../../atoms';

const Modal = ({ show,
  title,
  onCancel,
  onSubmit,
  className,
  children,
  actions,
  form,
  footer }) => {
  useEffect(() => {
    console.log('actions', actions);
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
    <ModalRoot className={className}>
      {show && <ModalMask />}
      <ModalWrap show={show}>
        <ModalBox>
          <ModalContent>
            <ModalClose onClick={onCancel}>
              <CloseOutlined />
            </ModalClose>
            <ModalHeader>
              <ModalTitle>
                {title}
              </ModalTitle>
            </ModalHeader>
            {form
              ? (
                <Form onSubmit={onSubmit}>
                  <ModalBody>
                    {children}
                  </ModalBody>
                  {(footer || !_.isEmpty(actions)) && (
                    <ModalFooter>
                      {_.isEmpty(actions)
                        ? (
                          <>
                            <Button onClick={onCancel}>취소</Button>
                            <Button type="primary" submit>확인</Button>
                          </>
                        )
                        : actions.map((action) => (
                          <Button
                            key={action.id}
                            type={action.type}
                            onClick={action.onClick}
                          >
                            {action.title}
                          </Button>
                        ))}
                    </ModalFooter>
                  )}
                </Form>
              )
              : (
                <>
                  <ModalBody>
                    {children}
                  </ModalBody>
                  {(footer || !_.isEmpty(actions)) && (
                    <ModalFooter>
                      {_.isEmpty(actions)
                        ? (
                          <>
                            <Button onClick={onCancel}>취소</Button>
                            <Button type="primary" onClick={onSubmit}>확인</Button>
                          </>
                        )
                        : actions.map((action) => (
                          <Button
                            key={action.id}
                            type={action.type}
                            onClick={action.onClick}
                          >
                            {action.title}
                          </Button>
                        ))}
                    </ModalFooter>
                  )}
                </>
              )}
          </ModalContent>
        </ModalBox>
      </ModalWrap>
    </ModalRoot>
  );
};

Modal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.node,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  actions: PropTypes.array,
  form: PropTypes.bool,
  footer: PropTypes.bool.isRequired,
};

export default Modal;
