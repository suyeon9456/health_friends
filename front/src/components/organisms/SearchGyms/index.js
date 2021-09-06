import React, { useEffect, useState } from 'react';
import { TeamOutlined } from '@ant-design/icons';

import { SearchHeader, SearchWrapper, SearchTitle, SearchFormWrapper, SearchListWrapper } from './style';
import Input from '../../atoms/Input';
import Item from '../../atoms/Item';

const SearchGyms = () => {
  const [browserHeight, setBrowserHeight] = useState('');
  const list = [
    { title: '헬스장 1', description: '서울시 관악구 헬스장 주소 1', friends: 5 },
    { title: '헬스장 2', description: '서울시 관악구 헬스장 주소 2', friends: 5 },
    { title: '헬스장 3', description: '서울시 관악구 헬스장 주소 3', friends: 5 },
    { title: '헬스장 4', description: '서울시 관악구 헬스장 주소 3', friends: 5 },
    { title: '헬스장 5', description: '서울시 관악구 헬스장 주소 3', friends: 5 },
    { title: '헬스장 6', description: '서울시 관악구 헬스장 주소 3', friends: 5 },
    { title: '헬스장 7', description: '서울시 관악구 헬스장 주소 3', friends: 5 },
    { title: '헬스장 8', description: '서울시 관악구 헬스장 주소 3', friends: 5 },
    { title: '헬스장 9', description: '서울시 관악구 헬스장 주소 3', friends: 5 },
    { title: '헬스장 10', description: '서울시 관악구 헬스장 주소 3', friends: 6 },
  ];

  useEffect(() => {
    setBrowserHeight(document.documentElement.clientHeight);
  }, [browserHeight]);

  return (
    <SearchWrapper>
      {/* <SearchFriends /> */}
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
        {/* <List list={list} /> */}
        {list.map((item, i) => (
          <Item
            key={i}
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
    </SearchWrapper>
  );
};

export default SearchGyms;
