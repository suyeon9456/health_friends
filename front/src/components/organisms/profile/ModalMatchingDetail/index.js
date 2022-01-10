import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { useInput, useDateFormat } from '../../../../hooks';
import { Avatar } from '../../../atoms';
import { Modal } from '../../../molecules';
import MatchingRequestForm from '../../MatchingRequestForm';
import { Content, DescriptionWrap, InfoContent } from '../../MatchingRequestForm/style';
import { MatchingInfoWrap, RequestFriendWrap, UserInfoWrap } from './style';
import { UPDATE_PERMISSION_REQUEST, UPDATE_SCHEDULE_REQUEST } from '../../../../../reducers/schedule';

const ModalMatchingDetail = ({ show, onCancel, type }) => {
  const dispatch = useDispatch();
  const { schedule } = useSelector((state) => state.schedule);
  const { me } = useSelector((state) => state.user);

  const [startDate, setStartDate] = useState(schedule?.start || new Date());
  const [endDate, setEndDate] = useState(schedule?.end || new Date());

  // const [nickname, setNickname] = useState('');
  const [fNickname, setFNickname] = useState('');

  const onChangeStartDate = useCallback((data) => {
    setStartDate(data);
  }, []);
  const onChangeEndDate = useCallback((data) => {
    setEndDate(data);
  }, []);

  const [formatDate, setFormatDate] = useState('');
  const [description, onChangeDescription, setDescription] = useInput(schedule?.description || '');
  const onSubmit = useCallback(() => {
    const date = useDateFormat(startDate, 'yyyy-MM-dd');
    const time = useDateFormat(endDate, 'HH:mm');
    const startDateTime = useDateFormat(startDate, 'yyyy-MM-dd HH:mm');
    const dateTime = [date, time].join(' ');
    dispatch({
      type: UPDATE_SCHEDULE_REQUEST,
      data: { startDate: startDateTime, endDate: dateTime, description, id: schedule.id },
    });
  }, [startDate, endDate, description, schedule]);

  const onAccept = useCallback(() => {
    dispatch({
      type: UPDATE_PERMISSION_REQUEST,
      data: { scheduleId: schedule.id, permission: true },
    });
    onCancel();
  }, [schedule]);

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
      const start = useDateFormat(schedule?.start, 'yyyy년 MM월 dd일 HH:mm');
      const end = useDateFormat(schedule?.end, 'HH:mm');
      const matchingDate = [start, ' ~ ', end].join('');
      setFormatDate(matchingDate);
      setStartDate(schedule.start);
      setEndDate(schedule.end);
      setDescription(schedule.description);
    }
  }, [schedule]);

  return (
    <Modal
      show={show}
      title={`${fNickname}님과의 매칭${type !== 'view' ? '수정' : '정보'}`}
      onCancel={onCancel}
      onSubmit={onSubmit}
      footer={type !== 'view'}
      actions={type === 'view' && schedule?.friend?.id === me?.id
        ? [{ id: 'refuse', title: '거절', onClick: onRefuse },
          { id: 'accept', title: '수락', type: 'primary', onClick: onAccept }]
        : []}
    >
      {type === 'view'
        ? (
          <RequestFriendWrap>
            <UserInfoWrap>
              {/* <InfoContent id="my_info">
                <h4>내정보</h4>
                <Content>
                  <Avatar size={62} />
                  <div>
                    <div className="nickname">{me?.nickname}</div>
                  </div>
                </Content>
              </InfoContent> */}
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
            description={description}
            onChangeDescription={onChangeDescription}
            startDate={startDate}
            onChangeStartDate={onChangeStartDate}
            endDate={endDate}
            onChangeEndDate={onChangeEndDate}
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
