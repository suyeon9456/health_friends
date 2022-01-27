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

const MatchingRequestForm = ({ friend, control, errors }) => {
  const { me } = useSelector((state) => state.user);

  return (
    <RequestFriendWrap>
      <MatchingInfoWrap>
        <h4>매칭정보</h4>
        <FormDateTimePicker
          label="날짜"
          essential
          control={control}
          error={{ startError: errors?.startDate, endError: errors?.endDate }}
        />
        <FormInput
          label="헬스장"
          id="gym"
          control={control}
          error={errors?.gym}
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
          id="description"
          placeholder="내용을 입력해주세요."
          maxLength={100}
          showCount
          control={control}
        />
      </DescriptionWrap>
    </RequestFriendWrap>
  );
};

MatchingRequestForm.propTypes = {
  friend: PropTypes.any,
  // startDate: PropTypes.instanceOf(Date).isRequired,
  errors: PropTypes.object,
  control: PropTypes.any,
};

export default MatchingRequestForm;
