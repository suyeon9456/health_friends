import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { compareAsc } from 'date-fns';

import { RootState } from '@/../store/configureStore';
import { useDateFormat } from '../../../../hooks';
import { Avatar } from '../../../atoms';
import { Modal } from '../../../molecules';
import { Content, DescriptionWrap, InfoContent } from '../../MatchingRequestForm/style';
import { MatchingInfoWrap, RequestFriendWrap, UserInfoWrap } from './style';
import { addCancellationRequest, updateCancellationRequest, updatePermissionRequest } from '@/../reducers/schedule';

const ModalMatchingDetail = ({ show, onCancel }: {
  show: boolean;
  onCancel: () => void;
}) => {
  const dispatch = useDispatch();
  const { schedule } = useSelector((state: RootState) => state.schedule);
  const { me } = useSelector((state: RootState) => state.user);

  const [fNickname, setFNickname] = useState<string>('');
  const [fId, setFId] = useState<number>(-1);

  const [formatDate, setFormatDate] = useState<string>('');

  const onAccept = useCallback(() => {
    const { id,
      isPermitted,
      userMathcing, userTotalCount, userReCount,
      friendMathcing, friendTotalCount, friendReCount } = schedule;

    if (!isPermitted) {
      Promise.all([
        userMathcing.includes(fId),
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
          friendId: fId,
          userRematchRate,
          friendRematchRate,
        }));
        onCancel();
      });
    }
  }, [schedule, fId]);

  const onRefuse = useCallback(() => {
    dispatch(updatePermissionRequest({
      scheduleId: schedule.id,
      permission: false,
    }));
    onCancel();
  }, [schedule]);

  const onCancelRequest = useCallback(() => {
    dispatch(addCancellationRequest({ id: schedule.id }));
    onCancel();
  }, [schedule]);

  const onCancelResponse = useCallback(() => {
    const { id,
      userMathcing, userTotalCount, userReCount,
      friendMathcing, friendTotalCount, friendReCount, Cancel } = schedule;

    Promise.all([
      userMathcing.includes(fId),
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
        friendId: fId,
        cancelId: Cancel?.id,
        userRematchRate,
        friendRematchRate,
      }));
      onCancel();
    });
  }, [schedule]);

  useEffect(() => {
    if (schedule) {
      const { Friend: { id: friendId }, Requester } = schedule;
      const start = useDateFormat(schedule.start, 'yyyy년 MM월 dd일 HH:mm');
      const end = useDateFormat(schedule.end, 'HH:mm');
      const matchingDate = [start, ' ~ ', end].join('');
      setFormatDate(matchingDate);
      if (friendId === me?.id) {
        setFNickname(Requester?.nickname);
        setFId(Requester?.id);
      }

      if (friendId !== me?.id) {
        setFNickname(schedule.Friend?.nickname);
        setFId(friendId);
      }
    }
  }, [schedule]);

  if (schedule?.isPermitted
    && compareAsc(new Date(schedule?.start), new Date()) > -1
    && schedule?.permission) {
    return (
      <Modal
        show={show}
        title={`${fNickname}님과의 매칭정보`}
        onCancel={onCancel}
        onSubmit={onCancel}
        footer={(compareAsc(new Date(schedule?.start), new Date()) > -1)
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
                  src={schedule?.Friend?.id === me?.id
                    ? schedule?.Requester?.Image?.src : schedule?.Friend?.Image?.src}
                />
              </Content>
              <div className="nickname">
                <div className="nickname">{fNickname}</div>
              </div>
            </InfoContent>
          </UserInfoWrap>
          <MatchingInfoWrap>
            <h4>매칭정보</h4>
            <div>{formatDate}</div>
            <div>{schedule?.address} {schedule?.gymName}</div>
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
      title={`${fNickname}님과의 매칭정보`}
      onCancel={onCancel}
      footer={!schedule?.isPermitted
        || (compareAsc(new Date(schedule?.start), new Date()) > -1)}
      actions={!schedule?.isPermitted && schedule?.lastYn > -1
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
                src={schedule?.Friend?.id === me?.id
                  ? schedule?.Requester?.Image?.src : schedule?.Friend?.Image?.src}
              />
            </Content>
            <div className="nickname">
              <div className="nickname">{fNickname}</div>
            </div>
          </InfoContent>
        </UserInfoWrap>
        <MatchingInfoWrap>
          <h4>매칭정보</h4>
          <div>{formatDate}</div>
          <div>{schedule?.address} {schedule?.gymName}</div>
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
