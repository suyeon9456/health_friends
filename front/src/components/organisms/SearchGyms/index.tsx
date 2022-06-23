import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryErrorResetBoundary } from 'react-query';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import {
  changeIsFoldedFriends,
  changeIsFoldedGym,
  changeMapBounds,
  changeSelectedGym,
  foldedItemSelector,
  gymSelector,
} from '@/../reducers/gym';
import useInput from '@/hooks/useInput';

import { Search, Icon } from '@/components/atoms';
import SearchFriends from '../SearchFriends';
import SearchSidebar from '../SearchSidebar';
import {
  SearchHeader,
  SearchWrapper,
  SearchTitle,
  SearchFormWrapper,
  GymWrapper,
  FoldButton,
  SearchListWrapper,
  SearchFriendsWrapper,
} from './style';
import GymList from './GymList';
import ErrorBoundary from '../ErrorBoundary';
import Fallback from '../Main/RecommendFriends/Fallback';

const SearchGyms = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { reset } = useQueryErrorResetBoundary();

  const { searchText, gym: selectedGym } = router.query;
  const { gyms, selectedGym: gym } = useSelector(gymSelector);
  const { isFoldedGym, isFoldedFriends } = useSelector(foldedItemSelector);
  const [browserHeight, setBrowserHeight] = useState<number>(0);
  const searchQuery = useRef<string>(
    (!!searchText && !Array.isArray(searchText) && searchText) || ''
  );
  const [searchWord, onChangeSearchWord] = useInput<string>('');

  const changeFoldedGym = useCallback(() => {
    dispatch(changeIsFoldedGym(!isFoldedGym));
  }, [isFoldedGym]);

  const onSearchGyms = useCallback(() => {
    searchQuery.current = searchWord;
    dispatch(changeMapBounds(null));
    void router.push(`?searchText=${searchWord}`, undefined, { shallow: true });
  }, [searchWord]);

  useEffect(() => {
    if (!isFoldedFriends) {
      dispatch(changeIsFoldedGym(false));
    }
  }, [isFoldedFriends]);

  useEffect(() => {
    if (selectedGym && !Array.isArray(selectedGym)) {
      if (isFoldedFriends) {
        dispatch(changeIsFoldedFriends(false));
      }
      dispatch(
        changeSelectedGym(
          gyms?.find(
            ({ id }: { id: number }) => id === parseInt(selectedGym, 10)
          )
        )
      );
    }
  }, [gyms]);

  useEffect(() => {
    console.log(document.documentElement.clientHeight);
    setBrowserHeight(document.documentElement.clientHeight);
  }, []);

  return (
    <SearchWrapper
      foldedBlock={isFoldedGym && isFoldedFriends}
      foldedOnlyGym={isFoldedGym && !isFoldedFriends}
    >
      <SearchSidebar />
      {isFoldedFriends || (
        <FoldButton
          foldedGym={isFoldedGym}
          onClick={changeFoldedGym}
          className="fold-button"
        >
          {isFoldedGym ? (
            <Icon icon={<BiChevronRight />} />
          ) : (
            <Icon icon={<BiChevronLeft />} />
          )}
        </FoldButton>
      )}
      <GymWrapper foldedGym={isFoldedGym}>
        <SearchHeader>
          <span>{gyms?.length}개의 헬스장</span>
          <SearchTitle>
            {searchQuery.current || '전체 헬스장'} 검색 결과
          </SearchTitle>
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
          <ErrorBoundary
            key={searchQuery.current}
            onReset={reset}
            fallback={Fallback}
            message="실시간 운동중인 매칭 커플을 로드하는데 실패 하였습니다."
          >
            <GymList
              searchQuery={searchQuery.current}
              selectedGym={selectedGym}
            />
          </ErrorBoundary>
        </SearchListWrapper>
      </GymWrapper>
      <SearchFriendsWrapper
        foldedGym={isFoldedGym}
        foldedFriends={isFoldedFriends}
      >
        <ErrorBoundary
          key={gym?.id}
          onReset={reset}
          fallback={Fallback}
          message="실시간 운동중인 매칭 커플을 로드하는데 실패 하였습니다."
        >
          <SearchFriends />
        </ErrorBoundary>
      </SearchFriendsWrapper>
    </SearchWrapper>
  );
};

export default SearchGyms;
