import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { useForm } from 'react-hook-form';

import { Modal } from '../../../molecules';
import EditInfoForm from '../EditInfoForm';
import { UPDATE_MY_INFO_REQUEST, UPDATE_MY_FRIENDS_INFO_REQUEST } from '../../../../../reducers/user';
import { useDateFormat } from '../../../../hooks';

const ModalEditInfo = ({ title, targetId, show, onCancel, setCloseModal }) => {
  const { profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      startTime: new Date(),
      endTime: new Date(),
      gender: 'male',
      age: 0,
      career: 1,
      role: 1,
    },
  });

  const onSubmit = useCallback((data) => {
    if (targetId === 'more-info') {
      dispatch({
        type: UPDATE_MY_INFO_REQUEST,
        data: { ...data,
          startTime: format(data.startTime, 'HH:mm'),
          endTime: format(data.endTime, 'HH:mm') },
      });
    }
    if (targetId === 'friends-info') {
      dispatch({
        type: UPDATE_MY_FRIENDS_INFO_REQUEST,
        data: { gender: data.gender, age: data.age, career: data.career, role: data.role },
      });
    }
    setCloseModal(false);
  }, [targetId]);

  useEffect(() => {
    if (targetId === 'friends-info') {
      setValue('gender', profile?.Userdetail?.friendsGender);
      setValue('age', profile?.Userdetail?.friendsAge);
      setValue('career', profile?.Userdetail?.friendsCareer);
      setValue('role', profile?.Userdetail?.friendsRole);
    }
    if (targetId === 'more-info') {
      setValue('startTime', new Date([useDateFormat(new Date(), 'yyyy-MM-dd'), profile?.Userdetail?.startTime].join(' ')));
      setValue('endTime', new Date([useDateFormat(new Date(), 'yyyy-MM-dd'), profile?.Userdetail?.endTime].join(' ')));
      setValue('gender', profile?.gender);
      setValue('age', profile?.age);
      setValue('career', profile?.career);
      setValue('role', profile?.role);
    }
  }, [targetId]);

  return (
    <Modal
      show={show}
      title={title}
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
      form
      footer
    >
      <EditInfoForm
        targetId={targetId}
        control={control}
        setValue={setValue}
      />
    </Modal>
  );
};

ModalEditInfo.propTypes = {
  title: PropTypes.string.isRequired,
  targetId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  setCloseModal: PropTypes.func,
};

export default ModalEditInfo;
