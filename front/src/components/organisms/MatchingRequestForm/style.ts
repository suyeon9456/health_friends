import styled from 'styled-components';

export const RequestFriendWrap = styled.div`
  width: 100%;
  min-height: 450px;
  padding: 10px 24px;
  font-variant: tabular-nums;
  font-feature-settings: 'tnum';
`;

export const MatchingInfoWrap = styled.div`
  width: 100%;
  margin-bottom: 10px;

  & > h4 {
    font-size: 14px;
    font-weight: 600;
  }

  & > div {
    min-height: 70px;
    &:not(:last-child) {
      margin-bottom: 5px;
    }
    & > label {
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
  margin-bottom: 10px;

  & > div {
    flex-grow: 1;
  }
`;

export const InfoContent = styled.div`
  & > h4 {
    font-size: 14px;
    font-weight: 600;
  }
`;

export const Content = styled.div`
  display: inline-flex;
  width: 100%;

  & div {
    color: #00000073;
    font-weight: 500;
    font-size: 14px;
  }
  & .nickname {
    color: #000000d9;
    font-weight: 700;
  }
  & > div {
    padding: 5px;
  }
`;

export const DescriptionWrap = styled.div`
  width: 100%;

  & > h4 {
    font-size: 14px;
    font-weight: 600;
  }
`;
