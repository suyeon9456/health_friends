import styled, { css } from 'styled-components';

export const FriendsWrap = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 40px;
`;

export const FriendsTitle = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #fafafa;
`;

export const FriendsSubTitle = styled.div`
  padding-left: 24px;
  font-size: 14px;
  font-weight: 600;
  color: #fafafa;
  cursor: pointer;
`;

export const FriendsBody = styled.div`
  width: 100%;
`;

export const FriendsCardList = styled.div`
  width: 100%;
  margin-top: 20px;
  & .slick-slide {
    margin-bottom: 20px;
  }

  ${({ friendsLength }) => {
    if (friendsLength <= 2) {
      return css`
        display: flex;
        justify-content: space-evenly;
        flex-wrap: wrap;
        align-content: flex-start;
      `;
    }
    if (friendsLength === 4) {
      return css`
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        align-content: flex-start;
      `;
    }
    if (friendsLength > 4) {
      return false;
    }
    return css`
      display: flex;
      flex-wrap: wrap;
      align-content: flex-start;
    `;
  }}
`;

// export const FriendsCardsWrap = styled.div`
//   width: 100%;
//   display: flex;
//   margin-top: 20px;
//   ${({ friendsLength }) => {
//     if (friendsLength <= 2) {
//       return css`
//         justify-content: space-evenly;
//         flex-wrap: wrap;
//         align-content: flex-start;
//       `;
//     }
//     if (friendsLength === 4) {
//       return css`
//         justify-content: space-between;
//         /* flex-wrap: wrap; */
//         /* align-content: flex-start; */
//       `;
//     }
//     return css`
//       flex-wrap: wrap;
//       align-content: flex-start;
//     `;
//   }}
// `;

export const FriendsCard = styled.div`
  margin: 10px 0 !important;
  width: 200px !important;
  height: 200px;
  background-color: #ffffff;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 3%) 0px 5px 16px 0px;

  &:hover {
    box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px #00000014, 0 9px 28px 8px #0000000d;
    border-color: transparent;
  }
`;

export const CardAvatarWrap = styled.div`
  position: relative;
  width: 100%;
  height: 110px;
  padding: 10px;
  background-color: rgb(244, 245, 247);
  text-align: center;
  border-radius: 5px;
`;

export const CardContentWrap = styled.div`
  padding: 10px;
  text-align: center;
`;

export const ContentTitile = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export const ContentDescription = styled.div`
  text-align: left;
`;
