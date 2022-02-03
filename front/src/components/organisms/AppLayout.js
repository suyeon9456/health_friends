import React from 'react';
import PropTypes from 'prop-types';

import { useShowState } from '../../../store/contextStore';

import { Menu, DrawerMenu } from '../molecules';
import { Row, Col } from './index';

const AppLayout = ({ children, spanNumber }) => {
  const { drawerShow } = useShowState();
  return (
    <div>
      <Menu />
      <Row justify="center">
        <Col span={spanNumber || 22}>
          {children}
        </Col>
      </Row>
      <DrawerMenu drawerShow={drawerShow} />
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
  spanNumber: PropTypes.number,
};

export default AppLayout;
