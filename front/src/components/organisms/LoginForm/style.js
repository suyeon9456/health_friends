import styled from 'styled-components';

export const FormWrapper = styled.div`
  width: 100%;
  margin-top: 60px;
  & > form {
    width: 300px;
    margin: 0 auto;

    & > button {
      height: 50px;
    }
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
    padding: 0;
    height: 50px;

    &:not(:last-child) {
      margin-bottom: 10px;
    }

    & > span, & > span > a {
      display: block;
      width: 100%;
      height: 100%;
      line-height: 45px;
      color: rgba(0,0,0,0.85);

      &:hover {
        color: #b37feb;
      }
    }
    & .line-primary {
      color: #9254de;
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
