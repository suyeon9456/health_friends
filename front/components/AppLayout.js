import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { Menu, Input, Row, Col } from 'antd';
import styled from 'styled-components';

const SearchInput = styled(Input.Search)`
  vertical-align: 'middle';
  width: 300px;
`;

const MenuText = styled.a`
  vertical-align: 'middle';
`;

const AppLayout = ({ children }) => {
  console.log('children', children);
  return (
    <div>
      <Menu mode="horizontal" style={{ height: '60px' }}>
        <Menu.Item key="home">
          <Link href="/">
            <a style={{ verticalAlign: 'middle' }}>HOME</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="friends">
          <Link href="/friends">
            <MenuText>친구 찾기</MenuText>
          </Link>
        </Menu.Item>
        <Menu.Item key="search" style={{ float: 'right', marginLeft: 'auto' }}>
          <SearchInput
            enterButton
          />
        </Menu.Item>
        <Menu.Item key="login">
          <Link href="/login">
            <MenuText>로그인</MenuText>
          </Link>
        </Menu.Item>
        <Menu.Item key="signup">
          <Link href="/signup">
            <MenuText>회원가입</MenuText>
          </Link>
        </Menu.Item>
      </Menu>
      <Row>
        {/* <Col xs={24} md={3} /> */}
        <Col xs={24} md={20} offset={2}>
          {children}
        </Col>
      </Row>
    </div>
  );
};

AppLayout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppLayout;
