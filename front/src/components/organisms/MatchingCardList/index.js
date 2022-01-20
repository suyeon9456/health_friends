import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { format, compareAsc } from 'date-fns';
import { EditOutlined, PushpinOutlined, RetweetOutlined } from '@ant-design/icons';

import ModalMatchingDetail from '../profile/ModalMatchingDetail';
import { MatchingCardListWrap } from './style';
import { MatchingCard } from '../../molecules';
import { LOAD_SCHEDULE_REQUEST } from '../../../../reducers/schedule';
import ModalMatchingEdit from '../profile/ModalMatchingEdit';

const MatchingCardList = ({ schedules }) => {
  const dispatch = useDispatch();
  const { me, profile } = useSelector((state) => state.user);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [modalType, setModalType] = useState('view');

  const onChangeShowEditModal = useCallback(() => {
    setShowEditModal((prev) => !prev);
  }, [showEditModal]);

  const onChangeShowDetailModal = useCallback(() => {
    setShowDetailModal((prev) => !prev);
  }, [showEditModal]);

  const onClickAction = useCallback(({ key, id }) => {
    console.log(key);
    setModalType(key);
    dispatch({
      type: LOAD_SCHEDULE_REQUEST,
      data: id,
    });
    if (key === 'view') {
      setShowDetailModal((prev) => !prev);
    }
    if (key === 'edit' || key === 'rematch') {
      setShowEditModal((prev) => !prev);
    }
  }, [showDetailModal, showEditModal, modalType]);

  return (
    <>
      <MatchingCardListWrap>
        {schedules?.map((schedule) => {
          const startDate = format(schedule.start, 'yyyy년 MM월 dd일 HH:mm');
          const endDate = format(schedule.end, 'HH:mm');
          const date = [startDate, ' ~ ', endDate].join('');
          const friend = schedule?.friend?.id;
          const nickname = friend === me?.id
            ? schedule?.requester?.nickname
            : schedule?.friend?.nickname;
          const imageSrc = friend === me?.id
            ? schedule?.requester?.Image?.src
            : schedule?.friend?.Image?.src;
          const cardImageSrc = imageSrc || '';
          // 오늘 일자보다 전 일자의 event는 -1을 리턴한다.
          const compareToday = compareAsc(new Date(schedule.start), new Date());
          return (
            <MatchingCard
              key={schedule.id}
              id={schedule.id}
              nickname={nickname}
              description={schedule.address + schedule.gymName}
              image={cardImageSrc}
              date={date}
              start={schedule.start}
              onClickView={onClickAction}
              actions={me?.id === profile?.id ? [{ icon: <PushpinOutlined />, key: 'fix', onClick: onClickAction },
                { icon: <RetweetOutlined />, key: 'rematch', onClick: onClickAction },
                { icon: <EditOutlined />, key: 'edit', onClick: onClickAction, disabled: compareToday < 0 }] : []}
            />
          );
        })}
      </MatchingCardListWrap>
      <ModalMatchingDetail show={showDetailModal} onCancel={onChangeShowDetailModal} />
      <ModalMatchingEdit
        show={showEditModal}
        onCancel={onChangeShowEditModal}
        mode={modalType}
      />
    </>
  );
};

MatchingCardList.propTypes = {
  schedules: PropTypes.array,
};

export default MatchingCardList;
