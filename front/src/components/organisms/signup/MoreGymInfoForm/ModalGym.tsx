import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { SearchGymTabs } from '@/../@types/utils';
import { useMutation } from 'react-query';
import { addGymAPI } from '@/api/user';
import { Address, CreateGymForm, CreateGymProps } from '@/../@types/gym';
import { selectGym } from '@/../reducers/user';
import { Modal, Tabs } from '../../../molecules';
import ModalSearchGym from '../../ModalSearchGym';
import ModalCreateGym from '../../ModalCreateGym';
import { ModalBodyBox } from './style';

const ModalGym = ({
  title,
  onCancel,
  setShowModal,
  setGym,
  ...props
}: CreateGymProps) => {
  const dispatch = useDispatch();

  const { handleSubmit, control, setValue } = useForm<CreateGymForm>({
    defaultValues: {
      address: '',
      addressRoad: '',
      phone: '',
      latitude: '',
      longitude: '',
      name: '',
    },
  });

  const [selectedTab, setSelectedTab] = useState('search');

  const gymMutation = useMutation((data: Address) => addGymAPI(data), {
    onSuccess: (gym) => {
      dispatch(selectGym({ id: gym.id, name: gym.name }));
    },
  });

  const onChangeSelectedTab = useCallback(
    (tab) => {
      setSelectedTab(tab);
    },
    [selectedTab]
  );

  const onSubmit = useCallback(
    (data) => {
      gymMutation.mutate(data);
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
