import styled from 'styled-components';

export const FormWrap = styled.div`
  width: 100%;
  padding: 16px;

  & > div {
    &:not(:first-child) {
      margin-top: 10px;
    }
    & > label {
      font-size: 14px;
      font-weight: 600;
    }

    & > select, & > div {
      margin-top: 5px;
    }
  }
`;
