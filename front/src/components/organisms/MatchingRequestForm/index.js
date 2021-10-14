import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import { MatchingInfoWrap,
  InfoContent,
  RequestFriendWrap,
  UserInfoWrap,
  Content,
  DescriptionWrap } from './style';
import { FormDatePicker, FormInput, FormTextarea } from '../../molecules';
import { Avatar } from '../../atoms';

const MatchingRequestForm = ({ friend, date, setDate, description, onChangeDescription }) => {
  const { me } = useSelector((state) => state.user);
  const { gym } = useSelector((state) => state.gym);

  return (
    <RequestFriendWrap>
      <MatchingInfoWrap>
        <h4>매칭정보</h4>
        <FormDatePicker
          label="날짜"
          startDate={date}
          setStartDate={setDate}
        />
        <FormInput label="헬스장" value={gym.name} disabled />
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
  friend: PropTypes.node.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired,
  description: PropTypes.string.isRequired,
  onChangeDescription: PropTypes.func.isRequired,
};

export default MatchingRequestForm;
