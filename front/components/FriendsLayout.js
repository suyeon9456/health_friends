import React from 'react';
import { Col, Row, List, Skeleton, Avatar, Button } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined, UserAddOutlined } from '@ant-design/icons';

import Map from './Map';

const FriendsLayout = () => {
  const list = [
    {
      id: 1,
      nickname: 'suyeon',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    },
    {
      id: 2,
      nickname: 'jaewook',
      avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
      description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
    }];
  return (
    <div>
      <Row>
        <Col xs={24} md={20} offset={2}>
          <Row>
            <Col xs={24} md={16}>
              <Map />
            </Col>
            <Col xs={24} md={8}>
              <List
                itemLayout="vertical"
                size="large"
                dataSource={list}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <StarOutlined key="list-vertical-star-o" />,
                      <LikeOutlined key="list-vertical-like-o" />,
                      <MessageOutlined key="list-vertical-message" />,
                    ]}
                  >
                    <List.Item.Meta
                      avatar={<Avatar src={item.avatar} />}
                      title={(
                        <>
                          <a href={item.href}>{item.nickname}</a>
                          <Button size="small" type="primary" style={{ float: 'right', marginLeft: 'auto' }}><UserAddOutlined />친구신청</Button>
                        </>
                      )}
                      description={item.description}
                    />
                    {item.content}
                  </List.Item>
                )}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default FriendsLayout;
