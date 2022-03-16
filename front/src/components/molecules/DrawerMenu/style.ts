import styled, { css } from 'styled-components';

export const Drawer = styled.div<{ drawerShow: boolean }>`
  position: fixed;
  width: 0;
  height: 0;
  right: 0;
  top: 0;
  z-index: 1000;
  transition: width 0s ease 0.3s, height 0s ease 0.3s;

  ${({ drawerShow }) =>
    drawerShow &&
    css`
      width: 100%;
      height: 100%;
      transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1);

      & > .mask {
        pointer-events: auto;
        transition: none;
        opacity: 1;
        height: 100%;
      }
    `}
`;

export const DrawerMask = styled.div`
  position: absolute;
  width: 100%;
  height: 0;
  top: 0;
  left: 0;
  opacity: 0;
  transition: opacity 0.3s linear, height 0s ease 0.3s;
  pointer-events: none;
  background-color: #00000073;
`;

export const DrawerContentWrap = styled.div<{ drawerShow: boolean }>`
  position: absolute;
  height: 100%;
  width: 300px;
  right: 0;
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
    box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
  ${({ drawerShow }) => {
    if (drawerShow) {
      return css`
        transform: none;
        box-shadow: -6px 0 16px -8px #00000014, -9px 0 28px #0000000d,
          -12px 0 48px 16px #00000008;
        transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1),
          box-shadow 0.3s cubic-bezier(0.23, 1, 0.32, 1);
      `;
    }
    return css`
      transform: translateX(100%);
    `;
  }}
`;

export const DrawerContent = styled.div`
  position: relative;
  z-index: 1;
  overflow: auto;
  background-color: #fff;
  background-clip: padding-box;
  border: 0;
  width: 100%;
  height: 100%;
`;

export const DrawerWrapBody = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
`;

export const DrawerHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 24px;
  color: #000000d9;
  background: #fff;
  border-bottom: 1px solid #f0f0f0;
  border-radius: 2px 2px 0 0;
`;

export const DrawerHeaderTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  & > button {
    color: #00000073;
    font-weight: 700;
    font-size: 16px;
    text-align: right;
    padding-right: 0;
    line-height: 1;
  }
`;

export const DrawerTitle = styled.div`
  width: 220px;
  margin: 0;
  color: #000000d9;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;

  & span {
    margin-right: 10px;
  }
`;

export const DrawerBody = styled.div`
  flex-grow: 1;
  padding: 0 24px 24px 24px;
  overflow: auto;
  font-size: 14px;
  line-height: 1.5715;
  word-wrap: break-word;
`;

export const Menu = styled.ul`
  width: 100%;
  list-style: none;
  padding-left: 0;
  margin-top: 20px;
`;

export const MenuItem = styled.li`
  position: relative;
  width: 100%;
  height: 35px;
  text-align: left;

  &:hover {
    & > span > a {
      color: #9254de;
    }
    &::after {
      border-bottom: 2px solid #9254de;
    }
  }
`;

export const MenuTitle = styled.span`
  position: relative;
  display: block;
  margin: 0;
  cursor: pointer;
  touch-action: manipulation;
`;

export const MenuText = styled.a`
  cursor: pointer;
  text-decoration: none;
  background-color: transparent;
  outline: none;
  vertical-align: middle;
  color: #595959;
  font-weight: 500;
  font-size: 14px;

  & > span {
    margin-right: 10px;
    font-size: 16px;
  }
`;

export const MemberMenu = styled.div`
  text-align: center;
  /* border-radius: 2px; */
  /* border: 1px solid #d9d9d9; */
  vertical-align: middle;
  height: 45px;
  width: 100%;
  padding-top: 7px;
  background-image: linear-gradient(
    to right,
    rgb(146, 84, 222) 0%,
    rgb(196, 29, 127) 100%
  );
`;

export const MemberMenuItem = styled.div`
  text-align: center;
  display: inline-block;
  width: 110px;
  vertical-align: middle;
  color: #ffffff;

  & + & {
    position: relative;
    &::before {
      position: absolute;
      left: 0;
      top: 6px;
      content: ' ';
      width: 1px;
      height: 15px;
      background-color: #d9d9d9;
      border-radius: 50px;
    }
  }

  & > a {
    color: #ffffff;
  }

  &:hover {
    & > a {
      color: #ffffff;
    }
  }
`;
