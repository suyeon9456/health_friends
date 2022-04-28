import {
  AgeOptionsType,
  CareerOptionsType,
  GenderOptionsType,
  InfoContentType,
  InfoContent,
  RoleOptionsType,
} from '@/../@types/utils';
import { Icon, InformationItem } from '@/components/atoms';
import React from 'react';
import { BiGroup, BiHeart, BiRun, BiTime, BiUser } from 'react-icons/bi';
import { Content } from './style';

const Information = ({
  type,
  age,
  time,
  career,
  gender,
  role,
}: {
  type: InfoContentType;
  age: AgeOptionsType;
  career: CareerOptionsType;
  gender: GenderOptionsType;
  role: RoleOptionsType;
  time?: string;
}) => {
  return (
    <Content>
      <InformationItem
        title="나이"
        icon={<Icon icon={<BiUser />} />}
        content={age?.text}
      />
      {type === InfoContent.MORE && (
        <InformationItem
          title="운동시간"
          icon={<Icon icon={<BiTime />} />}
          content={time}
        />
      )}
      <InformationItem
        title="운동경력"
        icon={<Icon icon={<BiRun />} />}
        content={career?.text}
      />
      <InformationItem
        title="성별"
        icon={<Icon icon={<BiHeart />} />}
        content={gender?.text}
      />
      <InformationItem
        title="역할"
        icon={<Icon icon={<BiGroup />} />}
        content={role?.text}
      />
    </Content>
  );
};

export default Information;
