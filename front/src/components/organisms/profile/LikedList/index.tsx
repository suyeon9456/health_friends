import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import isEmpty from 'lodash/isEmpty';
import { BiDotsVerticalRounded, BiEdit, BiHeart, BiUser } from 'react-icons/bi';
import { ImDrawer2 } from 'react-icons/im';

import { profileSelector } from '@/../reducers/profile';
import { loadLikedListAPI } from '@/api/profile';
import { LikedFriendAPI } from '@/../@types/user';
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
} from './style';
import LoadingFallback from './LoadingFallback';

const LikedList = ({ isProfile }: { isProfile?: boolean }) => {
  const { profile } = useSelector(profileSelector);
  const { isLoading, data: likedFriends } = useQuery<
    LikedFriendAPI[] | undefined,
    AxiosError
  >(
    ['likedFriends'],
    () => {
      const userId = isProfile ? `?userId=${profile?.id}` : '';
      return loadLikedListAPI(userId);
    },
    { cacheTime: 2 * 60 * 1000 }
  );

  return (
    <LikedListWrap>
      <LikedListBody empty={isLoading ? false : !!isEmpty(likedFriends)}>
        {isLoading && <LoadingFallback />}
        {!isLoading && !isEmpty(likedFriends) ? (
          likedFriends?.map((friend) => (
            <Card key={friend.id}>
              <Link href={`/profile/${friend.id}`}>
                <CardCover>
                  {friend.Image ? (
                    <img src={friend.Image?.src} alt="profile_image" />
                  ) : (
                    <div>
                      <Icon icon={<BiUser />} />
                    </div>
                  )}
                </CardCover>
              </Link>
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
