/* eslint-disable no-undef */
import React, { useCallback } from 'react';
import DaumPostcode from 'react-daum-postcode';
import PropTypes from 'prop-types';

import { Modal } from '../../molecules';
import { ModalBodyBox } from './style';

const KakaoPostcode = ({ show,
  onCancel,
  setShowPostcode,
  setSido,
  setSigungu,
  setAddress,
  setLatitude,
  setLongitude,
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
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(data.address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const { x: lon, y: lat } = result[0];
        setLatitude(lat);
        setLongitude(lon);
      }
    });
    setSido(data.sido);
    setSigungu(data.sigungu);
    setAddress(fullAddress);
    setShowPostcode(false);
  }, []);
  return (
    <Modal
      title="주소검색"
      show={show}
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

KakaoPostcode.propTypes = {
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func,
  setShowPostcode: PropTypes.func,
  setSido: PropTypes.func,
  setSigungu: PropTypes.func,
  setAddress: PropTypes.func,
  setLatitude: PropTypes.func,
  setLongitude: PropTypes.func,
};

export default KakaoPostcode;
