import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import format from 'date-fns/format';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useDateFormat } from '../../../../hooks';
import { Avatar } from '../../../atoms';
import { Modal } from '../../../molecules';
import MatchingRequestForm from '../../MatchingRequestForm';
import { Content, DescriptionWrap, InfoContent } from '../../MatchingRequestForm/style';
import { MatchingInfoWrap, RequestFriendWrap, UserInfoWrap } from './style';
import { UPDATE_PERMISSION_REQUEST, UPDATE_SCHEDULE_REQUEST } from '../../../../../reducers/schedule';

const schema = yup.object({
  startDate: yup.string().required('날짜는 필수 항목입니다.'),
  endDate: yup.string().required('날짜는 필수 항목입니다.'),
  gym: yup.string().required('헬스장은 필수 항목입니다.'),
}).required();

const ModalMatchingDetail = ({ show, onCancel, type }) => {
  const dispatch = useDispatch();
  const { schedule } = useSelector((state) => state.schedule);
  const { me } = useSelector((state) => state.user);

  const [fNickname, setFNickname] = useState('');
  const [fId, setFId] = useState(-1);

  const { handleSubmit, control, setValue, formState: { errors } } = useForm({
    defaultValues: {
      startDate: schedule?.start || new Date(),
      endDate: schedule?.end || new Date(),
      gym: schedule?.address || '',
      description: '',
    },
    resolver: yupResolver(schema),
  });

  const [formatDate, setFormatDate] = useState('');
  const onSubmit = useCallback((data) => {
    const date = format(new Date(data.startDate), 'yyyy-MM-dd');
    const time = format(new Date(data.endDate), 'HH:mm');
    const startDateTime = format(new Date(data.startDate), 'yyyy-MM-dd HH:mm');
    const dateTime = [date, time].join(' ');
    dispatch({
      type: UPDATE_SCHEDULE_REQUEST,
      data: { ...data, startDate: startDateTime, endDate: dateTime, id: schedule.id },
    });
  }, []);

  const onAccept = useCallback(async () => {
    const { id, isPermitted, friendRematching, friendRematchingCount,
      userTotalMatching, userRematchingCount, userTotalCount, friendTotalCount } = schedule;

    if (!isPermitted) {
      Promise.all([
        userTotalMatching[fId]
          ? userRematchingCount + 1
          : userRematchingCount,
        friendRematching[me?.id]
          ? friendRematchingCount + 1
          : friendRematchingCount,
      ]).then((values) => {
        const [myRematchingCount, fRematchingCount] = values;
        const myRematchingRate = (myRematchingCount / (userTotalCount + 1)) * 100;
        const friendRematchingRate = (fRematchingCount / (friendTotalCount + 1)) * 100;
        return [myRematchingRate, friendRematchingRate];
      }).then((values) => {
        const [myRematchingRate, friendRematchingRate] = values;
        dispatch({
          type: UPDATE_PERMISSION_REQUEST,
          data: { scheduleId: id,
            permission: true,
            friendId: fId,
            myRematchingRate,
            friendRematchingRate },
        });
        onCancel();
      });
    }
  }, [schedule, fId]);

  const onRefuse = useCallback(() => {
    dispatch({
      type: UPDATE_PERMISSION_REQUEST,
      data: { scheduleId: schedule.id, permission: false },
    });
    onCancel();
  }, [schedule]);

  useEffect(() => {
    if (schedule) {
      const friend = schedule?.friend?.id;
      setFNickname(friend === me?.id
        ? schedule?.requester?.nickname
        : schedule?.friend?.nickname);
      setFId(friend === me?.id
        ? schedule?.requester?.id
        : friend);
      const start = useDateFormat(schedule?.start, 'yyyy년 MM월 dd일 HH:mm');
      const end = useDateFormat(schedule?.end, 'HH:mm');
      const matchingDate = [start, ' ~ ', end].join('');
      setFormatDate(matchingDate);
      setValue('startDate', schedule.start);
      setValue('endDate', schedule.end);
      setValue('gym', schedule.address);
      setValue('description', schedule.description);
    }
  }, [schedule]);

  return (
    <Modal
      show={show}
      title={`${fNickname}님과의 매칭${type !== 'view' ? '수정' : '정보'}`}
      onCancel={onCancel}
      onSubmit={handleSubmit(onSubmit)}
      footer={type !== 'view'}
      actions={type === 'view' && schedule?.friend?.id === me?.id
        ? [{ id: 'refuse', title: '거절', onClick: onRefuse },
          { id: 'accept', title: '수락', type: 'primary', onClick: onAccept }]
        : []}
      form
    >
      {type === 'view'
        ? (
          <RequestFriendWrap>
            <UserInfoWrap>
              <InfoContent id="friend_info">
                <Content>
                  <Avatar size={62} />
                </Content>
                <div className="nickname">
                  <div className="nickname">{fNickname}</div>
                </div>
              </InfoContent>
            </UserInfoWrap>
            <MatchingInfoWrap>
              <h4>매칭정보</h4>
              <div>{formatDate}</div>
              <div>{schedule?.address}</div>
            </MatchingInfoWrap>
            <DescriptionWrap>
              <h4>요청 또는 전하고 싶은 말</h4>
              <div>{schedule?.description}</div>
            </DescriptionWrap>
          </RequestFriendWrap>
        )
        : (
          <MatchingRequestForm
            type="update"
            friend={schedule?.friend}
            control={control}
            errors={errors}
          />
        )}
    </Modal>
  );
};

ModalMatchingDetail.propTypes = {
  show: PropTypes.bool,
  onCancel: PropTypes.func,
  type: PropTypes.string,
};

export default ModalMatchingDetail;
