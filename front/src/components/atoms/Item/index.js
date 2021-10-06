import React from 'react';
import PropTypes from 'prop-types';

import { ItemWrap, ItemCard, ItemContent, ItemDescription, ItemTitle } from './style';

const Item = ({ title, description, onClick }) => (
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

Item.propTypes = {
  title: PropTypes.string,
  description: PropTypes.node,
  onClick: PropTypes.func,
};

export default Item;
