/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';

import { MapWrapper } from './style';

const SearchMap = () => {
  const [browserHeight, setBrowserHeight] = useState(500);
  useEffect(() => {
    setBrowserHeight(document.documentElement.clientHeight);
  }, [browserHeight]);
  useEffect(() => {
    const container = document.getElementById('kakaoMap');
    const options = {
      // eslint-disable-next-line no-undef
      center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };

    // eslint-disable-next-line no-undef
    const map = new kakao.maps.Map(container, options);

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
    const mapTypeControl = new kakao.maps.MapTypeControl();
    map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
    const zoomControl = new kakao.maps.ZoomControl();
    map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
  }, []);

  return (
    <MapWrapper browserHeight={browserHeight}>
      <div id="kakaoMap" style={{ width: '100%', height: '100%' }} />
    </MapWrapper>
  );
};

export default SearchMap;
