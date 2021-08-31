import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import Menu from '../molecules/Menu';

const AppLayout = ({ children }) => (
  <div style={{ backgroundColor: 'rgb(248, 249, 251)' }}>
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
