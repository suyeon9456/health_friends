import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { compareAsc } from 'date-fns';
import { BiEdit, BiPin, BiRepeat } from 'react-icons/bi';

import { profileSelector } from '@/../reducers/profile';
import { meSelector } from '@/../reducers/user';
import useScheduleData from '@/hooks/useScheduleData';
import { loadScheduleAPI } from '@/api/schedule';

import { rangeDate } from '@/../@utils/date';
import { RecordSchedule, RecordScheduleAPI } from '@/../@types/schedule';
import {
  loginedUserProfile,
  ModalType,
  ShowModalType,
} from '@/../@types/utils';
import { scheduleByIdKey } from '@/../@utils/queryKey';
import { LoadingMatchingCard, MatchingCard } from '../../molecules';
import { Icon } from '../../atoms';
import ModalMatchingDetail from '../profile/ModalMatchingDetail';
import ModalMatchingEdit from '../profile/ModalMatchingEdit';
import ModalPortal from '../ModalPortal';
import { MatchingCardListWrap } from './style';

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
  const me = useSelector(meSelector);
  const [matchingId, setMatchingId] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ShowModalType>(ModalType.VIEW);
  const [schedule, onChangeSchedule] = useScheduleData();

  const _result = useQuery<RecordScheduleAPI>(
    scheduleByIdKey(matchingId, queryId, profile.id),
    () => loadScheduleAPI(matchingId, queryId, profile.id),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!matchingId,
      onSuccess: (data) => {
        if (!data) return;
        onChangeSchedule(data, profile);
      },
    }
  );

  const onChangeShowEditModal = useCallback(() => {
    setShowEditModal((prev) => !prev);
  }, [showEditModal]);

  const onChangeShowDetailModal = useCallback(() => {
    setShowDetailModal((prev) => !prev);
    setMatchingId(null);
  }, [showEditModal, matchingId, queryId, profile]);

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
        {schedules?.map((target) => {
          const { start, end, Receiver, Requester, Cancel } = target;
          const friend = profile.id === Receiver.id ? Requester : Receiver;
          console.log(target);
          return (
            <MatchingCard
              key={target.id}
              matchingId={target.id}
              nickname={friend.nickname}
              description={target.Gym.address + target.Gym.name}
              image={friend.Image?.src ?? ''}
              date={rangeDate(start, end)}
              onClickView={onClickAction}
              isCancel={!!Cancel && !Cancel?.isCanceled}
              actions={
                me?.id === profile?.id
                  ? loginedUserProfile(
                      [
                        <Icon icon={<BiPin />} />,
                        <Icon icon={<BiRepeat />} />,
                        <Icon icon={<BiEdit />} />,
                      ],
                      onClickAction,
                      compareAsc(start, new Date())
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
