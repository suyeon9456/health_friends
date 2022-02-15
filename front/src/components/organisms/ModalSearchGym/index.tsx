import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/../store/configureStore';
import useInput from '../../../hooks/useInput';
import { SELECT_GYM } from '../../../../reducers/user';
import { LOAD_GYM_REQUEST } from '../../../../reducers/gym';
import { Search, Item } from '../../atoms';
import { BoxContent, GymListWrap, ListCard } from './style';
import { UseFormSetValue } from 'react-hook-form';

const ModalSearchGym = ({ setShowModal, setGym }: {
  setShowModal: (state: boolean) => void;
  setGym: UseFormSetValue<{
    startTime: Date;
    endTime: Date;
    gym: string;
    description: string;
  }>;
}) => {
  const dispatch = useDispatch();
  const { gyms } = useSelector((state: RootState) => state.gym);

  const [searchWord, onChangeSearchWord] = useInput('');

  const onClick = useCallback((gym) => {
    dispatch({
      type: SELECT_GYM,
      data: { id: gym.id, name: gym.name },
    });
    setGym('gym', gym.name);
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
          {gyms.map((gym: {
            id: number,
            name: string,
            address: string,
          }) => (
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

export default ModalSearchGym;
