import React from 'react';

import { BiError } from 'react-icons/bi';
import { ButtonType } from '@/../@types/constant';
import { HiOutlineRefresh } from 'react-icons/hi';
import {
  FriendsErrorCard,
  ErrorIconWrap,
  FriendsErrorWrap,
  ErrorMessage,
} from './Main/RecommendFriends/style';
import { Button, Icon } from '../atoms';

const ErrorFallback = ({
  isRefresh,
  onRefresh,
  onReset,
  message,
}: {
  onRefresh: () => void;
  onReset: () => void;
  isRefresh?: boolean;
  message?: string;
}) => {
  return (
    <FriendsErrorWrap>
      <FriendsErrorCard>
        <ErrorIconWrap>
          <Icon icon={<BiError />} />
        </ErrorIconWrap>
        <ErrorMessage>{message}</ErrorMessage>
        {!isRefresh ? (
          <Button type={ButtonType.ERROR} onClick={onReset}>
            <Icon icon={<HiOutlineRefresh />} /> 재시도
          </Button>
        ) : (
          <Button type={ButtonType.ERROR} onClick={onRefresh}>
            <Icon icon={<HiOutlineRefresh />} /> 재시도
          </Button>
        )}
      </FriendsErrorCard>
    </FriendsErrorWrap>
  );
};

export default ErrorFallback;
