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

export const FriendsBody = styled.div`
  width: 100%;
  /* text-align: center; */
`;

export const FriendsCardList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  flex-wrap: wrap;
  align-content: flex-start;
`;

export const FriendsCard = styled.div`
  position: relative;
  width: 200px;
  height: 200px;
  background-color: #ffffff;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  box-shadow: rgb(0 0 0 / 3%) 0px 5px 16px 0px;
`;

export const CardAvatarWrap = styled.div`
  position: relative;
  width: 100%;
  height: 110px;
  padding: 10px;
  background-color: rgb(244, 245, 247);
  text-align: center;
  border-radius: 5px;
  /* background-image: url(); */
  /* ${({ src }) => src && css`
    background-image: url(src);
  `} */
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

`;
