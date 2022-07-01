import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';

import { changeIsShowModal, selectGym } from '@/../reducers/user';
import { Item } from '@/components/atoms';
import { signupGymsKey } from '@/../@utils/queryKey';
import { loadSignupGymsAPI } from '@/api/user';
import { UseFormSetValue } from 'react-hook-form';
import { Gym } from '@/../@types/gym';
import { AxiosError } from 'axios';
import { ListCard } from './style';

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
      if (setGym) {
        dispatch(selectGym({ id: gym.id, name: gym.name }));
        setGym('gym', gym.name);
        dispatch(changeIsShowModal(null));
        return;
      }
      if (onSelectedGym) {
        onSelectedGym(gym.id);
        dispatch(changeIsShowModal(null));
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
