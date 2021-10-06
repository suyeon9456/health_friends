import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import { SELECT_GYM } from '../../../../reducers/user';
import { BoxContent, GymListWrap, ListCard } from './style';
import { Search, Item } from '../../atoms';

const ModalSearchGym = ({ list, setShowModal, setGym }) => {
  const dispatch = useDispatch();

  const onClick = useCallback((gym) => {
    dispatch({
      type: SELECT_GYM,
      data: { id: gym.id, name: gym.name },
    });
    setGym(gym.name);
    setShowModal(false);
  }, [list]);
  return (
    <BoxContent>
      <Search enterButton />
      <GymListWrap>
        <ListCard>
          {list.map((gym) => (
            <Item
              key={gym.id}
              title={gym.name}
              description={gym.address}
              onClick={() => onClick(gym)}
            />
          ))}
        </ListCard>
      </GymListWrap>
    </BoxContent>
  );
};

ModalSearchGym.propTypes = {
  list: PropTypes.array,
  setShowModal: PropTypes.func,
  setGym: PropTypes.func,
};

export default ModalSearchGym;
