import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { BiChevronLeft, BiChevronRight, BiGroup } from 'react-icons/bi';

import { gymSelector, loadFriends, loadGyms } from '@/../reducers/gym';
import { useQuery } from 'react-query';
import { loadGymAndFriendsAPI, loadGymsAPI, loadMapAPI } from '@/api/user';
import { gymAndFriendsByIdKey, gymsKey, mapKey } from '@/../@types/queryKey';
import { Gym, SearchGymsFoldedStatesProps } from '@/../@types/gym';
import useInput from '../../../hooks/useInput';

import { Search, Item, Icon } from '../../atoms';
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
}: SearchGymsFoldedStatesProps) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { searchText } = router.query;
  const { gyms, mapBounds, isLoadGyms } = useSelector(gymSelector);

  const [searchWord, onChangeSearchWord] = useInput<string>('');
  const [browserHeight, setBrowserHeight] = useState<number>(0);
  const [gymId, setGymId] = useState<number>(0);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string | string>('');

  const { isLoading } = useQuery(
    gymAndFriendsByIdKey(gymId),
    () => loadGymAndFriendsAPI({ gymId }),
    {
      onSuccess: (data) => dispatch(loadFriends(data)),
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!gymId,
    }
  );

  const _map = useQuery(
    mapKey({ searchWord: searchQuery, isLoadGyms, mapBounds }),
    () => loadMapAPI({ searchWord: searchQuery, mapBounds }),
    {
      onSuccess: (data) => {
        dispatch(loadGyms(data));
        setIsSearch(false);
      },
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!isLoadGyms,
    }
  );

  const _search = useQuery(
    gymsKey({ searchWord: searchQuery, isSearch }),
    () => loadGymsAPI({ searchWord: searchQuery }),
    {
      onSuccess: (data) => {
        dispatch(loadGyms(data));
        setIsSearch(false);
      },
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!isSearch,
    }
  );

  const changeFoldedGym = useCallback(() => {
    setFoldedGym((prev) => !prev);
  }, [foldedGym]);

  const onSearchGyms = useCallback(() => {
    setSearchQuery(searchWord);
    setIsSearch(true);
    void router.push(`?searchText=${searchWord}`, undefined, { shallow: true });
  }, [searchWord]);

  const onClickGym = useCallback(
    (targetGymId) => () => {
      if (foldedFriends) {
        setFoldedFriends(false);
      }
      setGymId(targetGymId);
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
    if (!searchText || Array.isArray(searchText)) return;
    setSearchQuery(searchText);
    setIsSearch(true);
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
      />
    </SearchWrapper>
  );
};

export default SearchGyms;
