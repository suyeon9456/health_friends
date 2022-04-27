import React from 'react';

import { Content, InfoWrapper, Title } from './style';

const InformationItem = React.memo(
  ({
    title,
    icon,
    content,
  }: {
    title: string;
    icon: React.ReactElement;
    content?: string;
  }) => (
    <InfoWrapper>
      {icon}
      <Title>{title}:</Title>
      <Content>{content}</Content>
    </InfoWrapper>
  )
);

export default InformationItem;
