import React from 'react';
import PropTypes from 'prop-types';
import { BiChevronLeft, BiChevronRight, BiRadioCircle } from 'react-icons/bi';

import { ToolbarWrap, RbcBtnGroup, ButtonGroup } from './style';

const BigCalendarToolbar = ({ date, onNavigate }) => {
  const navigate = (action) => {
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

BigCalendarToolbar.propTypes = {
  date: PropTypes.any,
  onNavigate: PropTypes.any,
};

export default BigCalendarToolbar;
