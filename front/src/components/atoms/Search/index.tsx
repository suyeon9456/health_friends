import React, { useCallback } from 'react';
import { SearchProps } from '@/../@types/atoms';
import { SizeType } from '@/../@types/constant';
import { useInput } from '@/hooks';

import {
  SearchWrap,
  EnterIconWrapper,
  SearchLoadingIcon,
  SearchInput,
  SearchIcon,
} from './style';

const Search = ({
  size = SizeType.DEFAULT,
  loading,
  placeholder,
  setSearchWord,
  onSearchCallback,
  ...props
}: SearchProps) => {
  const [searchWord, onChangeSearchWord] = useInput<string>('');
  const onSearch = useCallback(() => {
    setSearchWord(searchWord);
    if (!onSearchCallback) return;
    onSearchCallback();
  }, [searchWord]);
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onSearch();
      }
    },
    [searchWord]
  );
  return (
    <SearchWrap {...props} size={size}>
      <EnterIconWrapper>
        {loading ? <SearchLoadingIcon /> : <SearchIcon onClick={onSearch} />}
      </EnterIconWrapper>
      <SearchInput
        size={size}
        value={searchWord}
        onChange={onChangeSearchWord}
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
      />
    </SearchWrap>
  );
};

export default Search;
