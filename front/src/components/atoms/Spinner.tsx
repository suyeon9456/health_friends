import React from 'react';
import Spinner from '../../../public/svg/spinner.svg';

const SpinnerIcon = ({
  width = 50,
  height = 50,
}: // color = '#00000040',
{
  width?: number;
  height?: number;
  // color: string;
}) => <Spinner width={`${width}px`} height={`${height}px`} />;

export default React.memo(SpinnerIcon);
