import React, { useState, useCallback, Dispatch, SetStateAction, ChangeEvent } from 'react';

import { CreateFormWrap, FormSearchPostcode } from './style';
import { Button } from '../../atoms';
import { FormInput } from '../../molecules';
import KakaoPostcode from '../KakaoPostcode';
import { UseFormSetValue } from 'react-hook-form';

const ModalCreateGym = ({ control,
  setValue,
}: {
  control: any;
  setValue: UseFormSetValue<{
    sido: string;
    sigungu: string;
    address: string;
    latitude: string;
    longitude: string;
    name: string;
  }>;
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
          id="sido"
          control={control}
          placeholder="주소를 검색해주세요."
          essential
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
        id="sigungu"
        control={control}
        placeholder="주소를 검색해주세요."
        essential
        disabled
      />
      <FormInput
        label="상세주소"
        id="address"
        control={control}
        placeholder="주소를 검색해주세요."
        essential
        disabled
      />
      <FormInput
        label="헬스장명"
        id="name"
        control={control}
        placeholder="헬스장명을 입력해주세요."
        essential
      />
      {showPostcode && (
        <KakaoPostcode
          show={showPostcode}
          onCancel={changeShowPostcode}
          setShowPostcode={setShowPostcode}
          setValue={setValue}
        />
      )}
    </CreateFormWrap>
  );
};

export default ModalCreateGym;
