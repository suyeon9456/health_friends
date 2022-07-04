import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { BiPlus } from 'react-icons/bi';

import { profileSelector } from '@/../reducers/profile';

import { rangeDate } from '@/../@utils/date';
import { ButtonType } from '@/../@types/constant';
import { RecordPage } from '@/../@types/schedule';
import { useInfiniteQuery } from 'react-query';
import { AxiosError } from 'axios';
import { schedulesByIdKey } from '@/../@utils/queryKey';
import { loadSchedulesAPI } from '@/api/schedule';
import { useLoadLoginedUser } from '@/hooks';
import { LoadingMatchingCard, MatchingCard } from '../../molecules';
import { Button, Icon } from '../../atoms';
import { MatchingCardListWrap, RecordBody, RecordFooter } from './style';

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
  const { profile } = useSelector(profileSelector);

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
      useErrorBoundary: true,
    }
  );
  return (
    <>
      <RecordBody schedules={data?.pages.length ?? 0}>
        <MatchingCardListWrap>
          {data?.pages?.map((group) => (
            <Fragment key={group?.[group?.length - 1].nextCursor}>
              {group?.map((item) => {
                const { start, end, Receiver, Requester, Cancel } = item;
                const friend =
                  profile.id === Receiver.id ? Requester : Receiver;
                return (
                  <MatchingCard
                    key={item.id}
                    id={item.id}
                    nickname={friend.nickname}
                    description={item.Gym.address + item.Gym.name}
                    image={friend?.Image?.src ?? ''}
                    date={rangeDate(start, end)}
                    start={start}
                    isCancel={!!Cancel && !Cancel?.isCanceled}
                  />
                );
              })}
            </Fragment>
          ))}
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
    </>
  );
};

export default MatchingCardList;
