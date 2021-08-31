import React from 'react';
import { FieldTimeOutlined, FileSearchOutlined, HeartOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

import { Content, ContentTitle, MoreInfoBody, MoreInfoContent, MoreInfoWrapper } from './style';
import InformationItem from '../../../atoms/InformationItem';
import Button from '../../../atoms/Button';

const MoreInfo = () => (
  <MoreInfoWrapper>
    <MoreInfoBody>
      <MoreInfoContent key="more-info">
        <ContentTitle>
          <h4>추가정보</h4>
          <Button type="primary" size="small">수정</Button>
        </ContentTitle>
        <Content>
          <InformationItem title="나이" icon={<UserOutlined />} content="20대 후반" />
          <InformationItem title="운동시간" icon={<FieldTimeOutlined />} content="12:00 PM ~ 02:00 PM" />
          <InformationItem title="운동경력" icon={<FileSearchOutlined />} content="5년 이상" />
          <InformationItem title="성별" icon={<HeartOutlined />} content="여성" />
          <InformationItem title="역할" icon={<TeamOutlined />} content="도움받고 싶어요!" />
        </Content>
      </MoreInfoContent>
      <MoreInfoContent key="more-info">
        <ContentTitle>
          <h4>매칭되고 싶은 친구정보</h4>
          <Button type="primary" size="small">수정</Button>
        </ContentTitle>
        <Content>
          <InformationItem title="나이" icon={<UserOutlined />} content="20대 후반" />
          <InformationItem title="운동경력" icon={<FileSearchOutlined />} content="5년 이상" />
          <InformationItem title="성별" icon={<HeartOutlined />} content="무관" />
          <InformationItem title="역할" icon={<TeamOutlined />} content="도움을 주고 싶어요!" />
        </Content>
      </MoreInfoContent>
    </MoreInfoBody>
  </MoreInfoWrapper>
);

export default MoreInfo;
