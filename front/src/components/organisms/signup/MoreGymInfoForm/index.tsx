import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import { useForm } from 'react-hook-form';

import { Button, Form } from '../../../atoms';
import { FormInput, FormRangeTimePicker, FormTextarea } from '../../../molecules';
import ModalGym from './ModalGym';
import { ButtonWrap, FormSearchGymWrap, FormWrapper } from './style';
import { signupSelector, signupStepGymInfoSave, signupStepNext, signupStepPrev } from '@/../reducers/user';
import { ButtonType, SignupMenu, SizeType } from '@/../@types/utils';
import ModalPortal from '../../ModalPortal';

const MoreGymInfoForm = () => {
  const dispatch = useDispatch();

  const { signupStepGymInfo, selectedGym } = useSelector(signupSelector);
  const [showModal, setShowModal] = useState(false);
  const { handleSubmit, control, setValue } = useForm<{ startTime: Date; endTime: Date; gym: string; description: string;  }>({
    defaultValues: {
      startTime: signupStepGymInfo?.startDate || new Date(),
      endTime: signupStepGymInfo?.endDate || new Date(),
      gym: signupStepGymInfo?.gym?.name || selectedGym?.name || '',
      description: signupStepGymInfo?.description || '',
    },
  });

  const changeShowModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, [showModal]);

  const onClickStepHandler = useCallback((data, e) => {
    dispatch(signupStepGymInfoSave({
      ...data,
      startTime: format(data.startTime, 'HH:mm'),
      endTime: format(data.endTime, 'HH:mm')
    }));
    if (e.nativeEvent.submitter.name === 'next') {
      dispatch(signupStepNext(SignupMenu.FRIENDSINFO));
    } else {
      dispatch(signupStepPrev(SignupMenu.MOREINFO));
    }
  }, []);
  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(onClickStepHandler)}>
        <FormRangeTimePicker
          startName="startTime"
          endName="endTime"
          label="운동시간"
          size={SizeType.LARGE}
          control={control}
        />
        <FormSearchGymWrap>
          <FormInput
            label="헬스장"
            id="gym"
            size={SizeType.LARGE}
            control={control}
            disabled
            {...{ onClick: changeShowModal }}
          />
          <div className="button-wrap">
            <div />
            <Button
              type={ButtonType.PRIMARY}
              size={SizeType.LARGE}
              onClick={changeShowModal}
            >
              헬스장 찾기
            </Button>
          </div>
        </FormSearchGymWrap>
        <FormTextarea
          label="간단 소개"
          id="description"
          placeholder="내용을 입력해주세요."
          maxLength={50}
          showCount
          essential
          control={control}
        />
        <ButtonWrap>
          <Button
            type={ButtonType.LINEPRIMARY}
            size={SizeType.LARGE}
            name="prev"
            submit
          >
            이전단계
          </Button>
          <Button
            type={ButtonType.LINEPRIMARY}
            size={SizeType.LARGE}
            name="next"
            submit
          >
            다음단계
          </Button>
        </ButtonWrap>
      </Form>
      <ModalPortal>
        {showModal && (
          <ModalGym
            title="헬스장 찾기/등록"
            onCancel={changeShowModal}
            setShowModal={setShowModal}
            setGym={setValue}
            {...{className: 'gym-modal'}}
          />
        )}
      </ModalPortal>
    </FormWrapper>
  );
};

export default MoreGymInfoForm;
