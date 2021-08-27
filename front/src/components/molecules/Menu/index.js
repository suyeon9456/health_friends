import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { MenuItem, MenuList, MenuText, MenuTitle } from './style';
import Input from '../../atoms/Input';
import { Col, Row } from 'antd';

const Search = styled(Input)`
  vertical-align: middle;
  width: 300px;
`;

const Menu = ({ type, children, ...props }) => (
  <div>
    <MenuList>
      <MenuItem
        type={type}
      >
        <MenuTitle>
          <MenuText>
            HOME
          </MenuText>
        </MenuTitle>
      </MenuItem>
      <MenuItem
        type={type}
      >
        <MenuTitle>
          <MenuText>
            친구찾기
          </MenuText>
        </MenuTitle>
      </MenuItem>
      <MenuItem
        type="search"
      >
        <MenuTitle>
          <Search type="search" enterButton />
        </MenuTitle>
      </MenuItem>
      <MenuItem
        type={type}
        style={{ order: '3' }}
      >
        <MenuTitle>
          <MenuText>
            로그인
          </MenuText>
        </MenuTitle>
      </MenuItem>
      <MenuItem
        type={type}
        style={{ order: '4' }}
      >
        <MenuTitle>
          <MenuText>
            회원가입
          </MenuText>
        </MenuTitle>
      </MenuItem>
    </MenuList>
    <Row justify="center">
      {/* <Col xs={24} md={20} offset={2}> */}
      <Col span={20}>
        {children}
      </Col>
    </Row>
  </div>
);

Menu.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  props: PropTypes.any,
};

export default Menu;
