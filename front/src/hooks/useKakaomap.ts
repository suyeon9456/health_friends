import { useEffect, useRef } from 'react';

const useKakaomap = () => {
  const map = useRef<any>();
  useEffect(() => {
    const container = document.getElementById('kakaoMap');
    const options = {
      center: new (window as any).kakao.maps.LatLng(37.566826, 126.9786567),
      // 지도의 중심좌표 (서울시청)
      level: 3, // 지도의 레벨(확대, 축소)
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
  }, []);
  return map;
};

export default useKakaomap;
