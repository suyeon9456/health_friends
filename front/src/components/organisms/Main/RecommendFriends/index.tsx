import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import axios, { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import isEmpty from 'lodash/isEmpty';

import { BiCurrentLocation } from 'react-icons/bi';
import { FetchRecommendData } from '@/../@types/fetchData';
import { Location } from 'map';
import { useModalDispatch } from '@/../store/modalStore';
import { GlobalModal, ModalStatus } from '@/../@types/utils';
import {
  FriendsWrap,
  FriendsTitle,
  FriendsSubTitle,
  FriendsBody,
  FriendsCardList,
  FriendsCard,
  CardAvatarWrap,
  CardContentWrap,
  ContentTitile,
  ContentDescription,
  NoDataCard,
  NoDataContent,
  NoDataIconWrap,
  NoDataText,
} from './style';
import {
  Avatar,
  Icon,
  NoDataIcon,
  ReactSliderNextButton,
  ReactSliderPrevButton,
} from '../../../atoms';

const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 3,
  nextArrow: <ReactSliderNextButton />,
  prevArrow: <ReactSliderPrevButton />,
  autoplay: true,
  responsive: [
    {
      breakpoint: 1082,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 880,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const RecommendFriends = () => {
  const contextDispatch = useModalDispatch();
  const [location, setLocation] = useState<Location | null>(null);
  const [isReloadLocation, setIsReloadLocation] = useState<boolean>(false);
  const [locationYn, setLocationYn] = useState<boolean>(false);

  const { error, data: recommendData } = useQuery<
    FetchRecommendData | undefined,
    AxiosError
  >(['recommendFriends', location], async () => {
    if (!location) {
      return;
    }
    const { regionSiName, regionGuName, regionDongName, mainAddressNo } =
      location;
    const { data } = await axios.get(
      `/users/recommendFriends?si=${regionSiName}&gu=${regionGuName}&dong=${regionDongName}&mainAddressNo=${mainAddressNo}`
    );
    return data;
  });

  const reLoadLocation = useCallback(
    () => setIsReloadLocation(true),
    [isReloadLocation]
  );
  const onChangeLocationYn = useCallback(
    () => setLocationYn((prev) => !prev),
    []
  );

  useEffect(() => {
    const geocoder = new (window as any).kakao.maps.services.Geocoder();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude; // 위도
          const lon = position.coords.longitude; // 경도

          geocoder.coord2Address(
            lon,
            lat,
            (
              result: Array<{
                address: { [k: string]: any } | null;
                load_address: object | null;
              }>,
              status: string
            ) => {
              if (status === (window as any).kakao.maps.services.Status.OK) {
                const regionSiName = result[0]?.address?.region_1depth_name;
                const regionGuName = result[0]?.address?.region_2depth_name;
                const regionDongName = result[0]?.address?.region_3depth_name;
                const mainAddressNo = result[0]?.address?.main_address_no;
                setLocation({
                  regionSiName,
                  regionGuName,
                  regionDongName,
                  mainAddressNo,
                });
              }
            }
          );
        },
        ({ code: errorCode }) => {
          console.error(errorCode);
          if (errorCode === 1) {
            setLocationYn(true);

            setLocation({
              regionSiName: '서울시',
              regionGuName: '중구',
              regionDongName: '명동',
              mainAddressNo: '',
            });
          }
        }
      );
    } else {
      geocoder.coord2Address(
        33.450701,
        126.570667,
        (
          result: Array<{
            address: { [k: string]: any } | null;
            load_address: object | null;
          }>,
          status: string
        ) => {
          if (status === (window as any).kakao.maps.services.Status.OK) {
            const regionSiName = result[0]?.address?.region_1depth_name;
            const regionGuName = result[0]?.address?.region_2depth_name;
            const regionDongName = result[0]?.address?.region_3depth_name;
            const mainAddressNo = result[0]?.address?.main_address_no;
            setLocation({
              regionSiName,
              regionGuName,
              regionDongName,
              mainAddressNo,
            });
          }
        }
      );
    }
    if (isReloadLocation) {
      setIsReloadLocation(false);
    }
  }, [isReloadLocation]);

  useEffect(() => {
    if (!locationYn) {
      return;
    }
    contextDispatch({
      type: 'SHOW_MODAL',
      payload: {
        type: GlobalModal.ALERT,
        statusType: ModalStatus.WARNING,
        message:
          '현재위치에서 활동중인 친구가 궁금하다면 위치 엑세스를 허용해주세요.',
        block: true,
        callback: onChangeLocationYn,
      },
    });
  }, [locationYn]);

  return (
    <FriendsWrap>
      <FriendsTitle>
        <Icon icon={<BiCurrentLocation />} />{' '}
        {`${location?.regionSiName ?? ''} ${location?.regionGuName ?? ''} ${
          location?.regionDongName ?? ''
        }`}
        에서 활동하는 친구 {recommendData?.closedFriends?.length}명
      </FriendsTitle>
      <FriendsSubTitle onClick={reLoadLocation}>
        실제위치와 일치하지 않으신가요?
      </FriendsSubTitle>
      <FriendsBody>
        <FriendsCardList>
          {!isEmpty(recommendData?.fullFriends) && !error ? (
            <Slider {...settings}>
              {recommendData?.fullFriends?.map(
                (friend: {
                  id: number;
                  Image: { src: string } | null;
                  nickname: string;
                  Gyms: Array<{ address: string }>;
                }) => (
                  <FriendsCard key={friend.id}>
                    <CardAvatarWrap>
                      <Avatar
                        size={82}
                        src={friend?.Image ? `${friend?.Image?.src}` : ''}
                      />
                    </CardAvatarWrap>
                    <CardContentWrap>
                      <Link href={`/profile/${friend?.id}`}>
                        <ContentTitile>{friend.nickname}</ContentTitile>
                      </Link>
                      <ContentDescription>
                        {friend?.Gyms[0]?.address}
                      </ContentDescription>
                    </CardContentWrap>
                  </FriendsCard>
                )
              )}
            </Slider>
          ) : (
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
