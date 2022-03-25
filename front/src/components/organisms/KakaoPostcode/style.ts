import styled from 'styled-components';

export const ModalBodyBox = styled.div`
  width: 900px;
  height: 500px;
  /* overflow-y: hidden; */
`;

export const SearchResultWrap = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
`;

export const SearchList = styled.div`
  width: 100%;
  height: calc(500px - 32px);
  overflow-y: auto;
  & > ul {
    margin: 0;
    padding: 0;
    list-style: none;

    & > li {
      padding: 10px 0;
      padding-left: 10px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
      font-size: 12px;

      & .place-name {
        text-overflow: ellipsis;
        font-size: 12px;
        font-weight: bold;
      }
      & .jibun {
        padding-left: 26px;
        background: url(https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_jibun.png)
          no-repeat;
        color: #8a8a8a;
      }
    }
  }
`;

export const SearchMap = styled.div`
  width: 100%;
  height: calc(500px - 32px);
`;
