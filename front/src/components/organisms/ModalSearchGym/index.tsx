import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';

import { UseFormSetValue } from 'react-hook-form';
import { selectGym } from '@/../reducers/user';
import { useQuery } from 'react-query';
import { signupGymsKey } from '@/../@types/queryKey';
import { loadSignupGymsAPI } from '@/api/user';
import { Gym } from '@/../@types/gym';
import useInput from '../../../hooks/useInput';
import { Search, Item } from '../../atoms';
import { BoxContent, GymListWrap, ListCard } from './style';

const ModalSearchGym = ({
  setShowModal,
  setGym,
}: {
  setShowModal: (state: boolean) => void;
  setGym: UseFormSetValue<{
    startTime: Date;
    endTime: Date;
    gym: string;
    description: string;
  }>;
}) => {
  const dispatch = useDispatch();

  const [searchWord, onChangeSearchWord] = useInput<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

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
