import React from 'react';

import Item from '../../atoms/Item';
import { ListCard } from './style';

const List = ({
  list,
  children,
  ...props
}: {
  list: Array<{ title: string; description: string }>;
  children: React.ReactNode;
}) => (
  <ListCard {...props}>
    {list.map((item) => (
      <Item title={item.title} description={item.description} />
    ))}
  </ListCard>
);

export default List;
