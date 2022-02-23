import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/../store/configureStore';
import { ADD_GYM_REQUEST } from '../../../../../reducers/gym';
import { Modal, Tabs } from '../../../molecules';
import ModalSearchGym from '../../ModalSearchGym';
import ModalCreateGym from '../../ModalCreateGym';
import { ModalBodyBox } from './style';
import { useForm, UseFormSetValue } from 'react-hook-form';

interface CreateModalType {
  sido: string;
  sigungu: string;
  address: string;
  latitude: string;
  longitude: string;
  name: string;
}

const ModalGym = ({ show, title, onCancel, setShowModal, setGym, ...props }: {
  show: boolean;
  title: string;
  onCancel: () => void;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setGym: UseFormSetValue<{
    startTime: Date;
    endTime: Date;
    gym: string;
    description: string;
  }>;
}) => {
  const { searchGymTabs } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { handleSubmit, control, setValue } = useForm<CreateModalType>({
    defaultValues: {
      sido: '',
      sigungu: '',
      address: '',
      latitude: '',
      longitude: '',
      name: '',
    },
  });

  const [selectedTab, setSelectedTab] = useState('search');

  const onChangeSelectedTab = useCallback((tab) => {
    console.log(tab);
    setSelectedTab(tab);
  }, [selectedTab]);

  const onSubmit = useCallback((data) => {
    // 이벤트버블링 체크
    dispatch({ type: ADD_GYM_REQUEST, data });
    setGym('gym', data.name);
    setShowModal(false);
  }, [show, selectedTab]);
  return (
    <Modal
      show={show}
      title={title}
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
      form
      footer
      {...props}
    >
      <ModalBodyBox>
        <Tabs
          tabs={searchGymTabs}
          selectedTab={selectedTab}
          onChangeSelectedTab={onChangeSelectedTab}
          block
        />
        {selectedTab === 'search'
          ? <ModalSearchGym setShowModal={setShowModal} setGym={setGym} />
          : (
            <ModalCreateGym
              setValue={setValue}
              control={control}
            />
          )}
      </ModalBodyBox>
    </Modal>
  );
};

export default ModalGym;
