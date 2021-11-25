import styled from 'styled-components';

export const RankedFriendsWrap = styled.section`
  width: 100%;
  text-align: left;
  padding: 20px 128px;
`;

export const RankedFriendsHeader = styled.div`
  font-size: 32px;
  font-weight: 800;
  color: rgb(89,89,89);
`;

export const RankedFriendsBody = styled.div`
  padding: 20px 0;
`;

export const RankCardList = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-content: flex-start;
`;

export const RankCardWrap = styled.div`
  /* font-size: 20px;
  font-weight: 600;
  color: rgb(89,89,89); */
`;

export const RankTitle = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: rgb(89,89,89);
`;

export const RankCard = styled.div`
  width: 500px;
  height: 300px;
  background-color: #ffffff;
  border: 1px solid rgb(230, 230, 230);
  box-shadow: rgb(0 0 0 / 3%) 0px 5px 16px 0px;
  border-radius: 5px;
`;
