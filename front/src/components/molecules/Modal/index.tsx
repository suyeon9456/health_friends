import React, { useEffect } from 'react';
import isEmpty from 'lodash/isEmpty';
import { BiX } from 'react-icons/bi';

import { ButtonType, ButtonTypeT } from '@/../@types/constant';
import {
  ModalBody,
  ModalBox,
  ModalClose,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalMask,
  ModalRoot,
  ModalTitle,
  ModalWrap,
} from './style';
import { Form, Button, Icon } from '../../atoms';

const Modal = ({
  show,
  title,
  onCancel,
  onSubmit,
  className,
  children,
  actions,
  form,
  footer,
  widthSize,
  isNotModalMask,
}: {
  show?: boolean;
  title: React.ReactNode;
  className?: string;
  children: React.ReactElement;
  actions?:
    | ReadonlyArray<{
        id: string;
        title?: string;
        type?: ButtonTypeT;
        onClick: () => void;
      }>
    | readonly []
    | Array<{
        id: string;
        title?: string;
        type?: ButtonTypeT;
        onClick: () => void;
      }>
    | [];
  form?: boolean;
  footer?: boolean;
  widthSize?: number;
  isNotModalMask?: boolean;
  onCancel: (e?: React.MouseEvent<HTMLElement>) => void;
  onSubmit?: () => void;
}) => {
  useEffect(() => {
    document.body.style.cssText = `
    top: -${window.scrollY}px;
    position: fixed; 
    overflow-y: ${window.scrollY !== 0 ? 'scroll' : 'none'};
    width: 100%;
  `;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    };
  }, []);
  return (
    <ModalRoot className={className}>
      {!isNotModalMask && <ModalMask />}
      <ModalWrap show={show}>
        <ModalBox widthSize={widthSize}>
          <ModalContent>
            <ModalClose onClick={onCancel}>
              <Icon icon={<BiX />} />
            </ModalClose>
            <ModalHeader>
              <ModalTitle>{title}</ModalTitle>
            </ModalHeader>
            {form ? (
              <Form onSubmit={onSubmit}>
                <ModalBody>{children}</ModalBody>
                {(footer ?? !isEmpty(actions)) && (
                  <ModalFooter>
                    {isEmpty(actions) ? (
                      <>
                        <Button onClick={onCancel}>취소</Button>
                        <Button type={ButtonType.PRIMARY} submit>
                          확인
                        </Button>
                      </>
                    ) : (
                      actions?.map((action) => (
                        <Button
                          key={action.id}
                          type={action.type}
                          onClick={action.onClick}
                        >
                          {action.title}
                        </Button>
                      ))
                    )}
                  </ModalFooter>
                )}
              </Form>
            ) : (
              <>
                <ModalBody>{children}</ModalBody>
                {(footer ?? !isEmpty(actions)) && (
                  <ModalFooter>
                    {isEmpty(actions) ? (
                      <>
                        <Button onClick={onCancel}>취소</Button>
                        <Button type={ButtonType.PRIMARY} onClick={onSubmit}>
                          확인
                        </Button>
                      </>
                    ) : (
                      actions?.map((action) => (
                        <Button
                          key={action.id}
                          type={action.type}
                          onClick={action.onClick}
                        >
                          {action.title}
                        </Button>
                      ))
                    )}
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

export default Modal;
