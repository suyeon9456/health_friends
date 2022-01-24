import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { Modal } from '../../../molecules';
import MatchingRequestForm from '../../MatchingRequestForm';
import { ADD_RE_SCHEDULE_REQUEST, UPDATE_SCHEDULE_REQUEST } from '../../../../../reducers/schedule';

const schema = yup.object({
  startDate: yup.string().required('날짜는 필수 항목입니다.'),
  endDate: yup.string().required('날짜는 필수 항목입니다.'),
  gym: yup.string().required('헬스장은 필수 항목입니다.'),
}).required();

const ModalMatchingEdit = ({ show, onCancel, mode }) => {
  const dispatch = useDispatch();
  const { schedule } = useSelector((state) => state.schedule);
  const { me } = useSelector((state) => state.user);

  const [fNickname, setFNickname] = useState('');
  const [fId, setFId] = useState(-1);

  const { handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      gym: schedule?.address || '',
      description: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = useCallback((data) => {
    const date = format(new Date(data.startDate), 'yyyy-MM-dd');
    const time = format(new Date(data.endDate), 'HH:mm');
    const startDateTime = format(new Date(data.startDate), 'yyyy-MM-dd HH:mm');
    const dateTime = [date, time].join(' ');
    if (mode === 'edit') {
      dispatch({
        type: UPDATE_SCHEDULE_REQUEST,
        data: { ...data, startDate: startDateTime, endDate: dateTime, id: schedule.id },
      });
    }
    console.log('mdoe: ', schedule);
    if (mode === 'rematch') {
      dispatch({
        type: ADD_RE_SCHEDULE_REQUEST,
        data: {
          ...data,
          startDate: startDateTime,
          endDate: dateTime,
          id: schedule?.id,
          userId: me?.id,
          friendId: fId,
          gymId: schedule?.gymId,
        },
      });
    }
  }, [mode, schedule, fId]);

  useEffect(() => {
    if (schedule) {
      const { friend, requester, start, end, address, description, gymName } = schedule;
      const friendId = friend?.id;
      console.log(friendId);
      setFNickname(friendId === me?.id ? requester?.nickname : friend?.nickname);
      setFId(friend === me?.id
        ? schedule?.Requester?.id
        : friendId);
      if (mode === 'edit') {
        setValue('startDate', start);
        setValue('endDate', end);
        setValue('description', description);
      }
      setValue('gym', `${address} ${gymName}`);
    }
  }, [schedule]);

  return (
    <Modal
      show={show}
      title={`${fNickname}님과의 ${mode !== 'rematch' ? '매칭 수정' : '재매칭요청'}`}
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

ModalMatchingEdit.propTypes = {
  show: PropTypes.bool,
  onCancel: PropTypes.func,
  mode: PropTypes.node,
};

export default ModalMatchingEdit;
