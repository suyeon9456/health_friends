import React from 'react';
import Link from 'next/link';
import { ImDrawer2 } from 'react-icons/im';

import { ButtonType } from '@/../@types/constant';
import { Button, Icon } from '../atoms';
import {
  FriendsErrorCard,
  ErrorIconWrap,
  FriendsErrorWrap,
  ErrorMessage,
} from './Main/RecommendFriends/style';

const EmptyFallback = ({
  buttonLabel,
  message,
}: {
  buttonLabel: string;
  message?: string;
}) => {
  return (
    <FriendsErrorWrap>
      <FriendsErrorCard>
        <ErrorIconWrap>
          <Icon icon={<ImDrawer2 />} />
        </ErrorIconWrap>
        <ErrorMessage>{message}</ErrorMessage>
        <Link href="/friends" passHref>
          <a>
            <Button type={ButtonType.PRIMARY}>{buttonLabel}</Button>
          </a>
        </Link>
      </FriendsErrorCard>
    </FriendsErrorWrap>
  );
};

export default EmptyFallback;
