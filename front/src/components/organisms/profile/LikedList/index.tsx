import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BiDotsVerticalRounded, BiEdit, BiHeart, BiUser } from 'react-icons/bi';
import { ImDrawer2 } from 'react-icons/im';

import { RootState } from '@/../store/configureStore';
import { Icon } from '../../../atoms';
import { LikedListWrap, LikedListBody, Card, CardCover, CardBody, CardMeta, MetaTitle, MetaActions, Action, Empty } from './style';
import { LOAD_LIKE_REQUEST } from '@/../@types/utils';

const LikedList = () => {
  const dispatch = useDispatch();
  const { likedFriends } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_LIKE_REQUEST,
    });
  }, []);
  return (
    <LikedListWrap dataSize={likedFriends?.length}>
      <LikedListBody>
        {likedFriends?.length > 0
          ? likedFriends.map((friend: {
            id: number,
            Image: { src: string },
            nickname: string,
          }) => (
            <Card key={friend.id}>
              <CardCover>
                {friend.Image
                  ? <img src={friend.Image?.src} alt="profile_image" />
                  : (
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
          : (
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
