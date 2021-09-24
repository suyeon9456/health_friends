import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

import { MenuItem, MenuList, MenuText, MenuTitle } from './style';
import Search from '../../atoms/Search';
import { LOG_OUT_REQUEST } from '../../../../reducers/user';

const SearchBox = styled(Search)`
  vertical-align: middle;
  width: 300px;
`;

const Menu = ({ type }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const onLogout = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST });
  }, []);
  return (
    <MenuList>
      <MenuItem
        type={type}
      >
        <MenuTitle>
          <Link href="/">
            <MenuText>
              HOME
            </MenuText>
          </Link>
        </MenuTitle>
      </MenuItem>
      <MenuItem
        type={type}
      >
        <MenuTitle>
          <Link href="/friends">
            <MenuText>
              친구찾기
            </MenuText>
          </Link>
        </MenuTitle>
      </MenuItem>
      <MenuItem
        type="search"
      >
        <MenuTitle>
          <SearchBox enterButton />
        </MenuTitle>
      </MenuItem>
      { me
        ? (
          <>
            <MenuItem
              type={type}
              style={{ order: '3' }}
            >
              <MenuTitle>
                <MenuText onClick={onLogout}>
                  로그아웃
                </MenuText>
              </MenuTitle>
            </MenuItem>
            <MenuItem
              type={type}
              style={{ order: '4' }}
            >
              <MenuTitle>
                <Link href="/profile">
                  <MenuText>
                    프로필
                  </MenuText>
                </Link>
              </MenuTitle>
            </MenuItem>
          </>
        )
        : (
          <>
            <MenuItem
              type={type}
              style={{ order: '3' }}
            >
              <MenuTitle>
                <Link href="/login">
                  <MenuText>
                    로그인
                  </MenuText>
                </Link>
              </MenuTitle>
            </MenuItem>
            <MenuItem
              type={type}
              style={{ order: '4' }}
            >
              <MenuTitle>
                <Link href="/signup">
                  <MenuText>
                    회원가입
                  </MenuText>
                </Link>
              </MenuTitle>
            </MenuItem>
          </>
        )}
    </MenuList>
  );
};

Menu.propTypes = {
  type: PropTypes.string,
  // props: PropTypes.any,
};

export default Menu;
