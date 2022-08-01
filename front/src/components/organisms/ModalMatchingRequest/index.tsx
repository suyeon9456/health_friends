import React, { useCallback, useEffect } from 'react';
import { useMutation } from 'react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { gymSelector } from '@/../reducers/gym';
import { GlobalModal, ModalStatus, SizeType } from '@/../@types/constant';
import { addScheduleAPI } from '@/api/schedule';
import { ModalMatchingProps, Schedule } from '@/../@types/schedule';
import { createEndDate } from '@/../@utils/date';
import { useLoadLoginedUser } from '@/hooks';
import { hiddenCustomModal } from '@/../reducers/user';
import { changeModal, useModalDispatch } from '@/../store/modalStore';
import { Modal } from '../../molecules';
import { Avatar } from '../../atoms';
import MatchingRequestForm from '../MatchingRequestForm';

const MATCHING = 'MATCHING' as const;
const schema = yup
  .object({
    startDate: yup.string().required('날짜는 필수 항목입니다.'),
    endDate: yup.string().required('날짜는 필수 항목입니다.'),
    gym: yup.string().required('헬스장은 필수 항목입니다.'),
  })
  .required();

const ModalMatchingRequest = ({
  selectedUser,
  gymName,
}: ModalMatchingProps): React.ReactElement => {
  const dispatch = useDispatch();
  const contextDispatch = useModalDispatch();
  const { gym } = useSelector(gymSelector);
  const { data: me } = useLoadLoginedUser();

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      gym: '',
      description: '',
    },
    resolver: yupResolver(schema),
  });

  const scheduleMutation = useMutation(
    (data: Schedule) => addScheduleAPI(data),
    {
      onSuccess() {
        dispatch(hiddenCustomModal(MATCHING));
        contextDispatch(
          changeModal({
            status: ModalStatus.SUCCESS,
            message: '매칭 등록에 성공하였습니다.',
          })
        );
      },
    }
  );

  const onMatchingRequest = useCallback(
    (data) => {
      if (!selectedUser) return;
      scheduleMutation.mutate({
        ...data,
        endDate: createEndDate(data.startDate, data.endDate),
        userId: me?.id,
        friendId: selectedUser.id,
        gymId: gym?.UserGym?.GymId ?? gym?.id,
      });
    },
    [gym]
  );

  useEffect(() => {
    if (gymName) {
      return setValue('gym', gymName);
    }
    setValue('gym', `${gym?.addressRoad}${gym?.name}`);
  }, [gym, gymName]);

  return (
    <Modal
      title={
        <div>
          <Avatar
            size={SizeType.SMALL}
            {...{ style: { marginRight: '10px' } }}
          />
          {selectedUser?.nickname}님에게 매칭신청
        </div>
      }
      className="matching-modal"
      onCancel={() => dispatch(hiddenCustomModal(MATCHING))}
      onSubmit={handleSubmit(onMatchingRequest)}
      form
      footer
    >
      <MatchingRequestForm friend={selectedUser} control={control} />
    </Modal>
  );
};

export default ModalMatchingRequest;
