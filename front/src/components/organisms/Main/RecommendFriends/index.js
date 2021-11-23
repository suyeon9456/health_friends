import React from 'react';
import { useSelector } from 'react-redux';
import { EnvironmentOutlined } from '@ant-design/icons';
import { FriendsWrap, FriendsTitle, FriendsBody, FriendsCardList, FriendsCard, CardAvatarWrap } from './style';
import { Avatar } from '../../../atoms';

const RecommendFriends = () => {
  const { me } = useSelector((state) => state.user);
  return (
    <FriendsWrap>
      <FriendsTitle>
        <EnvironmentOutlined /> 나의 위치에서 활동하는 친구
      </FriendsTitle>
      <FriendsBody>
        <FriendsCardList>
          <FriendsCard>
            <CardAvatarWrap>
              <Avatar size={82} src={`http://localhost:6015/${me?.Image?.src}`} />
            </CardAvatarWrap>
          </FriendsCard>
          <FriendsCard>
            <CardAvatarWrap>
              <Avatar size={82} />
            </CardAvatarWrap>
          </FriendsCard>
          <FriendsCard>
            <CardAvatarWrap>
              <Avatar size={82} />
            </CardAvatarWrap>
          </FriendsCard>
          <FriendsCard>
            <CardAvatarWrap>
              <Avatar size={82} />
            </CardAvatarWrap>
          </FriendsCard>
        </FriendsCardList>
      </FriendsBody>
    </FriendsWrap>
  );
};

export default RecommendFriends;
