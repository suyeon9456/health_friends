import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { ADD_GYM_REQUEST, LOAD_GYM_REQUEST } from '../../../../../reducers/gym';
import useInput from '../../../../hooks/useInput';
import { Modal, Tabs } from '../../../molecules';
import ModalSearchGym from '../../ModalSearchGym';
import ModalCreateGym from '../../ModalCreateGym';
import { ModalBodyBox } from './style';

const ModalGym = ({ show, title, onCancel, setShowModal, setGym, ...props }) => {
  const { searchGymTabs } = useSelector((state) => state.user);
  const { gyms } = useSelector((state) => state.gym);
  const dispatch = useDispatch();
  const [selectedTab, setSelectedTab] = useState(1);
  const [sido, setSido] = useState('');
  const [sigungu, setSigungu] = useState('');
  const [address, setAddress] = useState('');
  const [name, onChangeName] = useInput('');

  useEffect(() => {
    dispatch({ type: LOAD_GYM_REQUEST });
  }, []);

  const onChangeSelectedTab = useCallback((tab) => () => {
    setSelectedTab(tab);
  }, [selectedTab]);

  const onSubmit = useCallback(() => {
    dispatch({
      type: ADD_GYM_REQUEST,
      data: { sido, sigungu, address, name },
    });
    setGym(name);
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
          ? <ModalSearchGym list={gyms} setShowModal={setShowModal} setGym={setGym} />
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
  setGym: PropTypes.func,
  props: PropTypes.any,
};

export default ModalGym;
