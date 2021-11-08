import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SIGN_UP_STEP_MORE_INFO_SAVE, SIGN_UP_STEP_NEXT, SIGN_UP_STEP_PREV } from '../../../../../reducers/user';
import useInput from '../../../../hooks/useInput';
import { Button } from '../../../atoms';
import { FormSelect, FormInputNumber } from '../../../molecules';
import { ButtonWrap, MoreInfoFormWrapper } from './style';

const MoreInfoForm = () => {
  const { careerOptions,
    roleOptions,
    signupStepMoreInfo,
    genderOptions } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [gender, onChangeGender] = useInput(signupStepMoreInfo?.gender || 'male');
  const [age, onChangeAge, setAge] = useInput(signupStepMoreInfo?.age || 0);
  const [career, onChangeCareer] = useInput(signupStepMoreInfo?.career || 1);
  const [role, onChangeRole] = useInput(signupStepMoreInfo?.role || 1);

  const onClickStepHandler = useCallback((e) => {
    dispatch({
      type: SIGN_UP_STEP_MORE_INFO_SAVE,
      data: { gender, age, career, role },
    });
    if (e.target.id === 'next') {
      dispatch({ type: SIGN_UP_STEP_NEXT });
    } else {
      dispatch({ type: SIGN_UP_STEP_PREV });
    }
  }, [gender, age, career, role]);

  return (
    <MoreInfoFormWrapper>
      <FormSelect
        label="성별"
        options={genderOptions}
        size="large"
        value={gender}
        onChange={onChangeGender}
      />
      <FormInputNumber
        label="나이"
        placeholder="나이(숫자만)를 입력해주세요."
        size="large"
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
    </MoreInfoFormWrapper>
  );
};

export default MoreInfoForm;
