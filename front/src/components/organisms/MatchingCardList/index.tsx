import React, { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { compareAsc } from 'date-fns';
import { BiEdit, BiPin, BiRepeat } from 'react-icons/bi';

import { profileSelector } from '@/../reducers/profile';
import { meSelector } from '@/../reducers/user';

import { rangeDate } from '@/../@utils/date';
import {
  loginedUserProfile,
  ModalType,
  ShowModalType,
} from '@/../@types/constant';
import { RecordPage } from '@/../@types/schedule';
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
  pages?: Array<RecordPage | undefined> | undefined;
  pageParams?: unknown[];
}) => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const { profile } = useSelector(profileSelector);
  const me = useSelector(meSelector);

  const [matchingId, setMatchingId] = useState<number | null>(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ShowModalType>(ModalType.VIEW);

  const onChangeShowDetailModal = useCallback(() => {
    setIsShowModal((prev) => !prev);
    setMatchingId(null);
  }, [isShowModal, matchingId, queryId, profile]);

  const onClickAction = useCallback(
    ({ key, id }) => {
      setMatchingId(id);
      setModalType(key);
      setIsShowModal((prev) => !prev);
    },
    [isShowModal, modalType, matchingId]
  );

  return (
    <>
      <MatchingCardListWrap>
        {Array.from({ length: pageParams?.length ?? 0 }, (_, i) => i).map(
          (_, i) => {
            if (!pages) return null;
            return pages?.[i]?.map((target) => {
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
        {isLoading && <LoadingMatchingCard />}
      </MatchingCardListWrap>
      <ModalPortal>
        {isShowModal &&
          (modalType === ModalType.VIEW ? (
            <ModalMatchingDetail
              matchingId={matchingId}
              queryId={queryId}
              onCancel={onChangeShowDetailModal}
            />
          ) : (
            <ModalMatchingEdit
              matchingId={matchingId}
              queryId={queryId}
              onCancel={onChangeShowDetailModal}
              mode={modalType}
            />
          ))}
      </ModalPortal>
    </>
  );
};

export default MatchingCardList;
