import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SIGN_UP_REQUEST, SIGN_UP_STEP_FRIENDS_INFO_SAVE, SIGN_UP_STEP_PREV } from '../../../../../reducers/user';
import useInput from '../../../../hooks/useInput';
import { ButtonWrap, FormWrapper } from './style';
import Button from '../../../atoms/Button';
import FormSelect from '../../../molecules/FormSelect';
import FormInputNumber from '../../../molecules/FormInputNumber';

const FriendsInfoForm = () => {
  const dispatch = useDispatch();
  const { genderOptions,
    careerOptions,
    roleOptions,
    signupStepFriendsInfo } = useSelector((state) => state.user);
  const [gender, onChangeGender] = useInput(signupStepFriendsInfo?.gender || 'male');
  const [career, onChangeCareer] = useInput(signupStepFriendsInfo?.career || 1);
  const [age, onChangeAge, setAge] = useInput(signupStepFriendsInfo?.age || 0);
  const [role, onChangeRole] = useInput(signupStepFriendsInfo?.role || 1);
  const onClickPrev = useCallback(() => {
    dispatch({
      type: SIGN_UP_STEP_FRIENDS_INFO_SAVE,
      data: { gender, career, age, role },
    });
    dispatch({ type: SIGN_UP_STEP_PREV });
  }, [gender, career, age, role]);

  const onClickSignup = useCallback(() => {
    dispatch({
      type: SIGN_UP_REQUEST,
      data: { gender, career, age, role },
    });
  }, [gender, career, age, role]);
  return (
    <FormWrapper>
      <FormSelect
        label="성별"
        options={genderOptions}
        size="large"
        value={gender}
        onChange={onChangeGender}
      />
      <FormInputNumber
        label="나이"
        size="large"
        placeholder="나이(숫자만)를 입력해주세요."
        value={age}
        onChange={onChangeAge}
        setValue={setAge}
      />
      <FormSelect
        label="운동경력"
        options={careerOptions}
        size="large"
        value={career}
        onChange={onChangeCareer}
      />
      <FormSelect
        label="친구와의 역할"
        options={roleOptions}
        size="large"
        value={role}
        onChange={onChangeRole}
      />
      <ButtonWrap>
        <Button
          type="line-primary"
          size="large"
          onClick={onClickPrev}
        >
          이전단계
        </Button>
        <Button
          type="line-primary"
          size="large"
          onClick={onClickSignup}
        >
          가입하기
        </Button>
      </ButtonWrap>
    </FormWrapper>
  );
};

export default FriendsInfoForm;
