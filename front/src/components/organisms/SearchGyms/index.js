import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LeftOutlined, RightOutlined, TeamOutlined, ZoomInOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { LOAD_GYM_REQUEST } from '../../../../reducers/gym';
import useInput from '../../../hooks/useInput';
import { SearchHeader,
  SearchWrapper,
  SearchTitle,
  SearchFormWrapper,
  SearchListWrapper,
  GymWrapper, FoldButton,
  SearchSidebar } from './style';
import { Search, Item, Avatar, Button } from '../../atoms';
import SearchFriends from '../SearchFriends';

const SearchGyms = ({ foldedGym, changeFoldedGym }) => {
  const dispatch = useDispatch();
  const { gyms } = useSelector((state) => state.gym);

  const [browserHeight, setBrowserHeight] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchWord, onChangeSearchWord] = useInput('');

  useEffect(() => {
    dispatch({
      type: LOAD_GYM_REQUEST,
      data: { searchWord },
    });
  }, []);

  useEffect(() => {
    setBrowserHeight(document.documentElement.clientHeight);
  }, [browserHeight]);

  const onSearchGyms = useCallback(() => {
    dispatch({
      type: LOAD_GYM_REQUEST,
      data: { searchWord },
    });
  }, [searchWord]);

  const changeShowModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, [showModal]);

  return (
    <SearchWrapper foldedGym={foldedGym}>
      <SearchSidebar foldedGym={foldedGym}>
        <div>
          <Avatar size="small" />
          <Button
            icon={<ZoomInOutlined />}
            type="text"
          />
        </div>
      </SearchSidebar>
      <FoldButton
        foldedGym={foldedGym}
        onClick={changeFoldedGym}
      >
        {foldedGym ? <RightOutlined /> : <LeftOutlined />}
      </FoldButton>
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
            />
          ))}
        </SearchListWrapper>
      </GymWrapper>
      <SearchFriends
        foldedGym={foldedGym}
        changeShowModal={changeShowModal}
      />
    </SearchWrapper>
  );
};

SearchGyms.propTypes = {
  foldedGym: PropTypes.bool.isRequired,
  changeFoldedGym: PropTypes.func,
};

export default SearchGyms;
