import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import {
  BiUser,
  BiX,
  BiLogInCircle,
  BiLogOutCircle,
  BiSearchAlt,
} from 'react-icons/bi';

import { useShowDispatch } from '@/../store/contextStore';
import { logoutRequest, userSelector } from '@/../reducers/user';

import { ButtonType } from '@/../@types/utils';
import { Me } from '@/../@types/user';
import { Button, Avatar, Icon } from '../../atoms';
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerContentWrap,
  DrawerHeader,
  DrawerHeaderTitle,
  DrawerMask,
  DrawerTitle,
  DrawerWrapBody,
  MemberMenu,
  MemberMenuItem,
  Menu,
  MenuItem,
  MenuText,
  MenuTitle,
} from './style';

const DrawerMenu = ({ drawerShow }: { drawerShow: boolean }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const contextDispatch = useShowDispatch();

  const { me }: { me: Me } = useSelector(userSelector);

  const onLogout = useCallback(() => {
    dispatch(logoutRequest());
  }, []);

  const changeShowDrawerMenu = useCallback(() => {
    contextDispatch({
      type: 'CHANGE_STATE',
      value: !drawerShow,
    });
  }, [drawerShow]);

  const onChangePage = useCallback(
    (link: string) => {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(`/${link}`);
      changeShowDrawerMenu();
    },
    [drawerShow]
  );

  return (
    <Drawer drawerShow={drawerShow}>
      <DrawerMask className="mask" />
      <DrawerContentWrap className="wrap" drawerShow={drawerShow}>
        <DrawerContent>
          <DrawerWrapBody>
            <DrawerHeader>
              <DrawerHeaderTitle>
                {me?.id && (
                  <DrawerTitle>
                    <Avatar src={me?.Image ? `${me?.Image.src}` : ''} />
                    {me?.nickname}님, 안녕하세요.
                  </DrawerTitle>
                )}
                <Button
                  type={ButtonType.TEXT}
                  icon={<Icon icon={<BiX />} />}
                  onClick={changeShowDrawerMenu}
                />
              </DrawerHeaderTitle>
            </DrawerHeader>
            {me?.id ? (
              <MemberMenu>
                <MemberMenuItem>
                  <MenuText onClick={onLogout}>
                    <Icon icon={<BiLogOutCircle />} />
                    로그아웃
                  </MenuText>
                </MemberMenuItem>
              </MemberMenu>
            ) : (
              <MemberMenu>
                <MemberMenuItem>
                  <MenuText onClick={() => onChangePage('login')}>
                    <Icon icon={<BiLogInCircle />} />
                    로그인
                  </MenuText>
                </MemberMenuItem>
                <MemberMenuItem>
                  <MenuText onClick={() => onChangePage('signup')}>
                    <Icon icon={<BiUser />} />
                    회원가입
                  </MenuText>
                </MemberMenuItem>
              </MemberMenu>
            )}
            <DrawerBody>
              <Menu>
                {me?.id && (
                  <MenuItem>
                    <MenuTitle>
                      <MenuText onClick={() => onChangePage('myinfo')}>
                        <Icon icon={<BiUser />} />
                        {me?.nickname}님 프로필
                      </MenuText>
                    </MenuTitle>
                  </MenuItem>
                )}
                <MenuItem>
                  <MenuTitle>
                    <MenuText onClick={() => onChangePage('friends')}>
                      <Icon icon={<BiSearchAlt />} />
                      친구찾기
                    </MenuText>
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

export default DrawerMenu;
