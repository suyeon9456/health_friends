import React from 'react';
import { RiHeart3Line, RiHeart3Fill } from 'react-icons/ri';

import { ButtonType, SizeType } from '@/../@types/constant';
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
  userId,
  nickname,
  image,
  percent,
  isLoading,
  isCheckedLike,
  onClick,
  onLike,
}: {
  userId: number;
  nickname: string;
  image: string;
  percent: number;
  isLoading?: boolean;
  isCheckedLike?: boolean;
  onClick: () => void;
  onLike: (id: number) => void;
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
            <MetaTitle isCheckedLike={isCheckedLike}>
              {nickname}
              {!isCheckedLike ? (
                <Icon icon={<RiHeart3Line />} onClick={() => onLike(userId)} />
              ) : (
                <Icon icon={<RiHeart3Fill />} />
              )}
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
