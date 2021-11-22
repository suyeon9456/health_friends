import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { CloseOutlined, LoginOutlined, LogoutOutlined, SearchOutlined, UserOutlined } from '@ant-design/icons';

import { Button, Avatar } from '../../atoms';

import { Drawer, DrawerBody, DrawerContent, DrawerContentWrap, DrawerHeader, DrawerHeaderTitle, DrawerMask, DrawerTitle, DrawerWrapBody, MemberMenu, MemberMenuItem, Menu, MenuItem, MenuText, MenuTitle } from './style';
// import { MenuItem, MenuText, MenuTitle } from '../Menu/style';
import { LOG_OUT_REQUEST } from '../../../../reducers/user';
import { useShowDispatch } from '../../../../store/contextStore';

const DrawerMenu = ({ drawerShow }) => {
  const { me } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const contextDispatch = useShowDispatch();

  const onLogout = useCallback(() => {
    dispatch({ type: LOG_OUT_REQUEST });
  }, []);

  const changeShowDrawerMenu = useCallback(() => {
    console.log('test');
    contextDispatch({
      type: 'CHANGE_STATE',
      value: !drawerShow,
    });
  }, [drawerShow]);
  return (
    <Drawer drawerShow={drawerShow}>
      <DrawerMask className="mask" />
      <DrawerContentWrap className="wrap" drawerShow={drawerShow}>
        <DrawerContent>
          <DrawerWrapBody>
            <DrawerHeader>
              <DrawerHeaderTitle>
                { (me && me?.id) && (
                  <DrawerTitle>
                    <Avatar src={me?.Image ? `http://localhost:6015/${me?.Image?.src}` : ''} />
                    {me?.nickname}님, 안녕하세요.
                  </DrawerTitle>
                )}
                <Button type="text" icon={<CloseOutlined />} onClick={changeShowDrawerMenu} />
              </DrawerHeaderTitle>
            </DrawerHeader>
            {
                me && me?.id
                  ? (
                    <MemberMenu>
                      <MemberMenuItem>
                        <MenuText onClick={onLogout}>
                          <LogoutOutlined />
                          로그아웃
                        </MenuText>
                      </MemberMenuItem>
                    </MemberMenu>
                  )
                  : (
                    <MemberMenu>
                      <MemberMenuItem>
                        <Link href="/login">
                          <MenuText>
                            <LoginOutlined />
                            로그인
                          </MenuText>
                        </Link>
                      </MemberMenuItem>
                      <MemberMenuItem>
                        <Link href="/login">
                          <MenuText>
                            <UserOutlined />
                            회원가입
                          </MenuText>
                        </Link>
                      </MemberMenuItem>
                    </MemberMenu>
                  )
              }
            <DrawerBody>
              <Menu>
                {
                  me && me?.id && (
                    <MenuItem>
                      <MenuTitle>
                        <Link href={`/profile/${me?.id}`}>
                          <MenuText>
                            <UserOutlined />
                            {me?.nickname}님 프로필
                          </MenuText>
                        </Link>
                      </MenuTitle>
                    </MenuItem>
                  )
                }
                <MenuItem>
                  <MenuTitle>
                    <Link href="/friends">
                      <MenuText>
                        <SearchOutlined />
                        친구찾기
                      </MenuText>
                    </Link>
                  </MenuTitle>
                </MenuItem>
              </Menu>
            </DrawerBody>
          </DrawerWrapBody>
        </DrawerContent>
      </DrawerContentWrap>
    </Drawer>
  );
};

DrawerMenu.propTypes = {
  drawerShow: PropTypes.bool.isRequired,
};

export default DrawerMenu;
