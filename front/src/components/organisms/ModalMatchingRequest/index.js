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

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChangeStartDate = useCallback((data) => {
    setStartDate(data);
  }, []);
  const onChangeEndDate = useCallback((data) => {
    setEndDate(data);
  }, []);

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
        startDate,
        endDate,
        description,
        userId: me?.id,
        friendId: friend?.id,
        gymId: gym?.id,
      },
    });
    onChangeShowModal();
  }, [startDate, endDate, description]);

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
        type="add"
        friend={friend}
        description={description}
        onChangeDescription={onChangeDescription}
        startDate={startDate}
        onChangeStartDate={onChangeStartDate}
        endDate={endDate}
        onChangeEndDate={onChangeEndDate}
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
