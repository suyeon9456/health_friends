import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { ADD_SCHEDULE_REQUEST } from '../../../../reducers/schedule';
import useInput from '../../../hooks/useInput';
import { Avatar } from '../../atoms';
import { Modal } from '../../molecules';
import MatchingRequestForm from '../MatchingRequestForm';

const ModalMatchingRequest = ({ showModal, setShowModal, friend }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { gym } = useSelector((state) => state.gym);
  const { addScheduleDone } = useSelector((state) => state.schedule);
  const [date, setDate] = useState(new Date());
  const [description, onChangeDescription] = useInput('');
  useEffect(() => {
    if (addScheduleDone) {
      setShowModal(false);
    }
  }, [addScheduleDone]);

  const onChangeShowModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onMatchingRequest = useCallback(() => {
    dispatch({
      type: ADD_SCHEDULE_REQUEST,
      data: {
        date,
        description,
        userId: me?.id,
        friendId: friend?.id,
        gymId: gym?.id,
      },
    });
  }, [date, description]);

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
      onSubmit={onMatchingRequest}
      footer
    >
      <MatchingRequestForm
        friend={friend}
        date={date}
        setDate={setDate}
        description={description}
        onChangeDescription={onChangeDescription}
      />
    </Modal>
  );
};

ModalMatchingRequest.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  friend: PropTypes.object,
};

export default ModalMatchingRequest;
