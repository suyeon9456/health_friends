import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { ADD_GYM_REQUEST } from '../../../../../reducers/gym';
import { SELECT_GYM } from '../../../../../reducers/user';
import useInput from '../../../../hooks/useInput';
import { Modal, Tabs } from '../../../molecules';
import ModalSearchGym from '../../ModalSearchGym';
import ModalCreateGym from '../../ModalCreateGym';
import { ModalBodyBox } from './style';

const ModalGym = ({ show, title, onCancel, setShowModal, ...props }) => {
  const list = [];
  const { searchGymTabs } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(1);
  const onChangeSelectedTab = useCallback((tab) => () => {
    setSelectedTab(tab);
  }, [selectedTab]);

  const [sido, setSido] = useState('');
  const [sigungu, setSigungu] = useState('');
  const [address, setAddress] = useState('');

  const [id, setId] = useState('');
  const [name, onChangeName, setName] = useInput('');

  const onSubmit = useCallback(() => {
    if (selectedTab === 2) {
      dispatch({
        type: ADD_GYM_REQUEST,
        data: { sido, sigungu, address, name },
      });
    } else {
      dispatch({
        type: SELECT_GYM,
        data: { id, name },
      });
    }
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
        {selectedTab === 1
          ? <ModalSearchGym list={list} setId={setId} setName={setName} />
          : (
            <ModalCreateGym
              sido={sido}
              setSido={setSido}
              sigungu={sigungu}
              setSigungu={setSigungu}
              address={address}
              setAddress={setAddress}
              name={name}
              onChangeName={onChangeName}
            />
          )}
      </ModalBodyBox>
    </Modal>
  );
};

ModalGym.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  setShowModal: PropTypes.func,
  props: PropTypes.any,
};

export default ModalGym;
