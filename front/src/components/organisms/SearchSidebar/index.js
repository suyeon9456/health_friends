import React from 'react';
import PropTypes from 'prop-types';
import { ZoomInOutlined } from '@ant-design/icons';

import { Avatar, Button } from '../../atoms';
import { Sidebar } from './style';

const SearchSidebar = ({ foldedGym }) => (
  <Sidebar foldedGym={foldedGym}>
    <div>
      <Avatar size="small" />
      <Button
        icon={<ZoomInOutlined />}
        type="text"
      />
    </div>
  </Sidebar>
);

SearchSidebar.propTypes = {
  foldedGym: PropTypes.bool.isRequired,
};

export default SearchSidebar;
