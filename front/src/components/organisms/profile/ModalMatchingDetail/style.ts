import styled from 'styled-components';

export const RequestFriendWrap = styled.div`
  width: 100%;
  min-height: 320px;
  padding: 10px 24px;
  font-variant: tabular-nums;
  font-feature-settings: 'tnum';
  text-align: left;
`;

export const MatchingInfoWrap = styled.div`
  width: 100%;
  margin-bottom: 20px;

  & > h4 {
    font-size: 14px;
    font-weight: 600;
  }

  & > div {
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    & > label {
      color: #00000073;
      font-weight: 500;
      font-size: 14px;
    }
    & > * {
      margin-top: 5px;
    }
  }
`;

export const UserInfoWrap = styled.div`
  width: 100%;
  display: flex;
  margin-bottom: 20px;

  & > div {
    flex-grow: 1;
  }
  
  & > div > .nickname {
    font-size: 16px;
    font-weight: 600;
    margin-top: 10px;
  }
`;
