import React from 'react';

import {
  ItemWrap,
  ItemCard,
  ItemContent,
  ItemDescription,
  ItemTitle,
  LoadingItemTitle,
  LoadingItemDescription,
} from './style';

const Item = ({
  title,
  description,
  isLoading,
  onClick,
}: {
  title: string;
  description: React.ReactNode;
  isLoading?: boolean;
  onClick?: () => void;
}) => (
  <ItemCard>
    <ItemWrap>
      <ItemContent>
        {isLoading ? (
          <>
            <LoadingItemTitle />
            <LoadingItemDescription />
            <LoadingItemDescription />
          </>
        ) : (
          <>
            <ItemTitle onClick={onClick}>
              <a>{title}</a>
            </ItemTitle>
            <ItemDescription>{description}</ItemDescription>
          </>
        )}
      </ItemContent>
    </ItemWrap>
  </ItemCard>
);

export default Item;
