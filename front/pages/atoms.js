import React from 'react';
import { LikeOutlined } from '@ant-design/icons';

import Button from '../src/component/atoms/Button';
import Avatar from '../src/component/atoms/Avatar';
import Input from '../src/component/atoms/Input';
import Tag from '../src/component/atoms/Tag';
import Tooltip from '../src/component/atoms/Tooltip';

const Atoms = () => {
  console.log('dfkdf');
  return (
    <>
      <h3>Button</h3>
      <div style={{ padding: '10px' }}>
        size <br />
        <Button size="small">Button1</Button>
        <Button style={{ marginLeft: '10px' }}>Button1</Button>
        <Button size="large" style={{ marginLeft: '10px' }}>Button1</Button>
      </div>
      <div style={{ padding: '10px' }}>
        type <br />
        <Button>Button1</Button>
        <Button type="primary" style={{ marginLeft: '10px' }}>Button1</Button>
        <Button type="text" style={{ marginLeft: '10px' }}>Button1</Button>
      </div>
      <div style={{ padding: '10px' }}>
        icon + text<br />
        <Button icon={<LikeOutlined />}>Button1</Button>
        <Button icon={<LikeOutlined />} type="primary" style={{ marginLeft: '10px' }}>Button1</Button>
        <Button icon={<LikeOutlined />} type="text" style={{ marginLeft: '10px' }}>Button1</Button>
      </div>
      <div style={{ padding: '10px' }}>
        loading <br />
        <Button loading>Button1</Button>
        <Button loading type="primary" style={{ marginLeft: '10px' }}>Button1</Button>
        <Button loading type="text" style={{ marginLeft: '10px' }}>Button1</Button>
      </div>
      <div style={{ padding: '10px' }}>
        disabled <br />
        <Button disabled>Button1</Button>
        <Button disabled icon={<LikeOutlined />} style={{ marginLeft: '10px' }}>Button1</Button>
        <Button disabled type="text" style={{ marginLeft: '10px' }}>Button1</Button>
      </div>
      <div style={{ padding: '10px' }}>
        block <br />
        <Button block type="primary">Button1</Button>
        <Button block icon={<LikeOutlined />} style={{ marginTop: '10px' }}>Button1</Button>
        <Button block type="text" style={{ marginTop: '10px' }}>Button1</Button>
      </div>
      <h3>Avatar</h3>
      <div style={{ padding: '10px' }}>
        size <br />
        <Avatar size="small" />
        <Avatar style={{ marginLeft: '10px' }} />
        <Avatar size="large" style={{ marginLeft: '10px' }} />
      </div>
      <div style={{ padding: '10px' }}>
        number size <br />
        <Avatar size={52} />
        <Avatar size={62} style={{ marginLeft: '10px' }} />
        <Avatar size={72} style={{ marginLeft: '10px' }} />
      </div>
      <div style={{ padding: '10px' }}>
        image <br />
        <Avatar size="small" src={<img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="test" />} />
        <Avatar style={{ marginLeft: '10px' }} src={<img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="test" />} />
        <Avatar size="large" style={{ marginLeft: '10px' }} src={<img src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="test" />} />
      </div>
      <h3>Input</h3>
      <div style={{ padding: '10px' }}>
        size <br />
        <Input size="small" />
        <Input style={{ marginTop: '10px' }} />
        <Input size="large" style={{ marginTop: '10px' }} />
      </div>
      <div style={{ padding: '10px' }}>
        type: password <br />
        <Input type="password" placeholder="비밀번호를 입력해주세요" />
      </div>
      <div style={{ padding: '10px' }}>
        type: textarea <br />
        <Input type="textarea" style={{ marginTop: '10px' }} />
        <Input type="textarea" showCount maxLength={150} style={{ marginTop: '10px' }} />
        {/* <Input size="large" style={{ marginTop: '10px' }} /> */}
      </div>
      <div style={{ padding: '10px' }}>
        type: search <br />
        <Input type="search" size="small" enterButton />
        <Input type="search" enterButton style={{ marginTop: '10px' }} />
        <Input type="search" size="large" enterButton style={{ marginTop: '10px' }} />
      </div>
      <div style={{ padding: '10px' }}>
        type: loading <br />
        <Input type="search" loading enterButton />
      </div>
      <h3>Tag</h3>
      <div style={{ padding: '10px' }}>
        type <br />
        <Tag type="gender">gender</Tag>
        <Tag type="age" style={{ marginTop: '10px' }}>age</Tag>
        <Tag type="career" style={{ marginTop: '10px' }}>career</Tag>
        <Tag type="position" style={{ marginTop: '10px' }}>position</Tag>
      </div>
      <h3>Tooltip</h3>
      <div style={{ padding: '10px' }}>
        type: gender <br />
        <Tooltip type="gender">Tooltip Test</Tooltip>
        {/* <Tag type="age" style={{ marginTop: '10px' }}>age</Tag>
        <Tag type="career" style={{ marginTop: '10px' }}>career</Tag>
        <Tag type="position" style={{ marginTop: '10px' }}>position</Tag> */}
      </div>
    </>
  );
};

export default Atoms;
