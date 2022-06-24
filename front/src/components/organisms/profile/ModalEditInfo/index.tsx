import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';

import { profileSelector } from '@/../reducers/profile';
import { updateFriendsInfoAPI, updateMyinfoAPI } from '@/api/user';
import { createTimeToDateTime, formatTime } from '@/../@utils/date';
import { SignupGymInfo, SignupMoreInfo } from '@/../@types/user';
import { Modal } from '../../../molecules';
import EditInfoForm from '../EditInfoForm';

const ModalEditInfo = ({
  title,
  targetId,
  onCancel,
  setCloseModal,
}: {
  title: string;
  targetId: string;
  onCancel: (e?: React.MouseEvent<HTMLElement>) => void;
  setCloseModal: (close: boolean) => void;
}) => {
  const { profile } = useSelector(profileSelector);
  const queryClient = useQueryClient();
  const myinfoMutation = useMutation((data: SignupMoreInfo & SignupGymInfo) =>
    updateMyinfoAPI(data)
  );
  const friendsInfoMutation = useMutation((data: SignupMoreInfo) =>
    updateFriendsInfoAPI(data)
  );

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

  const onSubmit = useCallback(
    (data) => {
      if (targetId === 'more-info') {
        myinfoMutation.mutate({
          ...data,
          startTime: formatTime(data.startTime),
          endTime: formatTime(data.endTime),
        });
      }
      if (targetId === 'friends-info') {
        friendsInfoMutation.mutate({
          gender: data.gender,
          age: data.age,
          career: data.career,
          role: data.role,
        });
      }
      setCloseModal(false);
    },
    [targetId]
  );

  useEffect(() => {
    if (targetId === 'friends-info') {
      setValue('gender', profile?.Userdetail?.friendsGender);
      setValue('age', profile?.Userdetail?.friendsAge);
      setValue('career', profile?.Userdetail?.friendsCareer);
      setValue('role', profile?.Userdetail?.friendsRole);
    }
    if (targetId === 'more-info') {
      setValue(
        'startTime',
        createTimeToDateTime(profile?.Userdetail?.startTime)
      );
      setValue('endTime', createTimeToDateTime(profile?.Userdetail?.endTime));
      setValue('gender', profile?.gender);
      setValue('age', profile?.age);
      setValue('career', profile?.career);
      setValue('role', profile?.role);
    }
  }, [targetId]);

  useEffect(() => {
    if (myinfoMutation.isSuccess) {
      void queryClient.invalidateQueries('profile');
    }
  }, [myinfoMutation]);

  return (
    <Modal
      title={title}
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
      form
      footer
    >
      <EditInfoForm targetId={targetId} control={control} />
    </Modal>
  );
};

export default ModalEditInfo;
