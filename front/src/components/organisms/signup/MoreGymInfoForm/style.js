import styled from 'styled-components';

export const FormWrapper = styled.div`
  width: 100%;
  padding: 10px 100px;
  & > form > div:not(.gym-modal) {
    margin: 0 auto;
    max-width: 600px;
    &:not(:first-child) {
      margin-top: 24px;
    }
    & > div {
      margin-top: 10px;
    }
  }
`;

export const FormSearchGymWrap = styled.div`
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
      height: 34px;
    }
    & > button {
      vertical-align: bottom;
    }
  }
`;

export const ModalBodyBox = styled.div`
  width: 100%;
  height: 364px;
  & > .tabs {
    margin-top: -1px;
  }
`;

export const ButtonWrap = styled.div`
  margin-top: 10px;
  text-align: center;
`;
