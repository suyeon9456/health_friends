import React, { Dispatch, SetStateAction } from 'react';
import { useQuery } from 'react-query';
import { BiCollapse, BiExpand } from 'react-icons/bi';

import { loadLoginedUserAPI } from '@/api/user';
import { ButtonType, SizeType } from '@/../@types/utils';
import { Me } from '@/../@types/user';
import { Avatar, Button, Icon } from '../../atoms';
import { Sidebar } from './style';

const SearchSidebar = ({
  foldedGym,
  setFoldedGym,
}: {
  foldedGym: boolean;
  setFoldedGym: Dispatch<SetStateAction<boolean>>;
}) => {
  const { data: me } = useQuery<Me>('user', () => loadLoginedUserAPI(), {
    refetchOnWindowFocus: false,
    retry: false,
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
