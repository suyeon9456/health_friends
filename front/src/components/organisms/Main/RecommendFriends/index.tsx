import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { AxiosError } from 'axios';
import { useQuery } from 'react-query';
import Slider from 'react-slick';
import isEmpty from 'lodash/isEmpty';
import { BiCurrentLocation } from 'react-icons/bi';

import { useModalDispatch } from '@/../store/modalStore';
import { loadRecommendAPI } from '@/api/user';
import { Location } from '@/../@types/map';
import { ERROR_CODE, GlobalModal, ModalStatus } from '@/../@types/constant';
import { RecommendFriendsAPI } from '@/../@types/user';
import useIsState from '@/hooks/useIsState';
import { recommendKey } from '@/../@utils/queryKey';
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
} from './style';
import {
  Avatar,
  Icon,
  ReactSliderNextButton,
  ReactSliderPrevButton,
} from '../../../atoms';
import LoadingFallback from './LoadingFallback';

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
  const [isLocation, onChangeIsLocation, setIsLocation] = useIsState(false);

  const { data: recommendData, isLoading } = useQuery<
    RecommendFriendsAPI | undefined,
    AxiosError
  >(recommendKey(location), () => loadRecommendAPI(location), {
    staleTime: 5 * 60 * 1000,
  });

  const reLoadLocation = useCallback(
    () => setIsReloadLocation(true),
    [isReloadLocation]
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
          if (errorCode === ERROR_CODE) {
            setIsLocation(true);

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
            setLocation({
              regionSiName: result[0]?.address?.region_1depth_name,
              regionGuName: result[0]?.address?.region_2depth_name,
              regionDongName: result[0]?.address?.region_3depth_name,
              mainAddressNo: result[0]?.address?.main_address_no,
            });
          }
        }
      );
    }
    if (isReloadLocation) {
      setIsReloadLocation(false);
    }
  }, []);

  useEffect(() => {
    if (!isLocation) {
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
        callback: onChangeIsLocation,
      },
    });
  }, [isLocation]);

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
          {!isEmpty(recommendData?.fullFriends) && !isLoading ? (
            <Slider {...settings}>
              {recommendData?.fullFriends?.map((friend) => (
                <Link href={`/profile/${friend?.id}`} key={friend.id}>
                  <FriendsCard>
                    <CardAvatarWrap>
                      <Avatar
                        size={82}
                        src={friend?.Image ? `${friend?.Image?.src}` : ''}
                      />
                    </CardAvatarWrap>
                    <CardContentWrap>
                      <ContentTitile>{friend.nickname}</ContentTitile>
                      <ContentDescription>
                        {friend?.Gyms?.[0].address}
                        <span> {friend?.Gyms?.[0].name}</span>
                      </ContentDescription>
                    </CardContentWrap>
                  </FriendsCard>
                </Link>
              ))}
            </Slider>
          ) : (
            <LoadingFallback />
          )}
        </FriendsCardList>
      </FriendsBody>
    </FriendsWrap>
  );
};

export default RecommendFriends;
