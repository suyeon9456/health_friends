import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';
import { useForm } from 'react-hook-form';

import { SIGN_UP_STEP_GYM_INFO_SAVE, SIGN_UP_STEP_NEXT, SIGN_UP_STEP_PREV } from '../../../../../reducers/user';

import { Button, Form } from '../../../atoms';
import { FormInput, FormRangeTimePicker, FormTextarea } from '../../../molecules';
import ModalGym from './ModalGym';
import { ButtonWrap, FormSearchGymWrap, FormWrapper } from './style';

const MoreGymInfoForm = () => {
  const dispatch = useDispatch();

  const { signupStepGymInfo, selectedGym } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const { handleSubmit, control, setValue } = useForm({
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
    dispatch({
      type: SIGN_UP_STEP_GYM_INFO_SAVE,
      data: { ...data,
        startTime: format(data.startTime, 'HH:mm'),
        endTime: format(data.endTime, 'HH:mm') },
    });
    if (e.nativeEvent.submitter.name === 'next') {
      dispatch({ type: SIGN_UP_STEP_NEXT });
    } else {
      dispatch({ type: SIGN_UP_STEP_PREV });
    }
  }, []);
  return (
    <FormWrapper>
      <Form onSubmit={handleSubmit(onClickStepHandler)}>
        <FormRangeTimePicker
          label="운동시간"
          size="large"
          control={control}
        />
        <FormSearchGymWrap>
          <FormInput
            label="헬스장"
            id="gym"
            size="large"
            onClick={changeShowModal}
            control={control}
            disabled
          />
          <div className="button-wrap">
            <div />
            <Button
              type="primary"
              size="large"
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
            type="line-primary"
            size="large"
            name="prev"
            submit
          >
            이전단계
          </Button>
          <Button
            type="line-primary"
            size="large"
            name="next"
            submit
          >
            다음단계
          </Button>
        </ButtonWrap>
      </Form>
      <ModalGym
        show={showModal}
        title="헬스장 찾기/등록"
        className="gym-modal"
        onCancel={changeShowModal}
        setShowModal={setShowModal}
        setGym={setValue}
      />
    </FormWrapper>
  );
};

export default MoreGymInfoForm;
