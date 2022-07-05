import React from 'react';
import { useDispatch } from 'react-redux';

import { InfoContent } from '@/../@types/constant';
import { useLoadLoginedUser } from '@/hooks';
import MoreInfoCard from '@/components/molecules/MoreInfoCard';
import useGetProfile from '@/hooks/useGetProfile';
import { MoreInfoBody, MoreInfoWrapper } from './style';

const MoreInfo = () => {
  const dispatch = useDispatch();
  const { data: profile } = useGetProfile();

  const { data: me } = useLoadLoginedUser();
  return (
    <MoreInfoWrapper>
      <MoreInfoBody>
        <MoreInfoCard
          key={InfoContent.MORE}
          type={InfoContent.MORE}
          title="추가정보"
          profile={profile}
          isAuthorization={me?.id === profile?.id}
        />
        <MoreInfoCard
          key={InfoContent.FRIENDS}
          type={InfoContent.FRIENDS}
          title="매칭되고 싶은 친구정보"
          profile={profile}
          isAuthorization={me?.id === profile?.id}
        />
      </MoreInfoBody>
    </MoreInfoWrapper>
  );
};

export default MoreInfo;
