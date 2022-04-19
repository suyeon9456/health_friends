import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { ModalType, ShowModalType } from '@/../@types/utils';
import { useMutation, useQuery } from 'react-query';
import { Me } from '@/../@types/user';
import { loadLoginedUserAPI } from '@/api/user';
import { meKey } from '@/../@types/queryKey';
import { Schedule } from '@/../@types/schedule';
import { addReScheduleAPI, updateScheduleAPI } from '@/api/schedule';
import { createEndDate, formatDateTime } from '@/../utils/date';
import MatchingRequestForm from '../../MatchingRequestForm';
import { Modal } from '../../../molecules';

const schema = yup
  .object({
    startDate: yup.string().required('날짜는 필수 항목입니다.'),
    endDate: yup.string().required('날짜는 필수 항목입니다.'),
    gym: yup.string().required('헬스장은 필수 항목입니다.'),
  })
  .required();

const ModalMatchingEdit = ({
  schedule,
  onCancel,
  mode,
}: {
  schedule: any;
  onCancel: () => void;
  mode: ShowModalType;
}) => {
  const { data: me } = useQuery<Me>(meKey, () => loadLoginedUserAPI(), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      gym: `${schedule?.Gym?.address} ${schedule?.Gym?.name}` || '',
      description: '',
    },
    resolver: yupResolver(schema),
  });

  const scheduleMutation = useMutation((data: Schedule) =>
    addReScheduleAPI(data)
  );
  const updateScheduleMutation = useMutation((data: Schedule) =>
    updateScheduleAPI(data)
  );

  const onSubmit = useCallback(
    (data) => {
      const startDateTime = formatDateTime(data.startDate);
      const dateTime = createEndDate(data.startDate, data.endDate);
      if (mode === ModalType.EDIT) {
        updateScheduleMutation.mutate({
          ...data,
          startDate: startDateTime,
          endDate: dateTime,
          id: schedule.id,
        });
      }
      if (mode === ModalType.REMATCH) {
        scheduleMutation.mutate({
          ...data,
          startDate: startDateTime,
          endDate: dateTime,
          id: schedule?.id,
          userId: me?.id,
          friendId: schedule?.Friend?.id,
          gymId: schedule?.Gym?.id,
        });
      }
    },
    [mode, schedule]
  );

  useEffect(() => {
    if (schedule) {
      const {
        start,
        end,
        description,
        Gym: { name, address },
      } = schedule;
      if (mode === ModalType.EDIT) {
        setValue('startDate', start);
        setValue('endDate', end);
        setValue('description', description);
      }
      setValue('gym', `${address} ${name}`);
    }
  }, [schedule]);

  return (
    <Modal
      title={`${schedule?.Friend?.nickname}님과의 ${
        mode !== ModalType.REMATCH ? '매칭 수정' : '재매칭요청'
      }`}
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
      footer
      form
    >
      <MatchingRequestForm
        friend={schedule?.Friend}
        control={control}
        errors={errors}
      />
    </Modal>
  );
};

export default ModalMatchingEdit;
