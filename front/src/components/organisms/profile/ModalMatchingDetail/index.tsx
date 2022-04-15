import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { compareAsc } from 'date-fns';

import { MatchingCardProps } from '@/../@types/schedule';
import { useQuery } from 'react-query';
import { Me } from '@/../@types/user';
import { useRouter } from 'next/router';
import { profileSelector } from '@/../reducers/profile';
import { loadLoginedUserAPI } from '@/api/user';
import { meKey } from '@/../@types/queryKey';
import { matchingActions } from '@/hooks/useMatchingActions';
import { useDateFormat } from '../../../../hooks';
import { Modal } from '../../../molecules';
import { Avatar } from '../../../atoms';
import {
  Content,
  DescriptionWrap,
  InfoContent,
} from '../../MatchingRequestForm/style';
import { MatchingInfoWrap, RequestFriendWrap, UserInfoWrap } from './style';

const ModalMatchingDetail = ({
  schedule,
  onCancel,
}: {
  schedule?: MatchingCardProps | null;
  onCancel: () => void;
}) => {
  const router = useRouter();
  const { id: queryId } = router.query;

  const { profile } = useSelector(profileSelector);
  const { data: me } = useQuery<Me>(meKey, () => loadLoginedUserAPI(), {
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => console.log(schedule), [schedule]);
  // if (!schedule) return;

  return (
    <Modal
      title={`${schedule?.Friend?.nickname}님과의 매칭정보`}
      onCancel={onCancel}
      footer={
        !schedule?.isPermitted || compareAsc(schedule?.start, new Date()) > -1
      }
      actions={matchingActions(
        onCancel,
        {
          id: schedule?.id,
          isPermitted: schedule?.isPermitted,
          permission: schedule?.permission,
          isLast: schedule?.start
            ? compareAsc(schedule?.start, new Date()) < 0
            : true,
          Requester: { id: schedule?.Requester.id },
          Cancel: {
            id: schedule?.Cancel?.id,
            RequestId: schedule?.Cancel?.RequestId,
          },
        },
        me
      )}
    >
      <RequestFriendWrap>
        <UserInfoWrap>
          <InfoContent id="friend_info">
            <Content>
              <Avatar size={62} src={schedule?.Friend?.Image?.src} />
            </Content>
            <div className="nickname">
              <div className="nickname">{schedule?.Friend?.nickname}</div>
            </div>
          </InfoContent>
        </UserInfoWrap>
        <MatchingInfoWrap>
          <h4>매칭정보</h4>
          <div>
            {useDateFormat(
              schedule?.start ?? new Date(),
              'yyyy년 MM월 dd일 HH:mm'
            )}{' '}
            ~ {useDateFormat(schedule?.end ?? new Date(), 'HH:mm')}
          </div>
          <div>
            {schedule?.Gym?.address} {schedule?.Gym?.name}
          </div>
        </MatchingInfoWrap>
        <DescriptionWrap>
          <h4>요청 또는 전하고 싶은 말</h4>
          <div>{schedule?.description}</div>
        </DescriptionWrap>
      </RequestFriendWrap>
    </Modal>
  );
};

export default ModalMatchingDetail;
