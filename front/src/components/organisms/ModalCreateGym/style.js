import styled from 'styled-components';

export const CreateFormWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 16px;

  & label {
    font-size: 14px;
    font-weight: 500;
  }

  & > div:not(:first-child) {
    margin-top: 10px;
  }

  & > div > input, & > div > select {
    margin-top: 10px;
  }
`;

export const FormSearchPostcode = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;

  & > div {
    margin-top: 0 !important;
    width: 100%;
    padding-right: 10px;

    & > div {
      margin-top: 10px;
    }
  }
  & > .button-wrap {
    width: auto;
    padding: 0;
    & > div {
      margin-top: 0;
      font-weight: 600;
      font-size: 16px;
      height: 32px;
    }
    & > button {
      vertical-align: bottom;
    }
  }
`;
