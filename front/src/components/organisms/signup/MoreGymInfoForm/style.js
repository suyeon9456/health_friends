import styled from 'styled-components';

export const FormWrapper = styled.div`
  width: 100%;
  padding: 20px 100px;
  & > div:not(.gym-modal) {
    margin: 0 auto;
    margin-top: 20px;
    max-width: 600px;
    & > input, & > div, & > span {
      margin-top: 10px;
    }
  }
`;

export const FormSearchGymWrap = styled.div`
  width: 100%;
  display: flex;
  margin: 0 auto;

  & > div {
    width: 100%;
    padding-right: 10px;

    & > input {
      margin-top: 10px;
    }
  }
  & > .button-wrap {
    width: auto;
    padding: 0;
    & > div {
      font-weight: 600;
      font-size: 16px;
      height: 34px;
    }
    & > button {
      vertical-align: bottom;
    }
  }
`;
