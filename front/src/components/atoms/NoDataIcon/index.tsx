import React from 'react';
import Drawer from '../../../../public/svg/drawer.svg';

const NoDataIcon = React.memo(
  ({
    width = 100,
    height = 100,
    color = '#00000040',
  }: {
    width: number;
    height: number;
    color: string;
  }) => <Drawer width={`${width}px`} height={`${height}px`} fill={color} />
);

export default NoDataIcon;
