import React from 'react';
import { LikeOutlined, UserOutlined } from '@ant-design/icons';

import Button from '../src/components/atoms/Button';
import Avatar from '../src/components/atoms/Avatar';
import Input from '../src/components/atoms/Input';
import Search from '../src/components/atoms/Search';
import Tag from '../src/components/atoms/Tag';
import Select from '../src/components/atoms/Select';
import Upload from '../src/components/atoms/Upload';
import Tab from '../src/components/atoms/Tab';
import Item from '../src/components/atoms/Item';
import ProgressBar from '../src/components/atoms/ProgressBar';
import InformationItem from '../src/components/atoms/InformationItem';
import Step from '../src/components/atoms/Step';
import InputNumber from '../src/components/atoms/InputNumber';
import InputTimePicker from '../src/components/atoms/InputTimePicker';
import InputDatePicker from '../src/components/atoms/InputDatePicker';
import RangePicker from '../src/components/atoms/RangePicker';
import RangeTimePicker from '../src/components/atoms/RangeTimePicker';
import Textarea from '../src/components/atoms/Textarea';
import CheckBox from '../src/components/atoms/CheckBox';

const Atoms = () => {
  const options = [{ value: 1, text: 'test1' }, { value: 2, text: 'test2' }, { value: 3, text: 'test3' }];
  // const useCall
  return (
    <>
      {/* <h3>Button</h3>
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
        <Button type="line-primary" style={{ marginLeft: '10px' }}>Button1</Button>
        <Button type="text" style={{ marginLeft: '10px' }}>Button1</Button>
        <Button type="error" style={{ marginLeft: '10px' }}>Button1</Button>
        <Button type="warning" style={{ marginLeft: '10px' }}>Button1</Button>
        <Button type="success" style={{ marginLeft: '10px' }}>Button1</Button>
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
      </div> */}
      <h3>Input</h3>
      <div style={{ padding: '10px' }}>
        size <br />
        <Input size="small" />
        {/* <Input style={{ marginTop: '10px' }} />
        <Input size="large" style={{ marginTop: '10px' }} /> */}
      </div>
    </>
  );
};

export default Atoms;
