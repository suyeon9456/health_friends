import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

import { Avatar, Button } from '../../atoms';
import { Sidebar } from './style';

const SearchSidebar = ({ foldedGym, setFoldedGym }) => {
  const { me } = useSelector((state) => state.user);
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

SearchSidebar.propTypes = {
  foldedGym: PropTypes.bool.isRequired,
  setFoldedGym: PropTypes.func.isRequired,
};

export default SearchSidebar;
