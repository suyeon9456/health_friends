import React, { Dispatch, SetStateAction, useCallback } from 'react';
import { BiUser, BiCalendar, BiReceipt, BiHeart } from 'react-icons/bi';
import { Menu, ProfileMenuType } from '@/../@types/constant';
import { Icon } from '@/components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import { profileSelector, tabSelector, updateTab } from '@/../reducers/profile';
import { meSelector } from '@/../reducers/user';
import { useRouter } from 'next/router';
import { MenuText, SideMenu, SideMenuWrap } from './style';

const SideBarTabMenu = () => {
  const dispatch = useDispatch();
  const me = useSelector(meSelector);
  const { profile } = useSelector(profileSelector);
  const { tab } = useSelector(tabSelector);
  const onClickMenu = useCallback(
    (menu) => {
      const { pathname } = window.location;
      const query =
        pathname === '/myinfo'
          ? `?tab=${menu}`
          : `?id=${profile.id}&tab=${menu}`;
      window.history.replaceState(
        window.history.state,
        '',
        `${pathname}${query}`
      );
      dispatch(updateTab(menu));
    },
    [profile]
  );
  return (
    <SideMenuWrap active={tab}>
      <SideMenu
        key={Menu.INFO}
        id={Menu.INFO}
        onClick={() => onClickMenu(Menu.INFO)}
        className={tab === Menu.INFO ? 'active' : ''}
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
        className={tab === Menu.CALENDAR ? 'active' : ''}
      >
        <Icon icon={<BiCalendar />} />
        <MenuText>매칭일정</MenuText>
      </SideMenu>
      <SideMenu
        key={Menu.RECORD}
        id={Menu.RECORD}
        onClick={() => onClickMenu(Menu.RECORD)}
        className={tab === Menu.RECORD ? 'active' : ''}
      >
        <Icon icon={<BiReceipt />} />
        <MenuText>매칭기록</MenuText>
      </SideMenu>
      <SideMenu
        key={Menu.LIKED}
        id={Menu.LIKED}
        onClick={() => onClickMenu(Menu.LIKED)}
        className={tab === Menu.LIKED ? 'active' : ''}
      >
        <Icon icon={<BiHeart />} />
        <MenuText>관심친구</MenuText>
      </SideMenu>
    </SideMenuWrap>
  );
};

export default SideBarTabMenu;
