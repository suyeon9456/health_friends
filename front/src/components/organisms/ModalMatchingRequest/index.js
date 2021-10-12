import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { Avatar } from '../../atoms';
import { Modal } from '../../molecules';
import MatchingRequestForm from '../MatchingRequestForm';

const ModalMatchingRequest = ({ showModal, setShowModal, friend }) => {
  const onChangeShowModal = useCallback(() => {
    setShowModal(false);
  }, []);

  return (
    <Modal
      show={showModal}
      title={(
        <div>
          <Avatar size="small" style={{ marginRight: '10px' }} />
          {friend?.nickname}님에게 매칭신청
        </div>
        )}
      className="matching-modal"
      onCancel={onChangeShowModal}
    >
      <MatchingRequestForm />
    </Modal>
  );
};

ModalMatchingRequest.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  friend: PropTypes.object,
};

export default ModalMatchingRequest;
