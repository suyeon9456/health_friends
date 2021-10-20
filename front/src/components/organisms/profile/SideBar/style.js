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
  /* box-shadow: -60px 0px 100px -90px #000000, 60px 0px 100px -90px #000000; */
`;

export const AvatarWrapper = styled.div`
  position: relative;
  padding: 30px 0px;
  color: #000000d9;
  background: #fff;
  border-radius: 2px 2px 0 0;
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
    content: "";
  }
  &::after {
    display: table;
    clear: both;
    content: "";
  }
  & span {
    font-size: 14px;
    color: '#000000d9'
  }
  & > div {
    overflow: hidden;
    & > div {
      color: #00000073;
    }
  }
`;

export const InfoIconWrapper = styled.div`
  float: left;
  & .anticon {
    font-size: 18px;
    margin-right: 10px;
  }
`;

export const SideMenuWrapper = styled.div`
  width: 86%;
  position: relative;
  padding: 30px 0px;
  color: #000000d9;
  background: #fff;
  /* border-bottom: 1px solid #f0f0f0; */
  border-radius: 2px 2px 0 0;
`;

export const SideMenu = styled.div`
  margin: 15px 0;
  & a {
    text-decoration: none;
    color: #000000d9;
    touch-action: manipulation;
    font-weight: 600;
  }

  &:hover {
    & a {
      color: #9254de;
    }
  }
`;
