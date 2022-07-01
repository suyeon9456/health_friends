import { modalSelector } from '@/../reducers/user';
import React from 'react';
import { useSelector } from 'react-redux';
import ModalPortal from '../ModalPortal';

const GlobalCustomModal = ({
  id,
  children,
}: {
  id: string | number;
  children: React.ReactElement;
}) => {
  const { isShowModal } = useSelector(modalSelector);
  return (
    <>
      <ModalPortal>{isShowModal === id && <>{children}</>}</ModalPortal>
    </>
  );
};

export default GlobalCustomModal;
