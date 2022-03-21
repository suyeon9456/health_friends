import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { BiCollapse, BiExpand } from 'react-icons/bi';

import { userSelector } from '@/../reducers/user';
import { ButtonType, SizeType } from '@/../@types/utils';
import { Avatar, Button, Icon } from '../../atoms';
import { Sidebar } from './style';

const SearchSidebar = ({
  foldedGym,
  setFoldedGym,
}: {
  foldedGym: boolean;
  setFoldedGym: Dispatch<SetStateAction<boolean>>;
}) => {
  const { me } = useSelector(userSelector);
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
