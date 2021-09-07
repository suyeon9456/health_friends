import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

import Menu from '../molecules/Menu';
// import Row from './Row';
// import Col from './Col';

const AppLayout = ({ children }) => (
  <div>
    <Menu />
    <Row justify="center">
      {/* <Col xs={24} md={20} offset={2}> */}
      <Col span={22}>
        {children}
      </Col>
    </Row>
  </div>
);

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
