import styled from 'styled-components';

export const MoreInfoContent = styled.div`
  display: table-cell;
  width: 50%;
  padding: 0 24px;

  &:not(:last-child) {
    border-right: 1px solid #f0f0f0;
  }

  @media (max-width: 865px) {
    display: block;
    width: 100%;
    padding: 24px 24px 0 24px;
    &:not(:last-child) {
      border-right: none;
      border-bottom: 1px solid #f0f0f0;
      padding: 0 24px 24px 24px;
    }
    /* margin-left: 0;
    margin-bottom: 10px; */
  }
`;

export const ContentTitle = styled.div`
  display: table;
  & > h4 {
    display: table-cell;
    width: 100%;
    font-weight: 600;
  }
`;
