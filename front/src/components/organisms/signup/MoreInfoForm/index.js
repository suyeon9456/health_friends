import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { SIGN_UP_STEP_MORE_INFO_SAVE } from '../../../../../reducers/user';
import useInput from '../../../../hooks/useInput';
import { MoreInfoFormWrapper } from './style';
import Button from '../../../atoms/Button';
import FormInput from '../../../molecules/FormInput';
import FormSelect from '../../../molecules/FormSelect';
import FormInputNumber from '../../../molecules/FormInputNumber';

const MoreInfoForm = ({ setProcess }) => {
  const careerOptions = [
    { value: 1, text: '1년 미만' },
    { value: 2, text: '1년 이상 ~ 3년 미만' },
    { value: 3, text: '3년 이상 ~ 5년 미만' },
    { value: 4, text: '5년 이상 ~ 10년 미만' },
    { value: 5, text: '10년 이상' },
  ];
  const roleOptions = [
    { value: 1, text: '도움을 주고 싶어요!' },
    { value: 2, text: '도움을 받고 싶어요!' },
    { value: 3, text: '함께 운동하고 싶어요!' },
  ];
  const [gender, onChangeGender] = useInput('');
  const [age, onChangeAge, setAge] = useInput(0);
  const [career, onChangeCareer] = useInput(1);
  const [role, onChangeRole] = useInput(1);
  const dispatch = useDispatch();

  const onNextClick = useCallback(() => {
    dispatch({
      type: SIGN_UP_STEP_MORE_INFO_SAVE,
      data: { gender, age, career },
    });
    setProcess((prev) => prev + 1);
  }, [gender, age, career]);
  return (
    <>
      <MoreInfoFormWrapper>
        <FormInput
          label="성별"
          placeholder="성별을 입력해주세요."
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
      </MoreInfoFormWrapper>
      <div>
        <Button
          type="line-primary"
          size="large"
          onClick={onNextClick}
        >
          다음단계
        </Button>
      </div>
    </>
  );
};

MoreInfoForm.propTypes = {
  setProcess: PropTypes.any.isRequired,
};

export default MoreInfoForm;
