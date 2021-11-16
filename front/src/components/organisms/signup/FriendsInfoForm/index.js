import React, { useCallback, useEffect } from 'react';
import Router from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { SIGN_UP_REQUEST, SIGN_UP_STEP_FRIENDS_INFO_SAVE, SIGN_UP_STEP_PREV } from '../../../../../reducers/user';
import useInput from '../../../../hooks/useInput';
import { ButtonWrap, FormWrapper } from './style';
import Button from '../../../atoms/Button';
import FormSelect from '../../../molecules/FormSelect';

const FriendsInfoForm = () => {
  const dispatch = useDispatch();
  const { signupDone,
    genderOptions,
    careerOptions,
    roleOptions,
    ageOptions,
    selectedGym,
    signupStepInfo: info,
    signupStepMoreInfo: moreInfo,
    signupStepGymInfo: gymInfo,
    signupStepFriendsInfo } = useSelector((state) => state.user);

  const [friendsGender, onChangeFriendsGender] = useInput(signupStepFriendsInfo?.friendsGender || 'male');
  const [friendsCareer, onChangeFriendsCareer] = useInput(signupStepFriendsInfo?.friendsCareer
    || 1);
  const [friendsAge, onChangeFriendsAge] = useInput(signupStepFriendsInfo?.friendsAge
    || 0);
  const [friendsRole, onChangeFriendsRole] = useInput(signupStepFriendsInfo?.friendsRole || 1);
  const onClickPrev = useCallback(() => {
    dispatch({
      type: SIGN_UP_STEP_FRIENDS_INFO_SAVE,
      data: { friendsGender, friendsCareer, friendsAge, friendsRole },
    });
    dispatch({ type: SIGN_UP_STEP_PREV });
  }, [friendsGender, friendsCareer, friendsAge, friendsRole]);

  useEffect(() => {
    if (signupDone) {
      Router.replace('/');
    }
  }, [signupDone]);

  const onClickSignup = useCallback(() => {
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        info,
        moreInfo,
        gymInfo,
        selectedGym,
        friendsInfo: { friendsGender, friendsCareer, friendsAge, friendsRole },
      },
    });
  }, [friendsGender, friendsCareer, friendsAge, friendsRole, selectedGym, info, moreInfo, gymInfo]);
  return (
    <FormWrapper>
      <FormSelect
        label="성별"
        options={genderOptions}
        size="large"
        value={friendsGender}
        onChange={onChangeFriendsGender}
      />
      <FormSelect
        label="나이"
        size="large"
        options={ageOptions}
        value={friendsAge}
        onChange={onChangeFriendsAge}
      />
      <FormSelect
        label="운동경력"
        options={careerOptions}
        size="large"
        value={friendsCareer}
        onChange={onChangeFriendsCareer}
      />
      <FormSelect
        label="친구와의 역할"
        options={roleOptions}
        size="large"
        value={friendsRole}
        onChange={onChangeFriendsRole}
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
