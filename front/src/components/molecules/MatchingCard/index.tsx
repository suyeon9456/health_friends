import React from 'react';
import { UserOutlined } from '@ant-design/icons';

import { Card, CardBody, CardCover, CardMeta, MetaDescription, MetaDate, MetaTitle, CardActions, Action } from './style';

const MatchingCard = ({ id,
  nickname,
  description,
  date,
  image,
  onClickView,
  actions }: {
    id: string,
    nickname: string,
    description: string,
    date: string,
    image?: string,
    onClickView: ({ key, id }: { key: string, id: string }) => void,
    actions?: Array<{
      key: string,
      icon: React.ReactNode,
      disabled: boolean,
      onClick: ({ key, id }: { key: string, id: string }) => void }>
  }) => (
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

export default MatchingCard;
