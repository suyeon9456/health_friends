import React, { useCallback, useState } from 'react';

import { FormSearchGymWrap, FormWrapper, ModalBodyBox } from './style';
import Button from '../../../atoms/Button';
import FormInput from '../../../molecules/FormInput';
import FormTextarea from '../../../molecules/FormTextarea';
import FormTimePicker from '../../../molecules/FormTimePicker';
import Modal from '../../../molecules/Modal';
import Tabs from '../../../molecules/Tabs';
import ModalSearchGym from '../../ModalSearchGyms';
import ModalCreateGym from '../../ModalCreateGym';

const MoreGymInfoForm = () => {
  const [showModal, setShowModal] = useState(false);
  const changeShowModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, [showModal]);

  const [selectedTab, setSelectedTab] = useState('1');
  const onChangeSelectedTab = useCallback((tab) => () => {
    setSelectedTab(tab);
  }, [selectedTab]);

  const tabs = [{ value: '1', text: '헬스장 찾기' }, { value: '2', text: '헬스장 등록' }];
  const list = [
    { id: 1, title: 'List Title 1', description: 'List description 1' },
    { id: 2, title: 'List Title 2', description: 'List description 2' },
    { id: 3, title: 'List Title 3', description: 'List description 3' },
    { id: 4, title: 'List Title 4', description: 'List description 4' },
    { id: 5, title: 'List Title 5', description: 'List description 5' },
  ];
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
        title="헬스장 찾기/등록"
        className="gym-modal"
        onCancel={changeShowModal}
      >
        <ModalBodyBox>
          <Tabs
            tabs={tabs}
            selectedTab={selectedTab}
            onChangeSelectedTab={onChangeSelectedTab}
            block
          />
          {selectedTab === '1'
            ? <ModalSearchGym tabs={tabs} list={list} />
            : <ModalCreateGym />}
        </ModalBodyBox>
      </Modal>
    </FormWrapper>
  );
};

export default MoreGymInfoForm;
