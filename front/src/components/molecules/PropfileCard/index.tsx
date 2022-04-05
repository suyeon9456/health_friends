import React from 'react';
import { BiLike } from 'react-icons/bi';

import { ButtonType, SizeType } from '@/../@types/utils';
import {
  Card,
  CardActions,
  CardBody,
  CardCover,
  CardMeta,
  LoadingAction,
  LoadingAvatar,
  LoadingMetaPercent,
  LoadingMetaTitle,
  MetaPercent,
  MetaTitle,
} from './style';
import { Avatar, Button, Icon } from '../../atoms';

const ProfileCard = ({
  nickname,
  image,
  percent,
  isLoading,
  onClick,
  onLike,
}: {
  nickname: string;
  image: string;
  percent: number;
  isLoading?: boolean;
  onClick: () => void;
  onLike: () => void;
}) => (
  <Card>
    <CardCover>
      {isLoading ? (
        <LoadingAvatar />
      ) : (
        <Avatar size={SizeType.LARGE} src={image} />
      )}
    </CardCover>
    <CardBody>
      <CardMeta>
        {isLoading ? (
          <>
            <LoadingMetaTitle className="lazyData" />
            <LoadingMetaPercent className="lazyData" />
          </>
        ) : (
          <>
            <MetaTitle>
              {nickname} <Icon icon={<BiLike />} onClick={onLike} />
            </MetaTitle>
            <MetaPercent>재매칭률: {percent}%</MetaPercent>
          </>
        )}
      </CardMeta>
    </CardBody>
    <CardActions>
      {isLoading ? (
        <LoadingAction className="lazyData" />
      ) : (
        <Button
          size={SizeType.SMALL}
          type={ButtonType.PRIMARY}
          onClick={onClick}
        >
          매칭신청
        </Button>
      )}
    </CardActions>
  </Card>
);

export default ProfileCard;
