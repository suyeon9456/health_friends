import styled from 'styled-components';

export const InfoContent = styled.div`
  display: table-cell;
  vertical-align: top !important;
  width: 100%;
`;

export const InfoButton = styled.div`
  display: table-cell;
  table-layout: fixed;
  vertical-align: top !important;
  & > div {
    width: 80px;
  }
  & > button {
    padding: 0;

    & > .icon {
      font-size: 18px;
    }
  }
`;

export const ContentTitle = styled.div`
  width: 100%;
  & > h4 {
    font-weight: 600;
    margin: 10px 0;
  }
`;

export const ContentText = styled.div`
  color: #00000073;
  font-size: 14px;
`;
