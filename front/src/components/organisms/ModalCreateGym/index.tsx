import React from 'react';
import { useDispatch } from 'react-redux';

import { hiddenCustomModal, showCustomModal } from '@/../reducers/user';
import { ButtonType } from '@/../@types/constant';
import { ModalCreateGymProps } from '@/../@types/gym';
import { FormInput } from '../../molecules';
import { Button } from '../../atoms';
import { CreateFormWrap, FormSearchPostcode } from './style';
import GlobalCustomModal from '../GlobalCustomModal';
import KakaoPostcode from '../KakaoPostcode';

const POSTCODE = 'POSTCODE' as const;
const ModalCreateGym = ({ control, setValue }: ModalCreateGymProps) => {
  const dispatch = useDispatch();
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
          <Button
            type={ButtonType.PRIMARY}
            onClick={() => dispatch(showCustomModal(POSTCODE))}
          >
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
      <GlobalCustomModal id={POSTCODE}>
        <KakaoPostcode
          onCancel={() => dispatch(hiddenCustomModal(POSTCODE))}
          setValue={setValue}
        />
      </GlobalCustomModal>
    </CreateFormWrap>
  );
};

export default ModalCreateGym;
