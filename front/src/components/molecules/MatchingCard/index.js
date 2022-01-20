import React from 'react';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';

import { Card, CardBody, CardCover, CardMeta, MetaDescription, MetaDate, MetaTitle, CardActions, Action } from './style';

const MatchingCard = ({ id,
  nickname,
  description,
  date,
  image,
  onClickView,
  actions }) => (
    <Card>
      <CardCover>
        {image ? <img src={image} alt={image} /> : <div><UserOutlined /></div>}
      </CardCover>
      <CardBody id={id} onClick={() => onClickView({ key: 'view', id })}>
        <CardMeta>
          <MetaDate>{date}</MetaDate>
          <MetaTitle>{nickname}</MetaTitle>
          <MetaDescription>{description}</MetaDescription>
        </CardMeta>
      </CardBody>
      <CardActions>
        {actions?.map(({ key, icon, disabled, onClick }) => (
          <Action
            key={key}
            onClick={() => onClick({ key, id })}
            disabled={disabled}
          >
            {icon}
          </Action>
        ))}
      </CardActions>
    </Card>
);

MatchingCard.propTypes = {
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string,
  actions: PropTypes.array,
  onClickView: PropTypes.func,
};

export default MatchingCard;
