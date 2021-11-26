import React from 'react';
import { useSelector } from 'react-redux';
import { EnvironmentOutlined, LeftOutlined, RightOutlined } from '@ant-design/icons';
import Slider from 'react-slick';

import { FriendsWrap, FriendsTitle, FriendsBody, FriendsCardList, FriendsCard, CardAvatarWrap, CardContentWrap, ContentTitile, ContentDescription } from './style';
import { Avatar } from '../../../atoms';

const RecommendFriends = () => {
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

  const { me } = useSelector((state) => state.user);
  return (
    <FriendsWrap>
      <FriendsTitle>
        <EnvironmentOutlined /> 나의 위치에서 활동하는 친구
      </FriendsTitle>
      <FriendsBody>
        <FriendsCardList>
          <Slider {...settings}>
            <FriendsCard>
              <CardAvatarWrap>
                <Avatar size={82} src={`http://localhost:6015/${me?.Image?.src}`} />
              </CardAvatarWrap>
              <CardContentWrap>
                <ContentTitile>뚜오니</ContentTitile>
                <ContentDescription>간단소개 들어갈 부분...</ContentDescription>
              </CardContentWrap>
            </FriendsCard>
            <FriendsCard>
              <CardAvatarWrap>
                <Avatar size={82} src={`http://localhost:6015/${me?.Image?.src}` || ''} />
              </CardAvatarWrap>
              <CardContentWrap>
                <ContentTitile>뚜오니</ContentTitile>
                <ContentDescription>간단소개 들어갈 부분...</ContentDescription>
              </CardContentWrap>
            </FriendsCard>
            <FriendsCard>
              <CardAvatarWrap>
                <Avatar size={82} src={`http://localhost:6015/${me?.Image?.src}` || ''} />
              </CardAvatarWrap>
              <CardContentWrap>
                <ContentTitile>뚜오니</ContentTitile>
                <ContentDescription>간단소개 들어갈 부분...</ContentDescription>
              </CardContentWrap>
            </FriendsCard>
            <FriendsCard>
              <CardAvatarWrap>
                <Avatar size={82} src={`http://localhost:6015/${me?.Image?.src}` || ''} />
              </CardAvatarWrap>
              <CardContentWrap>
                <ContentTitile>뚜오니</ContentTitile>
                <ContentDescription>간단소개 들어갈 부분...</ContentDescription>
              </CardContentWrap>
            </FriendsCard>
            <FriendsCard>
              <CardAvatarWrap>
                <Avatar size={82} src={`http://localhost:6015/${me?.Image?.src}` || ''} />
              </CardAvatarWrap>
              <CardContentWrap>
                <ContentTitile>뚜오니</ContentTitile>
                <ContentDescription>간단소개 들어갈 부분...</ContentDescription>
              </CardContentWrap>
            </FriendsCard>
          </Slider>
        </FriendsCardList>
      </FriendsBody>
    </FriendsWrap>
  );
};

export default RecommendFriends;
