import React, {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { QueryErrorResetBoundary } from 'react-query';

import {
  changeIsFoldedGym,
  changeMapBounds,
  foldedItemSelector,
  gymsSelector,
} from '@/../reducers/gym';

import { Search, FoldButton, Icon } from '@/components/atoms';
import dynamic from 'next/dynamic';
import Spinner from '@/components/atoms/Spinner';
import {
  SearchHeader,
  SearchWrapper,
  SearchTitle,
  SearchFormWrapper,
  GymWrapper,
  SearchListWrapper,
} from './style';
// import GymList from './GymList';
import ErrorBoundary from '../ErrorBoundary';
import ErrorFallback from '../ErrorFallback';
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
              <span>{gyms?.length}?????? ?????????</span>
              <SearchTitle>{searchWord || '?????? ?????????'} ?????? ??????</SearchTitle>
            </SearchHeader>
            <SearchFormWrapper>
              <Search
                placeholder="?????? ?????? ??? ???????????? ??????????????????."
                setSearchWord={setSearchWord}
                onSearchCallback={onSearchCallback}
              />
            </SearchFormWrapper>
            <SearchListWrapper browserHeight={browserHeight}>
              <SuspenseWithErrorBoundary
                errorKey={searchWord}
                onReset={reset}
                errorMessgae="??????????????? ??????????????? ?????? ???????????????."
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
