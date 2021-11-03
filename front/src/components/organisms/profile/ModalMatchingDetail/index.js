import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import { useInput, useDateFormat } from '../../../../hooks';
import { Avatar } from '../../../atoms';
import { Modal } from '../../../molecules';
import MatchingRequestForm from '../../MatchingRequestForm';
import { Content, DescriptionWrap, InfoContent } from '../../MatchingRequestForm/style';
import { MatchingInfoWrap, RequestFriendWrap, UserInfoWrap } from './style';
import { UPDATE_SCHEDULE_REQUEST } from '../../../../../reducers/schedule';

const ModalMatchingDetail = ({ show, onCancel, type }) => {
  const dispatch = useDispatch();
  const { schedule } = useSelector((state) => state.schedule);
  const { me } = useSelector((state) => state.user);

  const [startDate, setStartDate] = useState(me?.Userdetail?.startDate || new Date());
  const [endDate, setEndDate] = useState(me?.Userdetail?.endDate || new Date());
  // const [startTime, setStartTime] = useState('');
  // const [endTime, setEndTime] = useState('');
  const onChangeStartDate = useCallback((data) => {
    setStartDate(data);
  }, []);
  const onChangeEndDate = useCallback((data) => {
    setEndDate(data);
  }, []);

  const [formatDate, setFormatDate] = useState('');
  const [description, onChangeDescription] = useInput(schedule?.description || '');
  const onSubmit = useCallback(async () => {
    const date = useDateFormat(startDate, 'yyyy-MM-dd');
    const time = useDateFormat(endDate, 'HH:mm');
    const dateTime = [date, time].join(' ');
    await setEndDate(new Date(dateTime));

    dispatch({
      type: UPDATE_SCHEDULE_REQUEST,
      data: { startDate, endDate, description, id: schedule.id },
    });
  }, [startDate, endDate, description, schedule]);
  useEffect(() => {
    if (schedule) {
      const start = useDateFormat(schedule?.start, 'yyyy년 MM월 dd일 HH:mm');
      const end = useDateFormat(schedule?.end, 'HH:mm');
      const matchingDate = [start, ' ~ ', end].join('');
      setFormatDate(matchingDate);
    }
  }, [schedule]);

  return (
    <Modal
      show={show}
      title={`${schedule?.nickname}님과의 매칭${type !== 'view' ? '수정' : '정보'}`}
      onCancel={onCancel}
      onSubmit={onSubmit}
      footer={type !== 'view'}
    >
      {type === 'view'
        ? (
          <RequestFriendWrap>
            <MatchingInfoWrap>
              <h4>매칭정보</h4>
              <div>일정: {formatDate}</div>
              <div>헬스장: {schedule?.address}</div>
            </MatchingInfoWrap>
            <UserInfoWrap>
              <InfoContent id="my_info">
                <h4>내정보</h4>
                <Content>
                  <Avatar size={62} />
                  <div>
                    <div className="nickname">{me?.nickname}</div>
                  </div>
                </Content>
              </InfoContent>
              <InfoContent id="friend_info">
                <h4>친구정보</h4>
                <Content>
                  <Avatar size={62} />
                  <div>
                    <div className="nickname">{schedule?.nickname}</div>
                  </div>
                </Content>
              </InfoContent>
            </UserInfoWrap>
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
