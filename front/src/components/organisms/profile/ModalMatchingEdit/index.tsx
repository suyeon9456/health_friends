import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import {
  addReScheduleRequest,
  updateScheduleRequest,
} from '@/../reducers/schedule';
import { userSelector } from '@/../reducers/user';
import { ModalType, ShowModalType } from '@/../@types/utils';
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
  schedule,
  onCancel,
  mode,
}: {
  schedule: any;
  onCancel: () => void;
  mode: ShowModalType;
}) => {
  const dispatch = useDispatch();
  const { me } = useSelector(userSelector);

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

  const onSubmit = useCallback(
    (data) => {
      const date = format(new Date(data.startDate), 'yyyy-MM-dd');
      const time = format(new Date(data.endDate), 'HH:mm');
      const startDateTime = format(
        new Date(data.startDate),
        'yyyy-MM-dd HH:mm'
      );
      const dateTime = [date, time].join(' ');
      if (mode === ModalType.EDIT) {
        dispatch(
          updateScheduleRequest({
            ...data,
            startDate: startDateTime,
            endDate: dateTime,
            id: schedule.id,
          })
        );
      }
      if (mode === ModalType.REMATCH) {
        dispatch(
          addReScheduleRequest({
            ...data,
            startDate: startDateTime,
            endDate: dateTime,
            id: schedule?.id,
            userId: me?.id,
            friendId: schedule?.Friend?.id,
            gymId: schedule?.Gym?.id,
          })
        );
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
