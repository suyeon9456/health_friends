import React from 'react';
import PropTypes from 'prop-types';

import { BoxContent, GymListWrap } from './style';
import Search from '../../atoms/Search';
import List from '../../molecules/List';

const ModalSearchGym = ({ list }) => (
  <BoxContent>
    <Search enterButton />
    <GymListWrap>
      <List list={list} />
    </GymListWrap>
  </BoxContent>
);

ModalSearchGym.propTypes = {
  list: PropTypes.array,
};

export default ModalSearchGym;
