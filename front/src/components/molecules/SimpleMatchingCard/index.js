import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../../atoms/Avatar';
import { SimpleCard, SimpleCardMeta, MetaTitle, AvatarWrapper, MetaAddress, MatchingDateWrapper, MatchingDate } from './style';

const SimpleMatchingCard = ({ nickname, address, date, avatarSize }) => (
  <SimpleCard>
    <AvatarWrapper>
      <Avatar size={avatarSize} />
    </AvatarWrapper>
    <SimpleCardMeta>
      <MetaTitle>{nickname}</MetaTitle>
      <MetaAddress>{address}</MetaAddress>
    </SimpleCardMeta>
    <MatchingDateWrapper>
      <MatchingDate>{date}</MatchingDate>
    </MatchingDateWrapper>
  </SimpleCard>
);

SimpleMatchingCard.propTypes = {
  nickname: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  avatarSize: PropTypes.string,
};

export default SimpleMatchingCard;
