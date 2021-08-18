import React from 'react';
import PropTypes from 'prop-types';

import { Content, InfoWrapper, Title } from './style';

const InformationItem = ({ title, icon, content }) => (
  <InfoWrapper>
    {icon}
    <Title>{title}:</Title>
    <Content>{content}</Content>
  </InfoWrapper>
);

InformationItem.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.node,
  content: PropTypes.string,
};

export default InformationItem;
