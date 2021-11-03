import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { MatchingInfoWrap,
  InfoContent,
  RequestFriendWrap,
  UserInfoWrap,
  Content,
  DescriptionWrap } from './style';
import { FormInput, FormTextarea, FormDateTimePicker } from '../../molecules';
import { Avatar } from '../../atoms';

const MatchingRequestForm = ({ type = 'add', friend, startDate,
  endDate,
  onChangeStartDate,
  onChangeEndDate, description, onChangeDescription }) => {
  const { me } = useSelector((state) => state.user);
  const { gym } = useSelector((state) => state.gym);
  const { schedule } = useSelector((state) => state.schedule);

  return (
    <RequestFriendWrap>
      <MatchingInfoWrap>
        <h4>매칭정보</h4>
        <FormDateTimePicker
          label="날짜"
          startDate={startDate}
          endDate={endDate}
          onChangeStartDate={onChangeStartDate}
          onChangeEndDate={onChangeEndDate}
          essential
        />
        <FormInput
          label="헬스장"
          value={type === 'add' ? gym.name : schedule?.address}
          disabled
          essential
        />
      </MatchingInfoWrap>
      <UserInfoWrap>
        <InfoContent id="my_info">
          <h4>내정보</h4>
          <Content>
            <Avatar size={62} />
            <div>
              <div className="nickname">{me?.nickname}</div>
              <div>{me?.description}</div>
            </div>
          </Content>
        </InfoContent>
        <InfoContent id="friend_info">
          <h4>친구정보</h4>
          <Content>
            <Avatar size={62} />
            <div>
              <div className="nickname">{friend?.nickname}</div>
              <div>{friend?.Userdetail?.description}</div>
            </div>
          </Content>
        </InfoContent>
      </UserInfoWrap>
      <DescriptionWrap>
        <h4>요청 또는 전하고 싶은 말</h4>
        <FormTextarea
          value={description}
          onChange={onChangeDescription}
          placeholder="내용을 입력해주세요."
          maxLength={100}
          showCount
        />
      </DescriptionWrap>
    </RequestFriendWrap>
  );
};

MatchingRequestForm.propTypes = {
  type: PropTypes.string,
  friend: PropTypes.any,
  startDate: PropTypes.instanceOf(Date).isRequired,
  endDate: PropTypes.instanceOf(Date).isRequired,
  onChangeStartDate: PropTypes.func.isRequired,
  onChangeEndDate: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
};

export default MatchingRequestForm;
