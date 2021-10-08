import React from 'react';

const ModalMatchingRequest = () => {
  return (
    <Modal
      show={showModal}
      title={<div><Avatar size="small" style={{ marginRight: '10px' }} />nicname님에게 매칭신청</div>}
      className="matching-modal"
      onCancel={changeShowModal}
    >
      <ModalRequestFriend />
    </Modal>
  );
};

export default ModalMatchingRequest;
