import React from 'react';

import { useShowState } from '../../../store/contextStore';

import { Menu, DrawerMenu } from '../molecules';
import Row from '../molecules/Row';
import Col from '../molecules/Col';

const AppLayout = ({
  childBlock,
  spanNumber,
  children,
}: {
  childBlock?: boolean;
  spanNumber?: number;
  children: React.ReactNode;
}) => {
  const { drawerShow } = useShowState();
  return (
    <div>
      <Menu />
      <Row justify="center">
        <Col span={spanNumber ?? 22} childBlock={childBlock}>
          {children}
        </Col>
      </Row>
      <DrawerMenu drawerShow={drawerShow} />
    </div>
  );
};

export default AppLayout;
