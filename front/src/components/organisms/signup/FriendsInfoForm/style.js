import styled from 'styled-components';

export const FormWrapper = styled.div`
  width: 100%;
  padding: 10px 100px;
  & > div {
    margin: 0 auto;
    max-width: 600px;
    &:not(:first-child) {
      margin-top: 24px;
    }
    & > select, & > span {
      margin-top: 10px;
    }
  }
`;

export const ButtonWrap = styled.div`
  margin-top: 10px;
  text-align: center;

  & > button {
    & + & {
      margin: 0 5px;
    }
  }
`;
