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
  LoadingMatchingIcon,
  LoadingAvatarWrap,
} from './style';

const RealTimeMatchingCouple = () => {
  const {
    status,
    isLoading,
    error,
    data: realtimeMatching,
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
          {!isEmpty(realtimeMatching) && !error && !isLoading
            ? realtimeMatching?.map((matching) => {
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
                      <Link href={`/profile/${matching.id}`} key="req">
                        <AvatarWrap>
                          <Avatar size={62} src={reqAvatarSrc} />
                          <div>{matching.nickname}</div>
                        </AvatarWrap>
                      </Link>
                      <Link
                        href={`/profile/${matching.reqSchedule[0].id}`}
                        key="res"
                      >
                        <AvatarWrap>
                          <Avatar size={62} src={resAvatarSrc} />
                          <div>
                            {matching.reqSchedule[0]?.Receiver?.nickname}
                          </div>
                        </AvatarWrap>
                      </Link>
                    </div>
                  </CoupleCard>
                );
              })
            : Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <CoupleCard key={i}>
                  <LoadingMatchingIcon>
                    <div>
                      <span className="gym-name" />
                    </div>
                    <div className="gym-address">
                      <div />
                      <div />
                    </div>
                  </LoadingMatchingIcon>
                  <div className="avatar-wrap">
                    <LoadingAvatarWrap>
                      <span />
                      <div />
                    </LoadingAvatarWrap>
                    <LoadingAvatarWrap>
                      <span />
                      <div />
                    </LoadingAvatarWrap>
                  </div>
                </CoupleCard>
              ))}
        </CoupleCardList>
      </MatchingCoupleBody>
    </MatchingCoupleWrap>
  );
};

export default RealTimeMatchingCouple;
