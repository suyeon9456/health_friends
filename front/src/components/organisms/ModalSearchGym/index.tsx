import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { selectGym } from '@/../reducers/user';
import useInput from '@/hooks/useInput';
import { loadSignupGymsAPI } from '@/api/user';
import { signupGymsKey } from '@/../@utils/queryKey';
import { Gym, ModalSearchGymProps } from '@/../@types/gym';
import { Search, Item } from '../../atoms';
import { BoxContent, GymListWrap, ListCard } from './style';

const ModalSearchGym = ({ setShowModal, setGym }: ModalSearchGymProps) => {
  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchWord, onChangeSearchWord] = useInput<string>('');

  const { data: gyms } = useQuery<Gym[]>(
    signupGymsKey(searchQuery),
    () => loadSignupGymsAPI(searchQuery),
    { initialData: [] }
  );

  const onClick = useCallback(
    (gym) => {
      dispatch(selectGym({ id: gym.id, name: gym.name }));
      setGym('gym', gym.name);
      setShowModal(false);
    },
    [gyms]
  );

  const onSearch = useCallback(() => {
    setSearchQuery(searchWord);
  }, [searchWord]);

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
          {gyms?.map((gym) => (
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
