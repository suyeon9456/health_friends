import React, { useEffect, useState } from 'react';
import { LeftOutlined, RightOutlined, TeamOutlined, ZoomInOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import {
  SearchHeader,
  SearchWrapper,
  SearchTitle,
  SearchFormWrapper,
  SearchListWrapper,
  GymWrapper, FoldButton,
  SearchSidebar,
} from './style';
import Input from '../../atoms/Input';
import Item from '../../atoms/Item';
import SearchFriends from '../SearchFriends';
import Avatar from '../../atoms/Avatar';
import Button from '../../atoms/Button';

const SearchGyms = ({ foldedGym, changeFoldedGym }) => {
  const [browserHeight, setBrowserHeight] = useState('');
  const list = [
    { id: 1, title: '헬스장 1', description: '서울시 관악구 헬스장 주소 1', friends: 5 },
    { id: 2, title: '헬스장 2', description: '서울시 관악구 헬스장 주소 2', friends: 5 },
    { id: 3, title: '헬스장 3', description: '서울시 관악구 헬스장 주소 3', friends: 5 },
    { id: 4, title: '헬스장 4', description: '서울시 관악구 헬스장 주소 3', friends: 5 },
    // { id: 5, title: '헬스장 5', description: '서울시 관악구 헬스장 주소 3', friends: 5 },
    // { id: 6, title: '헬스장 6', description: '서울시 관악구 헬스장 주소 3', friends: 5 },
    // { id: 7, title: '헬스장 7', description: '서울시 관악구 헬스장 주소 3', friends: 5 },
    // { id: 8, title: '헬스장 8', description: '서울시 관악구 헬스장 주소 3', friends: 5 },
    // { id: 9, title: '헬스장 9', description: '서울시 관악구 헬스장 주소 3', friends: 5 },
    // { id: 10, title: '헬스장 10', description: '서울시 관악구 헬스장 주소 3', friends: 6 },
  ];

  useEffect(() => {
    setBrowserHeight(document.documentElement.clientHeight);
  }, [browserHeight]);

  return (
    <SearchWrapper
      foldedGym={foldedGym}
    >
      <SearchSidebar
        foldedGym={foldedGym}
      >
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
      <GymWrapper
        foldedGym={foldedGym}
      >
        <SearchHeader>
          <span>10개의 헬스장</span>
          <SearchTitle>서울 관악구 검색 결과</SearchTitle>
        </SearchHeader>
        <SearchFormWrapper>
          <Input type="search" placeholder="관심 헬스장을 검색해보세요." enterButton />
        </SearchFormWrapper>
        <SearchListWrapper
          browserHeight={browserHeight}
        >
          {list.map((item) => (
            <Item
              key={item.id}
              title={item.title}
              description={(
                <div>
                  <span>{item.description}</span>
                  <div>
                    <TeamOutlined /> {item.friends}명
                  </div>
                </div>
              )}
            />
          ))}
        </SearchListWrapper>
      </GymWrapper>
      <SearchFriends
        foldedGym={foldedGym}
      />
    </SearchWrapper>
  );
};

SearchGyms.propTypes = {
  foldedGym: PropTypes.bool.isRequired,
  changeFoldedGym: PropTypes.func,
};

export default SearchGyms;
