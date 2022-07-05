import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { SearchGymTabs } from '@/../@types/constant';
import { useMutation, useQueryErrorResetBoundary } from 'react-query';
import { addGymAPI } from '@/api/gym';
import { AddressAPI, CreateGymForm, ModalGymProps } from '@/../@types/gym';
import { hiddenCustomModal, selectGym } from '@/../reducers/user';
import { Modal, Tabs } from '../../../molecules';
import ModalSearchGym from '../../ModalSearchGym';
import ModalCreateGym from '../../ModalCreateGym';
import { ModalBodyBox } from './style';
import ErrorBoundary from '../../ErrorBoundary';
import ErrorFallback from '../../ErrorFallback';

const UPDATEGYM = 'UPDATEGYM' as const;
const ModalGym = ({ title, setGym, ...props }: ModalGymProps) => {
  const dispatch = useDispatch();
  const { reset } = useQueryErrorResetBoundary();

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

  const gymMutation = useMutation((data: AddressAPI) => addGymAPI(data), {
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

  const onCancel = useCallback(() => {
    dispatch(hiddenCustomModal(UPDATEGYM));
  }, []);

  const onSubmit = useCallback(
    (data, e) => {
      if (e.eventPhase === 3) return;
      gymMutation.mutate(data);
      setGym('gym', data.name);
      hiddenCustomModal(UPDATEGYM);
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
          <ErrorBoundary
            onReset={reset}
            fallback={ErrorFallback}
            message="헬스장을 로드하는데 실패 하였습니다."
          >
            <ModalSearchGym setGym={setGym} />
          </ErrorBoundary>
        ) : (
          <ModalCreateGym setValue={setValue} control={control} />
        )}
      </ModalBodyBox>
    </Modal>
  );
};

export default ModalGym;
