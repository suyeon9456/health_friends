import React from 'react';
import { BarChartOutlined } from '@ant-design/icons';

import { RankTitle, RankCard, RankCardList, RankCardWrap, RankedFriendsBody, RankedFriendsHeader, RankedFriendsWrap } from './style';

const RankedFriends = () => (
  <RankedFriendsWrap>
    <RankedFriendsHeader>
      HEALTH FRIENDS 인기 사용자
    </RankedFriendsHeader>
    <RankedFriendsBody>
      <RankCardList>
        <RankCardWrap>
          <RankTitle>
            재매칭 순위 TOP 5
          </RankTitle>
          <RankCard>
            test
          </RankCard>
        </RankCardWrap>
        <RankCardWrap>
          <RankTitle>
            매칭 순위 TOP 5
          </RankTitle>
          <RankCard>
            test
          </RankCard>
        </RankCardWrap>
      </RankCardList>
    </RankedFriendsBody>
  </RankedFriendsWrap>
);

export default RankedFriends;
