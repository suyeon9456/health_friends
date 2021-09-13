import React from 'react';
import PropTypes from 'prop-types';

import { CreateFormWrap } from './style';
import FormSelect from '../../molecules/FormSelect';
import FormInput from '../../molecules/FormInput';

const ModalCreateGym = () => {
  const options = [{ value: 1, text: '서울시' }, { value: 2, text: '인천시' }, { value: 3, text: '경기도' }];
  return (
    <CreateFormWrap>
      <FormSelect label="시 / 도" options={options} essential />
      <FormSelect label="시 / 군 / 구" options={options} essential />
      <FormInput label="상세주소" placeholder="상세주소를 입력해주세요." essential />
      <FormInput label="헬스장명" placeholder="헬스장명을 입력해주세요." essential />
    </CreateFormWrap>
  );
};

ModalCreateGym.propTypes = {
  // tabs: PropTypes.array,
  // list: PropTypes.array,
};

export default ModalCreateGym;
