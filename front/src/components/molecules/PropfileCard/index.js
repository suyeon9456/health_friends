import React from 'react';
import PropTypes from 'prop-types';
import { Card, CardActions, CardBody, CardCover, CardMeta, MetaDescription, MetaPercent, MetaTitle } from './style';
import Button from '../../atoms/Button';

const ProfileCard = ({
  nickname,
  description,
  image,
  percent,
  actions,
  onClick,
}) => (
  <Card>
    <CardCover>
      {image ? <img src={image} alt={image} /> : null}
    </CardCover>
    <CardBody>
      <CardMeta>
        <MetaTitle>{nickname}</MetaTitle>
        <MetaDescription>{description}</MetaDescription>
        <MetaPercent>재매칭률: {percent}%</MetaPercent>
      </CardMeta>
      <CardActions>
        {actions.map((action) => (
          action.icon
        ))}
        <Button
          size="small"
          type="primary"
          onClick={onClick}
        >
          매칭신청
        </Button>
      </CardActions>
      {/* <CardButton>
      </CardButton> */}
    </CardBody>
  </Card>
);

ProfileCard.propTypes = {
  nickname: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  percent: PropTypes.number,
  actions: PropTypes.array,
  onClick: PropTypes.func,
};

export default ProfileCard;
