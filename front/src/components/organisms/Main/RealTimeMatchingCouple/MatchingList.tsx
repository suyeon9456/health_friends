import React, { useMemo } from 'react';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import isEmpty from 'lodash/isEmpty';
import { BiMap } from 'react-icons/bi';

import { loadRealtimeAPI } from '@/api/user';
import { ButtonType, SizeType } from '@/../@types/utils';
import { RealtimeAPI } from '@/../@types/schedule';
import { Avatar, Button, Icon, NoDataIcon } from '../../../atoms';
import {
  AvatarWrap,
  CoupleCard,
  MatchingIcon,
  LoadingMatchingIcon,
  LoadingAvatarWrap,
  NoDataContainer,
  NoDataContent,
  NoDataText,
  CoupleCardList,
} from './style';

const MathcingList = () => {
  const { isLoading, data: matchings } = useQuery<
    RealtimeAPI[] | undefined,
    AxiosError
  >(['realtime'], () => loadRealtimeAPI(), {
    staleTime: 1 * 60 * 1000,
  });

  return (
    <CoupleCardList>
      {!isEmpty(matchings) && !isLoading
        ? matchings?.map((matching) => {
            return (
              <CoupleCard key={matching.id}>
                <MatchingIcon>
                  <div>
                    <Icon icon={<BiMap />} />
                    <span className="gym-name">{matching.Gym.name}</span>
                  </div>
                  <div className="gym-address">
                    {`${matching.Gym.address}(${matching.Gym.addressRoad})`}
                  </div>
                </MatchingIcon>
                <div className="avatar-wrap">
                  <Link href={`/profile/${matching.Requester.id}`} key="req">
                    <AvatarWrap>
                      <Avatar
                        size={62}
                        src={matching.Requester.Image?.src ?? ''}
                      />
                      <div>{matching.Requester.nickname}</div>
                    </AvatarWrap>
                  </Link>
                  <Link href={`/profile/${matching.Receiver.id}`} key="res">
                    <AvatarWrap>
                      <Avatar
                        size={62}
                        src={matching.Receiver.Image?.src ?? ''}
                      />
                      <div>{matching.Receiver.nickname}</div>
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
      {isEmpty(matchings) && (
        <NoDataContainer>
          <NoDataContent>
            <NoDataIcon width={60} height={60} color="#00000040" />
            <NoDataText>현재 진행중인 매칭이 없습니다.</NoDataText>
            <Link href="/friends" passHref>
              <a>
                <Button type={ButtonType.TEXT} size={SizeType.SMALL}>
                  매칭신청하러 가기
                </Button>
              </a>
            </Link>
          </NoDataContent>
        </NoDataContainer>
      )}
    </CoupleCardList>
  );
};

export default MathcingList;
