import { SearchProps } from '@/../@types/atoms';
import { SizeType } from '@/../@types/utils';
import React, { useCallback } from 'react';

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
  value,
  onChange,
  placeholder,
  onSearch,
  ...props
}: SearchProps) => {
  const handleKeyPress = useCallback(
    (e) => {
      if (e.key === 'Enter') {
        onSearch();
      }
    },
    [value]
  );
  return (
    <SearchWrap {...props} size={size}>
      <EnterIconWrapper>
        {loading ? <SearchLoadingIcon /> : <SearchIcon onClick={onSearch} />}
      </EnterIconWrapper>
      <SearchInput
        size={size}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
      />
    </SearchWrap>
  );
};

export default Search;
