import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';

import { Card, CardBody, CardCover, CardMeta, MetaDescription, MetaDate, MetaTitle, CardActions, Action } from './style';
import { LOAD_SCHEDULE_REQUEST } from '../../../../reducers/schedule';

const MatchingCard = ({
  id,
  nickname,
  description,
  date,
  image,
  actions,
  setShowModal,
  setModalType,
}) => {
  const dispatch = useDispatch();
  const [isClickedCard, setIsClickedCard] = useState(false);
  const onShowScheduleModal = useCallback(() => {
    setModalType(() => 'view');
    setIsClickedCard(true);
    setShowModal((prev) => !prev);
  }, [id]);
  const onClickAction = useCallback(() => {
    setModalType(() => 'edit');
    setIsClickedCard(true);
    setShowModal((prev) => !prev);
  }, [id]);

  useEffect(() => {
    if (isClickedCard) {
      dispatch({
        type: LOAD_SCHEDULE_REQUEST,
        data: id,
      });
    }
  }, [isClickedCard]);

  return (
    <Card>
      <CardCover>
        {image ? <img src={image} alt={image} /> : <div><UserOutlined /></div>}
      </CardCover>
      <CardBody id={id} onClick={onShowScheduleModal}>
        <CardMeta>
          <MetaDate>{date}</MetaDate>
          <MetaTitle>{nickname}</MetaTitle>
          <MetaDescription>{description}</MetaDescription>
        </CardMeta>
      </CardBody>
      <CardActions>
        {actions?.map((action) => (
          <Action key={action.key} onClick={() => onClickAction(action.key)}>
            {action.icon}
          </Action>
        ))}
      </CardActions>
    </Card>
  );
};

MatchingCard.propTypes = {
  id: PropTypes.number.isRequired,
  nickname: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string,
  actions: PropTypes.array,
  setShowModal: PropTypes.func,
  setModalType: PropTypes.any,
};

export default MatchingCard;
