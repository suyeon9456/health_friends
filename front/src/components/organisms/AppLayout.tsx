import React from 'react';

import { useModalState } from '@/../store/modalStore';

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
  const { isDrawer } = useModalState();
  return (
    <div>
      <Menu />
      <Row justify="center">
        <Col span={spanNumber ?? 22} childBlock={childBlock}>
          {children}
        </Col>
      </Row>
      <DrawerMenu drawerShow={isDrawer} />
    </div>
  );
};

export default React.memo(AppLayout);
