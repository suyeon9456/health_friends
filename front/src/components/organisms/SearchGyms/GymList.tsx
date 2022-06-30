import React, { useCallback, useEffect } from 'react';
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

const GymList = ({ searchQuery }: { searchQuery: string }) => {
  const dispatch = useDispatch();
  const { gyms, gym: selectedGym, mapBounds } = useSelector(gymSelector);
  const { isFoldedFriends } = useSelector(foldedItemSelector);

  const _gyms = useQuery(
    gymsKey({ searchWord: searchQuery, mapBounds }),
    () => loadGymsAPI({ searchWord: searchQuery, mapBounds }),
    {
      onSuccess: (data) => {
        console.log('data', data);
        dispatch(loadGyms({ data }));
      },
      refetchOnWindowFocus: false,
    }
  );

  const onClickGym = useCallback(
    (targetGym) => () => {
      if (isFoldedFriends) {
        dispatch(changeIsFoldedFriends(false));
      }
      console.log(targetGym);
      dispatch(changeSelectedGym(targetGym));
      const query = !searchQuery
        ? `?gym=${targetGym.id}`
        : `?searchText=${searchQuery}&gym=${targetGym.id}`;
      window.history.replaceState(
        window.history.state,
        '',
        `${window.location.pathname}${query}`
      );
    },
    [isFoldedFriends]
  );

  useEffect(() => {
    if (isFoldedFriends) {
      dispatch(changeIsFoldedFriends(false));
    }
    dispatch(
      changeSelectedGym(
        gyms?.find(({ id }: { id: number }) => id === parseInt(selectedGym, 10))
      )
    );
  }, [gyms]);

  useEffect(() => {
    console.log(searchQuery);
  }, [searchQuery]);

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
