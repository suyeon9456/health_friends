import React from 'react';
import PropTypes from 'prop-types';

import { ItemWrap, ItemCard, ItemContent, ItemDescription, ItemTitle } from './style';

const Item = ({ title, description }) => (
  <ItemCard>
    <ItemWrap>
      <ItemContent>
        <ItemTitle>
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
};

export default Item;
