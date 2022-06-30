import React from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

import Icon from '../Icon';
import { Button } from './style';

const FoldButton = ({
  isFolded,
  changeFolded,
}: {
  isFolded: boolean;
  changeFolded: () => void;
}) => {
  return (
    <Button foldedGym={isFolded} onClick={changeFolded} className="fold-button">
      {isFolded ? (
        <Icon icon={<BiChevronRight />} />
      ) : (
        <Icon icon={<BiChevronLeft />} />
      )}
    </Button>
  );
};

export default React.memo(FoldButton);
