import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { BiChevronLeft, BiChevronRight, BiGroup } from 'react-icons/bi';

import {
  changeMapBounds,
  gymSelector,
  loadFriends,
  loadGyms,
} from '@/../reducers/gym';
import useInput from '@/hooks/useInput';
import { loadGymAndFriendsAPI } from '@/api/user';
import { loadGymsAPI } from '@/api/gym';
import { gymAndFriendsByIdKey, gymsKey } from '@/../@utils/queryKey';
import { Gym, SearchGymsProps } from '@/../@types/gym';

import { Search, Item, Icon } from '@/components/atoms';
import SearchFriends from '../SearchFriends';
import SearchSidebar from '../SearchSidebar';
import {
  SearchHeader,
  SearchWrapper,
  SearchTitle,
  SearchFormWrapper,
  SearchListWrapper,
  GymWrapper,
  FoldButton,
} from './style';

const SearchGyms = ({
  foldedFriends,
  setFoldedFriends,
  foldedGym,
  setFoldedGym,
}: SearchGymsProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { searchText, gym: selectedGym } = router.query;
  const { gyms, mapBounds } = useSelector(gymSelector);

  const [searchWord, onChangeSearchWord] = useInput<string>('');
  const [browserHeight, setBrowserHeight] = useState<number>(0);
  const [gymId, setGymId] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>(
    (!!searchText && !Array.isArray(searchText) && searchText) || ''
  );

  const { isLoading, data: friends } = useQuery(
    gymAndFriendsByIdKey(gymId),
    () => loadGymAndFriendsAPI({ gymId }),
    {
      onSuccess: (data) => dispatch(loadFriends(data)),
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!gymId,
    }
  );

  const _gyms = useQuery(
    gymsKey({ searchWord: searchQuery, mapBounds }),
    () => loadGymsAPI({ searchWord: searchQuery, mapBounds }),
    {
      onSuccess: (data) => {
        dispatch(loadGyms({ data, selectedGym }));
      },
      refetchOnWindowFocus: false,
      retry: false,
    }
  );

  const changeFoldedGym = useCallback(() => {
    setFoldedGym((prev) => !prev);
  }, [foldedGym]);

  const onSearchGyms = useCallback(() => {
    setSearchQuery(searchWord);
    dispatch(changeMapBounds(null));
    void router.push(`?searchText=${searchWord}`, undefined, { shallow: true });
  }, [searchWord]);

  const onClickGym = useCallback(
    (targetGymId) => () => {
      if (foldedFriends) {
        setFoldedFriends(false);
      }
      setGymId(targetGymId);
      void router.push(
        {
          query: { ...router.query, gym: targetGymId },
        },
        undefined,
        { shallow: true }
      );
    },
    [foldedFriends]
  );

  useEffect(() => {
    if (!foldedFriends) {
      setFoldedGym(false);
    }
  }, [foldedFriends]);

  useEffect(() => {
    setBrowserHeight(document.documentElement.clientHeight);
  }, [browserHeight]);

  useEffect(() => {
    if (selectedGym && !Array.isArray(selectedGym)) {
      if (foldedFriends) {
        setFoldedFriends(false);
      }
      setGymId(parseInt(selectedGym, 10));
    }
  }, []);

  return (
    <SearchWrapper
      foldedBlock={foldedGym && foldedFriends}
      foldedOnlyGym={foldedGym && !foldedFriends}
    >
      <SearchSidebar foldedGym={foldedGym} setFoldedGym={setFoldedGym} />
      {foldedFriends || (
        <FoldButton
          foldedGym={foldedGym}
          onClick={changeFoldedGym}
          className="fold-button"
        >
          {foldedGym ? (
            <Icon icon={<BiChevronRight />} />
          ) : (
            <Icon icon={<BiChevronLeft />} />
          )}
        </FoldButton>
      )}
      <GymWrapper foldedGym={foldedGym}>
        <SearchHeader>
          <span>{gyms?.length}개의 헬스장</span>
          <SearchTitle>{searchWord || '전체 헬스장'} 검색 결과</SearchTitle>
        </SearchHeader>
        <SearchFormWrapper>
          <Search
            placeholder="관심 지역 및 헬스장을 검색해보세요."
            value={searchWord}
            onChange={onChangeSearchWord}
            onSearch={onSearchGyms}
          />
        </SearchFormWrapper>
        <SearchListWrapper browserHeight={browserHeight}>
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
              onClick={onClickGym(gym.id)}
            />
          ))}
        </SearchListWrapper>
      </GymWrapper>
      <SearchFriends
        isLoading={isLoading}
        foldedGym={foldedGym}
        foldedFriends={foldedFriends}
        setFoldedFriends={setFoldedFriends}
        friends={friends}
      />
    </SearchWrapper>
  );
};

export default SearchGyms;
