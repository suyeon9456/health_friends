import React, { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { LeftOutlined, RightOutlined, TeamOutlined } from '@ant-design/icons';

import useInput from '../../../hooks/useInput';

import { Search, Item, Button } from '../../atoms';
import { Alert } from '../../molecules';
import SearchFriends from '../SearchFriends';
import SearchSidebar from '../SearchSidebar';
import ModalMatchingRequest from '../ModalMatchingRequest';
import { SearchHeader, SearchWrapper, SearchTitle, SearchFormWrapper, SearchListWrapper, GymWrapper, FoldButton } from './style';
import { gymSelector, loadFriendsRequest, loadGymRequest } from '@/../reducers/gym';

const SearchGyms = ({ foldedFriends, setFoldedFriends, foldedGym, setFoldedGym }: {
  foldedFriends: boolean;
  setFoldedFriends: Dispatch<SetStateAction<boolean>>;
  foldedGym: boolean;
  setFoldedGym: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { searchText } = router.query;
  const { mapBounds,
    gyms,
    hasMoreGyms,
    loadGymLoading,
    isLoadGyms } = useSelector(gymSelector);

  const [browserHeight, setBrowserHeight] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [friend, setFriend] = useState<{
    id?: number;
    nickname?: string;
    Userdetail?: object;
    Image?: object;
    UserGym?: { GymId?: number };
   }>({});
  const [stateWarning, setStateWarning] = useState<boolean>(false);
  const [searchWord, onChangeSearchWord] = useInput<string>('');

  const changeFoldedGym = useCallback(() => {
    setFoldedGym((prev) => !prev);
  }, [foldedGym]);

  const onSearchGyms = useCallback(() => {
    console.log('searchWord', searchWord);
    dispatch(loadGymRequest({ searchWord }));
    router.push(`?searchText=${searchWord}`, undefined, { shallow: true });
  }, [searchWord]);

  const onClickGym = useCallback((gymId) => () => {
    if (foldedFriends) {
      setFoldedFriends(false);
    }
    dispatch(loadFriendsRequest({ gymId }));
  }, [foldedFriends]);

  const onChangeStateWarning = useCallback(() => {
    setStateWarning(false);
  }, [stateWarning]);

  useEffect(() => {
    if (isLoadGyms && mapBounds) {
      dispatch(loadGymRequest({
        searchWord,
        swLon: mapBounds.swLon,
        swLat: mapBounds.swLat,
        neLon: mapBounds.neLon,
        neLat: mapBounds.neLat,
      }));
    }
  }, [isLoadGyms, mapBounds]);

  useEffect(() => {
    if (!foldedFriends) {
      setFoldedGym(false);
    }
  }, [foldedFriends]);

  useEffect(() => {
    function onScroll() {
      if (window.scrollY + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 300) {
        if (hasMoreGyms && !loadGymLoading) {
          const lastId = gyms[gyms.length - 1]?.id;
          dispatch(loadGymRequest({
            lastId,
            searchWord
          }));
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
        <FoldButton foldedGym={foldedGym} onClick={changeFoldedGym} className="fold-button">
          {foldedGym ? <RightOutlined /> : <LeftOutlined />}
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
          {gyms.map((gym: {
            id: number;
            name: string;
            address: string;
            Users: Array<any>;
          }) => (
            <Item
              key={gym.id}
              title={gym.name}
              description={(
                <div>
                  <span>{gym.address}</span>
                  <div>
                    <TeamOutlined /> {gym.Users.length}명
                  </div>
                </div>
              )}
              onClick={onClickGym(gym.id)}
            />
          ))}
        </SearchListWrapper>
      </GymWrapper>
      <SearchFriends
        foldedGym={foldedGym}
        foldedFriends={foldedFriends}
        setFoldedFriends={setFoldedFriends}
        setFriend={setFriend}
        setShowModal={setShowModal}
        setStateWarning={setStateWarning}
      />
      <ModalMatchingRequest
        showModal={showModal}
        setShowModal={setShowModal}
        friend={friend}
      />
      <Alert
        show={stateWarning}
        type="warning"
        action={(
          <Button
            block
            type="warning"
            onClick={onChangeStateWarning}
          >
            확인
          </Button>
        )}
        message="로그인이 필요한 페이지입니다."
      />
    </SearchWrapper>
  );
};

export default SearchGyms;
