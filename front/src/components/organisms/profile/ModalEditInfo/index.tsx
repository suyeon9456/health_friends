import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import { useForm } from 'react-hook-form';

import { profileSelector, updateMyFriendsInfoRequest, updateMyinfoRequest } from '@/../reducers/profile';
import { useDateFormat } from '../../../../hooks';
import { Modal } from '../../../molecules';
import EditInfoForm from '../EditInfoForm';

const ModalEditInfo = ({ title, targetId, show, onCancel, setCloseModal }: {
  title: string;
  targetId: string;
  show: boolean;
  onCancel: (e?: React.MouseEvent<HTMLElement>) => void;
  setCloseModal: (close: boolean) => void;
}) => {
  const dispatch = useDispatch();
  const { profile } = useSelector(profileSelector);

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
      dispatch(updateMyinfoRequest({
        ...data,
        startTime: format(data.startTime, 'HH:mm'),
        endTime: format(data.endTime, 'HH:mm'),
      }));
    }
    if (targetId === 'friends-info') {
      dispatch(updateMyFriendsInfoRequest({
        gender: data.gender,
        age: data.age,
        career: data.career,
        role: data.role,
      }));
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
      />
    </Modal>
  );
};

export default ModalEditInfo;
