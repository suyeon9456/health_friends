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
import { RecordScheduleAPI } from '@/../@types/schedule';
import {
  loginedUserProfile,
  ModalType,
  ShowModalType,
} from '@/../@types/utils';
import { scheduleByIdKey } from '@/../@utils/queryKey';
import useIsState from '@/hooks/useIsState';
import { LoadingMatchingCard, MatchingCard } from '../../molecules';
import { Icon } from '../../atoms';
import ModalMatchingDetail from '../profile/ModalMatchingDetail';
import ModalMatchingEdit from '../profile/ModalMatchingEdit';
import ModalPortal from '../ModalPortal';
import { MatchingCardListWrap } from './style';

const MatchingCardList = ({
  isLoading,
  pages,
  pageParams,
}: {
  isLoading: boolean;
  pages?: any[][];
  pageParams?: any[];
}) => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const { profile } = useSelector(profileSelector);
  const me = useSelector(meSelector);
  const [matchingId, setMatchingId] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);
  const [isShowEditModal, onChangeIsShowEditModal, setIsShowEditModal] =
    useIsState(false);
  const [modalType, setModalType] = useState<ShowModalType>(ModalType.VIEW);
  const [schedule, onChangeSchedule] = useScheduleData();

  const _result = useQuery<RecordScheduleAPI>(
    scheduleByIdKey(matchingId, queryId, profile?.id),
    () => loadScheduleAPI(matchingId, queryId, profile?.id),
    {
      refetchOnWindowFocus: false,
      retry: false,
      enabled: !!matchingId && !!profile,
      onSuccess: (data) => {
        if (!data) return;
        onChangeSchedule(data, profile);
      },
    }
  );

  const onChangeShowDetailModal = useCallback(() => {
    setShowDetailModal((prev) => !prev);
    setMatchingId(null);
  }, [isShowEditModal, matchingId, queryId, profile]);

  const onClickAction = useCallback(
    ({ key, id }) => {
      setMatchingId(id);
      setModalType(key);
      if (key === ModalType.VIEW) {
        setShowDetailModal((prev) => !prev);
      }
      if (key === ModalType.EDIT || key === ModalType.REMATCH) {
        setIsShowEditModal((prev) => !prev);
      }
    },
    [showDetailModal, isShowEditModal, modalType, matchingId]
  );

  return (
    <>
      <MatchingCardListWrap>
        {Array.from({ length: pageParams?.length ?? 0 }, (_, i) => i).map(
          (_, i) => {
            return pages?.[i].map((target) => {
              const { start, end, Receiver, Requester, Cancel } = target;
              const friend = profile.id === Receiver.id ? Requester : Receiver;
              return (
                <MatchingCard
                  key={target.id}
                  matchingId={target.id}
                  nickname={friend.nickname}
                  description={target.Gym.address + target.Gym.name}
                  image={friend?.Image?.src ?? ''}
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
            });
          }
        )}
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
        {isShowEditModal && (
          <ModalMatchingEdit
            schedule={schedule}
            onCancel={onChangeIsShowEditModal}
            mode={modalType}
          />
        )}
      </ModalPortal>
    </>
  );
};

export default MatchingCardList;
