import React, { useCallback, useState } from 'react';
import { StyledButton } from '../src/component/atoms/Button/style';
import Alert from '../src/component/molecules/Alert';
import FormInput from '../src/component/molecules/FormInput';
import FormSelect from '../src/component/molecules/FormSelect';
import FormTextarea from '../src/component/molecules/FormTextarea';
import List from '../src/component/molecules/List';
import Progress from '../src/component/molecules/Progress';
import SimpleMatchingCard from '../src/component/molecules/SimpleMatchingCard';
import Tabs from '../src/component/molecules/Tabs';

const Molecules = () => {
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [primary, setPrimary] = useState(false);

  const onChangeError = useCallback(() => {
    setError((prev) => !prev);
  }, [error]);
  const onChangeWarning = useCallback(() => {
    setWarning((prev) => !prev);
  }, [warning]);
  const onChangeSuccess = useCallback(() => {
    setSuccess((prev) => !prev);
  }, [success]);
  const onChangePrimary = useCallback(() => {
    setPrimary((prev) => !prev);
  }, [primary]);

  const options = [{ value: 1, text: 'test1' }, { value: 2, text: 'test2' }, { value: 3, text: 'test3' }];
  const tabs = [{ value: '1', text: 'teb1' }, { value: '2', text: 'teb2' }, { value: '3', text: 'teb3' }];
  const list = [{ title: 'List Title 1', description: 'List description 1' }, { title: 'List Title 2', description: 'List description 2' }, { title: 'List Title 3', description: 'List description 3' }];

  return (
    <div>
      <h2>Alert_Error</h2>
      <StyledButton type="error" onClick={onChangeError}>Error Button</StyledButton>
      {
        error
          ? (
            <Alert
              type="error"
              action={(
                <StyledButton
                  block
                  type="error"
                  onClick={onChangeError}
                >
                  확인
                </StyledButton>
              )}
              message="회원탈퇴에 실패하였습니다."
            />
          )
          : null
      }
      <h2>Alert_Warning</h2>
      <StyledButton type="warning" onClick={onChangeWarning}>Warning Button</StyledButton>
      {
        warning
          ? (
            <Alert
              type="warning"
              action={(
                <StyledButton
                  block
                  type="warning"
                  onClick={onChangeWarning}
                >
                  확인
                </StyledButton>
              )}
              message="비밀번호를 입력해주세요."
            />
          )
          : null
      }
      <h2>Alert_Success</h2>
      <StyledButton type="success" onClick={onChangeSuccess}>Success Button</StyledButton>
      {
        success
          ? (
            <Alert
              type="success"
              action={(
                <StyledButton
                  block
                  type="success"
                  onClick={onChangeSuccess}
                >
                  확인
                </StyledButton>
              )}
              message="회원가입을 완료했습니다."
            />
          )
          : null
      }
      <h2>Primary_Success</h2>
      <StyledButton type="primary" onClick={onChangePrimary}>Primary Button</StyledButton>
      {
        primary
          ? (
            <Alert
              action={(
                <StyledButton
                  block
                  onClick={onChangePrimary}
                >
                  확인
                </StyledButton>
              )}
              message="기본 alert창 입니다."
            />
          )
          : null
      }
      <h2>FormInput</h2>
      <FormInput label="input label" placeholder="placeholder 입니다." essential />
      <h2>FormSelect</h2>
      <FormSelect label="select label" options={options} essential />
      <h2>FormTextarea</h2>
      <FormTextarea label="textarea label" placeholder="placeholder 입니다." maxLength={50} showCount essential />
      <h2>Tabs</h2>
      <Tabs tabs={tabs} defaultTabValue="1" />
      <h2>Tabs_block</h2>
      <Tabs tabs={tabs} defaultTabValue="1" block />
      <h2>List</h2>
      <List list={list} />
      <h2>Progress</h2>
      <Progress label="재매칭률" percent={70} />
      <h2>SimpleMatchingCard</h2>
      <SimpleMatchingCard nickname="nickname" address="매칭된 헬스장 주소" date="2020.00.00 10:56 AM" />
    </div>
  );
};

export default Molecules;
