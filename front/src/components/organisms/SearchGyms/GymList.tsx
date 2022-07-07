import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { BiGroup } from 'react-icons/bi';

import { changeSelectedGym, gymsSelector, loadGyms } from '@/../reducers/gym';
import { loadGymsAPI } from '@/api/gym';
import { gymsKey } from '@/../@utils/queryKey';
import { Gym } from '@/../@types/gym';

import { Icon, Item } from '@/components/atoms';
import { useRouter } from 'next/router';

const GymList = ({ searchQuery }: { searchQuery: string }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { gyms, mapBounds } = useSelector(gymsSelector);

  const _gyms = useQuery(
    gymsKey({ searchWord: searchQuery, mapBounds }),
    () => loadGymsAPI({ searchWord: searchQuery, mapBounds }),
    {
      onSuccess: (data) => {
        dispatch(loadGyms({ data }));
      },
      refetchOnWindowFocus: false,
      suspense: true,
    }
  );

  const onClickGym = useCallback(
    (targetGym: { id: number }) => () => {
      dispatch(changeSelectedGym(targetGym));
    },
    []
  );

  return (
    <>
      {gyms?.map((gym: Gym) => (
        <Item
          key={gym.id}
          title={gym.name}
          description={
            <div>
              <span>{gym.addressRoad}</span>
              <span> ({gym.address})</span>
              <div>{gym.phone}</div>
              <div>
                <Icon icon={<BiGroup />} /> {gym?.Users?.length}명
              </div>
            </div>
          }
          onClick={onClickGym(gym)}
        />
      ))}
    </>
  );
};

export default React.memo(GymList);
