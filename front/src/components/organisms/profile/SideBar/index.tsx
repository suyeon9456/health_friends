import React, { Suspense } from 'react';

import dynamic from 'next/dynamic';
import Spinner from '@/components/atoms/Spinner';
import { SideBarWrapper } from './style';

const ProfileInfo = dynamic(() => import('./ProfileInfo'), {
  suspense: true,
  ssr: false,
});
const SideBarTabMenu = dynamic(
  () => import('@/components/molecules/SideBarTabMenu'),
  {
    suspense: true,
    ssr: false,
  }
);

const SideBar = () => {
  return (
    <>
      <SideBarWrapper>
        <Suspense fallback={<Spinner />}>
          <ProfileInfo />
        </Suspense>
        <Suspense fallback={<Spinner />}>
          <SideBarTabMenu />
        </Suspense>
      </SideBarWrapper>
    </>
  );
};

export default SideBar;
