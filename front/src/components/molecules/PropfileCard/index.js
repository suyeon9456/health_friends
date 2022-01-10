import React from 'react';
import PropTypes from 'prop-types';

import { Card, CardActions, CardBody, CardCover, CardMeta, MetaPercent, MetaTitle } from './style';
import { Avatar, Button } from '../../atoms';

const ProfileCard = ({
  nickname,
  image,
  percent,
  onClick,
}) => (
  <Card>
    <CardCover>
      <Avatar size="large" src={image} />
    </CardCover>
    <CardBody>
      <CardMeta>
        <MetaTitle>{nickname}</MetaTitle>
        <MetaPercent>재매칭률: {percent}%</MetaPercent>
      </CardMeta>
    </CardBody>
    <CardActions>
      <Button
        size="small"
        type="primary"
        onClick={onClick}
      >
        매칭신청
      </Button>
    </CardActions>
  </Card>
);

ProfileCard.propTypes = {
  nickname: PropTypes.string,
  image: PropTypes.string,
  percent: PropTypes.number,
  onClick: PropTypes.func,
};

export default ProfileCard;
