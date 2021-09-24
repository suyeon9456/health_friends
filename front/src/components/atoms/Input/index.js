/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { CheckCircleFilled, CloseCircleFilled, LockOutlined, UnlockOutlined } from '@ant-design/icons';

import { ValidationIconWrap, Feedback, FeedbackWrap, InputContainer, InputContent, InputControlWrap, InputWrap, InputWrapBox } from './style';

const Input = ({
  size = 'default',
  type = 'text',
  loading,
  value,
  onChange,
  placeholder,
  validationState,
  feedback,
  ...props
}) => {
  const [passwordType, setPasswordType] = useState(true);

  const onChangePasswordType = useCallback(() => {
    setPasswordType((prev) => !prev);
  }, []);

  if (type === 'password') {
    return (
      <InputControlWrap>
        <InputWrapBox>
          <InputContent>
            <InputWrap>
              <InputContainer
                type={passwordType ? 'password' : 'text'}
                passwordType={type}
                value={value}
                onChange={onChange}
                size={size}
                placeholder={placeholder}
                validationState={validationState}
                feedback={feedback}
                {...props}
              />
              <span>
                {passwordType
                  ? <LockOutlined color="#000000d9" onClick={onChangePasswordType} />
                  : <UnlockOutlined color="#000000d9" onClick={onChangePasswordType} />}
              </span>
            </InputWrap>
          </InputContent>
        </InputWrapBox>
      </InputControlWrap>
    );
  }

  return (
    <InputControlWrap>
      <InputWrapBox>
        <InputContent>
          <InputContainer
            value={value}
            onChange={onChange}
            size={size}
            placeholder={placeholder}
            validationState={validationState}
            feedback={feedback}
            {...props}
          />
          {validationState && (
            <ValidationIconWrap validationState={validationState}>
              {validationState === 'error'
                ? <CloseCircleFilled />
                : <CheckCircleFilled />}
            </ValidationIconWrap>
          )}
        </InputContent>
      </InputWrapBox>
      <FeedbackWrap>
        <Feedback>{feedback}</Feedback>
      </FeedbackWrap>
    </InputControlWrap>
  );
};

Input.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
  value: PropTypes.node,
  onChange: PropTypes.func,
  validationState: PropTypes.bool,
  feedback: PropTypes.string,
  props: PropTypes.any,
};

export default Input;
