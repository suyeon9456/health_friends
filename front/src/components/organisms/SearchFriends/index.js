import React from 'react';

import { SearchHeader, SearchWrapper, SearchTitle, SearchFormWrapper, SearchListWrapper } from './style';
import Input from '../../atoms/Input';

const SearchFriends = () => (
  <SearchWrapper>
    <SearchHeader>
      <span>10개의 헬스장</span>
      <SearchTitle>서울 관악구 검색 결과</SearchTitle>
    </SearchHeader>
    <SearchFormWrapper>
      <Input type="search" placeholder="관심 헬스장을 검색해보세요." enterButton />
    </SearchFormWrapper>
    <SearchListWrapper>
      
    </SearchListWrapper>
  </SearchWrapper>
);

export default SearchFriends;
