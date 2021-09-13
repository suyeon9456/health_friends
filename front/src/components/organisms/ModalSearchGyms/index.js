import React from 'react';
import PropTypes from 'prop-types';

import { BoxContent, GymListWrap } from './style';
import Input from '../../atoms/Input';
import List from '../../molecules/List';

const ModalSearchGym = ({ list }) => (
  <BoxContent>
    <Input
      type="search"
      enterButton
    />
    <GymListWrap>
      <List list={list} />
    </GymListWrap>
  </BoxContent>
);

ModalSearchGym.propTypes = {
  list: PropTypes.array,
};

export default ModalSearchGym;
