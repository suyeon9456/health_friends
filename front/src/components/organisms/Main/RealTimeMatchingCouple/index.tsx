import React from 'react';
import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import * as _ from 'lodash';

import { BiGroup, BiMap } from 'react-icons/bi';
import { Avatar, Icon, NoDataIcon } from '../../../atoms';
import { AvatarWrap, CoupleCard, MatchingIcon, CoupleCardList, CoupleHeaderTitle, MatchingCoupleBody, MatchingCoupleHeader, MatchingCoupleWrap, NoDataCard, NoDataContent, NoDataIconWrap, NoDataText } from './style';
import { RealtimeMatching } from '@/../@types/fetchData';

const RealTimeMatchingCouple = () => {
  const {
    status,
    isLoading,
    error,
    data: realtimeMatching,
    isFetching,
  } = useQuery<Array<RealtimeMatching> | undefined, AxiosError>('realtimeMatching', async() => {
    const { data } = await axios.get('/users/realtimeMathcing');
    return data;
  }, { cacheTime: 2 * 60 * 1000 });
  return (
    <MatchingCoupleWrap>
      <MatchingCoupleHeader>
        <CoupleHeaderTitle>
          <Icon icon={<BiGroup />} /> 실시간 운동중인 매칭커플
        </CoupleHeaderTitle>
      </MatchingCoupleHeader>
      <MatchingCoupleBody>
        <CoupleCardList>
          {!_.isEmpty(realtimeMatching) && !error
            ? (realtimeMatching?.map((matching) => {
              const reqImageSrc = matching?.Image?.src;
              const reqAvatarSrc = reqImageSrc || '';
              const resImageSrc = matching?.reqSchedule[0]?.Receiver?.Image?.src;
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
                    { matching.reqSchedule[0]?.Receiver?.nickname }
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
