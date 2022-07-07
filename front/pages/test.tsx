import TestItem from '@/components/organisms/TestItem';
import axios from 'axios';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import React from 'react';

const Test = ({ data }: any) => {
  console.log('tste', data);
  return <TestItem data={data} />;
};

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { data } = await axios.get('/schedules/realtime');
  console.log(data);
  return {
    props: {
      data,
    },
  };
};

export default Test;
