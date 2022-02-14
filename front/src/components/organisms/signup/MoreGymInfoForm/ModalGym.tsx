import React, { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/../store/configureStore';
import { ADD_GYM_REQUEST } from '../../../../../reducers/gym';
import useInput from '../../../../hooks/useInput';
import { Modal, Tabs } from '../../../molecules';
import ModalSearchGym from '../../ModalSearchGym';
import ModalCreateGym from '../../ModalCreateGym';
import { ModalBodyBox } from './style';

const ModalGym = ({ show, title, onCancel, setShowModal, setGym, ...props }: {
  show: boolean;
  title: string;
  onCancel: () => void;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  setGym: (key: string, value: string) => void;
}) => {
  const { searchGymTabs } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState('search');
  const [sido, setSido] = useState('');
  const [sigungu, setSigungu] = useState('');
  const [address, setAddress] = useState('');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [name, onChangeName] = useInput('');

  const onChangeSelectedTab = useCallback((tab) => () => {
    setSelectedTab(tab);
  }, [selectedTab]);

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_GYM_REQUEST,
      data: { sido, sigungu, address, name, latitude, longitude },
    });
    setGym('gym', name);
    setShowModal(false);
  }, [show, selectedTab, sido, sigungu, address, name]);
  return (
    <Modal
      show={show}
      title={title}
      onCancel={onCancel}
      onSubmit={onSubmit}
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
              sido={sido}
              setSido={setSido}
              sigungu={sigungu}
              setSigungu={setSigungu}
              address={address}
              setAddress={setAddress}
              setLatitude={setLatitude}
              setLongitude={setLongitude}
              name={name}
              onChangeName={onChangeName}
            />
          )}
      </ModalBodyBox>
    </Modal>
  );
};

export default ModalGym;