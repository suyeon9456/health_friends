import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { QueryErrorResetBoundary } from 'react-query';

import {
  changeIsFoldedGym,
  changeMapBounds,
  foldedItemSelector,
  gymsSelector,
} from '@/../reducers/gym';

import { Search, FoldButton } from '@/components/atoms';
import dynamic from 'next/dynamic';
import {
  SearchHeader,
  SearchWrapper,
  SearchTitle,
  SearchFormWrapper,
  GymWrapper,
  SearchListWrapper,
} from './style';
import SuspenseWithErrorBoundary from '../SuspenseWithErrorBoundary';

const GymList = dynamic(() => import('./GymList'), { ssr: false });
const SearchSidebar = dynamic(() => import('../SearchSidebar'), {
  suspense: true,
  ssr: false,
});

const SearchGyms = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { gyms } = useSelector(gymsSelector);
  const { isFoldedGym, isFoldedFriends } = useSelector(foldedItemSelector);
  const [browserHeight, setBrowserHeight] = useState<number>(0);

  const [searchWord, setSearchWord] = useState<string>('');

  const onSearchCallback = useCallback(() => {
    dispatch(changeMapBounds(null));
    window.history.replaceState(
      window.history.state,
      '',
      `${window.location.pathname}?searchText=${searchWord}`
    );
  }, [searchWord]);

  const query = useMemo(() => {
    const { searchText } = router.query;
    return (!!searchText && !Array.isArray(searchText) && searchText) || '';
  }, [router.query]);

  useEffect(() => {
    if (!query) return;
    setSearchWord(query);
  }, [query]);

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
        <SearchWrapper>
          <SearchSidebar />
          {isFoldedFriends || <FoldButton />}
          <GymWrapper foldedGym={isFoldedGym} foldedFriends={isFoldedFriends}>
            <SearchHeader>
              <span>{gyms?.length}개의 헬스장</span>
              <SearchTitle>{searchWord || '전체 헬스장'} 검색 결과</SearchTitle>
            </SearchHeader>
            <SearchFormWrapper>
              <Search
                placeholder="관심 지역 및 헬스장을 검색해보세요."
                setSearchWord={setSearchWord}
                onSearchCallback={onSearchCallback}
              />
            </SearchFormWrapper>
            <SearchListWrapper browserHeight={browserHeight}>
              <SuspenseWithErrorBoundary
                errorKey={searchWord}
                onReset={reset}
                errorMessgae="검색결과를 로드하는데 실패 하였습니다."
              >
                <GymList searchQuery={searchWord} />
              </SuspenseWithErrorBoundary>
            </SearchListWrapper>
          </GymWrapper>
        </SearchWrapper>
      )}
    </QueryErrorResetBoundary>
  );
};

export default SearchGyms;
