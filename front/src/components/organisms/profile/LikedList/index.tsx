import React from 'react';
import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import isEmpty from 'lodash/isEmpty';
import { BiDotsVerticalRounded, BiEdit, BiHeart, BiUser } from 'react-icons/bi';
import { ImDrawer2 } from 'react-icons/im';

import { FetchLikedFriends } from '@/../@types/fetchData';
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

const LikedList = () => {
  const {
    status,
    isLoading,
    error,
    data: likedFriends,
    isFetching,
  } = useQuery<FetchLikedFriends | undefined, AxiosError>(
    'likedFriends',
    async () => {
      const { data } = await axios.get('/user/like');
      return data;
    },
    { cacheTime: 2 * 60 * 1000 }
  );

  return (
    <LikedListWrap>
      <LikedListBody>
        {!isEmpty(likedFriends) ? (
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
                    <Action>
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
