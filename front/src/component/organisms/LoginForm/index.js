import React, { useCallback } from 'react';

import FormInput from '../../molecules/FormInput';

const LoginForm = () => {
  const onLogin = useCallback(() => {
    // dispatch(loginAction({ email: userEmail, password: userPassword }));
  }, []);

  return (
    <form onSubmit={onLogin}>
      <div>
        <FormInput placeholder="이메일 계정을 입력해주세요." />
      </div>
    </form>
  );
};

export default LoginForm;
