/* eslint-disable no-undef */
import React, { Dispatch, SetStateAction, useCallback } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { UseFormSetValue } from 'react-hook-form';

import { Modal } from '../../molecules';
import { ModalBodyBox } from './style';

const KakaoPostcode = ({
  onCancel,
  setShowPostcode,
  setValue,
}: {
  onCancel: () => void;
  setShowPostcode: Dispatch<SetStateAction<boolean>>;
  setValue: UseFormSetValue<{
    sido: string;
    sigungu: string;
    address: string;
    latitude: string;
    longitude: string;
    name: string;
  }>;
}) => {
  const handleComplete = useCallback((data) => {
    let fullAddress = data.address;
    let extraAddress = '';
    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
      }
      console.log(extraAddress);
      fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
    }
    const geocoder = new (window as any).kakao.maps.services.Geocoder();

    geocoder.addressSearch(data.address, (result: Array<{
      address: object;
      address_name: string;
      address_type: string;
      road_address: object;
      x: string;
      y: string;
    }>, status: string) => {
      if (status === (window as any).kakao.maps.services.Status.OK) {
        const { x: lon, y: lat } = result[0];
        setValue('latitude', lat);
        setValue('longitude', lon);
      }
    });
    setValue('sido', data.sido);
    setValue('sigungu', data.sigungu);
    setValue('address', fullAddress);
    setShowPostcode(false);
  }, []);
  return (
    <Modal
      title="주소검색"
      onCancel={onCancel}
    >
      <ModalBodyBox>
        <DaumPostcode
          onComplete={handleComplete}
        />
      </ModalBodyBox>
    </Modal>
  );
};

export default KakaoPostcode;
