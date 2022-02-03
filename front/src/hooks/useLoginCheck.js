import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';

const useLoginCheck = () => {
  const { me } = useSelector((state) => state.user);
  useEffect(() => {
    if (me?.id) {
      Router.replace('/');
    }
  }, [me?.id]);
  return me;
};

export default useLoginCheck;
