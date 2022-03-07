import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compareAsc } from 'date-fns';

import { addCancellationRequest, updateCancellationRequest, updatePermissionRequest } from '@/../reducers/schedule';
import { userSelector } from '@/../reducers/user';
import { useDateFormat } from '../../../../hooks';
import { Modal } from '../../../molecules';
import { Avatar } from '../../../atoms';
import { Content, DescriptionWrap, InfoContent } from '../../MatchingRequestForm/style';
import { MatchingInfoWrap, RequestFriendWrap, UserInfoWrap } from './style';
import { MatchingCardProps } from '@/../@types/schedule';

const ModalMatchingDetail = ({ schedule, show, onCancel }: {
  schedule?: MatchingCardProps;
  show: boolean;
  onCancel: () => void;
}) => {
  const dispatch = useDispatch();
  const { me } = useSelector(userSelector);

  const onAccept = useCallback(() => {
    if (!schedule) {
      return
    }
    const { id,
      isPermitted,
      userMathcing, userTotalCount, userReCount,
      friendMathcing, friendTotalCount, friendReCount } = schedule;

    if (!isPermitted) {
      Promise.all([
        userMathcing.includes(schedule?.Friend?.id),
        friendMathcing.includes(me?.id),
      ]).then((values) => {
        const [userRematchYn, friendRematchYn] = values;
        const userRematchRate = userRematchYn ? (userReCount / (userTotalCount + 1)) * 100 : null;
        const friendRematchRate = friendRematchYn
          ? (friendReCount / (friendTotalCount + 1)) * 100
          : null;
        return [userRematchRate, friendRematchRate];
      }).then((values) => {
        const [userRematchRate, friendRematchRate] = values;
        dispatch(updatePermissionRequest({
          scheduleId: id,
          permission: true,
          friendId: schedule.Friend.id,
          userRematchRate,
          friendRematchRate,
        }));
        onCancel();
      });
    }
  }, [schedule]);

  const onRefuse = useCallback(() => {
    dispatch(updatePermissionRequest({
      scheduleId: schedule?.id,
      permission: false,
    }));
    onCancel();
  }, [schedule]);

  const onCancelRequest = useCallback(() => {
    dispatch(addCancellationRequest({ id: schedule?.id }));
    onCancel();
  }, [schedule]);

  const onCancelResponse = useCallback(() => {
    if (!schedule) {
      return
    }
    const { id,
      userMathcing, userTotalCount, userReCount,
      friendMathcing, friendTotalCount, friendReCount, Cancel } = schedule;

    Promise.all([
      userMathcing.includes(schedule.Friend.id),
      friendMathcing.includes(me?.id),
    ]).then((values) => {
      const [userRematchYn, friendRematchYn] = values;
      const userRematchRate = userRematchYn ? (userReCount - 1 / (userTotalCount)) * 100 : null;
      const friendRematchRate = friendRematchYn
        ? (friendReCount - 1 / (friendTotalCount)) * 100
        : null;
      return [userRematchRate, friendRematchRate];
    }).then((values) => {
      const [userRematchRate, friendRematchRate] = values;
      dispatch(updateCancellationRequest({
        id,
        friendId: schedule.Friend.id,
        cancelId: Cancel?.id,
        userRematchRate,
        friendRematchRate,
      }));
      onCancel();
    });
  }, [schedule]);

  if (schedule?.isPermitted
    && compareAsc(schedule?.start, new Date()) > -1
    && schedule?.permission) {
    return (
      <Modal
        show={show}
        title={`${schedule?.Friend?.nickname}님과의 매칭정보`}
        onCancel={onCancel}
        onSubmit={onCancel}
        footer={(compareAsc(schedule?.start, new Date()) > -1)
          && (schedule?.Cancel?.RequestId !== me?.id) && !schedule?.Cancel}
        actions={!schedule?.Cancel?.id
          ? [{ id: 'cancel', title: '취소요청', type: 'error', onClick: onCancelRequest }]
          : (schedule?.Cancel?.RequestId !== me?.id
              && [{ id: 'cancelcheck', title: '취소요청 승인', type: 'error', onClick: onCancelResponse }])
              || []}
      >
        <RequestFriendWrap>
          <UserInfoWrap>
            <InfoContent id="friend_info">
              <Content>
                <Avatar
                  size={62}
                  src={schedule?.Friend?.Image?.src}
                />
              </Content>
              <div className="nickname">
                <div className="nickname">{schedule.Friend?.nickname}</div>
              </div>
            </InfoContent>
          </UserInfoWrap>
          <MatchingInfoWrap>
            <h4>매칭정보</h4>
            <div>{useDateFormat(schedule?.start || new Date(), 'yyyy년 MM월 dd일 HH:mm')} ~ {useDateFormat(schedule?.end || new Date(), 'HH:mm')}</div>
            <div>{schedule?.Gym?.address} {schedule?.Gym?.name}</div>
          </MatchingInfoWrap>
          <DescriptionWrap>
            <h4>요청 또는 전하고 싶은 말</h4>
            <div>{schedule?.description}</div>
          </DescriptionWrap>
        </RequestFriendWrap>
      </Modal>
    );
  }

  return (
    <Modal
      show={show}
      title={`${schedule?.Friend?.nickname}님과의 매칭정보`}
      onCancel={onCancel}
      footer={!schedule?.isPermitted
        || (compareAsc(schedule?.start, new Date()) > -1)}
      actions={!schedule?.isPermitted && !!schedule?.lastYn && schedule?.lastYn > -1
        ? [{ id: 'refuse', title: '거절', onClick: onRefuse },
          { id: 'accept', title: '수락', type: 'signature', onClick: onAccept }]
        : []}
    >
      <RequestFriendWrap>
        <UserInfoWrap>
          <InfoContent id="friend_info">
            <Content>
              <Avatar
                size={62}
                src={schedule?.Friend?.Image?.src}
              />
            </Content>
            <div className="nickname">
              <div className="nickname">{schedule?.Friend?.nickname}</div>
            </div>
          </InfoContent>
        </UserInfoWrap>
        <MatchingInfoWrap>
          <h4>매칭정보</h4>
          <div>{useDateFormat(schedule?.start || new Date(), 'yyyy년 MM월 dd일 HH:mm')} ~ {useDateFormat(schedule?.end || new Date(), 'HH:mm')}</div>
          <div>{schedule?.Gym?.address} {schedule?.Gym?.name}</div>
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
