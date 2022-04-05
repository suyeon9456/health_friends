import React, { Dispatch, SetStateAction } from 'react';
import { BiCollapse, BiExpand } from 'react-icons/bi';

import { ButtonType, SizeType } from '@/../@types/utils';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Me } from '@/../@types/user';
import { Sidebar } from './style';
import { Avatar, Button, Icon } from '../../atoms';

const SearchSidebar = ({
  foldedGym,
  setFoldedGym,
}: {
  foldedGym: boolean;
  setFoldedGym: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: me } = useQuery<Me>('user', async () => {
    const { data } = await axios.get('/user');
    return data;
  });
  return (
    <Sidebar>
      <div>
        <Avatar size={SizeType.SMALL} src={me?.Image?.src} />
        {!foldedGym ? (
          <Button
            icon={<Icon icon={<BiCollapse />} />}
            type={ButtonType.TEXT}
            onClick={() => setFoldedGym(true)}
          />
        ) : (
          <Button
            icon={<Icon icon={<BiExpand />} />}
            type={ButtonType.TEXT}
            onClick={() => setFoldedGym(false)}
          />
        )}
      </div>
    </Sidebar>
  );
};

export default SearchSidebar;
