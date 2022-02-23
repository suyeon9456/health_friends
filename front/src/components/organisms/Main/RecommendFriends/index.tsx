import React, { useCallback } from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import Slider from 'react-slick';
import * as _ from 'lodash';

import { RootState } from '@/../store/configureStore';
import { BiCurrentLocation } from 'react-icons/bi';
import { FriendsWrap, FriendsTitle, FriendsSubTitle, FriendsBody, FriendsCardList, FriendsCard, CardAvatarWrap, CardContentWrap, ContentTitile, ContentDescription, NoDataCard, NoDataContent, NoDataIconWrap, NoDataText } from './style';
import { Avatar, Icon, NoDataIcon, ReactSliderNextButton, ReactSliderPrevButton } from '../../../atoms';

const RecommendFriends = ({ location }: { location?: {
    regionSiName: string | null,
    regionGuName: string | null,
    regionDongName: string | null,
    mainAddressNo: string | null,
  } | null }) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 3,
    nextArrow: <ReactSliderNextButton />,
    prevArrow: <ReactSliderPrevButton />,
    autoplay: true,
    responsive: [{
      breakpoint: 1082,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    }, {
      breakpoint: 880,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    }, {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    }],
  };

  const { recommendedFriends, closedFriends } = useSelector((state: RootState) => state.user);

  const reLoadLocation = useCallback(() => {
    console.log('??');
  }, []);

  return (
    <FriendsWrap>
      <FriendsTitle>
        <Icon icon={<BiCurrentLocation />} /> {`${location?.regionSiName || ''} ${location?.regionGuName || ''} ${location?.regionDongName || ''}`}에서 활동하는 친구 {closedFriends?.length}명
      </FriendsTitle>
      <FriendsSubTitle onClick={reLoadLocation}>
        실제위치와 일치하지 않으신가요?
      </FriendsSubTitle>
      <FriendsBody>
        <FriendsCardList>
          {!_.isEmpty(recommendedFriends)
            ? (
              <Slider {...settings}>
                {recommendedFriends.map((friend: {
                  id: number,
                  Image: { src: string } | null,
                  nickname: string,
                  Gyms: Array<{ address: string }>
                }) => (
                  <FriendsCard key={friend.id}>
                    <CardAvatarWrap>
                      <Avatar size={82} src={friend?.Image ? `${friend?.Image?.src}` : ''} />
                    </CardAvatarWrap>
                    <CardContentWrap>
                      <Link href={`/profile/${friend?.id}`}>
                        <ContentTitile>{friend.nickname}</ContentTitile>
                      </Link>
                      <ContentDescription>{friend?.Gyms[0]?.address}</ContentDescription>
                    </CardContentWrap>
                  </FriendsCard>
                ))}
              </Slider>
            )
            : (
              <NoDataCard>
                <NoDataContent>
                  <NoDataIconWrap>
                    <NoDataIcon width={62} height={62} color="#00000040" />
                  </NoDataIconWrap>
                  <NoDataText>
                    <span>활동하는 친구가 없습니다.</span>
                  </NoDataText>
                </NoDataContent>
              </NoDataCard>
            )}
        </FriendsCardList>
      </FriendsBody>
    </FriendsWrap>
  );
};

export default RecommendFriends;
