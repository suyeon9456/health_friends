import styled from 'styled-components';

export const SideMenuWrap = styled.div<{ active: string }>`
  width: 86%;
  position: relative;
  padding: 0 0 30px 0;
  color: #000000d9;
  background: #fff;
  border-radius: 2px 2px 0 0;

  @media (max-width: 767px) {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
  }

  color: #000000d9;

  & > .active {
    & > span {
      color: #9254de;
    }
  }
`;

export const SideMenu = styled.div<{
  key: string;
  id: string;
  onClick: () => void;
  className: string;
}>`
  margin: 15px 0;
  color: #000000d9;
  touch-action: manipulation;
  font-weight: 600;
  cursor: pointer;

  & > .icon {
    display: none;
    color: #00000073;
    font-size: 22px;

    @media (max-width: 767px) {
      display: inline-block;
    }
    &:hover {
      color: #9254de;
    }
  }

  @media (max-width: 767px) {
    min-width: 80px;
    text-align: center;
    margin: 5px 0;
  }
`;

export const MenuText = styled.span`
  display: inline-block;
  margin-left: 2px;
  font-size: 14px;

  @media (max-width: 767px) {
    display: none;
  }
`;
