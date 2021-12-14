import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EnvironmentOutlined, TeamOutlined } from '@ant-design/icons';
import * as _ from 'lodash';

import { Avatar } from '../../../atoms';
import NoDataIcon from '../../../atoms/NoDataIcon';
import { AvatarWrap, CoupleCard, MatchingIcon, CoupleCardList, CoupleHeaderTitle, MatchingCoupleBody, MatchingCoupleHeader, MatchingCoupleWrap, NoDataCard, NoDataContent, NoDataIconWrap, NoDataText } from './style';
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
          {!_.isEmpty(realtimeMatching)
            ? (realtimeMatching?.map((matching) => {
              const reqImageSrc = matching?.Image?.src;
              const reqAvatarSrc = reqImageSrc ? ['http://localhost:6015/', reqImageSrc].join('') : '';
              const resImageSrc = matching?.reqSchedule[0]?.Friend?.Image?.src;
              const resAvatarSrc = resImageSrc ? ['http://localhost:6015/', resImageSrc].join('') : '';
              return (
                <CoupleCard key={matching.id}>
                  <AvatarWrap>
                    <Avatar size={82} src={reqAvatarSrc} />
                    { matching.nickname }
                  </AvatarWrap>
                  <MatchingIcon>
                    <EnvironmentOutlined />
                    <span className="gym-name">{ matching.reqSchedule[0].Gym.name }</span>
                  </MatchingIcon>
                  <AvatarWrap>
                    <Avatar size={82} src={resAvatarSrc} />
                    { matching.reqSchedule[0].Friend.nickname }
                  </AvatarWrap>
                </CoupleCard>
              );
            }))
            : (
              <NoDataCard>
                <NoDataContent>
                  <NoDataIconWrap>
                    <NoDataIcon width={62} height={62} color="#00000040" />
                  </NoDataIconWrap>
                  <NoDataText>
                    <span>현재 운동중인 매칭이 없습니다.</span>
                  </NoDataText>
                </NoDataContent>
              </NoDataCard>
            )}
        </CoupleCardList>
      </MatchingCoupleBody>
    </MatchingCoupleWrap>
  );
};

export default RealTimeMatchingCouple;
