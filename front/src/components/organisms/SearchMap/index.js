/* eslint-disable no-undef */
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import PropTypes from 'prop-types';
import { ReloadOutlined } from '@ant-design/icons';

import { MapWrap } from './style';
import { Button } from '../../atoms';
import { CHANGE_MAP_BOUNDS, IS_LOAD_GYMS, LOAD_FRIENDS_REQUEST } from '../../../../reducers/gym';
import styles from '../../../scss/searchMap.module.scss';

const SearchMap = ({ foldedFriends, setFoldedFriends }) => {
  const map = useRef(null);
  const customOverlay = useRef(null);
  const [showButton, setShowButton] = useState(false);

  const dispatch = useDispatch();
  const { gym, gyms } = useSelector((state) => state.gym);
  const [browserHeight, setBrowserHeight] = useState(500);
  const [bounds, setBounds] = useState(null);

  const onSearchGyms = useCallback(() => {
    dispatch({
      type: IS_LOAD_GYMS,
      data: true,
    });
  }, [bounds]);

  const onClickGym = useCallback((gymId) => () => {
    if (foldedFriends) {
      setFoldedFriends(false);
    }
    dispatch({
      type: LOAD_FRIENDS_REQUEST,
      data: { gymId },
    });
  }, [foldedFriends]);

  useEffect(() => {
    if (bounds) {
      const debounce = setTimeout(() => {
        dispatch({
          type: CHANGE_MAP_BOUNDS,
          data: bounds,
        });
        setShowButton(true);
      }, 1000); // setTimeout 설정
      return () => clearTimeout(debounce);
    }
  }, [bounds]);

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

    // 지도 영역정보를 얻어옵니다
    const bounds = map.current.getBounds();
    // 영역정보의 남서쪽 정보를 얻어옵니다
    const swLatlng = bounds.getSouthWest();
    // 영역정보의 북동쪽 정보를 얻어옵니다
    const neLatlng = bounds.getNorthEast();

    const { La: swLon, Ma: swLat } = swLatlng;
    const { La: neLon, Ma: neLat } = neLatlng;
    dispatch({
      type: CHANGE_MAP_BOUNDS,
      data: { swLon, swLat, neLon, neLat },
    });

    kakao.maps.event.addListener(map.current, 'bounds_changed', () => {
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
    });
  }, []);

  useEffect(() => {
    if (!_.isEmpty(gym)) {
      if (customOverlay.current) {
        customOverlay.current.setMap(null);
      }
      const { latitude: lat, longitude: lon } = gym;
      // 위도 && 경도 위치로 지도이동
      const moveLatLon = new kakao.maps.LatLng(lat, lon);
      map.current.panTo(moveLatLon);

      const anticonUser = '<svg viewBox="64 64 896 896" focusable="false" fill="currentColor" width="1em" height="1em"><path d="M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" /></svg>';

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

      if (gym?.Users.length > 3) {
        const anticon = document.createElement('a');
        anticon.className = `${styles.anticon}`;
        anticon.innerHTML = anticonUser;

        anticon.addEventListener('click', () => {
          console.log('click');
        });

        const avatar = document.createElement('span');
        avatar.className = `${styles.avatar}`;

        const plusAvatar = document.createElement('span');
        plusAvatar.className = `${styles.plusAvatar}`;
        plusAvatar.innerText = `+ ${Users.length - 3}`;

        gym.Users.forEach((user, i) => {
          if (i <= 3) {
            if (user.Image) {
              const avatarImage = document.createElement('img');
              avatarImage.src = user.Image?.src;
              avatar.appendChild(avatarImage);
            } else {
              avatar.appendChild(anticon);
            }
            avatarGroup.appendChild(avatar);
          }
        });
        avatarGroup.appendChild(plusAvatar);
      } else {
        gym.Users.forEach((user) => {
          console.log('user:: ', user);
          const anticon = document.createElement('a');
          anticon.className = `${styles.anticon}`;
          anticon.innerHTML = anticonUser;
          anticon.addEventListener('click', () => {
            console.log('click');
          });
          const avatar = document.createElement('span');
          avatar.className = `${styles.avatar}`;
          if (user.Image) {
            const avatarImage = document.createElement('img');
            avatarImage.src = user.Image?.src;
            avatar.appendChild(avatarImage);
          } else {
            avatar.appendChild(anticon);
          }
          avatarGroup.appendChild(avatar);
        });
      }

      const innerTitle = document.createElement('div');
      innerTitle.className = `${styles.innerTitle}`;
      innerTitle.appendChild(document.createTextNode(gym.name));

      const innerBody = document.createElement('div');
      innerBody.className = `${styles.innerBody}`;
      innerBody.appendChild(document.createTextNode(gym.address));

      contentArrow.appendChild(arrow);
      contentWrap.appendChild(contentArrow);

      inner.appendChild(avatarGroup);
      inner.appendChild(innerTitle);
      inner.appendChild(innerBody);
      contentInner.appendChild(inner);
      contentWrap.appendChild(contentInner);

      const overlayContent = contentWrap;
      customOverlay.current = new kakao.maps.CustomOverlay({
        position: moveLatLon,
        content: overlayContent,
        xAnchor: 0.5,
        yAnchor: 0.96,
      });
      customOverlay.current.setMap(map.current);
    }
  }, [gym || (gym?.latitude || gym?.longitude)]);

  useEffect(() => {
    gyms.forEach((gymItem) => {
      const marker = new kakao.maps.Marker({
        map: map.current, // 마커를 표시할 지도
        position: new kakao.maps.LatLng(gymItem.latitude, gymItem.longitude), // 마커를 표시할 위치
        title: gymItem.name, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
      });
      kakao.maps.event.addListener(marker, 'click', onClickGym(gymItem.id));
    });
  }, [gyms]);

  return (
    <MapWrap browserHeight={browserHeight}>
      <div
        id="kakaoMap"
        style={{ width: '100%', height: '100%' }}
      />
      {showButton && <Button type="line-primary" icon={<ReloadOutlined />} onClick={onSearchGyms}>현 지도에서 검색</Button>}
    </MapWrap>
  );
};

SearchMap.propTypes = {
  foldedFriends: PropTypes.bool,
  setFoldedFriends: PropTypes.func,
};

export default SearchMap;
