import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { EnvironmentOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import * as _ from 'lodash';

import { FriendsWrap, FriendsTitle, FriendsSubTitle, FriendsBody, FriendsCardList, FriendsCard, CardAvatarWrap, CardContentWrap, ContentTitile, ContentDescription } from './style';
import { Avatar } from '../../../atoms';

const RecommendFriends = ({ location }) => {
  const settings = {
    dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    nextArrow: <RightOutlined />,
    prevArrow: <LeftOutlined />,
    // autoplay: true,
    // speed: 2000,
    // autoplaySpeed: 2000,
    // cssEase: 'linear',
  };

  const reLoadLocation = useCallback(() => {
    console.log('??');
  }, []);

  const { me,
    recommendedFriends, additionalFriends, closedFriends } = useSelector((state) => state.user);
  return (
    <FriendsWrap>
      <FriendsTitle>
        <EnvironmentOutlined /> {`${location?.regionSiName} ${location?.regionGuName} ${location?.regionDongName}`}에서 활동하는 친구 {closedFriends?.length}명
      </FriendsTitle>
      <FriendsSubTitle onClick={reLoadLocation}>
        실제위치와 일치하지 않으신가요?
      </FriendsSubTitle>
      <FriendsBody>
        <FriendsCardList friendsLength={recommendedFriends.length || 0}>
          {!_.isEmpty(recommendedFriends)
            ? recommendedFriends.map((friend) => {
              if (recommendedFriends.length < 5) {
                return (
                  // <FriendsCardsWrap friendsLength={recommendedFriends.length}>
                  <FriendsCard key={friend.id}>
                    <CardAvatarWrap>
                      <Avatar size={82} src={friend?.Image ? `http://localhost:6015/${friend?.Image?.src}` : ''} />
                    </CardAvatarWrap>
                    <CardContentWrap>
                      <ContentTitile>{friend?.nickname}</ContentTitile>
                      <ContentDescription>{friend?.Gyms[0]?.address}</ContentDescription>
                    </CardContentWrap>
                  </FriendsCard>
                  // </FriendsCardsWrap>
                );
              }
              return (
                <Slider {...settings}>
                  <FriendsCard>
                    <CardAvatarWrap>
                      <Avatar size={82} src={`http://localhost:6015/${me?.Image?.src}`} />
                    </CardAvatarWrap>
                    <CardContentWrap>
                      <ContentTitile>{friend.nickname}</ContentTitile>
                      <ContentDescription>{friend?.Userdetail?.description}</ContentDescription>
                    </CardContentWrap>
                  </FriendsCard>
                </Slider>
              );
            })
            : (
              // <FriendsCardsWrap friendsLength={1}>
              <FriendsCard>
                <CardAvatarWrap>
                  <Avatar size={82} src={`http://localhost:6015/${me?.Image?.src}`} />
                </CardAvatarWrap>
                <CardContentWrap>
                  <ContentTitile>뚜오니</ContentTitile>
                  <ContentDescription>간단소개 들어갈 부분...</ContentDescription>
                </CardContentWrap>
              </FriendsCard>
              // </FriendsCardsWrap>
            )}
        </FriendsCardList>
      </FriendsBody>
    </FriendsWrap>
  );
};

RecommendFriends.propTypes = {
  location: PropTypes.node,
};

export default RecommendFriends;
