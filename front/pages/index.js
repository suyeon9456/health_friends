import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

import AppLayout from '../src/components/organisms/AppLayout';

import wrapper from '../store/configureStore';

const Home = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
  }, []);

  return (
    <AppLayout>
      <div>
        background image
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
