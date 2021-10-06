import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import format from 'date-fns/format';

import { SIGN_UP_STEP_GYM_INFO_SAVE, SIGN_UP_STEP_NEXT, SIGN_UP_STEP_PREV } from '../../../../../reducers/user';
import useInput from '../../../../hooks/useInput';
import { Button } from '../../../atoms';
import { FormInput, FormTextarea, FormTimePicker } from '../../../molecules';
import ModalGym from './ModalGym';
import { ButtonWrap, FormSearchGymWrap, FormWrapper } from './style';

const MoreGymInfoForm = () => {
  const [showModal, setShowModal] = useState(false);
  const changeShowModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, [showModal]);

  const { signupStepGymInfo, selectedGym } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(signupStepGymInfo?.startDate || new Date());
  const [endDate, setEndDate] = useState(signupStepGymInfo?.endDate || new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [gym, onChangeGym, setGym] = useInput(signupStepGymInfo?.gym?.name || selectedGym?.name || '');
  const [description, onChangeDescription] = useInput(signupStepGymInfo?.description || '');

  const onChangeStartDate = useCallback((data) => {
    setStartTime(format(data, 'HH:mm'));
    setStartDate(data);
  }, []);
  const onChangeEndDate = useCallback((data) => {
    setEndTime(format(data, 'HH:mm'));
    setEndDate(data);
  }, []);

  const onClickStepHandler = useCallback((e) => {
    dispatch({
      type: SIGN_UP_STEP_GYM_INFO_SAVE,
      data: { startDate, endDate, gym, description },
    });
    if (e.target.id === 'next') {
      dispatch({ type: SIGN_UP_STEP_NEXT });
    } else {
      dispatch({ type: SIGN_UP_STEP_PREV });
    }
  }, [startTime, endTime, gym, description]);
  return (
    <FormWrapper>
      <FormTimePicker
        label="운동시간"
        type="range"
        size="large"
        startDate={startDate}
        onChangeStartDate={onChangeStartDate}
        endDate={endDate}
        onChangeEndDate={onChangeEndDate}
      />
      <FormSearchGymWrap>
        <FormInput
          label="헬스장"
          size="large"
          value={gym}
          onChange={onChangeGym}
          onClick={changeShowModal}
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
        placeholder="내용을 입력해주세요."
        maxLength={50}
        showCount
        essential
        value={description}
        onChange={onChangeDescription}
      />
      <ModalGym
        show={showModal}
        title="헬스장 찾기/등록"
        className="gym-modal"
        onCancel={changeShowModal}
        setShowModal={setShowModal}
        setGym={setGym}
      />
      <ButtonWrap>
        <Button
          type="line-primary"
          size="large"
          id="prev"
          onClick={onClickStepHandler}
        >
          이전단계
        </Button>
        <Button
          type="line-primary"
          size="large"
          id="next"
          onClick={onClickStepHandler}
        >
          다음단계
        </Button>
      </ButtonWrap>
    </FormWrapper>
  );
};

export default MoreGymInfoForm;
