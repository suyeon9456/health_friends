import React from 'react';
import PropTypes from 'prop-types';
import { FullscreenExitOutlined, FullscreenOutlined } from '@ant-design/icons';

import { Avatar, Button } from '../../atoms';
import { Sidebar } from './style';

const SearchSidebar = ({ foldedGym, setFoldedGym }) => (
  <Sidebar>
    <div>
      <Avatar size="small" />
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

SearchSidebar.propTypes = {
  foldedGym: PropTypes.bool.isRequired,
  setFoldedGym: PropTypes.func.isRequired,
};

export default SearchSidebar;
