import React from 'react';
import { useSelector } from 'react-redux';

import { signupSelector } from '@/../reducers/user';
import { SignupMenu, SignupMenuType } from '@/../@types/constant';
import FriendsInfoForm from './FriendsInfoForm';
import InfoForm from './InfoForm';
import MoreGymInfoForm from './MoreGymInfoForm';
import MoreInfoForm from './MoreInfoForm';

const SignupContents = () => {
  const { signupProcess }: { signupProcess: SignupMenuType } =
    useSelector(signupSelector);
  return (
    <>
      {
        {
          [SignupMenu.INFO]: <InfoForm />,
          [SignupMenu.MOREINFO]: <MoreInfoForm />,
          [SignupMenu.GYMINFO]: <MoreGymInfoForm />,
          [SignupMenu.FRIENDSINFO]: <FriendsInfoForm />,
        }[signupProcess]
      }
    </>
  );
};

export default SignupContents;
