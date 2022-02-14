import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Router from 'next/router';

import { RootState } from '@/../store/configureStore';

type ReturnTypes = any;

const useLoginCheck = (): ReturnTypes => {
  const { me } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (me?.id) {
      Router.replace('/');
    }
  }, [me?.id]);
  return me;
};

export default useLoginCheck;
