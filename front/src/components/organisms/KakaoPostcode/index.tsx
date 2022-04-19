/* eslint-disable no-undef */
import { Input, Search } from '@/components/atoms';
import { useInput } from '@/hooks';
import { KeywordPlace } from 'map';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { UseFormSetValue } from 'react-hook-form';

import { Modal } from '../../molecules';
import { ModalBodyBox, SearchList, SearchMap, SearchResultWrap } from './style';

const KakaoPostcode = ({
  onCancel,
  setShowPostcode,
  setValue,
}: {
  onCancel: () => void;
  setShowPostcode: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<{
    address: string;
    addressRoad: string;
    phone: string;
    latitude: string;
    longitude: string;
    name: string;
  }>;
}) => {
  const map = useRef<any>();
  const infowindow = useRef<any>();
  const [gymPlaces, setGymPlaces] = useState<KeywordPlace[]>([]);
  const [isSearch, setIsSearch] = useState<boolean>(true);
  const [keyword, onChangeKeyword] = useInput<string>('');
  const onClickComplete = useCallback((data: KeywordPlace) => {
    if (!data) {
      return;
    }
    const { phone, x, y } = data;
    setValue('latitude', y);
    setValue('longitude', x);
    setValue('address', data.address_name);
    setValue('addressRoad', data.road_address_name);
    setValue('phone', phone);
    setValue('name', data.place_name);
    setShowPostcode(false);
  }, []);

  const removeAllChildNods = useCallback(() => {
    setGymPlaces([]);
  }, []);

  const addMarker = useCallback((position, idx, title) => {
    const imageSrc =
      'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png'; // 마커 이미지 url, 스프라이트 이미지를 씁니다
    const imageSize = new (window as any).kakao.maps.Size(36, 37); // 마커 이미지의 크기
    const imgOptions = {
      spriteSize: new (window as any).kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
      spriteOrigin: new (window as any).kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
      offset: new (window as any).kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
    };
    const markerImage = new (window as any).kakao.maps.MarkerImage(
      imageSrc,
      imageSize,
      imgOptions
    );
    const marker = new (window as any).kakao.maps.Marker({
      position, // 마커의 위치
      image: markerImage,
    });

    marker.setMap(map.current); // 지도 위에 마커를 표출합니다

    return marker;
  }, []);
  const displayPlaces = useCallback((places) => {
    const bounds = new (window as any).kakao.maps.LatLngBounds();
    removeAllChildNods();

    const list = places.map((place: KeywordPlace, i: number) => {
      // 마커를 생성하고 지도에 표시합니다
      const placePosition = new (window as any).kakao.maps.LatLng(
        place.y,
        place.x
      );
      const marker = addMarker(placePosition, i, place.place_name);
      // console.log('marker', marker);

      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);

      (window as any).kakao.maps.event.addListener(marker, 'click', () => {
        onClickComplete(place);
      });
      (window as any).kakao.maps.event.addListener(marker, 'mouseover', () => {
        onMouseover(marker, place.place_name);
      });

      (window as any).kakao.maps.event.addListener(marker, 'mouseout', () => {
        onMouseout();
      });
      return {
        ...place,
        marker,
      };
    });
    setGymPlaces(list);
    // menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.current.setBounds(bounds);
  }, []);

  const placesSearchCB = useCallback((data, status) => {
    if (status === (window as any).kakao.maps.services.Status.OK) {
      displayPlaces(data);
    } else if (
      status === (window as any).kakao.maps.services.Status.ZERO_RESULT
    ) {
      console.log('검색 결과가 존재하지 않습니다.');
    } else if (status === (window as any).kakao.maps.services.Status.ERROR) {
      console.log('검색 결과 중 오류가 발생했습니다.');
    }
  }, []);

  const onMouseover = useCallback(
    (marker, title) => {
      const content = `<div style="padding:5px;z-index:1;">${title}</div>`;
      infowindow.current.setContent(content);
      infowindow.current.open(map.current, marker);
    },
    [map.current, infowindow.current]
  );

  const onMouseout = useCallback(() => {
    infowindow.current.close();
  }, [map.current, infowindow.current]);

  const onSearch = useCallback(() => {
    setIsSearch(true);
  }, [isSearch]);

  useEffect(() => {
    const container = document.getElementById('kakaoMap');
    const options = {
      // 지도의 중심좌표 (서울시청)
      center: new (window as any).kakao.maps.LatLng(37.566826, 126.9786567),
      level: 3, // 지도의 레벨(확대, 축소 정도)
    };
    map.current = new (window as any).kakao.maps.Map(container, options);

    // 일반 지도와 스카이뷰로 지도 타입을 전환할 수 있는 지도타입 컨트롤을 생성
    const mapTypeControl = new (window as any).kakao.maps.MapTypeControl();
    map?.current?.addControl(
      mapTypeControl,
      (window as any).kakao.maps.ControlPosition.TOPRIGHT
    );
    // 지도 확대 축소를 제어할 수 있는 줌 컨트롤을 생성
    const zoomControl = new (window as any).kakao.maps.ZoomControl();
    map?.current?.addControl(
      zoomControl,
      (window as any).kakao.maps.ControlPosition.RIGHT
    );

    if (!isSearch) {
      return;
    }

    // 장소 검색 객체를 생성합니다
    const ps = new (window as any).kakao.maps.services.Places();

    // 검색 결과 목록이나 마커를 클릭했을 때 장소명을 표출할 인포윈도우를 생성합니다
    infowindow.current = new (window as any).kakao.maps.InfoWindow({
      zIndex: 1,
    });

    // 키워드 검색을 요청하는 함수입니다
    const searchPlaces = () => {
      ps.keywordSearch(`${keyword} 헬스`, placesSearchCB);
    };
    searchPlaces();
    setIsSearch(false);
  }, [isSearch]);

  return (
    <Modal
      title="헬스장 검색"
      onCancel={onCancel}
      widthSize={900}
      isNotModalMask
    >
      <ModalBodyBox>
        <Search
          placeholder="지역 키워드를 입력하세요. (ex 낙성대, 서촌)"
          value={keyword}
          onChange={onChangeKeyword}
          onSearch={onSearch}
        />
        <SearchResultWrap>
          <SearchList>
            <ul>
              {gymPlaces?.map((place, i) => (
                <li
                  key={place.id}
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
                  role="button"
                  onMouseOver={() =>
                    onMouseover(place.marker, place.place_name)
                  }
                  onMouseOut={() => onMouseout()}
                  onFocus={() => onMouseover(place.marker, place.place_name)}
                  onBlur={() => onMouseout()}
                  onClick={() => onClickComplete(place)}
                  onKeyPress={() => onClickComplete(place)}
                >
                  <div>
                    <div className="place-name">{place.place_name}</div>
                    <div>{place.road_address_name}</div>
                    <div className="jibun">{place.address_name}</div>
                    <div>{place.phone}</div>
                  </div>
                </li>
              ))}
            </ul>
          </SearchList>
          <SearchMap>
            <div id="kakaoMap" style={{ width: '100%', height: '100%' }} />
          </SearchMap>
        </SearchResultWrap>
      </ModalBodyBox>
    </Modal>
  );
};

export default KakaoPostcode;
