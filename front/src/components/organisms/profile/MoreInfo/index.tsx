import React from 'react';

import { useLoadLoginedUser } from '@/hooks';
import useGetProfile from '@/hooks/useGetProfile';
import { InfoContent } from '@/../@types/constant';
import MoreInfoCard from '@/components/molecules/MoreInfoCard';
import { MoreInfoBody, MoreInfoWrapper } from './style';

const MoreInfo = () => {
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
