import React, { useCallback } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { EnvironmentOutlined } from '@ant-design/icons';
import Slider from 'react-slick';
import * as _ from 'lodash';

import { FriendsWrap, FriendsTitle, FriendsSubTitle, FriendsBody, FriendsCardList, FriendsCard, CardAvatarWrap, CardContentWrap, ContentTitile, ContentDescription, NoDataCard, NoDataContent, NoDataIconWrap, NoDataText } from './style';
import { Avatar } from '../../../atoms';
// import NoDataIcon from '../../../atoms/NoDataIcon';
import NoDataIcon from '../../../atoms/NoDataIcon';
import ReactSliderNextButton from '../../../atoms/ReactSliderNextButton';
import ReactSliderPrevButton from '../../../atoms/ReactSliderPrevButton';

const RecommendFriends = ({ location }) => {
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

  const reLoadLocation = useCallback(() => {
    console.log('??');
  }, []);

  const { recommendedFriends, closedFriends } = useSelector((state) => state.user);
  return (
    <FriendsWrap>
      <FriendsTitle>
        <EnvironmentOutlined /> {`${location?.regionSiName || ''} ${location?.regionGuName || ''} ${location?.regionDongName || ''}`}에서 활동하는 친구 {closedFriends?.length}명
      </FriendsTitle>
      <FriendsSubTitle onClick={reLoadLocation}>
        실제위치와 일치하지 않으신가요?
      </FriendsSubTitle>
      <FriendsBody>
        <FriendsCardList friendsLength={recommendedFriends.length || 0}>
          {!_.isEmpty(recommendedFriends)
            ? (
              <Slider {...settings}>
                {recommendedFriends.map((friend) => (
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

RecommendFriends.propTypes = {
  location: PropTypes.any,
};

export default RecommendFriends;
