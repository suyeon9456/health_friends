import React, { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { selectGym } from '@/../reducers/user';
import { Item } from '@/components/atoms';
import { signupGymsKey } from '@/../@utils/queryKey';
import { loadSignupGymsAPI } from '@/api/user';
import { UseFormSetValue } from 'react-hook-form';
import { Gym } from '@/../@types/gym';
import { AxiosError } from 'axios';
import { ListCard } from './style';

const GymList = ({
  searchQuery,
  setGym,
  setShowModal,
}: {
  searchQuery: string;
  setShowModal: (state: boolean) => void;
  setGym: UseFormSetValue<{
    startTime: Date;
    endTime: Date;
    gym: string;
    description: string;
  }>;
}) => {
  const dispatch = useDispatch();

  const { data: gyms } = useQuery<Gym[] | undefined, AxiosError>(
    signupGymsKey(searchQuery),
    () => useMemo(() => loadSignupGymsAPI(searchQuery), [searchQuery]),
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

  return (
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
  );
};

export default GymList;
