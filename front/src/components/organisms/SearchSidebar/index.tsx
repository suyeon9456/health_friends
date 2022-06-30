import React, { useLayoutEffect } from 'react';
import { BiCollapse, BiExpand } from 'react-icons/bi';

import { ButtonType, SizeType } from '@/../@types/constant';
import { useLoadLoginedUser } from '@/hooks';
import { useDispatch, useSelector } from 'react-redux';
import { changeIsFoldedGym, foldedItemSelector } from '@/../reducers/gym';
import { Avatar, Button, Icon } from '../../atoms';
import { Sidebar } from './style';

const SearchSidebar = () => {
  const dispatch = useDispatch();
  const { isFoldedGym } = useSelector(foldedItemSelector);
  const { data: me } = useLoadLoginedUser();

  return (
    <Sidebar>
      <div>
        <Avatar size={SizeType.SMALL} src={me?.Image?.src} />
        {!isFoldedGym ? (
          <Button
            icon={<Icon icon={<BiCollapse />} />}
            type={ButtonType.TEXT}
            onClick={() => dispatch(changeIsFoldedGym(true))}
          />
        ) : (
          <Button
            icon={<Icon icon={<BiExpand />} />}
            type={ButtonType.TEXT}
            onClick={() => dispatch(changeIsFoldedGym(false))}
          />
        )}
      </div>
    </Sidebar>
  );
};

export default React.memo(SearchSidebar);
