import React, { useCallback, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { gymSelector } from '@/../reducers/gym';
import { SizeType } from '@/../@types/constant';
import { addScheduleAPI } from '@/api/schedule';
import { ModalMatchingProps, Schedule } from '@/../@types/schedule';
import { createEndDate } from '@/../@utils/date';
import { useLoadLoginedUser } from '@/hooks';
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
}: ModalMatchingProps): React.ReactElement => {
  const { gym } = useSelector(gymSelector);
  const { data: me } = useLoadLoginedUser();

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      gym: (gymName ?? gym.name) || '',
      description: '',
    },
    resolver: yupResolver(schema),
  });

  const scheduleMutation = useMutation((data: Schedule) =>
    addScheduleAPI(data)
  );

  const onChangeShowModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const onMatchingRequest = useCallback((data) => {
    scheduleMutation.mutate({
      ...data,
      endDate: createEndDate(data.startDate, data.endDate),
      userId: me?.id,
      friendId: friend,
      gymId: friend?.UserGym?.GymId ?? gym?.id,
    });
    onChangeShowModal();
  }, []);

  useEffect(() => {
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
