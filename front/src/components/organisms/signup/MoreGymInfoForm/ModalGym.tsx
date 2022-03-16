import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, UseFormSetValue } from 'react-hook-form';

import { addGymRequeset } from '@/../reducers/gym';
import { SearchGymTabs } from '@/../@types/utils';
import { Modal, Tabs } from '../../../molecules';
import ModalSearchGym from '../../ModalSearchGym';
import ModalCreateGym from '../../ModalCreateGym';
import { ModalBodyBox } from './style';

interface CreateModalType {
  sido: string;
  sigungu: string;
  address: string;
  latitude: string;
  longitude: string;
  name: string;
}

const ModalGym = ({
  title,
  onCancel,
  setShowModal,
  setGym,
  ...props
}: {
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

  const onChangeSelectedTab = useCallback(
    (tab) => setSelectedTab(tab),
    [selectedTab]
  );

  const onSubmit = useCallback(
    (data) => {
      // 이벤트버블링 체크
      dispatch(addGymRequeset(data));
      setGym('gym', data.name);
      setShowModal(false);
    },
    [selectedTab]
  );
  return (
    <Modal
      title={title}
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
      form
      footer
      {...props}
    >
      <ModalBodyBox>
        <Tabs
          tabs={SearchGymTabs}
          selectedTab={selectedTab}
          onChangeSelectedTab={onChangeSelectedTab}
          block
        />
        {selectedTab === 'search' ? (
          <ModalSearchGym setShowModal={setShowModal} setGym={setGym} />
        ) : (
          <ModalCreateGym setValue={setValue} control={control} />
        )}
      </ModalBodyBox>
    </Modal>
  );
};

export default ModalGym;
