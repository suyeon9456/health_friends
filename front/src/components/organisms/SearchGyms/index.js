import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LeftOutlined, RightOutlined, TeamOutlined } from '@ant-design/icons';

import { LOAD_GYM_REQUEST, LOAD_FRIENDS_REQUEST } from '../../../../reducers/gym';
import useInput from '../../../hooks/useInput';
import { SearchHeader,
  SearchWrapper,
  SearchTitle,
  SearchFormWrapper,
  SearchListWrapper,
  GymWrapper, FoldButton } from './style';
import { Search, Item } from '../../atoms';
import SearchFriends from '../SearchFriends';
import SearchSidebar from '../SearchSidebar';
import ModalMatchingRequest from '../ModalMatchingRequest';

const SearchGyms = () => {
  const dispatch = useDispatch();
  const { gyms, hasMoreGyms, loadGymLoading } = useSelector((state) => state.gym);

  const [browserHeight, setBrowserHeight] = useState('');
  const [foldedGym, setFoldedGym] = useState(false);
  const [foldedFriends, setFoldedFriends] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [friend, setFriend] = useState(false);
  const [searchWord, onChangeSearchWord] = useInput('');

  useEffect(() => {
    dispatch({
      type: LOAD_GYM_REQUEST,
      data: { searchWord },
    });
  }, []);

  useEffect(() => {
    if (!foldedFriends) {
      setFoldedGym(false);
    }
  }, [foldedFriends]);

  useEffect(() => {
    function onScroll() {
      // console.log(window.scrollY,
      //   document.documentElement.clientHeight,
      //   document.documentElement.scrollHeight);

      if (window.scrollY + document.documentElement.clientHeight
        > document.documentElement.scrollHeight - 300) {
        if (hasMoreGyms && !loadGymLoading) {
          const lastId = gyms[gyms.length - 1]?.id;
          dispatch({
            type: LOAD_GYM_REQUEST,
            lastId,
            data: { searchWord },
          });
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

  const changeFoldedGym = useCallback(() => {
    setFoldedGym((prev) => !prev);
  }, [foldedGym]);

  const onSearchGyms = useCallback(() => {
    dispatch({
      type: LOAD_GYM_REQUEST,
      data: { searchWord },
    });
  }, [searchWord]);

  const onClickGym = useCallback((gymId) => () => {
    if (foldedFriends) {
      setFoldedFriends(false);
    }
    dispatch({
      type: LOAD_FRIENDS_REQUEST,
      data: { gymId },
    });
  }, [foldedFriends]);

  return (
    <SearchWrapper>
      <SearchSidebar foldedGym={foldedGym} />
      {foldedFriends || (
        <FoldButton foldedGym={foldedGym} onClick={changeFoldedGym} className="fold-button">
          {foldedGym ? <RightOutlined /> : <LeftOutlined />}
        </FoldButton>
      )}
      <GymWrapper foldedGym={foldedGym}>
        <SearchHeader>
          <span>{gyms.length}개의 헬스장</span>
          <SearchTitle>서울 관악구 검색 결과</SearchTitle>
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
          {gyms.map((gym) => (
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
      />
      <ModalMatchingRequest
        showModal={showModal}
        setShowModal={setShowModal}
        friend={friend}
      />
    </SearchWrapper>
  );
};

export default SearchGyms;
