import React from 'react';

import Item from '../../atoms/Item';
import { ListCard } from './style';

const List = ({ list, ...props }: { list: Array<{ title: string, description: string }> }) => (
  <ListCard
    {...props}
  >
    {list.map((item) => (
      <Item title={item.title} description={item.description} />
    ))}
  </ListCard>
);

export default List;
