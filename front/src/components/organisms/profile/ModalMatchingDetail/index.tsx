import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compareAsc } from 'date-fns';

import { MatchingCardProps } from '@/../@types/schedule';
import { ButtonType } from '@/../@types/utils';
import { useMutation, useQuery } from 'react-query';
import { Me } from '@/../@types/user';
import { useRouter } from 'next/router';
import { profileSelector } from '@/../reducers/profile';
import { loadLoginedUserAPI } from '@/api/user';
import { meKey } from '@/../@types/queryKey';
import {
  addCancelAPI,
  updateCancelAPI,
  updatePermissionAPI,
} from '@/api/schedule';
import { UpdateCancellationProps } from '@/../@types/action';
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

  const scheduleMutation = useMutation(
    (data: { scheduleId?: number; permission: boolean; friendId: number }) =>
      updatePermissionAPI(data)
  );

  const cancelMutation = useMutation((data: { id?: number }) =>
    addCancelAPI(data)
  );

  const updateCancelMutation = useMutation((data: UpdateCancellationProps) =>
    updateCancelAPI(data)
  );

  const onAccept = useCallback(() => {
    if (!schedule) return;
    const { id, isPermitted } = schedule;

    if (!isPermitted) {
      scheduleMutation.mutate({
        scheduleId: id,
        permission: true,
        friendId: schedule.Friend.id,
      });
    }
  }, [schedule]);

  const onRefuse = useCallback(() => {
    scheduleMutation.mutate({
      id: schedule?.id,
      permission: false,
    });
    onCancel();
  }, [schedule]);

  const onCancelRequest = useCallback(() => {
    cancelMutation.mutate({ id: schedule?.id });
    onCancel();
  }, [schedule]);

  const onCancelResponse = useCallback(() => {
    if (!schedule) {
      return;
    }
    const {
      id,
      userMathcing,
      userTotalCount,
      userReCount,
      friendMathcing,
      friendTotalCount,
      friendReCount,
      Cancel,
    } = schedule;

    void Promise.all([
      userMathcing.includes(schedule.Friend.id),
      friendMathcing.includes(queryId ? profile.id : me?.id),
    ])
      .then((values) => {
        const [userRematchYn, friendRematchYn] = values;
        const userRematchRate = userRematchYn
          ? (userReCount - 1 / userTotalCount) * 100
          : null;
        const friendRematchRate = friendRematchYn
          ? (friendReCount - 1 / friendTotalCount) * 100
          : null;
        return [userRematchRate, friendRematchRate];
      })
      .then((values) => {
        const [userRematchRate, friendRematchRate] = values;
        updateCancelMutation.mutate({
          id,
          friendId: schedule.Friend.id,
          cancelId: Cancel?.id,
          userRematchRate,
          friendRematchRate,
        });
        onCancel();
      });
  }, [schedule]);

  // if (
  //   schedule?.isPermitted &&
  //   compareAsc(schedule?.start, new Date()) > -1 &&
  //   schedule?.permission
  // ) {
  //   return (
  //     <Modal
  //       title={`${schedule?.Friend?.nickname}님과의 매칭정보`}
  //       onCancel={onCancel}
  //       onSubmit={onCancel}
  //       footer={
  //         compareAsc(schedule?.start, new Date()) > -1 &&
  //         schedule?.Cancel?.RequestId !== me?.id &&
  //         !schedule?.Cancel
  //       }
  //       actions={
  //         !schedule?.Cancel?.id
  //           ? [
  //               {
  //                 id: 'cancel',
  //                 title: '취소요청',
  //                 type: ButtonType.ERROR,
  //                 onClick: onCancelRequest,
  //               },
  //             ]
  //           : (schedule?.Cancel?.RequestId !== me?.id && [
  //               {
  //                 id: 'cancelcheck',
  //                 title: '취소요청 승인',
  //                 type: ButtonType.ERROR,
  //                 onClick: onCancelResponse,
  //               },
  //             ]) ||
  //             []
  //       }
  //     >
  //       <RequestFriendWrap>
  //         <UserInfoWrap>
  //           <InfoContent id="friend_info">
  //             <Content>
  //               <Avatar size={62} src={schedule?.Friend?.Image?.src} />
  //             </Content>
  //             <div className="nickname">
  //               <div className="nickname">{schedule.Friend?.nickname}</div>
  //             </div>
  //           </InfoContent>
  //         </UserInfoWrap>
  //         <MatchingInfoWrap>
  //           <h4>매칭정보</h4>
  //           <div>
  //             {useDateFormat(
  //               schedule?.start || new Date(),
  //               'yyyy년 MM월 dd일 HH:mm'
  //             )}{' '}
  //             ~ {useDateFormat(schedule?.end || new Date(), 'HH:mm')}
  //           </div>
  //           <div>
  //             {schedule?.Gym?.address} {schedule?.Gym?.name}
  //           </div>
  //         </MatchingInfoWrap>
  //         <DescriptionWrap>
  //           <h4>요청 또는 전하고 싶은 말</h4>
  //           <div>{schedule?.description}</div>
  //         </DescriptionWrap>
  //       </RequestFriendWrap>
  //     </Modal>
  //   );
  // }
  useEffect(() => console.log(schedule), [schedule]);

  return (
    <Modal
      title={`${schedule?.Friend?.nickname}님과의 매칭정보`}
      onCancel={onCancel}
      footer={
        !schedule?.isPermitted || compareAsc(schedule?.start, new Date()) > -1
      }
      actions={
        !schedule?.isPermitted && !!schedule?.lastYn && schedule?.lastYn > -1
          ? [
              { id: 'refuse', title: '거절', onClick: onRefuse },
              {
                id: 'accept',
                title: '수락',
                type: ButtonType.SIGNATURE,
                onClick: onAccept,
              },
            ]
          : []
      }
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
