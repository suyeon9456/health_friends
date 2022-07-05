import React, { useCallback } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';

import { changeIsFoldedGym, foldedItemSelector } from '@/../reducers/gym';
import Icon from '../Icon';
import { Button } from './style';

const FoldButton = () => {
  const dispatch = useDispatch();
  const { isFoldedGym } = useSelector(foldedItemSelector);

  const changeFoldedGym = useCallback(() => {
    dispatch(changeIsFoldedGym(!isFoldedGym));
  }, [isFoldedGym]);
  return (
    <Button
      foldedGym={isFoldedGym}
      onClick={changeFoldedGym}
      className="fold-button"
    >
      {isFoldedGym ? (
        <Icon icon={<BiChevronRight />} />
      ) : (
        <Icon icon={<BiChevronLeft />} />
      )}
    </Button>
  );
};

export default React.memo(FoldButton);
