import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { modalSelector } from '@/../reducers/user';
import ModalPortal from '../ModalPortal';

const GlobalCustomModal = ({
  id,
  children,
}: {
  id: string | number;
  children: React.ReactElement;
}) => {
  const customModals = useSelector(modalSelector);
  return (
    <>
      <ModalPortal>
        {customModals?.map(
          (modalId: string | number) =>
            modalId === id && <Fragment key={modalId}>{children}</Fragment>
        )}
      </ModalPortal>
    </>
  );
};

export default GlobalCustomModal;
