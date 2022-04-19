import React, { useState, useCallback } from 'react';

import { ButtonType } from '@/../@types/utils';
import { CreateGym } from '@/../@types/gym';
import { CreateFormWrap, FormSearchPostcode } from './style';
import { Button } from '../../atoms';
import { FormInput } from '../../molecules';
import KakaoPostcode from '../KakaoPostcode';
import ModalPortal from '../ModalPortal';

const ModalCreateGym = ({ control, setValue }: CreateGym) => {
  const [showPostcode, setShowPostcode] = useState(false);
  const changeShowPostcode = useCallback(() => {
    setShowPostcode((prev) => !prev);
  }, [showPostcode]);

  return (
    <CreateFormWrap>
      <FormSearchPostcode>
        <FormInput
          label="헬스장"
          id="name"
          control={control}
          placeholder="주소를 검색해주세요."
          essential
          disabled
        />
        <div className="button-wrap">
          <div />
          <Button type={ButtonType.PRIMARY} onClick={changeShowPostcode}>
            주소 검색
          </Button>
        </div>
      </FormSearchPostcode>
      <FormInput
        label="주소"
        id="addressRoad"
        control={control}
        placeholder="주소를 검색해주세요."
        essential
        disabled
      />
      <FormInput
        label="지번"
        id="address"
        control={control}
        placeholder="주소를 검색해주세요."
        essential
        disabled
      />
      <FormInput
        label="전화번호"
        id="phone"
        control={control}
        placeholder="주소를 검색해주세요."
        essential
        disabled
      />
      <ModalPortal>
        {showPostcode && (
          <KakaoPostcode
            onCancel={changeShowPostcode}
            setShowPostcode={setShowPostcode}
            setValue={setValue}
          />
        )}
      </ModalPortal>
    </CreateFormWrap>
  );
};

export default ModalCreateGym;
