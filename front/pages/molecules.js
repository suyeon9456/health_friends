import { EditOutlined, UserAddOutlined } from '@ant-design/icons';
import React, { useCallback, useState } from 'react';
import { StyledButton } from '../src/components/atoms/Button/style';
import { Filter } from '../src/components/molecules';
import Alert from '../src/components/molecules/Alert';
import AvatarGroup from '../src/components/molecules/AvatarGroup';
import BasicList from '../src/components/molecules/BasicList';
import FormInput from '../src/components/molecules/FormInput';
import FormSelect from '../src/components/molecules/FormSelect';
import FormTextarea from '../src/components/molecules/FormTextarea';
import List from '../src/components/molecules/List';
import MatchingCard from '../src/components/molecules/MatchingCard';
import Menu from '../src/components/molecules/Menu';
import Modal from '../src/components/molecules/Modal';
import Progress from '../src/components/molecules/Progress';
import ProfileCard from '../src/components/molecules/PropfileCard';
import SimpleMatchingCard from '../src/components/molecules/SimpleMatchingCard';
import Steps from '../src/components/molecules/Steps';
import Tabs from '../src/components/molecules/Tabs';

const Molecules = () => {
  const [openModal, setOpenModal] = useState(false);
  const [closeModal, setCloseModal] = useState(false);
  const [error, setError] = useState(false);
  const [warning, setWarning] = useState(false);
  const [success, setSuccess] = useState(false);
  const [primary, setPrimary] = useState(false);

  const onOpenModal = useCallback(() => {
    setOpenModal(true);
  }, [openModal]);
  const onCloseModal = useCallback(() => {
    setOpenModal(false);
  }, [openModal]);
  const onChangeError = useCallback(() => {
    setError((prev) => !prev);
  }, [error]);
  const onChangeWarning = useCallback(() => {
    setWarning((prev) => !prev);
  }, [warning]);
  const onChangeSuccess = useCallback(() => {
    setSuccess((prev) => !prev);
  }, [success]);
  const onChangePrimary = useCallback(() => {
    setPrimary((prev) => !prev);
  }, [primary]);

  const options = [{ value: 1, text: 'test1' }, { value: 2, text: 'test2' }, { value: 3, text: 'test3' }];
  const tabs = [{ value: '1', text: 'teb1' }, { value: '2', text: 'teb2' }, { value: '3', text: 'teb3' }];
  const list = [{ title: 'List Title 1', description: 'List description 1' }, { title: 'List Title 2', description: 'List description 2' }, { title: 'List Title 3', description: 'List description 3' }];
  const actions = [{ icon: <UserAddOutlined />, key: 'rematch' }, { icon: <EditOutlined />, key: 'edit' }];
  const users = [{ id: 1, src: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' }, { id: 2, src: '' }];
  const steps = [
    { id: 1, type: 'finished', step: 1, title: 'title1', description: 'This is a description1' },
    { id: 2, type: 'process', step: 2, title: 'title2', description: 'This is a description2' },
    { id: 3, type: 'wait', step: 3, title: 'title3', description: 'This is a description3' },
  ];

  return (
    <div>
      {/* <h2>Alert_Error</h2>
      <StyledButton type="error" onClick={onChangeError}>Error Button</StyledButton>
      {
        error
          ? (
            <Alert
              type="error"
              action={(
                <StyledButton
                  block
                  type="error"
                  onClick={onChangeError}
                >
                  확인
                </StyledButton>
              )}
              message="회원탈퇴에 실패하였습니다."
            />
          )
          : null
      }
      <h2>Alert_Warning</h2>
      <StyledButton type="warning" onClick={onChangeWarning}>Warning Button</StyledButton>
      {
        warning
          ? (
            <Alert
              type="warning"
              action={(
                <StyledButton
                  block
                  type="warning"
                  onClick={onChangeWarning}
                >
                  확인
                </StyledButton>
              )}
              message="비밀번호를 입력해주세요."
            />
          )
          : null
      }
      <h2>Alert_Success</h2>
      <StyledButton type="success" onClick={onChangeSuccess}>Success Button</StyledButton>
      {
        success
          ? (
            <Alert
              type="success"
              action={(
                <StyledButton
                  block
                  type="success"
                  onClick={onChangeSuccess}
                >
                  확인
                </StyledButton>
              )}
              message="회원가입을 완료했습니다."
            />
          )
          : null
      }
      <h2>Primary_Success</h2>
      <StyledButton type="primary" onClick={onChangePrimary}>Primary Button</StyledButton>
      {
        primary
          ? (
            <Alert
              action={(
                <StyledButton
                  block
                  onClick={onChangePrimary}
                >
                  확인
                </StyledButton>
              )}
              message="기본 alert창 입니다."
            />
          )
          : null
      }
      <h2>FormInput</h2>
      <FormInput label="input label" placeholder="placeholder 입니다." essential />
      <h2>FormSelect</h2>
      <FormSelect label="select label" options={options} essential />
      <h2>FormTextarea</h2>
      <FormTextarea label="textarea label" placeholder="placeholder 입니다." maxLength={50} showCount essential />
      <h2>Tabs</h2>
      <Tabs tabs={tabs} defaultTabValue="1" />
      <h2>Tabs_block</h2>
      <Tabs tabs={tabs} defaultTabValue="1" block />
      <h2>List</h2>
      <List list={list} />
      <h2>Progress</h2>
      <Progress label="재매칭률" percent={70} />
      <h2>SimpleMatchingCard</h2>
      <SimpleMatchingCard nickname="nickname" address="매칭된 헬스장 주소" date="2020.00.00 10:56 AM" />
      <h2>MatchingCard</h2>
      <MatchingCard
        nickname="nickname"
        description="간단소개..."
        date="2020.00.00 10:56 AM"
        image="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        actions={actions}
      /> */}
      <h2>AavatarGroup</h2>
      <AvatarGroup
        size="large"
        users={users}
      />
      {/* <h2>ProfileCard</h2>
      <ProfileCard
        nickname="nickname"
        description="간단소개..."
        date="2020.00.00 10:56 AM"
        image="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
        percent={30}
        actions={actions}
      />
      <h2>Menu</h2>
      <Menu />
      <h2>Steps</h2>
      <Steps steps={steps} />
      <h2>Modal</h2>
      <StyledButton onClick={onOpenModal}>Modal Button</StyledButton>
      <Modal
        show={openModal}
        title="Basic Title"
        onCancel={onCloseModal}
      >
        <p>Basic Content</p>
      </Modal> */}
      <div>
        <Filter />
      </div>
    </div>
  );
};

export default Molecules;
