import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ADD_SCHEDULE_REQUEST } from '../../../../reducers/schedule';
import { Avatar } from '../../atoms';
import { Modal } from '../../molecules';
import MatchingRequestForm from '../MatchingRequestForm';
import { useDateFormat } from '../../../hooks';

const schema = yup.object({
  startDate: yup.string().required('날짜는 필수 항목입니다.'),
  endDate: yup.string().required('날짜는 필수 항목입니다.'),
  gym: yup.string().required('헬스장은 필수 항목입니다.'),
}).required();

const ModalMatchingRequest = ({ showModal, setShowModal, friend, gymName }) => {
  const dispatch = useDispatch();
  const { me } = useSelector((state) => state.user);
  const { gym } = useSelector((state) => state.gym);
  const { addScheduleDone } = useSelector((state) => state.schedule);

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      gym: gymName || gym.name,
      description: '',
    },
    resolver: yupResolver(schema),
  });

  const onChangeShowModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onMatchingRequest = useCallback((data) => {
    const date = useDateFormat(new Date(data.startDate), 'yyyy-MM-dd');
    const time = useDateFormat(new Date(data.endDate), 'HH:mm');
    const end = new Date([date, time].join(' '));
    dispatch({
      type: ADD_SCHEDULE_REQUEST,
      data: {
        ...data,
        endDate: end,
        userId: me?.id,
        friendId: friend?.id,
        gymId: friend?.UserGym?.GymId || gym?.id,
      },
    });
    onChangeShowModal();
  }, []);

  useEffect(() => {
    if (gym) {
      setValue(`${gym?.address}${gym?.name}`);
    }
  }, [gym]);

  useEffect(() => {
    if (addScheduleDone) {
      setShowModal(false);
    }
  }, [addScheduleDone]);

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
      onSubmit={handleSubmit(onMatchingRequest)}
      form
      footer
    >
      <MatchingRequestForm
        type="add"
        control={control}
        setValue={setValue}
      />
    </Modal>
  );
};

ModalMatchingRequest.propTypes = {
  showModal: PropTypes.bool.isRequired,
  setShowModal: PropTypes.func.isRequired,
  friend: PropTypes.any,
  gymName: PropTypes.any,
};

export default ModalMatchingRequest;
