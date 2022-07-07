import React, { useCallback, useEffect, useState } from 'react';
import { BiUser, BiCalendar, BiReceipt, BiHeart } from 'react-icons/bi';
import { Menu } from '@/../@types/constant';
import { Icon } from '@/components/atoms';
import { useDispatch, useSelector } from 'react-redux';
import { tabSelector, updateTab } from '@/../reducers/profile';
import { useLoadLoginedUser } from '@/hooks';
import useGetProfile from '@/hooks/useGetProfile';
import { MenuText, SideMenu, SideMenuWrap } from './style';

const SideBarTabMenu = () => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const { data: me } = useLoadLoginedUser();
  const { data: profile } = useGetProfile();
  const { tab } = useSelector(tabSelector);
  const onClickMenu = useCallback(
    (menu) => {
      const { pathname } = window.location;
      window.history.replaceState(
        window.history.state,
        '',
        `${pathname}?tab=${menu}`
      );
      dispatch(updateTab(menu));
    },
    [profile?.id]
  );

  useEffect(() => {
    if (me?.id && profile?.id === me?.id) {
      setTitle('내정보');
      return;
    }
    setTitle('정보');
  }, [me?.id]);

  return (
    <SideMenuWrap active={tab}>
      <SideMenu
        key={Menu.INFO}
        id={Menu.INFO}
        onClick={() => onClickMenu(Menu.INFO)}
        className={tab === Menu.INFO ? 'active' : ''}
      >
        <Icon icon={<BiUser />} />
        <MenuText>{title}</MenuText>
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
