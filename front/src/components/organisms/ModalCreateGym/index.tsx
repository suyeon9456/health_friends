import React from 'react';

import { ButtonType } from '@/../@types/utils';
import { ModalCreateGymProps } from '@/../@types/gym';
import useIsState from '@/hooks/useIsState';
import { FormInput } from '../../molecules';
import { Button } from '../../atoms';
import KakaoPostcode from '../KakaoPostcode';
import ModalPortal from '../ModalPortal';
import { CreateFormWrap, FormSearchPostcode } from './style';

const ModalCreateGym = ({ control, setValue }: ModalCreateGymProps) => {
  const [isShowPostcode, changeIsShowPostcode, setIsShowPostcode] =
    useIsState(false);

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
          <Button type={ButtonType.PRIMARY} onClick={changeIsShowPostcode}>
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
        {isShowPostcode && (
          <KakaoPostcode
            onCancel={changeIsShowPostcode}
            setShowPostcode={setIsShowPostcode}
            setValue={setValue}
          />
        )}
      </ModalPortal>
    </CreateFormWrap>
  );
};

export default ModalCreateGym;
