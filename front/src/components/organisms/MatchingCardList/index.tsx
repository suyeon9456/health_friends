import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { format, compareAsc } from 'date-fns';
import { BiEdit, BiPin, BiRepeat } from 'react-icons/bi';

import { userSelector } from '@/../reducers/user';
import { profileSelector } from '@/../reducers/profile';

import { useQuery } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
import {
  MatchingCardProps,
  RecordSchedule,
  RecordScheduleFetch,
} from '@/../@types/schedule';
import { ModalType, ShowModalType } from '@/../@types/utils';
import ModalMatchingDetail from '../profile/ModalMatchingDetail';
import ModalMatchingEdit from '../profile/ModalMatchingEdit';
import { MatchingCard } from '../../molecules';
import { Icon } from '../../atoms';
import { MatchingCardListWrap } from './style';

import ModalPortal from '../ModalPortal';

const MatchingCardList = ({ schedules }: { schedules: RecordSchedule[] }) => {
  const { me } = useSelector(userSelector);
  const { profile } = useSelector(profileSelector);
  const [matchingId, setMatchingId] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ShowModalType>(ModalType.VIEW);

  const {
    status,
    isLoading,
    error,
    data: schedule,
    isFetching,
  } = useQuery<MatchingCardProps | undefined, AxiosError>(
    ['schedule', matchingId],
    async () => {
      if (!matchingId) {
        return;
      }
      const {
        data,
      }: AxiosResponse<{
        schedule: RecordScheduleFetch;
        userMatching: Array<{
          FriendId: number;
          matchingCount: number;
          rematchingCount: number;
        }>;
        friendMatching: Array<{
          FriendId: number;
          matchingCount: number;
          rematchingCount: number;
        }>;
      }> = await axios.get(`/schedule/${matchingId}`);
      const { schedule: fetchSchedule, userMatching, friendMatching } = data;
      const userTotalCount =
        userMatching.length > 0 ? userMatching[0].matchingCount : 0;
      const userReCount =
        userMatching.length > 0 ? userMatching[0].rematchingCount : 0;
      const friendTotalCount =
        friendMatching.length > 0 ? friendMatching[0].matchingCount : 0;
      const friendReCount =
        friendMatching.length > 0 ? friendMatching[0].rematchingCount : 0;
      console.log(data);
      return {
        ...fetchSchedule,
        start: new Date(fetchSchedule.startDate),
        end: new Date(fetchSchedule.endDate),
        userMathcing: userMatching.map(
          ({ FriendId }: { FriendId: number }) => FriendId
        ),
        userTotalCount,
        userReCount,
        friendMathcing: friendMatching.map(
          ({ FriendId }: { FriendId: number }) => FriendId
        ),
        friendTotalCount,
        friendReCount,
        Friend: {
          id:
            fetchSchedule.Receiver.id === me?.id
              ? me?.id
              : fetchSchedule.Receiver.id,
          nickname:
            fetchSchedule.Receiver.id === me?.id
              ? me.nickname
              : fetchSchedule.Receiver.nickname,
          Image:
            fetchSchedule.Receiver.id === me?.id
              ? me.Image
              : fetchSchedule.Receiver.Image,
        },
      };
    }
  );

  const onChangeShowEditModal = useCallback(() => {
    setShowEditModal((prev) => !prev);
  }, [showEditModal]);

  const onChangeShowDetailModal = useCallback(() => {
    setShowDetailModal((prev) => !prev);
  }, [showEditModal]);

  const onClickAction = useCallback(
    ({ key, id }) => {
      setMatchingId(id);
      setModalType(key);
      if (key === ModalType.VIEW) {
        setShowDetailModal((prev) => !prev);
      }
      if (key === ModalType.EDIT || key === ModalType.REMATCH) {
        setShowEditModal((prev) => !prev);
      }
    },
    [showDetailModal, showEditModal, modalType, matchingId]
  );

  return (
    <>
      <MatchingCardListWrap>
        {schedules?.map((targetSchedule) => {
          const startDate = format(
            targetSchedule?.start,
            'yyyy년 MM월 dd일 HH:mm'
          );
          const endDate = format(targetSchedule?.end, 'HH:mm');
          const date = [startDate, ' ~ ', endDate].join('');
          const friend = targetSchedule?.Receiver?.id;
          const nickname =
            friend === me?.id
              ? targetSchedule?.Requester?.nickname
              : targetSchedule?.Receiver?.nickname;
          const imageSrc =
            friend === me?.id
              ? targetSchedule?.Requester?.Image?.src
              : targetSchedule?.Receiver?.Image?.src;
          const cardImageSrc = imageSrc || '';
          // 오늘 일자보다 전 일자의 event는 -1을 리턴한다.
          const compareToday = compareAsc(
            new Date(targetSchedule.start),
            new Date()
          );
          return (
            <MatchingCard
              key={targetSchedule.id}
              matchingId={targetSchedule.id}
              nickname={nickname}
              description={targetSchedule.Gym.address + targetSchedule.Gym.name}
              image={cardImageSrc}
              date={date}
              onClickView={onClickAction}
              actions={
                me?.id === profile?.id
                  ? [
                      {
                        icon: <Icon icon={<BiPin />} />,
                        key: ModalType.FIX,
                        onClick: onClickAction,
                      },
                      {
                        icon: <Icon icon={<BiRepeat />} />,
                        key: ModalType.REMATCH,
                        onClick: onClickAction,
                      },
                      {
                        icon: <Icon icon={<BiEdit />} />,
                        key: ModalType.EDIT,
                        onClick: onClickAction,
                        disabled: compareToday < 0,
                      },
                    ]
                  : []
              }
            />
          );
        })}
      </MatchingCardListWrap>
      <ModalPortal>
        {showDetailModal && (
          <ModalMatchingDetail
            schedule={schedule}
            onCancel={onChangeShowDetailModal}
          />
        )}
        {showEditModal && (
          <ModalMatchingEdit
            schedule={schedule}
            onCancel={onChangeShowEditModal}
            mode={modalType}
          />
        )}
      </ModalPortal>
    </>
  );
};

export default MatchingCardList;
