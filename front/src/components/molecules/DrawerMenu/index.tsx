import React, { useCallback } from 'react';
import { useRouter } from 'next/router';
import {
  BiUser,
  BiX,
  BiLogInCircle,
  BiLogOutCircle,
  BiSearchAlt,
} from 'react-icons/bi';

import { ButtonType, GlobalModalAction } from '@/../@types/constant';
import { useMutation, useQueryClient } from 'react-query';
import { logoutAPI } from '@/api/user';
import { meKey } from '@/../@utils/queryKey';
import { useLoadLoginedUser } from '@/hooks';
import { useModalDispatch } from '@/../store/modalStore';
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
  const contextDispatch = useModalDispatch();
  const queryClient = useQueryClient();

  const { data: me } = useLoadLoginedUser();

  const logoutMutation = useMutation(() => logoutAPI(), {
    onSuccess: () => {
      void queryClient.invalidateQueries(meKey);
      void router.push('/');
      changeShowDrawerMenu();
    },
  });

  const onLogout = useCallback(() => logoutMutation.mutate(), []);

  const changeShowDrawerMenu = useCallback(() => {
    contextDispatch({
      type: GlobalModalAction.CHANGE_DRAWER,
      payload: !drawerShow,
    });
  }, [drawerShow]);

  const onChangePage = useCallback(
    (link: string) => {
      void router.push(`/${link}`);
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
