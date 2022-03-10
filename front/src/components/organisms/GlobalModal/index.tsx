import React, { useCallback } from 'react';
import { InitialState, useModalDispatch } from '@/../store/modalStore';
import { Alert } from '@/components/molecules';
import { Button } from '@/components/atoms';

const GlobalModal = ({ modals }: { modals: InitialState }) => {
  const contextDispatch = useModalDispatch();
  const onHiddenModal = useCallback(async (id, callback) => {
    await contextDispatch({
      type: 'HIDDEN_MODAL',
      payload: id,
    });
    if (callback) {
      callback();
    }
  }, []);
  return (
    <>
    {
      modals.map(({ id, statusType, message, callback }) => (
        <Alert
          key={id}
          type={statusType}
          action={(
            <Button
              type="error"
              onClick={() => onHiddenModal(id, callback)}
              block
            >
              확인
            </Button>
          )}
          message={message}
        />
      ))
    }
    </>
  );
};

export default GlobalModal;
