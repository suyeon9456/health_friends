import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { BiChevronLeft, BiChevronRight, BiGroup } from 'react-icons/bi';

import { gymSelector, loadFriends, loadGyms } from '@/../reducers/gym';
import { useQueries } from 'react-query';
import { loadGymAndFriendsAPI, loadGymsAPI } from '@/api/user';
import { gymAndFriendsByIdKey, gymsKey } from '@/../@types/queryKey';
import { Gym } from '@/../@types/gym';
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
}: {
  foldedFriends: boolean;
  setFoldedFriends: Dispatch<SetStateAction<boolean>>;
  foldedGym: boolean;
  setFoldedGym: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { searchText } = router.query;
  const {
    mapBounds: { swLon, swLat, neLon, neLat },
    hasMoreGyms,
    isLoadGyms,
  } = useSelector(gymSelector);

  const [searchWord, onChangeSearchWord] = useInput<string>('');
  const [browserHeight, setBrowserHeight] = useState<number>(0);
  const [gymId, setGymId] = useState<number>(0);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string | string>('');

  const [{ isLoading }, { data: gyms }] = useQueries<
    [{ isLoading: boolean }, { data: Gym[] }]
  >([
    {
      queryKey: gymAndFriendsByIdKey(gymId),
      queryFn: () => loadGymAndFriendsAPI({ gymId }),
      onSuccess: (data) => {
        dispatch(loadFriends(data));
      },
      refetchOnWindowFocus: false,
      retry: false,
    },
    {
      queryKey: gymsKey({
        searchWord: searchQuery,
        swLon,
        swLat,
        neLon,
        neLat,
        isLoadGyms,
        isSearch,
      }),
      queryFn: () => {
        return loadGymsAPI({
          searchWord: searchQuery,
          swLon,
          swLat,
          neLon,
          neLat,
          isLoadGyms,
          isSearch,
        });
      },
      onSuccess: (data) => {
        if (!data) return;
        dispatch(loadGyms(data));
        setIsSearch(false);
      },
      refetchOnWindowFocus: false,
      retry: false,
    },
  ]);

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
      console.log('>', targetGymId);
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
          {gyms?.map((gym) => (
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
