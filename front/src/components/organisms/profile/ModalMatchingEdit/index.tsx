import React, { useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { meSelector } from '@/../reducers/user';
import {
  addReScheduleAPI,
  loadScheduleAPI,
  updateScheduleAPI,
} from '@/api/schedule';
import { createEndDate, formatDateTime } from '@/../@utils/date';
import { ModalType, ShowModalType } from '@/../@types/constant';
import { MatchingCardProps, Schedule } from '@/../@types/schedule';
import { AxiosError } from 'axios';
import { scheduleByIdKey } from '@/../@utils/queryKey';
import { profileSelector } from '@/../reducers/profile';
import { Modal } from '../../../molecules';
import MatchingRequestForm from '../../MatchingRequestForm';

const schema = yup
  .object({
    startDate: yup.string().required('날짜는 필수 항목입니다.'),
    endDate: yup.string().required('날짜는 필수 항목입니다.'),
    gym: yup.string().required('헬스장은 필수 항목입니다.'),
  })
  .required();

const ModalMatchingEdit = ({
  matchingId,
  queryId,
  onCancel,
  mode,
}: {
  matchingId: number | null;
  queryId?: string | string[];
  onCancel: () => void;
  mode: ShowModalType;
}) => {
  const me = useSelector(meSelector);
  const { profile } = useSelector(profileSelector);

  const { data } = useQuery<MatchingCardProps | undefined, AxiosError>(
    scheduleByIdKey(matchingId, queryId, profile?.id),
    () => loadScheduleAPI(matchingId, queryId, profile?.id),
    {
      refetchOnWindowFocus: false,
      enabled: !!matchingId && !!profile,
    }
  );

  const schedule = useMemo(() => {
    if (!data) return null;
    return {
      ...data,
      start: new Date(data.startDate),
      end: new Date(data.endDate),
      Friend: data.Receiver.id === profile.id ? data.Requester : data.Receiver,
    };
  }, [data]);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: new Date(),
      endDate: new Date(),
      gym: `${schedule?.Gym.address} ${schedule?.Gym.name}` || '',
      description: '',
    },
    resolver: yupResolver(schema),
  });

  const scheduleMutation = useMutation((scheduleData: Schedule) =>
    addReScheduleAPI(scheduleData)
  );
  const updateScheduleMutation = useMutation((scheduleData: Schedule) =>
    updateScheduleAPI(scheduleData)
  );

  const onSubmit = useCallback(
    (scheduleData) => {
      if (!schedule) return;
      const startDateTime = formatDateTime(scheduleData.startDate);
      const dateTime = createEndDate(
        scheduleData.startDate,
        scheduleData.endDate
      );
      if (mode === ModalType.EDIT) {
        updateScheduleMutation.mutate({
          ...scheduleData,
          startDate: startDateTime,
          endDate: dateTime,
          id: schedule.id,
        });
      }
      if (mode === ModalType.REMATCH) {
        scheduleMutation.mutate({
          ...scheduleData,
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

  if (!schedule) {
    return null;
  }

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
        friend={schedule.Friend}
        control={control}
        errors={errors}
      />
    </Modal>
  );
};

export default ModalMatchingEdit;
