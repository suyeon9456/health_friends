import React from 'react';

import { useShowState } from '../../../store/contextStore';

import { Menu, DrawerMenu } from '../molecules';
import Row from './Row';
import Col from './Col';

const AppLayout = ({ children, spanNumber }:
  { children: React.ReactNode, spanNumber: number  }) => {
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

export default AppLayout;
