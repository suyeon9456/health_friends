import React, { useCallback, useState } from 'react';

import { FormSearchGymWrap, FormWrapper } from './style';
import Button from '../../../atoms/Button';
import FormInput from '../../../molecules/FormInput';
import FormTextarea from '../../../molecules/FormTextarea';
import FormTimePicker from '../../../molecules/FormTimePicker';
import Modal from '../../../molecules/Modal';

const MoreGymInfoForm = () => {
  const [showModal, setShowModal] = useState(false);
  const changeShowModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, [showModal]);
  return (
    <FormWrapper>
      <FormTimePicker
        label="운동시간"
        placeholder="운동시간을 입력해주세요."
        type="range"
        size="large"
      />
      <FormSearchGymWrap>
        <FormInput
          label="헬스장"
          placeholder="헬스장 주소를 찾아 입력해주세요."
          size="large"
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
      />
      <Modal
        show={showModal}
        title="Basic Title"
        className="gym-modal"
        onCancel={changeShowModal}
      >
        <p>Basic Content</p>
      </Modal>
    </FormWrapper>
  );
};

export default MoreGymInfoForm;
