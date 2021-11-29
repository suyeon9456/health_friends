import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { LOAD_MY_INFO_REQUEST, LOAD_RECOMMEND_FRIENDS_REQUEST } from '../../../../reducers/user';
import MainBanner from './MainBanner';
import RankedFriends from './RankedFriends';
import RealTimeMatchingCouple from './RealTimeMatchingCouple';

import { MainBannerWrap, MainBodyWrap, MainWrap } from './style';

const Main = () => {
  const dispatch = useDispatch();
  const [location, setLocation] = useState(null);
  // const { drawerShow } = useShowState();
  // const contextDispatch = useShowDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();
    console.log('navigator', navigator.geolocation);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude; // 위도
        const lon = position.coords.longitude; // 경도
        // const locPosition = new kakao.maps.LatLng(lat, lon);
        // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성합니다
        // const message = '<div style="padding:5px;">여기에 계신가요?!</div>'; // 인포윈도우에 표시될 내용입니다
        // // 마커와 인포윈도우를 표시합니다
        // displayMarker(locPosition, message);
        geocoder.coord2Address(lon, lat, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            console.log('address', result[0].address);
            const regionSiName = result[0].address.region_1depth_name;
            const regionGuName = result[0].address.region_2depth_name;
            const regionDongName = result[0].address.region_3depth_name;
            const mainAddressNo = result[0].address.main_address_no;
            setLocation({
              regionSiName,
              regionGuName,
              regionDongName,
              mainAddressNo,
            });
          }
        });
      });
    } else {
      console.log('X');
      // const locPosition = new kakao.maps.LatLng(33.450701, 126.570667);
      // const message = 'geolocation을 사용할수 없어요..';
      geocoder.coord2Address(33.450701, 126.570667, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
          // console.log(result);
          const regionSiName = result[0].address.region_1depth_name;
          const regionGuName = result[0].address.region_2depth_name;
          const regionDongName = result[0].address.region_3depth_name;
          const mainAddressNo = result[0].address.main_address_no;
          setLocation({
            regionSiName,
            regionGuName,
            regionDongName,
            mainAddressNo,
          });
        }
      });
    }
  }, []);

  useEffect(() => {
    if (location) {
      console.log(location);
      const { regionSiName: si, regionGuName: gu, regionDongName: dong, mainAddressNo } = location;
      dispatch({
        type: LOAD_RECOMMEND_FRIENDS_REQUEST,
        data: { si, gu, dong, mainAddressNo },
      });
    }
  }, [location]);
  return (
    <MainWrap>
      <MainBannerWrap>
        <MainBanner location={location} />
      </MainBannerWrap>
      <MainBodyWrap>
        <RankedFriends />
        <RealTimeMatchingCouple />
      </MainBodyWrap>
    </MainWrap>
  );
};

export default Main;
