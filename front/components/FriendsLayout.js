import React from 'react';
import { Col, Row, List, Skeleton, Avatar } from 'antd';
import Map from './Map';

const FriendsLayout = () => {
  const list = [{ id: 1, name: 'suyeon' },
    { id: 2, name: 'jaewook' }];
  return (
    <div>
      <Row>
        <Col xs={24} md={16}>
          <Map />
        </Col>
        <Col xs={24} md={8}>
          <List
            dataSource={list}
            renderItem={(item) => (
              <List.Item
                actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
              >
                <Skeleton avatar title={false}>
                  <List.Item.Meta
                    avatar={
                      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                    }
                    title={<a href="https://ant.design">{item.name.last}</a>}
                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                  />
                  <div>content</div>
                </Skeleton>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </div>
  );
};

export default FriendsLayout;
