import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormOutlined, HeartOutlined, MoreOutlined, UserOutlined } from '@ant-design/icons';

import { LikedListWrap, LikedListBody, Card, CardCover, CardBody, CardMeta, MetaTitle, MetaActions, Action } from './style';
import { LOAD_LIKE_REQUEST } from '../../../../../reducers/user';

const LikedList = () => {
  const dispatch = useDispatch();
  const { likedFriends } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch({
      type: LOAD_LIKE_REQUEST,
    });
  }, []);
  return (
    <LikedListWrap>
      <LikedListBody>
        {likedFriends.map((friend) => (
          <Card>
            <CardCover>
              {/* <img src="https://health-friends-s3.s3.ap-northeast-2.amazon…mb/1642487607429_KakaoTalk_20210720_234119257.jpg" alt="Test" /> */}
              <div>
                <UserOutlined />
              </div>
            </CardCover>
            <CardBody>
              <CardMeta>
                <MetaTitle>{friend?.nickname}</MetaTitle>
                <MetaActions>
                  <Action>
                    <HeartOutlined />
                  </Action>
                  <Action>
                    <FormOutlined />
                  </Action>
                  <Action>
                    <MoreOutlined />
                  </Action>
                </MetaActions>
              </CardMeta>
            </CardBody>
          </Card>
        ))}
      </LikedListBody>
    </LikedListWrap>
  );
};

export default LikedList;
