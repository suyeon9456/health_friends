import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useDateFormat } from '../../../hooks';
import { addScheduleRequest, scheduleSelector } from '@/../reducers/schedule';
import { gymSelector } from '@/../reducers/gym';
import { userSelector } from '@/../reducers/user';
import { Modal } from '../../molecules';
import { Avatar } from '../../atoms';
import MatchingRequestForm from '../MatchingRequestForm';

const schema = yup.object({
  startDate: yup.string().required('날짜는 필수 항목입니다.'),
  endDate: yup.string().required('날짜는 필수 항목입니다.'),
  gym: yup.string().required('헬스장은 필수 항목입니다.'),
}).required();

const ModalMatchingRequest = ({ showModal, setShowModal, friend, gymName }: {
  showModal: boolean;
  setShowModal: (prop: boolean) => void;
  friend?: { id?: number;
    nickname?: string;
    UserGym?: { GymId?: number };
    Userdetail?: object;
    Image?: object; }
  gymName?: string;
}) => {
  const dispatch = useDispatch();
  const { me } = useSelector(userSelector);
  const { gym } = useSelector(gymSelector);
  const { addScheduleDone } = useSelector(scheduleSelector);

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      gym: gymName || gym.name || '',
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
    dispatch(addScheduleRequest({
      ...data,
      endDate: end,
      userId: me?.id,
      friendId: friend?.id,
      gymId: friend?.UserGym?.GymId || gym?.id,
    }));
    onChangeShowModal();
  }, []);

  useEffect(() => {
    if (gym) {
      setValue('gym', `${gym?.address}${gym?.name}`);
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
          <Avatar size="small" {...{ style: { marginRight: '10px' } }} />
          {friend?.nickname}님에게 매칭신청
        </div>
      )}
      className="matching-modal"
      onCancel={onChangeShowModal}
      onSubmit={handleSubmit(onMatchingRequest)}
      form
      footer
    >
      <MatchingRequestForm control={control} />
    </Modal>
  );
};

export default ModalMatchingRequest;
