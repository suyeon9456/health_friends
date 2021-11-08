import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import useInput from '../../../hooks/useInput';
import { SELECT_GYM } from '../../../../reducers/user';
import { BoxContent, GymListWrap, ListCard } from './style';
import { Search, Item } from '../../atoms';
import { LOAD_GYM_REQUEST } from '../../../../reducers/gym';

const ModalSearchGym = ({ setShowModal, setGym }) => {
  const dispatch = useDispatch();
  const { gyms } = useSelector((state) => state.gym);

  const [searchWord, onChangeSearchWord] = useInput('');

  const onClick = useCallback((gym) => {
    dispatch({
      type: SELECT_GYM,
      data: { id: gym.id, name: gym.name },
    });
    setGym(gym.name);
    setShowModal(false);
  }, [gyms]);

  const onSearch = useCallback(() => {
    dispatch({
      type: LOAD_GYM_REQUEST,
      data: { searchWord },
    });
  }, [searchWord]);

  useEffect(() => {
    dispatch({
      type: LOAD_GYM_REQUEST,
      data: { searchWord },
    });
  }, []);

  return (
    <BoxContent>
      <Search
        value={searchWord}
        onChange={onChangeSearchWord}
        onSearch={onSearch}
        enterButton
      />
      <GymListWrap>
        <ListCard>
          {gyms.map((gym) => (
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
  setShowModal: PropTypes.func,
  setGym: PropTypes.func,
};

export default ModalSearchGym;
