import React, { useCallback, useEffect, useMemo } from 'react';
import { BiUser, BiCalendar, BiReceipt, BiHeart } from 'react-icons/bi';
import { Menu } from '@/../@types/constant';
import { Icon } from '@/components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import { tabSelector, updateTab } from '@/../reducers/profile';
import { useRouter } from 'next/router';
import { useLoadLoginedUser } from '@/hooks';
import useGetProfile from '@/hooks/useGetProfile';
import { MenuText, SideMenu, SideMenuWrap } from './style';

const SideBarTabMenu = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: me } = useLoadLoginedUser();
  const { data: profile } = useGetProfile();
  const { tab } = useSelector(tabSelector);
  const onClickMenu = useCallback(
    (menu) => {
      const { pathname } = window.location;
      const query =
        pathname === '/myinfo'
          ? `?tab=${menu}`
          : `?id=${profile?.id}&tab=${menu}`;
      window.history.replaceState(
        window.history.state,
        '',
        `${pathname}${query}`
      );
      dispatch(updateTab(menu));
    },
    [profile?.id]
  );

  // const page = useMemo(() => {
  //   const queryTab = router.query.tab;
  //   if (Array.isArray(queryTab)) return Menu.INFO;
  //   return queryTab !== undefined ? queryTab : Menu.INFO;
  // }, [router.query]);

  // useEffect(() => {
  //   dispatch(updateTab(page));
  // }, [page]);

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
