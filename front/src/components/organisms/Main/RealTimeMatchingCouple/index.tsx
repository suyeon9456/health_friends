import React from 'react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import isEmpty from 'lodash/isEmpty';

import { BiGroup, BiMap } from 'react-icons/bi';
import { RealtimeMatching } from '@/../@types/fetchData';
import { Avatar, Icon, NoDataIcon } from '../../../atoms';
import {
  AvatarWrap,
  CoupleCard,
  MatchingIcon,
  CoupleCardList,
  CoupleHeaderTitle,
  MatchingCoupleBody,
  MatchingCoupleHeader,
  MatchingCoupleWrap,
  NoDataCard,
  NoDataContent,
  NoDataIconWrap,
  NoDataText,
} from './style';

const RealTimeMatchingCouple = () => {
  const {
    status,
    isLoading,
    error,
    data: realtimeMatching,
    isFetching,
  } = useQuery<RealtimeMatching[] | undefined, AxiosError>(
    'realtimeMatching',
    async () => {
      const { data } = await axios.get('/users/realtimeMathcing');
      return data;
    },
    { cacheTime: 2 * 60 * 1000 }
  );
  return (
    <MatchingCoupleWrap>
      <MatchingCoupleHeader>
        <CoupleHeaderTitle>
          <Icon icon={<BiGroup />} /> 실시간 운동중인 매칭커플
        </CoupleHeaderTitle>
      </MatchingCoupleHeader>
      <MatchingCoupleBody>
        <CoupleCardList>
          {!isEmpty(realtimeMatching) && !error ? (
            realtimeMatching?.map((matching) => {
              const reqImageSrc = matching?.Image?.src;
              const reqAvatarSrc = reqImageSrc || '';
              const resImageSrc =
                matching?.reqSchedule[0]?.Receiver?.Image?.src;
              const resAvatarSrc = resImageSrc || '';
              return (
                <CoupleCard key={matching.id}>
                  <MatchingIcon>
                    <div>
                      <Icon icon={<BiMap />} />
                      <span className="gym-name">
                        {matching.reqSchedule[0].Gym.name}
                      </span>
                    </div>
                    <div className="gym-address">
                      {matching.reqSchedule[0].Gym.address}
                    </div>
                  </MatchingIcon>
                  <div className="avatar-wrap">
                    <AvatarWrap>
                      <Avatar size={62} src={reqAvatarSrc} />
                      <div>
                        <Link href={`/profile/${matching.id}`}>
                          <a>{matching.nickname}</a>
                        </Link>
                      </div>
                    </AvatarWrap>
                    <AvatarWrap>
                      <Avatar size={62} src={resAvatarSrc} />
                      <div>
                        <Link href={`/profile/${matching.reqSchedule[0].id}`}>
                          <a>{matching.reqSchedule[0]?.Receiver?.nickname}</a>
                        </Link>
                      </div>
                    </AvatarWrap>
                  </div>
                </CoupleCard>
              );
            })
          ) : (
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
