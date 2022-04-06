import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { addScheduleRequest } from '@/../reducers/schedule';
import { gymSelector } from '@/../reducers/gym';
import { SizeType } from '@/../@types/utils';
import { useQuery } from 'react-query';
import { Me } from '@/../@types/user';
import axios from 'axios';
import { useDateFormat } from '../../../hooks';
import { Modal } from '../../molecules';
import { Avatar } from '../../atoms';
import MatchingRequestForm from '../MatchingRequestForm';

const schema = yup
  .object({
    startDate: yup.string().required('날짜는 필수 항목입니다.'),
    endDate: yup.string().required('날짜는 필수 항목입니다.'),
    gym: yup.string().required('헬스장은 필수 항목입니다.'),
  })
  .required();

const ModalMatchingRequest = ({
  setShowModal,
  friend,
  gymName,
}: {
  setShowModal: (prop: boolean) => void;
  friend?: {
    id?: number;
    nickname?: string;
    UserGym?: { GymId?: number };
    Userdetail?: object;
    Image?: object;
  };
  gymName?: string;
}) => {
  const dispatch = useDispatch();
  const { gym } = useSelector(gymSelector);
  const { data: me } = useQuery<Me>(
    'user',
    async () => {
      const { data } = await axios.get('/user');
      return data;
    },
    { refetchOnWindowFocus: false, retry: false }
  );

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      gym: (gymName ?? gym.name) || '',
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
    dispatch(
      addScheduleRequest({
        ...data,
        endDate: end,
        userId: me?.id,
        friendId: friend?.id,
        gymId: friend?.UserGym?.GymId ?? gym?.id,
      })
    );
    onChangeShowModal();
  }, []);

  useEffect(() => {
    console.log('test');
    if (gym) {
      setValue('gym', `${gym?.address}${gym?.name}`);
    }
  }, [gym]);

  return (
    <Modal
      title={
        <div>
          <Avatar
            size={SizeType.SMALL}
            {...{ style: { marginRight: '10px' } }}
          />
          {friend?.nickname}님에게 매칭신청
        </div>
      }
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
