import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import { CreateFormWrap, FormSearchPostcode } from './style';
import { Button } from '../../atoms';
import { FormInput } from '../../molecules';
import KakaoPostcode from '../KakaoPostcode';

const ModalCreateGym = ({ sido,
  setSido,
  sigungu,
  setSigungu,
  address,
  setAddress,
  setLatitude,
  setLongitude,
  name,
  onChangeName,
}) => {
  const [showPostcode, setShowPostcode] = useState(false);
  const changeShowPostcode = useCallback(() => {
    setShowPostcode((prev) => !prev);
  }, [showPostcode]);

  return (
    <CreateFormWrap>
      <FormSearchPostcode>
        <FormInput
          label="시 / 도"
          placeholder="주소를 검색해주세요."
          essential
          value={sido}
          disabled
        />
        <div className="button-wrap">
          <div />
          <Button
            type="primary"
            onClick={changeShowPostcode}
          >
            주소 검색
          </Button>
        </div>
      </FormSearchPostcode>
      <FormInput
        label="시 / 군 / 구"
        placeholder="주소를 검색해주세요."
        essential
        value={sigungu}
        disabled
      />
      <FormInput
        label="상세주소"
        placeholder="주소를 검색해주세요."
        essential
        value={address}
        disabled
      />
      <FormInput
        label="헬스장명"
        placeholder="헬스장명을 입력해주세요."
        essential
        value={name}
        onChange={onChangeName}
      />
      {showPostcode && (
        <KakaoPostcode
          show={showPostcode}
          onCancel={changeShowPostcode}
          setShowPostcode={setShowPostcode}
          setSido={setSido}
          setSigungu={setSigungu}
          setAddress={setAddress}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
      )}
    </CreateFormWrap>
  );
};

ModalCreateGym.propTypes = {
  sido: PropTypes.string,
  setSido: PropTypes.func,
  sigungu: PropTypes.string,
  setSigungu: PropTypes.func,
  address: PropTypes.string,
  setAddress: PropTypes.func,
  setLatitude: PropTypes.func,
  setLongitude: PropTypes.func,
  name: PropTypes.string,
  onChangeName: PropTypes.func,
};

export default ModalCreateGym;
