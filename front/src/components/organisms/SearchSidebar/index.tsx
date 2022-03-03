import React, { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

import { userSelector } from '@/../reducers/user';
import { Avatar, Button } from '../../atoms';
import { Sidebar } from './style';

const SearchSidebar = ({ foldedGym, setFoldedGym }: {
  foldedGym: boolean;
  setFoldedGym: Dispatch<SetStateAction<boolean>>;
}) => {
  const { me } = useSelector(userSelector);
  return (
    <Sidebar>
      <div>
        <Avatar size="small" src={me?.Image?.src} />
        {!foldedGym
          ? (
            <Button
              icon={<FullscreenExitOutlined />}
              type="text"
              onClick={() => setFoldedGym(true)}
            />
          )
          : (
            <Button
              icon={<FullscreenOutlined />}
              type="text"
              onClick={() => setFoldedGym(false)}
            />
          )}
      </div>
    </Sidebar>
  );
};

export default SearchSidebar;
