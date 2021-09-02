import React from 'react';
import PropTypes from 'prop-types';

import { ItemWrapper, ItemCard, ItemContent, ItemDescription, ItemTitle } from './style';

const Item = ({ title, description }) => (
  <ItemCard>
    <ItemWrapper>
      <ItemContent>
        <ItemTitle>
          <a>{title}</a>
        </ItemTitle>
        <ItemDescription>{description}</ItemDescription>
      </ItemContent>
    </ItemWrapper>
  </ItemCard>
);

Item.propTypes = {
  title: PropTypes.string,
  description: PropTypes.node,
};

export default Item;
