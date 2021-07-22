import React from 'react';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';

const Home = () => {
  console.log('testes');
  return (
    <AppLayout>
      <div>heelo</div>
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
