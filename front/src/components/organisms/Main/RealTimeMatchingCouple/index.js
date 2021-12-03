import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';

import { Avatar } from '../../../atoms';
import { AvatarWrap, CoupleCard, MatchingIcon, CoupleCardList, CoupleHeaderTitle, MatchingCoupleBody, MatchingCoupleHeader, MatchingCoupleWrap } from './style';
import { LOAD_REALTIME_MATCHING_REQUEST } from '../../../../../reducers/user';

const RealTimeMatchingCouple = () => {
  const { realtimeMatching } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: LOAD_REALTIME_MATCHING_REQUEST,
    });
  }, []);
  return (
    <MatchingCoupleWrap>
      <MatchingCoupleHeader>
        <CoupleHeaderTitle>
          <TeamOutlined /> 실시간 운동중인 매칭커플
        </CoupleHeaderTitle>
      </MatchingCoupleHeader>
      <MatchingCoupleBody>
        <CoupleCardList>
          {realtimeMatching?.map((matching) => (
            <CoupleCard key={matching.id}>
              <AvatarWrap>
                <Avatar size={82} src={matching?.Image?.src ? `http://localhost:6015/${matching.Image.src}` : ''} />
                { matching.nickname }
              </AvatarWrap>
              <MatchingIcon>
                <EnvironmentOutlined />
                <span className="gym-name">{ matching.reqSchedule[0].Gym.name }</span>
              </MatchingIcon>
              <AvatarWrap>
                <Avatar size={82} src={matching?.Image?.src ? `http://localhost:6015/${matching.reqSchedule[0].Friend.Image.src}` : ''}/>
                { matching.reqSchedule[0].Friend.nickname }
              </AvatarWrap>
            </CoupleCard>
          ))}
        </CoupleCardList>
      </MatchingCoupleBody>
    </MatchingCoupleWrap>
  );
};

export default RealTimeMatchingCouple;
