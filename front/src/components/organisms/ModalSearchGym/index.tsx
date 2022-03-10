import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../../../hooks/useInput';
import { Search, Item } from '../../atoms';
import { BoxContent, GymListWrap, ListCard } from './style';
import { UseFormSetValue } from 'react-hook-form';
import { selectGym } from '@/../reducers/user';
import { gymSelector, loadGymRequest } from '@/../reducers/gym';

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
  const { gyms } = useSelector(gymSelector);

  const [searchWord, onChangeSearchWord] = useInput('');

  const onClick = useCallback((gym) => {
    dispatch(selectGym({ id: gym.id, name: gym.name }));
    setGym('gym', gym.name);
    setShowModal(false);
  }, [gyms]);

  const onSearch = useCallback(() => {
    dispatch(loadGymRequest({ searchWord }));
  }, [searchWord]);

  useEffect(() => {
    dispatch(loadGymRequest({ searchWord }));
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
