import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { format, compareAsc } from 'date-fns';
import { BiEdit, BiPin, BiRepeat } from 'react-icons/bi';

import { profileSelector } from '@/../reducers/profile';

import { useQueries, useQuery } from 'react-query';
import axios from 'axios';
import {
  MatchingCardProps,
  RecordSchedule,
  RecordScheduleFetch,
} from '@/../@types/schedule';
import {
  loginedUserProfile,
  ModalType,
  ShowModalType,
} from '@/../@types/utils';
import { Me } from '@/../@types/user';
import { meKey, scheduleByIdKey } from '@/../@types/queryKey';
import { loadLoginedUserAPI } from '@/api/user';
import { loadScheduleAPI } from '@/api/schedule';
import ModalMatchingDetail from '../profile/ModalMatchingDetail';
import ModalMatchingEdit from '../profile/ModalMatchingEdit';
import { LoadingMatchingCard, MatchingCard } from '../../molecules';
import { Icon } from '../../atoms';
import { MatchingCardListWrap } from './style';

import ModalPortal from '../ModalPortal';

const MatchingCardList = ({
  schedules,
  isLoading,
}: {
  schedules: RecordSchedule[];
  isLoading: boolean;
}) => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const { profile } = useSelector(profileSelector);
  const [matchingId, setMatchingId] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ShowModalType>(ModalType.VIEW);
  const [schedule, setSchedule] = useState<MatchingCardProps | null>(null);

  const { data: me } = useQuery<Me>(meKey, () => loadLoginedUserAPI(), {
    refetchOnWindowFocus: false,
    retry: false,
  });
  const { data: apiSchedule } = useQuery<{
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
  }>(
    scheduleByIdKey(matchingId),
    () => loadScheduleAPI(matchingId, queryId ? `?userId=${profile.id}` : ''),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!matchingId,
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

  useEffect(() => {
    if (apiSchedule) {
      const {
        schedule: fetchSchedule,
        userMatching,
        friendMatching,
      } = apiSchedule;
      const userTotalCount = userMatching?.[0]?.matchingCount || 0;
      const userReCount = userMatching?.[0]?.rematchingCount || 0;
      const friendTotalCount = friendMatching?.[0]?.matchingCount || 0;
      const friendReCount = friendMatching?.[0]?.rematchingCount || 0;
      const user = me ?? profile;
      setSchedule({
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
            fetchSchedule.Receiver.id === user.id
              ? user.id
              : fetchSchedule.Receiver.id,
          nickname:
            fetchSchedule.Receiver.id === user.id
              ? user.nickname
              : fetchSchedule.Receiver.nickname,
          Image:
            fetchSchedule.Receiver.id === user.id
              ? user.Image
              : fetchSchedule.Receiver.Image,
        },
      });
    }
  }, [apiSchedule]);

  return (
    <>
      <MatchingCardListWrap>
        {schedules?.map((target) => {
          const { start, end, Receiver, Requester } = target;
          const startDate = format(start, 'yyyy년 MM월 dd일 HH:mm');
          const endDate = format(end, 'HH:mm');
          const friend = profile.id === Receiver.id ? Requester : Receiver;
          console.log(friend);
          // 오늘 일자보다 전 일자의 event는 -1을 리턴한다.
          const compareToday = compareAsc(new Date(target.start), new Date());
          return (
            <MatchingCard
              key={target.id}
              matchingId={target.id}
              nickname={friend.nickname}
              description={target.Gym.address + target.Gym.name}
              image={friend.Image?.src ?? ''}
              date={[startDate, ' ~ ', endDate].join('')}
              onClickView={onClickAction}
              actions={
                me?.id === profile?.id
                  ? loginedUserProfile(
                      <Icon icon={<BiPin />} />,
                      onClickAction,
                      compareToday
                    )
                  : []
              }
            />
          );
        })}
        {isLoading &&
          Array.from({ length: 3 }, (_, i) => i).map((_, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <LoadingMatchingCard key={i} />
          ))}
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
