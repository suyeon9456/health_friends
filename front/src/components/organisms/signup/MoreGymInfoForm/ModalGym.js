import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { Modal, Tabs } from '../../../molecules';
import { ModalBodyBox } from './style';

const ModalGym = ({ show, title, onCancel, ...props }) => {
  const { searchGymTabs } = useSelector((state) => state.user);
  const { selectedTab, setSelectedTab } = useState(1);
  const onChangeSelectedTab = useCallback((tab) => () => {
    setSelectedTab(tab);
  }, [selectedTab]);
  return (
    <Modal
      show={show}
      title={title}
      onCancel={onCancel}
      {...props}
    >
      <ModalBodyBox>
        <Tabs
          tabs={searchGymTabs}
          selectedTab={selectedTab}
          onChangeSelectedTab={onChangeSelectedTab}
          block
        />
        {selectedTab === '1'
          ? <ModalSearchGym tabs={searchGymTabs} />
          : <ModalCreateGym />}
      </ModalBodyBox>
    </Modal>
  );
};

ModalGym.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onCancel: PropTypes.func,
  props: PropTypes.any,
};

export default ModalGym;
