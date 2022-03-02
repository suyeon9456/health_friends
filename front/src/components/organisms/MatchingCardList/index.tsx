import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { format, compareAsc } from 'date-fns';
import { BiEdit, BiPin, BiRepeat } from 'react-icons/bi';

import ModalMatchingDetail from '../profile/ModalMatchingDetail';
import { MatchingCardListWrap } from './style';
import { Icon } from '../../atoms';
import { MatchingCard } from '../../molecules';
import ModalMatchingEdit from '../profile/ModalMatchingEdit';
import { RootState } from '@/../store/configureStore';
import { LOAD_SCHEDULE_REQUEST } from '@/../@types/utils';

interface Schedules {
  schedules: Array<{
    id: number,
    description: string,
    permission: boolean,
    isPermitted: boolean,
    startDate: string,
    endDate: string,
    start: Date | number,
    end: Date | number,
    address: string,
    gym: string,
    Requester: { nickname: string, Image: { src: string } },
    Friend: { id: number, nickname: string, Image: { src: string } },
    Gym: Array<any>,
    Cancel: object,
  }>
}

const MatchingCardList = ({ schedules }: Schedules) => {
  const dispatch = useDispatch();
  const { me, profile } = useSelector((state: RootState) => state.user);
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
          console.log('!!!!!!!!');
          const startDate = format(schedule?.start, 'yyyy년 MM월 dd일 HH:mm');
          console.log('!!!!!!!!', startDate);
          const endDate = format(schedule?.end, 'HH:mm');
          const date = [startDate, ' ~ ', endDate].join('');
          const friend = schedule?.Friend?.id;
          const nickname = friend === me?.id
            ? schedule?.Requester?.nickname
            : schedule?.Friend?.nickname;
          const imageSrc = friend === me?.id
            ? schedule?.Requester?.Image?.src
            : schedule?.Friend?.Image?.src;
          const cardImageSrc = imageSrc || '';
          // 오늘 일자보다 전 일자의 event는 -1을 리턴한다.
          const compareToday = compareAsc(new Date(schedule.start), new Date());
          return (
            <MatchingCard
              key={schedule.id}
              matchingId={schedule.id}
              nickname={nickname}
              description={schedule.address + schedule.gym}
              image={cardImageSrc}
              date={date}
              onClickView={onClickAction}
              actions={me?.id === profile?.id ? [{ icon: <Icon icon={<BiPin />} />, key: 'fix', onClick: onClickAction },
                { icon: <Icon icon={<BiRepeat />} />, key: 'rematch', onClick: onClickAction },
                { icon: <Icon icon={<BiEdit />} />, key: 'edit', onClick: onClickAction, disabled: compareToday < 0 }] : []}
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

export default MatchingCardList;
