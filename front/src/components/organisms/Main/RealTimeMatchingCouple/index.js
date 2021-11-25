import React from 'react';
import { useSelector } from 'react-redux';
import { EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';

import { Avatar } from '../../../atoms';
import { AvatarWrap, CoupleCard, MatchingIcon, CoupleCardList, CoupleHeaderTitle, MatchingCoupleBody, MatchingCoupleHeader, MatchingCoupleWrap } from './style';

const RealTimeMatchingCouple = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <MatchingCoupleWrap>
      <MatchingCoupleHeader>
        <CoupleHeaderTitle>
          <TeamOutlined /> 실시간 운동중인 매칭커플
        </CoupleHeaderTitle>
      </MatchingCoupleHeader>
      <MatchingCoupleBody>
        <CoupleCardList>
          <CoupleCard>
            <AvatarWrap>
              <Avatar size={82} />
              뚜오니1
            </AvatarWrap>
            <MatchingIcon>
              <EnvironmentOutlined />
              <span className="gym-name">헬스장 이름</span>
            </MatchingIcon>
            <AvatarWrap>
              <Avatar size={82} />
              뚜오니2
            </AvatarWrap>
          </CoupleCard>
          <CoupleCard>
            <AvatarWrap>
              <Avatar size={82} />
              뚜오니1
            </AvatarWrap>
            <MatchingIcon>
              <EnvironmentOutlined />
              <span className="gym-name">헬스장 이름</span>
            </MatchingIcon>
            <AvatarWrap>
              <Avatar size={82} />
              뚜오니2
            </AvatarWrap>
          </CoupleCard>
          <CoupleCard>
            <AvatarWrap>
              <Avatar size={82} />
              뚜오니1
            </AvatarWrap>
            <MatchingIcon>
              <EnvironmentOutlined />
              <span className="gym-name">헬스장 이름</span>
            </MatchingIcon>
            <AvatarWrap>
              <Avatar size={82} />
              뚜오니2
            </AvatarWrap>
          </CoupleCard>
        </CoupleCardList>
      </MatchingCoupleBody>
    </MatchingCoupleWrap>
  );
};

export default RealTimeMatchingCouple;
