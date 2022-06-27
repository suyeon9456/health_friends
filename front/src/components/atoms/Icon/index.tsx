/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement } from 'react';

const Icon = React.memo(
  ({ icon, onClick }: { icon: ReactElement; onClick?: () => void }) => (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <span className="icon" onClick={onClick}>
      {icon}
    </span>
  )
);

export default Icon;
