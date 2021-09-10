import React from 'react';
import { LikeOutlined, UserOutlined } from '@ant-design/icons';

import Button from '../src/components/atoms/Button';
import Avatar from '../src/components/atoms/Avatar';
import Input from '../src/components/atoms/Input';
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

const Atoms = () => {
  const options = [{ value: 1, text: 'test1' }, { value: 2, text: 'test2' }, { value: 3, text: 'test3' }];
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
      <h3>Select</h3>
      <div style={{ padding: '10px' }}>
        {/* type: gender <br /> */}
        <Select options={options}>Tooltip Test</Select>
      </div>
      <h3>ProgressBar</h3>
      <div style={{ padding: '10px' }}>
        {/* type: gender <br /> */}
        <ProgressBar percent={70} />
      </div>
      <h3>Upload</h3>
      <div style={{ padding: '10px' }}>
        {/* type: gender <br /> */}
        <Upload percent={70} />
      </div>
      <h3>Tab</h3>
      <div style={{ padding: '10px' }}>
        <Tab value="1" selectedValue="1">Tab1</Tab>
        <Tab value="2" selectedValue="1">Tab2</Tab>
        <Tab value="3" selectedValue="1">Tab3</Tab>
      </div>
      <h3>Item</h3>
      <div style={{ padding: '10px' }}>
        <Item title="List Title 1" description="List description 1 ...." />
        {/* <Item title="List Title 2" description="List description 2 ...." />
        <Item title="List Title 3" description="List description 3 ...." /> */}
      </div>
      <h3>InformationItem</h3>
      <div style={{ padding: '10px' }}>
        <InformationItem title="나이" icon={<UserOutlined />} content="20대 후반" />
      </div>
      <h3>step</h3>
      <div style={{ padding: '10px' }}>
        <Step type="finished" step={1} title="title1" description="This is a description1" />
        <Step type="process" step={2} title="title2" description="This is a description2" />
        <Step type="wait" step={3} title="title3" description="This is a description3" />
      </div>
      <h3>step</h3>
      <div style={{ padding: '10px' }}>
        <Step type="finished" step={1} title="title1" description="This is a description1" />
        <Step type="process" step={2} title="title2" description="This is a description2" />
        <Step type="wait" step={3} title="title3" description="This is a description3" />
      </div>
      <h3>InputNumber</h3>
      <div style={{ padding: '10px' }}>
        <InputNumber />
      </div>
      <h3>TimePicker</h3>
      <div style={{ padding: '10px' }}>
        <InputTimePicker />
      </div>
      <h3>DatePicker</h3>
      <div style={{ padding: '10px' }}>
        <InputDatePicker />
      </div>
      <h3>RangeDatePicker</h3>
      <div style={{ padding: '10px' }}>
        <RangePicker type="date" placeholder="0000/00/00 - 0000/00/00" />
      </div>
      <h3>RangeTimePicker</h3>
      <div style={{ padding: '10px' }}>
        <RangeTimePicker type="time" placeholder="0000/00/00 - 0000/00/00" />
      </div>
    </>
  );
};

export default Atoms;
