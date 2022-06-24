import React, { Dispatch, SetStateAction, useCallback, useMemo } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { BiGroup } from 'react-icons/bi';

import {
  changeIsFoldedFriends,
  changeSelectedGym,
  foldedItemSelector,
  gymSelector,
  loadGyms,
} from '@/../reducers/gym';
import { loadGymsAPI } from '@/api/gym';
import { gymsKey } from '@/../@utils/queryKey';
import { Gym } from '@/../@types/gym';

import { Icon, Item } from '@/components/atoms';

const GymList = ({
  searchQuery,
  selectedGym,
}: {
  searchQuery: string;
  selectedGym?: string | string[];
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { gyms, mapBounds } = useSelector(gymSelector);
  const { isFoldedFriends } = useSelector(foldedItemSelector);

  const _gyms = useQuery(
    gymsKey({ searchWord: searchQuery, mapBounds }),
    () =>
      useMemo(
        () => loadGymsAPI({ searchWord: searchQuery, mapBounds }),
        [searchQuery, mapBounds]
      ),
    {
      onSuccess: (data) => {
        dispatch(loadGyms({ data, selectedGym }));
      },
      refetchOnWindowFocus: false,
    }
  );

  const onClickGym = useCallback(
    (targetGym) => () => {
      if (isFoldedFriends) {
        dispatch(changeIsFoldedFriends(false));
      }
      dispatch(changeSelectedGym(targetGym));
      void router.push(
        {
          query: { ...router.query, gym: targetGym.id },
        },
        undefined,
        { shallow: true }
      );
    },
    [isFoldedFriends]
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

export default GymList;
