import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LeftOutlined, RightOutlined, TeamOutlined, ZoomInOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

import { LOAD_GYM_REQUEST } from '../../../../reducers/gym';
import useInput from '../../../hooks/useInput';
import { SearchHeader,
  SearchWrapper,
  SearchTitle,
  SearchFormWrapper,
  SearchListWrapper,
  GymWrapper, FoldButton,
  SearchSidebar } from './style';
import { Search, Item, Avatar, Button } from '../../atoms';
import Modal from '../../molecules/Modal';
import SearchFriends from '../SearchFriends';
import ModalRequestFriend from '../ModalRequestFriend';

const SearchGyms = ({ foldedGym, changeFoldedGym }) => {
  const dispatch = useDispatch();
  const { gyms } = useSelector((state) => state.gym);

  const [browserHeight, setBrowserHeight] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [searchWord, onChangeSearchWord] = useInput('');

  useEffect(() => {
    dispatch({
      type: LOAD_GYM_REQUEST,
      data: { searchWord },
    });
  }, [searchWord]);

  useEffect(() => {
    setBrowserHeight(document.documentElement.clientHeight);
  }, [browserHeight]);

  const changeShowModal = useCallback(() => {
    setShowModal((prev) => !prev);
  }, [showModal]);

  return (
    <SearchWrapper foldedGym={foldedGym}>
      <SearchSidebar foldedGym={foldedGym}>
        <div>
          <Avatar size="small" />
          <Button
            icon={<ZoomInOutlined />}
            type="text"
          />
        </div>
      </SearchSidebar>
      <FoldButton
        foldedGym={foldedGym}
        onClick={changeFoldedGym}
      >
        {foldedGym ? <RightOutlined /> : <LeftOutlined />}
      </FoldButton>
      <GymWrapper foldedGym={foldedGym}>
        <SearchHeader>
          <span>{gyms.length}개의 헬스장</span>
          <SearchTitle>서울 관악구 검색 결과</SearchTitle>
        </SearchHeader>
        <SearchFormWrapper>
          <Search
            placeholder="관심 헬스장을 검색해보세요."
            enterButton
            value={searchWord}
            onChange={onChangeSearchWord}
          />
        </SearchFormWrapper>
        <SearchListWrapper browserHeight={browserHeight}>
          {gyms.map((item) => (
            <Item
              key={item.id}
              title={item.title}
              description={(
                <div>
                  <span>{item.description}</span>
                  <div>
                    <TeamOutlined /> {item.friends}명
                  </div>
                </div>
              )}
            />
          ))}
        </SearchListWrapper>
      </GymWrapper>
      <SearchFriends
        foldedGym={foldedGym}
        changeShowModal={changeShowModal}
      />
      <Modal
        show={showModal}
        title={<div><Avatar size="small" style={{ marginRight: '10px' }} />nicname님에게 매칭신청</div>}
        className="matching-modal"
        onCancel={changeShowModal}
      >
        <ModalRequestFriend />
      </Modal>
    </SearchWrapper>
  );
};

SearchGyms.propTypes = {
  foldedGym: PropTypes.bool.isRequired,
  changeFoldedGym: PropTypes.func,
};

export default SearchGyms;
