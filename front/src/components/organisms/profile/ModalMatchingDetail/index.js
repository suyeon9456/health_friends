import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

import useInput from '../../../../hooks/useInput';
import useDateFormat from '../../../../hooks/useDateFormat';
import { Modal } from '../../../molecules';
import MatchingRequestForm from '../../MatchingRequestForm';
import { Content, DescriptionWrap, InfoContent, MatchingInfoWrap, RequestFriendWrap, UserInfoWrap } from '../../MatchingRequestForm/style';
import { Avatar } from '../../../atoms';

const ModalMatchingDetail = ({ show, onCancel, type }) => {
  const { schedule } = useSelector((state) => state.schedule);
  const { me } = useSelector((state) => state.user);
  const [date, setDate] = useState();
  const [description, onChangeDescription] = useInput();
  useEffect(() => {
    if (schedule) {
      const startDate = useDateFormat(schedule?.start, 'yyyy년 MM월 dd일 HH:mm');
      const endDate = useDateFormat(schedule?.end, 'HH:mm');
      const matchingDate = [startDate, ' ~ ', endDate].join('');
      setDate(matchingDate);
    }
  }, [schedule]);
  return (
    <Modal
      show={show}
      title={`${schedule?.nickname}님과의 매칭정보`}
      onCancel={onCancel}
      // onSubmit={onSubmit}
      footer
    >
      {type === 'view'
        ? (
          <RequestFriendWrap>
            <MatchingInfoWrap>
              <h4>매칭정보</h4>
              <div>{date}</div>
              <div>{schedule?.address}</div>
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
            friend={schedule}
            date={date}
            setDate={setDate}
            description={description}
            onChangeDescription={onChangeDescription}
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
