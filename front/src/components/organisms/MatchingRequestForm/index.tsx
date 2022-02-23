import React from 'react';
import { useSelector } from 'react-redux';
import { Control, FieldErrors, FieldValues } from 'react-hook-form';

import { RootState } from '@/../store/configureStore';
import { MatchingInfoWrap, InfoContent, RequestFriendWrap, UserInfoWrap, Content, DescriptionWrap } from './style';
import { FormInput, FormTextarea, FormDateTimePicker } from '../../molecules';
import { Avatar } from '../../atoms';

interface MatchingFormType {
  startDate: Date;
  endDate: Date;
  gym: string;
  description: string;
}

const MatchingRequestForm = ({ friend, control, errors }: {
  friend?: { nickname: string, Userdetail: { description: string } },
  control: Control<MatchingFormType, object>, 
  errors?: FieldErrors;
}) => {
  const { me } = useSelector((state: RootState) => state.user);

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

export default MatchingRequestForm;
