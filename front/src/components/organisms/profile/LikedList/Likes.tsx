import React, { useMemo } from 'react';
import Link from 'next/link';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';
import isEmpty from 'lodash/isEmpty';
import { BiDotsVerticalRounded, BiEdit, BiHeart, BiUser } from 'react-icons/bi';

import { loadLikedListAPI } from '@/api/profile';
import { LikedFriendAPI } from '@/../@types/user';
import useGetProfile from '@/hooks/useGetProfile';
import { useRouter } from 'next/router';
import { Icon } from '../../../atoms';
import {
  Card,
  CardCover,
  CardBody,
  CardMeta,
  MetaTitle,
  MetaActions,
  Action,
  LikedListBody,
} from './style';
import EmptyFallback from '../../EmptyFallback';

const Likes = () => {
  const router = useRouter();
  const { data: profile } = useGetProfile();

  const profileId = useMemo(() => {
    return router.pathname !== '/myinfo' ? `?userId=${profile?.id}` : '';
  }, [router.pathname]);

  const { data: likedFriends } = useQuery<
    LikedFriendAPI[] | undefined,
    AxiosError
  >(
    ['likedFriends'],
    () => {
      return loadLikedListAPI(profileId);
    },
    { cacheTime: 2 * 60 * 1000, suspense: true }
  );

  return (
    <LikedListBody isEmpty={isEmpty(likedFriends)}>
      {!isEmpty(likedFriends) ? (
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
        <EmptyFallback
          buttonLabel="친구찾으러가기"
          message="관심있는 친구가 없습니다."
        />
      )}
    </LikedListBody>
  );
};

export default Likes;