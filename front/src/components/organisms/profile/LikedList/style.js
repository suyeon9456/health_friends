import styled from 'styled-components';

export const LikedListWrap = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  flex-wrap: nowrap;
  width: 100% - 10px;
  background-color: #ffffff;
  border-radius: 5px;
  border: 1px solid #f0f0f0;
  @media (max-width: 767px) {
    margin-left: 0;
  }
  margin-left: 10px;
  margin-top: 10px;
  padding: 10px 0px;
  box-sizing: border-box;
  color: #000000d9;
  overflow: hidden;
`;

export const LikedListBody = styled.div`
  text-align: center;
  padding: 0 10px;

  width: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    /* width: 30%; */
    margin: 10px 0;
    /* margin: 10px; */

    @media (max-width: 1129px) {
      /* width: 45%; */
    }

    @media (max-width: 767px) {
      /* flex: 1 1 30%; */
      /* width: 100%; */
    }
  }
`;

export const Card = styled.div`
  display: inline-block;
  width: 200px;
  height: 190px;
  border: 1px solid #f0f0f0;
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: #000000d9;
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5715;
  list-style: none;
  font-feature-settings: "tnum";
  position: relative;
  background: #fff;
  border-radius: 20px;
`;

export const CardCover = styled.div`
  margin-top: -1px;
  margin-right: -1px;
  margin-left: -1px;
  height: 110px;
  padding: 10px 0;

  & > * {
    margin: 0 auto;
    height: 90px;
    width: 90px;
    border-radius: 50%;
    vertical-align: middle;
    cursor: pointer;
  }

  & > img {
    border-style: none;
    object-fit: cover;
  }

  & > div {
    background-color: #cccccc;
    color: #ffffff;
    text-align: center;
    font-size: 50px;
  }
`;

export const CardBody = styled.div`
  cursor: pointer;
  &::before {
    display: table;
    content: "";
  }
  &::after {
    display: table;
    clear: both;
    content: "";
  }
`;

export const CardMeta = styled.div`
  margin: -4px 0;
  &::before {
    display: table;
    content: "";
  }
  &::after {
    display: table;
    clear: both;
    content: "";
  }
`;

export const MetaTitle = styled.div`
  overflow: hidden;
  color: #000000d9;
  font-weight: 500;
  font-size: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 8px;
`;

export const MetaActions = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 0;
  padding: 0 10px;
`;

export const Action = styled.div`
  width: 50px;
  height: 40px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  font-size: 14px;
  color: #555555;
  padding: 6px 0;
`;
