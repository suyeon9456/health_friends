import React, { useEffect, useMemo } from 'react';
import { useQuery } from 'react-query';
import { AxiosError } from 'axios';

import { MatchingCardProps } from '@/../@types/schedule';
import { rangeDate } from '@/../@utils/date';
import { useLoadLoginedUser, useMatchingActions } from '@/hooks';
import { scheduleByIdKey } from '@/../@utils/queryKey';
import { loadScheduleAPI } from '@/api/schedule';
import useGetProfile from '@/hooks/useGetProfile';
import { Modal } from '../../../molecules';
import { Avatar } from '../../../atoms';
import {
  Content,
  DescriptionWrap,
  InfoContent,
} from '../../MatchingRequestForm/style';
import { MatchingInfoWrap, RequestFriendWrap, UserInfoWrap } from './style';

const ModalMatchingDetail = ({
  matchingId,
  queryId,
  onCancel,
}: {
  matchingId: number | null;
  queryId?: string | string[];
  onCancel: () => void;
}) => {
  const { data: me } = useLoadLoginedUser();
  const { data: profile } = useGetProfile();
  const [actions, onChangeActions] = useMatchingActions([], onCancel);

  const { data } = useQuery<MatchingCardProps | undefined, AxiosError>(
    scheduleByIdKey(matchingId, queryId, profile?.id),
    () => loadScheduleAPI(matchingId, queryId, profile?.id),
    {
      refetchOnWindowFocus: false,
      enabled: !!matchingId && !!profile,
    }
  );

  const schedule = useMemo(() => {
    if (!data) return null;
    return {
      ...data,
      start: new Date(data.startDate),
      end: new Date(data.endDate),
      Friend: data.Receiver.id === profile?.id ? data.Requester : data.Receiver,
    };
  }, [data]);

  useEffect(() => {
    if (!schedule) return;
    onChangeActions({
      schedule,
      profileId: profile?.id,
      me,
    });
  }, [schedule, me, profile]);

  if (!schedule) {
    return null;
  }

  return (
    <Modal
      title={`${schedule.Friend?.nickname}님과의 매칭정보`}
      onCancel={onCancel}
      footer
      actions={actions}
    >
      <RequestFriendWrap>
        <UserInfoWrap>
          <InfoContent id="friend_info">
            <Content>
              <Avatar size={62} src={schedule.Friend.Image?.src} />
            </Content>
            <div className="nickname">
              <div className="nickname">{schedule.Friend?.nickname}</div>
            </div>
          </InfoContent>
        </UserInfoWrap>
        <MatchingInfoWrap>
          <h4>매칭정보</h4>
          <div>{rangeDate(schedule?.start, schedule?.end)}</div>
          <div>
            {schedule.Gym?.addressRoad}({schedule.Gym?.address}){' '}
            {schedule.Gym?.name}
          </div>
        </MatchingInfoWrap>
        <DescriptionWrap>
          <h4>요청 또는 전하고 싶은 말</h4>
          <div>{schedule.description}</div>
        </DescriptionWrap>
      </RequestFriendWrap>
    </Modal>
  );
};

export default ModalMatchingDetail;
