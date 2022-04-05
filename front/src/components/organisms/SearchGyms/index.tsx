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

import {
  gymSelector,
  loadFriendsRequest,
  loadGymRequest,
} from '@/../reducers/gym';
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
  const { mapBounds, gyms, hasMoreGyms, loadGymLoading, isLoadGyms } =
    useSelector(gymSelector);

  const [browserHeight, setBrowserHeight] = useState<number>(0);

  const [searchWord, onChangeSearchWord] = useInput<string>('');

  const changeFoldedGym = useCallback(() => {
    setFoldedGym((prev) => !prev);
  }, [foldedGym]);

  const onSearchGyms = useCallback(() => {
    dispatch(loadGymRequest({ searchWord }));
    void router.push(`?searchText=${searchWord}`, undefined, { shallow: true });
  }, [searchWord]);

  const onClickGym = useCallback(
    (gymId) => () => {
      if (foldedFriends) {
        setFoldedFriends(false);
      }
      dispatch(loadFriendsRequest({ gymId }));
    },
    [foldedFriends]
  );

  useEffect(() => {
    if (isLoadGyms && mapBounds) {
      dispatch(
        loadGymRequest({
          searchWord,
          swLon: mapBounds.swLon,
          swLat: mapBounds.swLat,
          neLon: mapBounds.neLon,
          neLat: mapBounds.neLat,
        })
      );
    }
  }, [isLoadGyms, mapBounds]);

  useEffect(() => {
    if (!foldedFriends) {
      setFoldedGym(false);
    }
  }, [foldedFriends]);

  useEffect(() => {
    function onScroll() {
      if (
        window.scrollY + document.documentElement.clientHeight >
        document.documentElement.scrollHeight - 300
      ) {
        if (hasMoreGyms && !loadGymLoading) {
          const lastId = gyms[gyms.length - 1]?.id;
          dispatch(
            loadGymRequest({
              lastId,
              searchWord,
            })
          );
        }
      }
    }
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [gyms, hasMoreGyms, loadGymLoading]);

  useEffect(() => {
    setBrowserHeight(document.documentElement.clientHeight);
  }, [browserHeight]);

  useEffect(() => {
    dispatch(loadGymRequest({ searchWord: searchText }));
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
          <span>{gyms.length}개의 헬스장</span>
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
          {gyms.map(
            (gym: {
              id: number;
              name: string;
              address: string;
              addressRoad: string;
              phone: string;
              Users: any[];
            }) => (
              <Item
                key={gym.id}
                title={gym.name}
                description={
                  <div>
                    <span>{gym.addressRoad}</span>
                    <span> ({gym.address})</span>
                    <div>{gym.phone}</div>
                    <div>
                      <Icon icon={<BiGroup />} /> {gym.Users.length}명
                    </div>
                  </div>
                }
                onClick={onClickGym(gym.id)}
              />
            )
          )}
        </SearchListWrapper>
      </GymWrapper>
      <SearchFriends
        foldedGym={foldedGym}
        foldedFriends={foldedFriends}
        setFoldedFriends={setFoldedFriends}
      />
    </SearchWrapper>
  );
};

export default SearchGyms;
