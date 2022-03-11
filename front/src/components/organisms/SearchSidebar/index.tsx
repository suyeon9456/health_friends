import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

import { userSelector } from '@/../reducers/user';
import { Avatar, Button } from '../../atoms';
import { Sidebar } from './style';
import { ButtonType, SizeType } from '@/../@types/utils';

const SearchSidebar = ({ foldedGym, setFoldedGym }: {
  foldedGym: boolean;
  setFoldedGym: Dispatch<SetStateAction<boolean>>;
}) => {
  const { me } = useSelector(userSelector);
  return (
    <Sidebar>
      <div>
        <Avatar size={SizeType.SMALL} src={me?.Image?.src} />
        {!foldedGym
          ? (
            <Button
              icon={<FullscreenExitOutlined />}
              type={ButtonType.TEXT}
              onClick={() => setFoldedGym(true)}
            />
          )
          : (
            <Button
              icon={<FullscreenOutlined />}
              type={ButtonType.TEXT}
              onClick={() => setFoldedGym(false)}
            />
          )}
      </div>
    </Sidebar>
  );
};

export default SearchSidebar;
