import React from 'react';
import PropTypes from 'prop-types';
import { CloseOutlined, RightOutlined } from '@ant-design/icons';

import Avatar from '../../atoms/Avatar';
import { SimpleCard, SimpleCardMeta, MetaTitle, AvatarWrapper, MetaAddress, MatchingDateWrapper, MatchingDate, CardClose } from './style';
import { Button } from '../../atoms';

const SimpleMatchingCard = ({ nickname, address, date, avatarSize, onChangeShow }) => (
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

SimpleMatchingCard.propTypes = {
  nickname: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  avatarSize: PropTypes.string,
  onChangeShow: PropTypes.func,
};

export default SimpleMatchingCard;
