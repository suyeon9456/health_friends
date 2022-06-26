import React from 'react';
import {
  CardMeta,
  LoadingAction,
  LoadingCard,
  LoadingCardBody,
  LoadingCardCover,
  LoadingMetaTitle,
  MetaActions,
} from './style';

const LoadingFallback = () => (
  <>
    {Array.from({ length: 9 }, (_, i) => i).map((_, i) => (
      // eslint-disable-next-line react/no-array-index-key
      <LoadingCard key={i}>
        <LoadingCardCover>
          <div className="lazyData" />
        </LoadingCardCover>
        <LoadingCardBody>
          <CardMeta>
            <LoadingMetaTitle className="lazyData" />
            <MetaActions>
              <LoadingAction>
                <span className="lazyData" />
              </LoadingAction>
              <LoadingAction>
                <span className="lazyData" />
              </LoadingAction>
              <LoadingAction>
                <span className="lazyData" />
              </LoadingAction>
            </MetaActions>
          </CardMeta>
        </LoadingCardBody>
      </LoadingCard>
    ))}
  </>
);

export default LoadingFallback;
