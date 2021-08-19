import styled from 'styled-components';

export const FormWrapper = styled.div`
  width: 100%;
  & > form {
    width: 300px;
    margin: 0 auto;
  }
`;

export const InputWrapper = styled.div`
  &:not(:last-child) {
    margin-bottom: 10px;
  }

  & > input, & > span {
    height: 50px;
  }
`;

export const ButtonWrapper = styled.div`
  width: 300px;
  margin: 0 auto;
  margin-top: 20px;

  & button {
    height: 50px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }

  & > div {
    margin-bottom: 10px;
    & button {
      width: 145px;
      height: 50px;

      &:last-child {
        float: right;
      }
    }
  }
`;
