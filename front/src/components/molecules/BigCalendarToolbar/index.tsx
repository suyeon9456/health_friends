import React from 'react';
import { NavigateAction } from 'react-big-calendar';
import { BiChevronLeft, BiChevronRight, BiRadioCircle } from 'react-icons/bi';

import { ToolbarWrap, RbcBtnGroup, ButtonGroup } from './style';

const BigCalendarToolbar = ({ date, onNavigate }: {
  date: Date;
  onNavigate: (navigate: NavigateAction, date?: Date) => void;
}) => {
  const navigate = (action: NavigateAction) => {
    onNavigate(action);
  };
  return (
    <ToolbarWrap className="rbc-toolbar">
      <RbcBtnGroup className="rbc-btn-group">
        <span className="rbc-toolbar-label">
          {`${date.getFullYear()}년 ${date.getMonth() + 1}월`}
        </span>
        <ButtonGroup>
          <button
            type="button"
            onClick={navigate.bind(null, 'PREV')}
          >
            <BiChevronLeft />
          </button>
          <button className="now" type="button" onClick={navigate.bind(null, 'TODAY')}>
            <BiRadioCircle />
          </button>
          <button
            type="button"
            onClick={navigate.bind(null, 'NEXT')}
          >
            <BiChevronRight />
          </button>
        </ButtonGroup>
      </RbcBtnGroup>
    </ToolbarWrap>
  );
};

export default BigCalendarToolbar;
