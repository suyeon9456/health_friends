import React from 'react';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import isEmpty from 'lodash/isEmpty';
import { BiMap } from 'react-icons/bi';

import { loadRealtimeAPI } from '@/api/user';
import { RealtimeAPI } from '@/../@types/schedule';
import { Avatar, Icon } from '../../../atoms';
import { AvatarWrap, CoupleCard, MatchingIcon, CoupleCardList } from './style';
import EmptyFallback from '../../EmptyFallback';

const MathcingList = () => {
  const { isLoading, data: matchings } = useQuery<
    RealtimeAPI[] | undefined,
    AxiosError
  >(['realtime'], () => loadRealtimeAPI(), {
    staleTime: 1 * 60 * 1000,
    suspense: true,
  });

  return (
    <>
      <CoupleCardList>
        {matchings?.map((matching) => {
          const { id, Gym, Requester, Receiver } = matching;
          return (
            <CoupleCard key={id}>
              <MatchingIcon>
                <div>
                  <Icon icon={<BiMap />} />
                  <span className="gym-name">{Gym.name}</span>
                </div>
                <div className="gym-address">
                  {`${Gym.address}(${Gym.addressRoad})`}
                </div>
              </MatchingIcon>
              <div className="avatar-wrap">
                <Link href={`/profile/${Requester.id}`} key="req">
                  <AvatarWrap>
                    <Avatar size={62} src={Requester.Image?.src ?? ''} />
                    <div>{Requester.nickname}</div>
                  </AvatarWrap>
                </Link>
                <Link href={`/profile/${Receiver.id}`} key="res">
                  <AvatarWrap>
                    <Avatar size={62} src={Receiver.Image?.src ?? ''} />
                    <div>{Receiver.nickname}</div>
                  </AvatarWrap>
                </Link>
              </div>
            </CoupleCard>
          );
        })}
      </CoupleCardList>
      {isEmpty(matchings) && (
        <EmptyFallback
          message="현재 진행중인 매칭이 없습니다."
          buttonLabel="매칭신청하러 가기"
        />
      )}
    </>
  );
};

export default MathcingList;
