import React, { useEffect } from 'react';

import { MatchingReqFormProps } from '@/../@types/schedule';
import { useLoadLoginedUser } from '@/hooks';
import { FormInput, FormTextarea, FormDateTimePicker } from '../../molecules';
import { Avatar } from '../../atoms';
import {
  MatchingInfoWrap,
  InfoContent,
  RequestFriendWrap,
  UserInfoWrap,
  Content,
  DescriptionWrap,
} from './style';

const MatchingRequestForm = ({
  friend,
  control,
  errors,
}: MatchingReqFormProps) => {
  const { data: me } = useLoadLoginedUser();
  return (
    <RequestFriendWrap>
      <MatchingInfoWrap>
        <h4>매칭정보</h4>
        <FormDateTimePicker
          label="날짜"
          startName="startDate"
          endName="endDate"
          essential
          control={control}
        />
        <FormInput
          label="헬스장"
          id="gym"
          control={control}
          disabled
          essential
        />
      </MatchingInfoWrap>
      <UserInfoWrap>
        <InfoContent id="my_info">
          <h4>내정보</h4>
          <Content>
            <Avatar size={62} src={me?.Image?.src ?? ''} />
            <div>
              <div className="nickname">{me?.nickname}</div>
              <div>{me?.Userdetail?.description}</div>
            </div>
          </Content>
        </InfoContent>
        <InfoContent id="friend_info">
          <h4>친구정보</h4>
          <Content>
            <Avatar size={62} src={friend?.Image?.src ?? ''} />
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

export default MatchingRequestForm;
