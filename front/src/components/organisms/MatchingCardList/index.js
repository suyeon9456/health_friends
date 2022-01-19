import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { EditOutlined, RetweetOutlined } from '@ant-design/icons';

import ModalMatchingDetail from '../profile/ModalMatchingDetail';
import { MatchingCardListWrap } from './style';
import { MatchingCard } from '../../molecules';

const MatchingCardList = ({ schedules }) => {
  const { me, profile } = useSelector((state) => state.user);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('view');

  const onChangeShowModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, [showModal]);

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
          return (
            <MatchingCard
              key={schedule.id}
              id={schedule.id}
              nickname={nickname}
              description={schedule.address}
              image={cardImageSrc}
              date={date}
              actions={me?.id === profile?.id ? [{ icon: <RetweetOutlined />, key: 'rematch' },
                { icon: <EditOutlined />, key: 'edit' }] : []}
              setShowModal={setShowModal}
              setModalType={setModalType}
            />
          );
        })}
      </MatchingCardListWrap>
      <ModalMatchingDetail
        show={showModal}
        onCancel={onChangeShowModal}
        type={modalType}
      />
    </>
  );
};

MatchingCardList.propTypes = {
  schedules: PropTypes.array,
};

export default MatchingCardList;
