import styled from 'styled-components';

export const SideBarWrapper = styled.section`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100%;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  margin-top: 10px;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  padding: 30px 0px;
  color: #000000d9;
  background: #fff;
  border-radius: 2px 2px 0 0;

  & > div {
    text-align: center;
    & > button {
      padding: 0;
    }
    & > a {
      color: #9254de;
    }
  }
`;

export const InfoWrapper = styled.div`
  width: 86%;
  position: relative;
  padding: 20px 0px;
  color: #000000d9;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 2px 2px 0 0;
`;

export const InfoContent = styled.div`
  &::before {
    display: table;
    content: '';
  }
  &::after {
    display: table;
    clear: both;
    content: '';
  }
  & span {
    font-size: 14px;
    color: '#000000d9';
  }
  & > div {
    overflow: hidden;
    & > .user-gym {
      color: #00000073;
      font-size: 14px;
    }
  }
  & button {
    padding-left: 10px;
  }
`;

export const InfoIconWrapper = styled.div`
  float: left;
  & > .icon {
    font-size: 18px;
    line-height: 1.7;
    margin-right: 10px;
  }
`;

export const ModalBodyBox = styled.div`
  width: 100%;
  height: 364px;
  & > .tabs {
    margin-top: -1px;
  }
`;
