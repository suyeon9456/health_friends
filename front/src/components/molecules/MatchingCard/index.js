import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { UserOutlined } from '@ant-design/icons';

import { Card, CardBody, CardCover, CardMeta, MetaDescription, MetaDate, MetaTitle, CardActions, Action } from './style';
import { SET_SCHEDULE } from '../../../../reducers/schedule';

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
  const onShowScheduleModal = useCallback(() => {
    dispatch({
      type: SET_SCHEDULE,
      data: id,
    });
    setShowModal((prev) => !prev);
  }, [id]);
  const onClickAction = useCallback((key) => {
    setModalType(() => 'edit');
    if (key === 'edit') {
      dispatch({
        type: SET_SCHEDULE,
        data: id,
      });
      setShowModal((prev) => !prev);
    }
    console.log('key', key);
  }, [id]);
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
