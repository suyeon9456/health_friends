import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { compareAsc } from 'date-fns';
import { BiEdit, BiPin, BiPlus, BiRepeat } from 'react-icons/bi';

import { profileSelector } from '@/../reducers/profile';

import { rangeDate } from '@/../@utils/date';
import {
  ButtonType,
  loginedUserProfile,
  ModalType,
  ShowModalType,
} from '@/../@types/constant';
import { RecordPage } from '@/../@types/schedule';
import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';
import { schedulesByIdKey } from '@/../@utils/queryKey';
import { loadSchedulesAPI } from '@/api/schedule';
import { useLoadLoginedUser } from '@/hooks';
import { changeIsShowModal } from '@/../reducers/user';
import { LoadingMatchingCard, MatchingCard } from '../../molecules';
import { Button, Icon } from '../../atoms';
import ModalMatchingDetail from '../profile/ModalMatchingDetail';
import ModalMatchingEdit from '../profile/ModalMatchingEdit';
import { MatchingCardListWrap, RecordBody, RecordFooter } from './style';
import GlobalCustomModal from '../GlobalCustomModal';

const MatchingCardList = ({
  status,
  term,
  type,
  isCanceled,
}: {
  status: string[];
  term: string[];
  type: string[];
  isCanceled: boolean;
}) => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const dispatch = useDispatch();
  const { profile } = useSelector(profileSelector);

  const [matchingId, setMatchingId] = useState<number | null>(null);
  const [modalType, setModalType] = useState<ShowModalType>(ModalType.VIEW);

  const { data: me } = useLoadLoginedUser();
  const { isFetching, hasNextPage, fetchNextPage, data } = useInfiniteQuery<
    RecordPage | undefined,
    AxiosError
  >(
    schedulesByIdKey({
      profileId: profile?.id,
      status,
      term,
      type,
      isCanceled,
    }),
    ({ pageParam = 0 }: any) => {
      return loadSchedulesAPI({
        isProfile: me?.id !== profile?.id,
        profileId: profile?.id,
        limit: pageParam,
        status,
        term,
        type,
        isCanceled,
      });
    },
    {
      refetchOnWindowFocus: false,
      enabled: !!profile,
      staleTime: 2 * 60 * 1000,
      getNextPageParam: (lastPage: RecordPage | undefined) => {
        if (!lastPage) return;
        return lastPage[lastPage.length - 1].nextCursor > 0
          ? lastPage[lastPage.length - 1].nextCursor
          : undefined;
      },
      onSuccess: (test) => {
        console.log(test);
        console.log(test?.pageParams?.length);
        console.log(
          Array.from({ length: test?.pageParams?.length ?? 0 }, (_, i) => i)
        );
      },
      useErrorBoundary: true,
    }
  );

  const onCancle = useCallback(() => {
    dispatch(changeIsShowModal(null));
  }, [matchingId]);

  const onClickAction = useCallback(
    ({ key, id }) => {
      setMatchingId(id);
      setModalType(key);
      dispatch(changeIsShowModal(key));
    },
    [modalType, matchingId]
  );
  return (
    <>
      <RecordBody schedules={data?.pages.length ?? 0}>
        <MatchingCardListWrap>
          {Array.from(
            { length: data?.pageParams?.length ?? 0 },
            (_, i) => i
          ).map((_, i) => {
            if (!data?.pages) return null;
            console.log(data?.pages);
            return data?.pages?.[i]?.map((target) => {
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
          })}
          {isFetching && <LoadingMatchingCard />}
        </MatchingCardListWrap>
      </RecordBody>
      <RecordFooter>
        <Button
          type={ButtonType.PRIMARY}
          disabled={!hasNextPage}
          icon={<Icon icon={<BiPlus />} />}
          onClick={() => fetchNextPage()}
        >
          더보기
        </Button>
      </RecordFooter>
      <GlobalCustomModal id={ModalType.VIEW}>
        <ModalMatchingDetail
          matchingId={matchingId}
          queryId={queryId}
          onCancel={onCancle}
        />
      </GlobalCustomModal>
      <GlobalCustomModal id={ModalType.EDIT}>
        <ModalMatchingEdit
          matchingId={matchingId}
          queryId={queryId}
          onCancel={onCancle}
          mode={modalType}
        />
      </GlobalCustomModal>
    </>
  );
};

export default MatchingCardList;
