import React from 'react';
import { EditOutlined } from '@ant-design/icons';

import Button from '../../../atoms/Button';
import { ContentText, ContentTitle, InfoBody, InfoButtonWrapper, InfoContent, InfoContentWrapper, InfoHeader, InfoWrapper } from './style';

const Info = () => (
  <InfoWrapper>
    <InfoHeader>
      <h2>suyeon9456님의 프로필</h2>
    </InfoHeader>
    <InfoBody>
      <InfoContentWrapper key="nickname">
        <InfoContent>
          <ContentTitle>
            <h4>닉네임</h4>
          </ContentTitle>
          <ContentText>
            뚜오니
          </ContentText>
        </InfoContent>
        <InfoButtonWrapper>
          <Button icon={<EditOutlined />} type="text" />
        </InfoButtonWrapper>
      </InfoContentWrapper>
      <InfoContentWrapper key="description">
        <InfoContent>
          <ContentTitle>
            <h4>간단소개</h4>
          </ContentTitle>
          <ContentText>
            속에서 불러 내는 것이 따뜻한 봄바람이다 인생에 따뜻한 봄바람을 불어 보내는 것은 청춘의 끓는 피다 청춘의 피가 뜨거운지라 
            인간의 동산에는 사랑의 풀이 돋고 이상의 꽃이 피고 희망의 놀이 뜨고 열락의 새가 운다사랑의
          </ContentText>
        </InfoContent>
        <InfoButtonWrapper>
          <Button icon={<EditOutlined />} type="text" />
        </InfoButtonWrapper>
      </InfoContentWrapper>
    </InfoBody>
  </InfoWrapper>
);

export default Info;
