import React, { useCallback } from 'react';
import PropTypes from 'prop-types';

import { SearchWrap, EnterIconWrapper, SearchLoadingIcon, SearchInput, SearchIcon } from './style';

const Search = ({
  size = 'default',
  loading,
  value,
  onChange,
  placeholder,
  onSearch,
  ...props
}) => {
  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  }, [value]);
  return (
    <SearchWrap
      {...props}
      size={size}
    >
      <EnterIconWrapper>
        {loading ? <SearchLoadingIcon /> : <SearchIcon onClick={onSearch} />}
      </EnterIconWrapper>
      <SearchInput
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyPress={handleKeyPress}
      />
    </SearchWrap>
  );
};

Search.propTypes = {
  size: PropTypes.string,
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
  value: PropTypes.node,
  onChange: PropTypes.func,
  onSearch: PropTypes.func,
  props: PropTypes.any,
};

export default Search;
