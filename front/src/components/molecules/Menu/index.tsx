import React, { useCallback } from 'react';
import Link from 'next/link';
import { MenuOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/../store/configureStore';
import { useShowDispatch, useShowState } from '../../../../store/contextStore';
import { MenuItem, MenuList, MenuText, MenuTitle } from './style';
import { Avatar } from '../../atoms';
import { LOG_OUT_REQUEST } from '@/../@types/reducer/useractions';

const Menu = () => {
  const { me } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();

  const { drawerShow } = useShowState();
  const contextDispatch = useShowDispatch();
  const onLogout = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST });
  }, []);

  const changeShowDrawerMenu = useCallback(() => {
    contextDispatch({
      type: 'CHANGE_STATE',
      value: !drawerShow,
    });
  }, [drawerShow]);
  return (
    <MenuList>
      <MenuItem
        type="home"
        align="left"
      >
        <MenuTitle>
          <Link href="/">
            <MenuText>
              <img src="/images/logo.png" alt="logo" />
            </MenuText>
          </Link>
        </MenuTitle>
      </MenuItem>
      <MenuItem
        align="left"
        type="pc"
      >
        <MenuTitle>
          <Link href="/friends">
            <MenuText>
              친구찾기
            </MenuText>
          </Link>
        </MenuTitle>
      </MenuItem>
      { me
        ? (
          <>
            <MenuItem
              type="pc"
              align="right"
              style={{ order: 2 }}
            >
              <MenuTitle>
                <MenuText onClick={onLogout}>
                  로그아웃
                </MenuText>
              </MenuTitle>
            </MenuItem>
            <MenuItem
              type="pc"
              align="left"
              style={{ order: 3 }}
            >
              <MenuTitle>
                <Link href="/myinfo" passHref>
                  <a>
                    <Avatar size="small" src={me?.Image ? `${me?.Image?.src}` : ''} />
                  </a>
                </Link>
              </MenuTitle>
            </MenuItem>
          </>
        )
        : (
          <>
            <MenuItem
              type="pc"
              align="right"
              style={{ order: 2 }}
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
              type="pc"
              align="left"
              style={{ order: 3 }}
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
      <MenuItem
        type="tablet-phone"
        align="right"
        style={{ order: 2 }}
      >
        <MenuTitle>
          <MenuText onClick={changeShowDrawerMenu}>
            <MenuOutlined />
          </MenuText>
        </MenuTitle>
      </MenuItem>
    </MenuList>
  );
};

export default Menu;
