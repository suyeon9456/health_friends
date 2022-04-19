import React from 'react';
import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import isEmpty from 'lodash/isEmpty';
import { BiDotsVerticalRounded, BiEdit, BiHeart, BiUser } from 'react-icons/bi';
import { ImDrawer2 } from 'react-icons/im';

import { FetchLikedFriends } from '@/../@types/fetchData';
import { useSelector } from 'react-redux';
import { profileSelector } from '@/../reducers/profile';
import { loadLikedListAPI } from '@/api/user';
import { Icon } from '../../../atoms';
import {
  LikedListWrap,
  LikedListBody,
  Card,
  CardCover,
  CardBody,
  CardMeta,
  MetaTitle,
  MetaActions,
  Action,
  Empty,
  LoadingCard,
  LoadingCardCover,
  LoadingCardBody,
  LoadingMetaTitle,
  LoadingAction,
} from './style';

const LikedList = ({ isProfile }: { isProfile?: boolean }) => {
  const { profile } = useSelector(profileSelector);
  const { isLoading, data: likedFriends } = useQuery<
    FetchLikedFriends | undefined,
    AxiosError
  >(
    'likedFriends',
    () => {
      const userId = isProfile ? `?userId=${profile?.id}` : '';
      return loadLikedListAPI(userId);
    },
    { cacheTime: 2 * 60 * 1000 }
  );

  return (
    <LikedListWrap>
      <LikedListBody empty={isLoading ? false : !!isEmpty(likedFriends)}>
        {isLoading &&
          Array.from({ length: 9 }, (_, i) => i).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <LoadingCard key={i}>
              <LoadingCardCover>
                <div className="lazyData" />
              </LoadingCardCover>
              <LoadingCardBody>
                <CardMeta>
                  <LoadingMetaTitle className="lazyData" />
                  <MetaActions>
                    <LoadingAction>
                      <span className="lazyData" />
                    </LoadingAction>
                    <LoadingAction>
                      <span className="lazyData" />
                    </LoadingAction>
                    <LoadingAction>
                      <span className="lazyData" />
                    </LoadingAction>
                  </MetaActions>
                </CardMeta>
              </LoadingCardBody>
            </LoadingCard>
          ))}
        {!isLoading && !isEmpty(likedFriends) ? (
          likedFriends?.map((friend) => (
            <Card key={friend.id}>
              <CardCover>
                {friend.Image ? (
                  <img src={friend.Image?.src} alt="profile_image" />
                ) : (
                  <div>
                    <Icon icon={<BiUser />} />
                  </div>
                )}
              </CardCover>
              <CardBody>
                <CardMeta>
                  <MetaTitle>{friend.nickname}</MetaTitle>
                  <MetaActions>
                    <Action className="like">
                      <Icon icon={<BiHeart />} />
                    </Action>
                    <Action>
                      <Icon icon={<BiEdit />} />
                    </Action>
                    <Action>
                      <Icon icon={<BiDotsVerticalRounded />} />
                    </Action>
                  </MetaActions>
                </CardMeta>
              </CardBody>
            </Card>
          ))
        ) : (
          <Empty>
            <Icon icon={<ImDrawer2 />} />
            <div>데이터 없음</div>
          </Empty>
        )}
      </LikedListBody>
    </LikedListWrap>
  );
};

export default LikedList;
