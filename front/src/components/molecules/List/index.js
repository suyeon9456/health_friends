import React from 'react';
import PropTypes from 'prop-types';

import Item from '../../atoms/Item';
import { ListCard } from './style';

const List = ({ list, ...props }) => (
  <ListCard
    {...props}
  >
    {list.map((item) => (
      <Item title={item.title} description={item.description} />
    ))}
  </ListCard>
);

List.propTypes = {
  list: PropTypes.array,
  props: PropTypes.any,
};

export default List;
