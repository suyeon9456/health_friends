import React, { useCallback } from 'react';
import Link from 'next/link';
import { BiMenu } from 'react-icons/bi';

import { SizeType } from '@/../@types/constant';
import { useMutation, useQueryClient } from 'react-query';
import { logoutAPI } from '@/api/user';
import { meKey, profileKey } from '@/../@utils/queryKey';
import { useLoadLoginedUser } from '@/hooks';
import Image from 'next/image';
import { useModalDispatch, useModalState } from '@/../store/modalStore';

import { Avatar, Icon } from '../../atoms';
import { MenuItem, MenuList, MenuText, MenuTitle } from './style';

const Menu = () => {
  const { isDrawer } = useModalState();
  const contextDispatch = useModalDispatch();
  const queryClient = useQueryClient();

  const { data: me } = useLoadLoginedUser();
  const logoutMutation = useMutation(() => logoutAPI(), {
    onSuccess: () => {
      void queryClient.invalidateQueries(meKey);
      void queryClient.invalidateQueries(profileKey);
    },
  });

  const onLogout = useCallback(() => {
    logoutMutation.mutate();
  }, []);

  const changeShowDrawerMenu = useCallback(() => {
    contextDispatch({
      type: 'CHANGE_DRAWER',
      payload: !isDrawer,
    });
  }, [isDrawer]);
  return (
    <MenuList>
      <MenuItem type="home" align="left">
        <MenuTitle>
          <Link href="/">
            <MenuText>
              <Image
                src="https://img.health-friends.com/_next/images/logo.png"
                width={138}
                height={46}
                layout="intrinsic"
                alt="logo"
              />
            </MenuText>
          </Link>
        </MenuTitle>
      </MenuItem>
      <MenuItem align="left" type="pc">
        <MenuTitle>
          <Link href="/friends">
            <MenuText>친구찾기</MenuText>
          </Link>
        </MenuTitle>
      </MenuItem>
      {me ? (
        <>
          <MenuItem type="pc" align="right" style={{ order: 2 }}>
            <MenuTitle>
              <MenuText onClick={onLogout}>로그아웃</MenuText>
            </MenuTitle>
          </MenuItem>
          <MenuItem type="pc" align="left" style={{ order: 3 }}>
            <MenuTitle>
              <Link href="/myinfo" passHref>
                <a>
                  <Avatar
                    size={SizeType.SMALL}
                    src={me?.Image ? `${me?.Image.src}` : ''}
                  />
                </a>
              </Link>
            </MenuTitle>
          </MenuItem>
        </>
      ) : (
        <>
          <MenuItem type="pc" align="right" style={{ order: 2 }}>
            <MenuTitle>
              <Link href="/login">
                <MenuText>로그인</MenuText>
              </Link>
            </MenuTitle>
          </MenuItem>
          <MenuItem type="pc" align="left" style={{ order: 3 }}>
            <MenuTitle>
              <Link href="/signup">
                <MenuText>회원가입</MenuText>
              </Link>
            </MenuTitle>
          </MenuItem>
        </>
      )}
      <MenuItem type="tablet-phone" align="right" style={{ order: 2 }}>
        <MenuTitle>
          <MenuText onClick={changeShowDrawerMenu}>
            <Icon icon={<BiMenu />} />
          </MenuText>
        </MenuTitle>
      </MenuItem>
    </MenuList>
  );
};

export default React.memo(Menu);
