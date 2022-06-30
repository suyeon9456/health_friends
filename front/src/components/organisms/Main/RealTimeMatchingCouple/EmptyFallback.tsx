import React from 'react';
import Link from 'next/link';
import { ButtonType, SizeType } from '@/../@types/constant';
import { Button, NoDataIcon } from '@/components/atoms';
import { NoDataContainer, NoDataContent, NoDataText } from './style';

const EmptyFallback = () => (
  <NoDataContainer>
    <NoDataContent>
      <NoDataIcon width={60} height={60} color="#00000040" />
      <NoDataText>현재 진행중인 매칭이 없습니다.</NoDataText>
      <Link href="/friends" passHref>
        <a>
          <Button type={ButtonType.TEXT} size={SizeType.SMALL}>
            매칭신청하러 가기
          </Button>
        </a>
      </Link>
    </NoDataContent>
  </NoDataContainer>
);

export default EmptyFallback;
