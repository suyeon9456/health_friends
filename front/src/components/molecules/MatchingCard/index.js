import React from 'react';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';

import { Card, CardBody, CardCover, CardMeta, MetaDescription, MetaDate, MetaTitle, CardActions, Action } from './style';

const MatchingCard = ({
  nickname,
  description,
  date,
  image,
  actions,
}) => (
  <Card>
    <CardCover>
      {image ? <img src={image} alt={image} /> : <UserOutlined />}
    </CardCover>
    <CardBody>
      <CardMeta>
        <MetaDate>{date}</MetaDate>
        <MetaTitle>{nickname}</MetaTitle>
        <MetaDescription>{description}</MetaDescription>
      </CardMeta>
    </CardBody>
    <CardActions>
      {actions?.map((action) => (
        <Action key={action.key}>
          {action.icon}
        </Action>
      ))}
    </CardActions>
  </Card>
);

MatchingCard.propTypes = {
  nickname: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string,
  actions: PropTypes.array,
};

export default MatchingCard;
