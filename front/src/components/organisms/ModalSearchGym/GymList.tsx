import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { hiddenCustomModal, selectGym } from '@/../reducers/user';
import { Item } from '@/components/atoms';
import { signupGymsKey } from '@/../@utils/queryKey';
import { loadSignupGymsAPI } from '@/api/user';
import { UseFormSetValue } from 'react-hook-form';
import { Gym } from '@/../@types/gym';
import { AxiosError } from 'axios';
import { ListCard } from './style';

const UPDATEGYM = 'UPDATEGYM' as const;
const GymList = ({
  searchQuery,
  onSelectedGym,
  setGym,
}: {
  searchQuery: string;
  onSelectedGym?: (id: number) => void;
  setGym?: UseFormSetValue<{
    startTime: Date;
    endTime: Date;
    gym: string;
    description: string;
  }>;
}) => {
  const dispatch = useDispatch();

  const { data: gyms } = useQuery<Gym[] | undefined, AxiosError>(
    signupGymsKey(searchQuery),
    () => loadSignupGymsAPI(searchQuery),
    { initialData: [] }
  );

  const onClick = useCallback(
    (gym) => {
      console.log('?');
      if (setGym) {
        dispatch(selectGym({ id: gym.id, name: gym.name }));
        setGym('gym', gym.name);
        dispatch(hiddenCustomModal(UPDATEGYM));
        return;
      }
      if (onSelectedGym) {
        onSelectedGym(gym.id);
        dispatch(hiddenCustomModal(UPDATEGYM));
      }
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
