/* eslint-disable no-undef */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useQueryClient } from 'react-query';
import isEmpty from 'lodash/isEmpty';
import { BiRevision } from 'react-icons/bi';

import { changeMapBounds, gymSelector, isLoadGyms } from '@/../reducers/gym';
import { gymAndFriendsByIdKey } from '@/../@utils/queryKey';
import { ButtonType } from '@/../@types/utils';
import { Location } from '@/../@types/gym';
import { SearchMapProps } from '@/../@types/map';
import { avatarContainer, overlayContainer } from '@/../@utils/tamplate';
import { Button, Icon } from '../../atoms';
import { MapWrap } from './style';

import styles from '../../../scss/searchMap.module.scss';

const SearchMap = ({ foldedFriends, setFoldedFriends }: SearchMapProps) => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();

  const { gym, gyms } = useSelector(gymSelector);

  const map = useRef<any>();
  const customOverlay = useRef<any>(null);

  const [showButton, setShowButton] = useState<boolean>(false);
  const [bounds, setBounds] = useState<Location>({});

  const onSearchGyms = useCallback(() => {
    dispatch(isLoadGyms(true));
  }, []);

  const onClickGym = useCallback(
    (gymId) => () => {
      if (foldedFriends) {
        setFoldedFriends(false);
      }
      void queryClient.invalidateQueries(gymAndFriendsByIdKey(gymId));
    },
    [foldedFriends]
  );

  useEffect(() => {
    if (bounds) {
      const debounce = setTimeout(() => {
        dispatch(changeMapBounds(bounds));
        setShowButton(true);
      }, 1000); // setTimeout 설정
      return () => clearTimeout(debounce);
    }
  }, [bounds]);

  useEffect(() => {
    const container = document.getElementById('kakaoMap');
    const options = {
      center: new (window as any).kakao.maps.LatLng(37.566826, 126.9786567),
      // 지도의 중심좌표 (서울시청)
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };
    map.current = new (window as any).kakao.maps.Map(container, options);

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
    const mapTypeControl = new (window as any).kakao.maps.MapTypeControl();
    map.current?.addControl(
      mapTypeControl,
      (window as any).kakao.maps.ControlPosition.TOPRIGHT
    );
    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
    const zoomControl = new (window as any).kakao.maps.ZoomControl();
    map.current?.addControl(
      zoomControl,
      (window as any).kakao.maps.ControlPosition.RIGHT
    );

    // 지도 영역정보를 얻어옵니다
    const mapBounds = map.current.getBounds();
    // 영역정보의 남서쪽 정보를 얻어옵니다
    const swLatlng = mapBounds.getSouthWest();
    // 영역정보의 북동쪽 정보를 얻어옵니다
    const neLatlng = mapBounds.getNorthEast();

    const { La: swLon, Ma: swLat } = swLatlng;
    const { La: neLon, Ma: neLat } = neLatlng;
    dispatch(changeMapBounds({ swLon, swLat, neLon, neLat }));

    (window as any).kakao.maps.event.addListener(
      map.current,
      'bounds_changed',
      () => {
        // 지도 영역정보를 얻어옵니다
        const currentBounds = map.current.getBounds();
        // 영역정보의 남서쪽 정보를 얻어옵니다
        const currentSwLatlng = currentBounds.getSouthWest();
        // 영역정보의 북동쪽 정보를 얻어옵니다
        const currentNeLatlng = currentBounds.getNorthEast();
        setBounds({
          swLon: currentSwLatlng.La,
          swLat: currentSwLatlng.Ma,
          neLon: currentNeLatlng.La,
          neLat: currentNeLatlng.Ma,
        });
      }
    );
  }, []);

  useEffect(() => {
    if (!isEmpty(gym)) {
      if (customOverlay.current) {
        customOverlay.current.setMap(null);
      }
      const { latitude: lat, longitude: lon } = gym;
      // 위도 && 경도 위치로 지도이동
      const moveLatLon = new (window as any).kakao.maps.LatLng(lat, lon);
      map.current.panTo(moveLatLon);

      const contentWrap = document.createElement('div');
      contentWrap.className = `${styles.contentWrap}`;
      contentWrap.innerHTML = overlayContainer({
        name: gym.name,
        address: gym.address,
      });
      const avatarGroup = avatarContainer(gym?.Users);
      contentWrap.querySelector(`.${styles.inner}`)?.prepend(avatarGroup);

      customOverlay.current = new (window as any).kakao.maps.CustomOverlay({
        position: moveLatLon,
        content: contentWrap,
        xAnchor: 0.5,
        yAnchor: 0.96,
      });
      customOverlay.current.setMap(map.current);
    }
  }, [gym || gym?.latitude || gym?.longitude]);

  useEffect(() => {
    gyms?.forEach(
      (gymItem: {
        id: number;
        latitude: string;
        longitude: string;
        name: string;
      }) => {
        const marker = new (window as any).kakao.maps.Marker({
          map: map.current, // 마커를 표시할 지도
          position: new (window as any).kakao.maps.LatLng(
            gymItem.latitude,
            gymItem.longitude
          ), // 마커를 표시할 위치
          title: gymItem.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
        });
        (window as any).kakao.maps.event.addListener(
          marker,
          'click',
          onClickGym(gymItem.id)
        );
      }
    );
  }, [gyms]);

  return (
    <MapWrap>
      <div id="kakaoMap" style={{ width: '100%', height: '100%' }} />
      {showButton && (
        <Button
          type={ButtonType.LINEPRIMARY}
          icon={<Icon icon={<BiRevision />} />}
          onClick={onSearchGyms}
        >
          현 지도에서 검색
        </Button>
      )}
    </MapWrap>
  );
};

export default SearchMap;
