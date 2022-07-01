import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { QueryErrorResetBoundary } from 'react-query';

import {
  changeIsFoldedGym,
  changeMapBounds,
  foldedItemSelector,
  gymsSelector,
} from '@/../reducers/gym';
import useInput from '@/hooks/useInput';

import { Search, FoldButton } from '@/components/atoms';
import SearchSidebar from '../SearchSidebar';
import {
  SearchHeader,
  SearchWrapper,
  SearchTitle,
  SearchFormWrapper,
  GymWrapper,
  SearchListWrapper,
} from './style';
import GymList from './GymList';
import ErrorBoundary from '../ErrorBoundary';
import ErrorFallback from '../ErrorFallback';

const SearchGyms = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { searchText } = router.query;
  const { gyms } = useSelector(gymsSelector);
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
    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}?searchText=${searchWord}`
    );
  }, [searchWord]);

  useEffect(() => {
    if (!isFoldedFriends) {
      dispatch(changeIsFoldedGym(false));
    }
  }, [isFoldedFriends]);

  useEffect(() => {
    setBrowserHeight(document.documentElement.clientHeight);
  }, []);

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <SearchWrapper
          foldedBlock={isFoldedGym && isFoldedFriends}
          foldedOnlyGym={isFoldedGym && !isFoldedFriends}
        >
          <SearchSidebar />
          {isFoldedFriends || (
            <FoldButton isFolded={isFoldedGym} changeFolded={changeFoldedGym} />
          )}
          <GymWrapper foldedGym={isFoldedGym} foldedFriends={isFoldedFriends}>
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
                fallback={ErrorFallback}
                message="검색결과를 로드하는데 실패 하였습니다."
              >
                <GymList searchQuery={searchQuery.current} />
              </ErrorBoundary>
            </SearchListWrapper>
          </GymWrapper>
        </SearchWrapper>
      )}
    </QueryErrorResetBoundary>
  );
};

export default SearchGyms;
