import React from 'react';

import { MatchingInfoWrap,
  InfoContent,
  RequestFriendWrap,
  UserInfoWrap,
  Content,
  DescriptionWrap } from './style';
import FormDatePicker from '../../molecules/FormDatePicker';
import FormInput from '../../molecules/FormInput';
import FormTextarea from '../../molecules/FormTextarea';
import Avatar from '../../atoms/Avatar';

const MatchingRequestForm = () => (
  <RequestFriendWrap>
    <MatchingInfoWrap>
      <h4>매칭정보</h4>
      <FormDatePicker
        label="날짜"
      />
      <FormInput
        label="주소"
      />
    </MatchingInfoWrap>
    <UserInfoWrap>
      <InfoContent id="my_info">
        <h4>내정보</h4>
        <Content>
          <Avatar size={62} />
          <div>
            <div className="nickname">닉네임</div>
            <div>간단소개</div>
          </div>
        </Content>
      </InfoContent>
      <InfoContent id="friend_info">
        <h4>친구정보</h4>
        <Content>
          <Avatar size={62} />
          <div>
            <div className="nickname">닉네임</div>
            <div>간단소개</div>
          </div>
        </Content>
      </InfoContent>
    </UserInfoWrap>
    <DescriptionWrap>
      <h4>요청 또는 전하고 싶은 말</h4>
      <FormTextarea />
    </DescriptionWrap>
  </RequestFriendWrap>
);

export default MatchingRequestForm;
