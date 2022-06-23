import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { BiUser, BiCalendar, BiReceipt, BiHeart } from 'react-icons/bi';
import { Menu, ProfileMenuType } from '@/../@types/utils';
import { Icon } from '@/components/atoms';
import { useSelector } from 'react-redux';
import { profileSelector } from '@/../reducers/profile';
import { meSelector } from '@/../reducers/user';
import { useRouter } from 'next/router';
import { MenuText, SideMenu, SideMenuWrap } from './style';

const SideBarTabMenu = ({
  profileMenu,
  setProfileMenu,
}: {
  profileMenu: ProfileMenuType;
  setProfileMenu: Dispatch<SetStateAction<ProfileMenuType>>;
}) => {
  const router = useRouter();
  const me = useSelector(meSelector);
  const { profile } = useSelector(profileSelector);
  const onClickMenu = useCallback(
    (menu) => {
      const query =
        router.pathname === '/myinfo'
          ? { tab: menu }
          : { id: profile.id, tab: menu };
      void router.push({ query }, undefined, {
        shallow: true,
      });
      setProfileMenu(menu);
    },
    [profileMenu, profile]
  );
  return (
    <SideMenuWrap active={profileMenu}>
      <SideMenu
        key={Menu.INFO}
        id={Menu.INFO}
        onClick={() => onClickMenu(Menu.INFO)}
        className={profileMenu === Menu.INFO ? 'active' : ''}
      >
        <Icon icon={<BiUser />} />
        <MenuText>
          {me?.id && profile?.id === me?.id ? '내정보' : '정보'}
        </MenuText>
      </SideMenu>
      <SideMenu
        key={Menu.CALENDAR}
        id={Menu.CALENDAR}
        onClick={() => onClickMenu(Menu.CALENDAR)}
        className={profileMenu === Menu.CALENDAR ? 'active' : ''}
      >
        <Icon icon={<BiCalendar />} />
        <MenuText>매칭일정</MenuText>
      </SideMenu>
      <SideMenu
        key={Menu.RECORD}
        id={Menu.RECORD}
        onClick={() => onClickMenu(Menu.RECORD)}
        className={profileMenu === Menu.RECORD ? 'active' : ''}
      >
        <Icon icon={<BiReceipt />} />
        <MenuText>매칭기록</MenuText>
      </SideMenu>
      <SideMenu
        key={Menu.LIKED}
        id={Menu.LIKED}
        onClick={() => onClickMenu(Menu.LIKED)}
        className={profileMenu === Menu.LIKED ? 'active' : ''}
      >
        <Icon icon={<BiHeart />} />
        <MenuText>관심친구</MenuText>
      </SideMenu>
    </SideMenuWrap>
  );
};

export default SideBarTabMenu;
