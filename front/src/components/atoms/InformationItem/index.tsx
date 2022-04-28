import React, { ReactNode } from 'react';

import { Content, InfoWrapper, Title } from './style';

const InformationItem = React.memo(
  <ContentType extends ReactNode>({
    title,
    icon,
    content,
  }: {
    title: string;
    icon: React.ReactElement;
    content: ContentType;
  }) => (
    <InfoWrapper>
      {icon}
      <Title>{title}</Title>
      <Content>{content}</Content>
    </InfoWrapper>
  )
);

export default InformationItem;
