import React from 'react';
import PropTypes from 'prop-types';

import { SearchWrap, EnterIconWrapper, SearchLoadingIcon, SearchInput, SearchIcon } from './style';

const Search = ({
  size = 'default',
  loading,
  value,
  onChange,
  placeholder,
  ...props
}) => (
  <SearchWrap
    {...props}
    size={size}
  >
    <EnterIconWrapper>
      {loading ? <SearchLoadingIcon /> : <SearchIcon />}
    </EnterIconWrapper>
    <SearchInput placeholder={placeholder} />
  </SearchWrap>
);

Search.propTypes = {
  size: PropTypes.string,
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
  value: PropTypes.node,
  onChange: PropTypes.func,
  props: PropTypes.any,
};

export default Search;
