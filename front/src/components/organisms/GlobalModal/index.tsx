import React, { useCallback } from 'react';
import { Initial, useModalDispatch } from '@/../store/modalStore';
import { GlobalModalAction } from '@/../@types/constant';
import { Alert } from '@/components/molecules';
import { Button } from '@/components/atoms';

const GlobalModal = ({ modals }: { modals: Initial[] }) => {
  const contextDispatch = useModalDispatch();
  const onHiddenModal = useCallback((id, callback) => {
    contextDispatch({
      type: GlobalModalAction.HIDDEN_MODAL,
      payload: id,
    });
    if (callback) {
      callback();
    }
  }, []);
  return (
    <>
      {modals.map(({ id, statusType, message, callback }) => (
        <Alert
          key={id}
          type={statusType}
          action={
            <Button
              type={statusType}
              onClick={() => onHiddenModal(id, callback)}
              block
            >
              확인
            </Button>
          }
          message={message}
        />
      ))}
    </>
  );
};

export default GlobalModal;
