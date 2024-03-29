import React, { useCallback, useEffect } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';

import { updateFriendsInfoAPI, updateMyinfoAPI } from '@/api/user';
import { createTimeToDateTime, formatTime } from '@/../@utils/date';
import { SignupGymInfo, SignupMoreInfo } from '@/../@types/user';
import {
  InfoContent,
  InfoContentType,
  ModalStatus,
} from '@/../@types/constant';
import useGetProfile from '@/hooks/useGetProfile';
import { changeModal, useModalDispatch } from '@/../store/modalStore';
import { Modal } from '../../../molecules';
import EditInfoForm from '../EditInfoForm';

const ModalEditInfo = ({
  title,
  type,
  onCancel,
}: {
  title: string;
  type: InfoContentType;
  onCancel: () => void;
}) => {
  const contextDispatch = useModalDispatch();
  const { data: profile } = useGetProfile();
  const queryClient = useQueryClient();
  const myinfoMutation = useMutation(
    (data: SignupMoreInfo & SignupGymInfo) => updateMyinfoAPI(data),
    {
      onSuccess() {
        onCancel();
        contextDispatch(
          changeModal({
            status: ModalStatus.SUCCESS,
            message: '정보 수정에 성공하였습니다.',
          })
        );
      },
    }
  );
  const friendsInfoMutation = useMutation(
    (data: SignupMoreInfo) => updateFriendsInfoAPI(data),
    {
      onSuccess() {
        onCancel();
        contextDispatch(
          changeModal({
            status: ModalStatus.SUCCESS,
            message: '친구정보 수정에 성공하였습니다.',
          })
        );
      },
    }
  );

  const { handleSubmit, control, setValue } = useForm({
    defaultValues: {
      startTime: new Date(),
      endTime: new Date(),
      gender: 'male',
      age: '0',
      career: '1',
      role: '1',
    },
  });

  const onSubmit = useCallback(
    (data) => {
      if (type === InfoContent.MORE) {
        myinfoMutation.mutate({
          ...data,
          startTime: formatTime(data.startTime),
          endTime: formatTime(data.endTime),
        });
      }
      if (type === InfoContent.FRIENDS) {
        friendsInfoMutation.mutate({
          gender: data.gender,
          age: data.age,
          career: data.career,
          role: data.role,
        });
      }
    },
    [type]
  );

  useEffect(() => {
    if (type === InfoContent.FRIENDS) {
      setValue('gender', profile?.Userdetail?.friendsGender ?? '');
      setValue('age', profile?.Userdetail?.friendsAge ?? '');
      setValue('career', profile?.Userdetail?.friendsCareer ?? '');
      setValue('role', profile?.Userdetail?.friendsRole ?? '');
    }
    if (type === InfoContent.MORE) {
      setValue(
        'startTime',
        createTimeToDateTime(profile?.Userdetail?.startTime ?? '')
      );
      setValue(
        'endTime',
        createTimeToDateTime(profile?.Userdetail?.endTime ?? '')
      );
      setValue('gender', profile?.gender ?? '');
      setValue('age', profile?.age ?? '');
      setValue('career', profile?.career ?? '');
      setValue('role', profile?.role ?? '');
    }
  }, [type]);

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
      <EditInfoForm type={type} control={control} />
    </Modal>
  );
};

export default ModalEditInfo;
