import React from 'react';
import { LikeOutlined } from '@ant-design/icons';

import { Card, CardActions, CardBody, CardCover, CardMeta, MetaPercent, MetaTitle } from './style';
import { Avatar, Button } from '../../atoms';

const ProfileCard = ({
  nickname,
  image,
  percent,
  onClick,
  onLike,
}: {
  nickname: string,
  image: string,
  percent: number,
  onClick: () => void,
  onLike: () => void
}) => (
  <Card>
    <CardCover>
      <Avatar size="large" src={image} />
    </CardCover>
    <CardBody>
      <CardMeta>
        <MetaTitle>
          {nickname} <LikeOutlined onClick={onLike} />
        </MetaTitle>
        <MetaPercent>재매칭률: {percent}%</MetaPercent>
      </CardMeta>
    </CardBody>
    <CardActions>
      <Button
        size="small"
        type="primary"
        onClick={onClick}
      >
        매칭신청
      </Button>
    </CardActions>
  </Card>
);

export default ProfileCard;
