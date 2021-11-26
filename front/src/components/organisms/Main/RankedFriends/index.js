import React from 'react';
// import { BarChartOutlined } from '@ant-design/icons';

import { RankItem, RankTitle, RankCard, RankCardList, RankCardWrap, RankedFriendsBody, RankedFriendsHeader, RankedFriendsWrap, RankItemWrap } from './style';

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
            <RankItemWrap>
              <RankItem>
                <span>1.</span>
                닉네임
              </RankItem>
            </RankItemWrap>
            <RankItemWrap>
              <RankItem>
                <span>1.</span>
              </RankItem>
            </RankItemWrap>
            <RankItemWrap>
              <RankItem>
                <span>1.</span>
              </RankItem>
            </RankItemWrap>
            <RankItemWrap>
              <RankItem>
                <span>1.</span>
              </RankItem>
            </RankItemWrap>
            <RankItemWrap>
              <RankItem>
                <span>1.</span>
              </RankItem>
            </RankItemWrap>
          </RankCard>
        </RankCardWrap>
        <RankCardWrap>
          <RankTitle>
            매칭 순위 TOP 5
          </RankTitle>
          <RankCard>
            <RankItemWrap>
              <RankItem>
                <span>1.</span>
                닉네임
              </RankItem>
            </RankItemWrap>
            <RankItemWrap>
              <RankItem>
                <span>1.</span>
              </RankItem>
            </RankItemWrap>
            <RankItemWrap>
              <RankItem>
                <span>1.</span>
              </RankItem>
            </RankItemWrap>
            <RankItemWrap>
              <RankItem>
                <span>1.</span>
              </RankItem>
            </RankItemWrap>
            <RankItemWrap>
              <RankItem>
                <span>1.</span>
              </RankItem>
            </RankItemWrap>
          </RankCard>
        </RankCardWrap>
      </RankCardList>
    </RankedFriendsBody>
  </RankedFriendsWrap>
);

export default RankedFriends;
