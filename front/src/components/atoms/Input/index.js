/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { CheckCircleFilled, CloseCircleFilled, LockOutlined, UnlockOutlined } from '@ant-design/icons';

import { ValidationIconWrap, Feedback, FeedbackWrap, InputContainer, InputContent, InputControlWrap, InputWrap, InputWrapBox } from './style';

const Input = React.forwardRef(({
  size = 'default',
  type = 'text',
  loading,
  value,
  onChange,
  placeholder,
  validationErrors,
  feedback,
  disabled,
  ...props
}, ref) => {
  const [passwordType, setPasswordType] = useState(true);

  const onChangePasswordType = useCallback(() => {
    setPasswordType((prev) => !prev);
  }, []);
  // console.log('validationErrors', validationErrors);

  if (type === 'password') {
    return (
      <InputControlWrap>
        <InputWrapBox>
          <InputContent>
            <InputWrap validationErrors={validationErrors}>
              <InputContainer
                type={passwordType ? 'password' : 'text'}
                passwordType={type}
                value={value}
                onChange={onChange}
                size={size}
                placeholder={placeholder}
                validationErrors={validationErrors}
                feedback={feedback}
                ref={ref}
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
        {feedback && (
          <FeedbackWrap>
            <Feedback>{feedback}</Feedback>
          </FeedbackWrap>
        )}
      </InputControlWrap>
    );
  }

  return (
    <InputControlWrap>
      <InputWrapBox>
        <InputContent>
          <InputContainer
            value={value || ''}
            onChange={onChange}
            size={size}
            placeholder={placeholder}
            validationErrors={validationErrors}
            feedback={feedback}
            ref={ref}
            readOnly={disabled}
            {...props}
          />
          {validationErrors && (
            <ValidationIconWrap validationState={validationErrors}>
              {validationErrors === 'error'
                ? <CloseCircleFilled />
                : <CheckCircleFilled />}
            </ValidationIconWrap>
          )}
        </InputContent>
      </InputWrapBox>
      {feedback && (
        <FeedbackWrap>
          <Feedback>{feedback}</Feedback>
        </FeedbackWrap>
      )}
    </InputControlWrap>
  );
});

Input.propTypes = {
  size: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
  value: PropTypes.node,
  onChange: PropTypes.func,
  validationErrors: PropTypes.node,
  feedback: PropTypes.string,
  disabled: PropTypes.bool,
  props: PropTypes.any,
};

export default Input;
