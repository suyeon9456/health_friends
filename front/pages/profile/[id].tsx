import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { loadProfile } from '@/../reducers/profile';
import {
  GlobalModal,
  Menu,
  ModalStatus,
  ProfileMenuType,
} from '@/../@types/utils';

import { useQuery } from 'react-query';
import { loadLoginedUserAPI } from '@/api/user';
import { loadProfileAPI } from '@/api/profile';
import { meKey, profileByIdKey } from '@/../@utils/queryKey';
import { useModalDispatch } from '@/../store/modalStore';
import { Me } from '@/../@types/user';
import { loadMe } from '@/../reducers/user';
import {
  AppLayout,
  SideBar,
  Info,
  MoreInfo,
  Row,
  Col,
} from '../../src/components/organisms';
import MatchingCalendar from '../../src/components/organisms/profile/MatchingCalendar';
import MatchingRecord from '../../src/components/organisms/profile/MatchingRecord';
import LikedList from '../../src/components/organisms/profile/LikedList';

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const contextDispatch = useModalDispatch();

  const { id } = router.query;
  const [profileMenu, setProfileMenu] = useState<ProfileMenuType>(Menu.INFO);

  const _ = useQuery<Me>(meKey, () => loadLoginedUserAPI(), {
    refetchOnWindowFocus: false,
    retry: false,
    onSuccess: (data) => dispatch(loadMe(data)),
  });

  useQuery(profileByIdKey(id), () => loadProfileAPI(id), {
    refetchOnWindowFocus: false,
    retry: false,
    enabled: !!id,
    onSuccess: (data) => {
      if (!data) return;
      dispatch(loadProfile(data));
    },
    onError: () => {
      contextDispatch({
        type: 'SHOW_MODAL',
        payload: {
          type: GlobalModal.ALERT,
          statusType: ModalStatus.ERROR,
          message: '존재하지 않는 사용자입니다.',
          block: true,
          callback: () => router.replace('/'),
        },
      });
    },
  });

  return (
    <AppLayout>
      <Row>
        <Col xs={24} md={8}>
          <SideBar profileMenu={profileMenu} setProfileMenu={setProfileMenu} />
        </Col>
        <Col xs={24} md={16}>
          {
            {
              [Menu.LIKED]: <LikedList isProfile />,
              [Menu.CALENDAR]: <MatchingCalendar isProfile />,
              [Menu.RECORD]: <MatchingRecord isProfile />,
              [Menu.INFO]: (
                <div>
                  <Info />
                  <MoreInfo />
                </div>
              ),
            }[profileMenu]
          }
        </Col>
      </Row>
    </AppLayout>
  );
};

export default Profile;
