import React from 'react';
import { LikeOutlined } from '@ant-design/icons';

import AppLayout from '../components/AppLayout';
import Button from '../src/components/atoms/Button';
import wrapper from '../store/configureStore';

const Home = () => {
  console.log('testes');
  return (
    <AppLayout>
      <div>
        {/* <Button size="small">Button1</Button>
        <Button>Button1</Button>
        <Button size="large">Button1</Button>
      </div>
      <div>
        <Button>Button1</Button>
        <Button type="primary">Button1</Button>
        <Button type="text">Button1</Button>
      </div>
      <div>
        <Button icon={<LikeOutlined />}>Button1</Button>
        {/* <Button loading>Button1</Button> */}
        <Button block>Button1</Button>
        <Button disabled>Button1</Button>
      </div>
      <div>
        <Button loading>Button1</Button>
        <Button loading type="primary">Button1</Button>
        <Button loading>Button1</Button> */}
      </div>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  const result2 = await fetch('https://catfact.ninja/fact');
  const result = await result2.json();
  console.log(result);
  return { props: { result } };
});

export default Home;
