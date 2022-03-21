import React from 'react';
import { BiChevronRight, BiX } from 'react-icons/bi';

import { ButtonType, SizeType, SizeTypeT } from '@/../@types/utils';
import Avatar from '../../atoms/Avatar';
import {
  SimpleCard,
  SimpleCardMeta,
  MetaTitle,
  AvatarWrapper,
  MetaAddress,
  MatchingDateWrapper,
  MatchingDate,
  CardClose,
} from './style';
import { Button, Icon } from '../../atoms';

const SimpleMatchingCard = ({
  nickname,
  address,
  date,
  avatarSize,
  onChangeShow,
}: {
  nickname: string;
  address: string;
  date: string;
  avatarSize?: SizeTypeT | number;
  onChangeShow?: () => void;
}) => (
  <SimpleCard>
    <CardClose>
      <Icon icon={<BiX />} onClick={onChangeShow} />
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
      <Button type={ButtonType.SIGNATURE} size={SizeType.SMALL}>
        상세확인 <Icon icon={<BiChevronRight />} />
      </Button>
    </MatchingDateWrapper>
  </SimpleCard>
);

export default SimpleMatchingCard;
