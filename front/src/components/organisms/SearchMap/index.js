/* eslint-disable no-undef */
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import * as _ from 'lodash';
import styles from '../../../scss/searchMap.module.scss';

import { MapWrapper } from './style';

const SearchMap = () => {
  const map = useRef(null);

  const { gym } = useSelector((state) => state.gym);
  const [browserHeight, setBrowserHeight] = useState(500);

  useEffect(() => {
    setBrowserHeight(document.documentElement.clientHeight);
  }, [browserHeight]);

  useEffect(() => {
    const container = document.getElementById('kakaoMap');
    const options = {
      center: new kakao.maps.LatLng(37.566826, 126.9786567),
      // 지도의 중심좌표 (서울시청)
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };
    map.current = new kakao.maps.Map(container, options);

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
    const mapTypeControl = new kakao.maps.MapTypeControl();
    map.current.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);
    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
    const zoomControl = new kakao.maps.ZoomControl();
    map.current.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);

  useEffect(() => {
    if (!_.isEmpty(gym)) {
      const { latitude: lat, longitude: lon } = gym;
      // 위도 && 경도 위치로 지도이동
      const moveLatLon = new kakao.maps.LatLng(lat, lon);
      map.current.panTo(moveLatLon);

      const contentWrap = document.createElement('div');
      contentWrap.className = `${styles.contentWrap}`;

      const contentArrow = document.createElement('div');
      contentArrow.className = `${styles.contentArrow}`;

      const arrow = document.createElement('span');
      arrow.className = `${styles.arrow}`;

      const contentInner = document.createElement('div');
      contentInner.className = `${styles.contentInner}`;

      const inner = document.createElement('div');
      inner.className = `${styles.inner}`;

      const avatarGroup = document.createElement('div');
      avatarGroup.className = `${styles.avatarGroup}`;

      const avatar = document.createElement('span');
      avatar.className = `${styles.avatar}`;
      const antdIcon = document.createElement('svg');

      const avatar2 = document.createElement('span');
      avatar2.className = `${styles.avatar}`;

      const innerTitle = document.createElement('div');
      innerTitle.className = `${styles.innerTitle}`;
      innerTitle.appendChild(document.createTextNode(gym.name));

      const innerBody = document.createElement('div');
      innerBody.className = `${styles.innerBody}`;
      innerBody.appendChild(document.createTextNode(gym.address));

      contentArrow.appendChild(arrow);
      contentWrap.appendChild(contentArrow);

      // avatar.appendChild(antdIcon);
      avatarGroup.appendChild(avatar);
      avatarGroup.appendChild(avatar2);
      inner.appendChild(avatarGroup);
      inner.appendChild(innerTitle);
      inner.appendChild(innerBody);
      contentInner.appendChild(inner);
      contentWrap.appendChild(contentInner);

      const overlayContent = contentWrap;
      const customOverlay = new kakao.maps.CustomOverlay({
        position: moveLatLon,
        content: overlayContent,
        xAnchor: 0.3,
        yAnchor: 0.91,
      });
      customOverlay.setMap(map.current);
    }
  }, [gym && (gym?.latitude || gym?.longitude)]);

  return (
    <MapWrapper browserHeight={browserHeight}>
      <div
        id="kakaoMap"
        style={{ width: '100%', height: '100%' }}
      />
    </MapWrapper>
  );
};

export default SearchMap;
