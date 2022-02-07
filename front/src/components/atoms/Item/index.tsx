import React from 'react';

import { ItemWrap, ItemCard, ItemContent, ItemDescription, ItemTitle } from './style';

const Item = ({ title, description, onClick }: {
  title: string,
  description: string,
  onClick?: () => void,
}) => (
  <ItemCard>
    <ItemWrap>
      <ItemContent>
        <ItemTitle onClick={onClick}>
          <a>{title}</a>
        </ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
    </ItemWrap>
  </ItemCard>
);

export default Item;
