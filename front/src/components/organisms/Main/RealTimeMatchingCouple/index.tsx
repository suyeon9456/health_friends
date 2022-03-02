import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';

import { BiGroup, BiMap } from 'react-icons/bi';
import { Avatar, Icon, NoDataIcon } from '../../../atoms';
import { AvatarWrap, CoupleCard, MatchingIcon, CoupleCardList, CoupleHeaderTitle, MatchingCoupleBody, MatchingCoupleHeader, MatchingCoupleWrap, NoDataCard, NoDataContent, NoDataIconWrap, NoDataText } from './style';
import { RootState } from '@/../store/configureStore';
import { loadRealtimeMatchingRequest } from '@/../reducers/user';

interface Mathcing {
  id: number,
  nickname: string,
  Image: { src: string },
  reqSchedule: Array<{ Friend: any, Gym: any }>,
}

const RealTimeMatchingCouple = () => {
  const dispatch = useDispatch();
  const { realtimeMatching } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(loadRealtimeMatchingRequest());
  }, []);
  return (
    <MatchingCoupleWrap>
      <MatchingCoupleHeader>
        <CoupleHeaderTitle>
          <Icon icon={<BiGroup />} /> 실시간 운동중인 매칭커플
        </CoupleHeaderTitle>
      </MatchingCoupleHeader>
      <MatchingCoupleBody>
        <CoupleCardList>
          {!_.isEmpty(realtimeMatching)
            ? (realtimeMatching?.map((matching: Mathcing) => {
              const reqImageSrc = matching?.Image?.src;
              const reqAvatarSrc = reqImageSrc || '';
              const resImageSrc = matching?.reqSchedule[0]?.Friend?.Image?.src;
              const resAvatarSrc = resImageSrc || '';
              return (
                <CoupleCard key={matching.id}>
                  <AvatarWrap>
                    <Avatar size={82} src={reqAvatarSrc} />
                    { matching.nickname }
                  </AvatarWrap>
                  <MatchingIcon>
                    <Icon icon={<BiMap />} />
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
