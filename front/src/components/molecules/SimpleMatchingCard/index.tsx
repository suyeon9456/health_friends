import React from 'react';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';

import Avatar from '../../atoms/Avatar';
import { SimpleCard, SimpleCardMeta, MetaTitle, AvatarWrapper, MetaAddress, MatchingDateWrapper, MatchingDate, CardClose } from './style';
import { Button } from '../../atoms';

const SimpleMatchingCard = ({ nickname, address, date, avatarSize, onChangeShow }: {
  nickname: string,
  address: string,
  date: string,
  avatarSize?: 'small' | 'large' | 'default' | number;
  actions?: Array<{ icon: React.ReactNode, key: string }>,
  onChangeShow?: () => void,
}) => (
  <SimpleCard>
    <CardClose>
      <CloseOutlined onClick={onChangeShow} />
    </CardClose>
    <AvatarWrapper>
      <Avatar size={avatarSize} />
    </AvatarWrapper>
    <SimpleCardMeta>
      <MetaTitle>{nickname}</MetaTitle>
      <MetaAddress>{address}</MetaAddress>
    </SimpleCardMeta>
    <MatchingDateWrapper>
      <MatchingDate>{date}</MatchingDate>
      <Button type="signature" size="small">상세확인 <RightOutlined /></Button>
    </MatchingDateWrapper>
  </SimpleCard>
);

export default SimpleMatchingCard;
