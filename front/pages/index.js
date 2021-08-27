import React from 'react';
import Menu from '../src/components/molecules/Menu';

import wrapper from '../store/configureStore';

const Home = () => {
  console.log('testes');
  return (
    <Menu>
      <div>
        background image
      </div>
    </Menu>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(() => async () => {
  const result2 = await fetch('https://catfact.ninja/fact');
  const result = await result2.json();
  console.log(result);
  return { props: { result } };
});

export default Home;
