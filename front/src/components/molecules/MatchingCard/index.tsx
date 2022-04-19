import React from 'react';

import { Icon } from '@/components/atoms';
import { BiUser } from 'react-icons/bi';
import {
  Card,
  CardBody,
  CardCover,
  CardMeta,
  MetaDescription,
  MetaDate,
  MetaTitle,
  CardActions,
  Action,
} from './style';

const MatchingCard = ({
  matchingId,
  nickname,
  description,
  date,
  image,
  onClickView,
  actions,
}: {
  matchingId: number;
  nickname: string;
  description: string;
  date: string;
  image?: string;
  onClickView: ({ key, id }: { key: string; id: number }) => void;
  actions?: ReadonlyArray<{
    key: string;
    icon: React.ReactNode;
    disabled?: boolean;
    onClick: ({ key, id }: { key: string; id: number }) => void;
  }>;
}) => (
  <Card>
    <CardCover>
      {image ? (
        <img src={image} alt={image} />
      ) : (
        <div>
          <Icon icon={<BiUser />} />
        </div>
      )}
    </CardCover>
    <CardBody
      matchingId={matchingId}
      onClick={() => onClickView({ key: 'VIEW', id: matchingId })}
    >
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
          onClick={() => onClick({ key, id: matchingId })}
          disabled={disabled ?? false}
        >
          {icon}
        </Action>
      ))}
    </CardActions>
  </Card>
);

export default MatchingCard;
