import React, { useCallback, useState } from 'react';
import { StyledButton } from '../src/component/atoms/Button/style';
import Alert from '../src/component/molecules/Alert';
import FormInput from '../src/component/molecules/FormInput';

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
      <FormInput label="title" placeholder="placeholder 입니다." essential />
    </div>
  );
};

export default Molecules;
