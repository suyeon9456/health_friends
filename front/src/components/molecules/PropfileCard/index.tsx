import React from 'react';
import { BiLike } from 'react-icons/bi';

import { ButtonType, SizeType } from '@/../@types/utils';
import {
  Card,
  CardActions,
  CardBody,
  CardCover,
  CardMeta,
  MetaPercent,
  MetaTitle,
} from './style';
import { Avatar, Button, Icon } from '../../atoms';

const ProfileCard = ({
  nickname,
  image,
  percent,
  onClick,
  onLike,
}: {
  nickname: string;
  image: string;
  percent: number;
  onClick: () => void;
  onLike: () => void;
}) => (
  <Card>
    <CardCover>
      <Avatar size={SizeType.LARGE} src={image} />
    </CardCover>
    <CardBody>
      <CardMeta>
        <MetaTitle>
          {nickname} <Icon icon={<BiLike />} onClick={onLike} />
        </MetaTitle>
        <MetaPercent>재매칭률: {percent}%</MetaPercent>
      </CardMeta>
    </CardBody>
    <CardActions>
      <Button size={SizeType.SMALL} type={ButtonType.PRIMARY} onClick={onClick}>
        매칭신청
      </Button>
    </CardActions>
  </Card>
);

export default ProfileCard;
