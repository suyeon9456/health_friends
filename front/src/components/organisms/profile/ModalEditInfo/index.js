import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import useInput from '../../../../hooks/useInput';
import { Modal } from '../../../molecules';
import EditInfoForm from '../EditInfoForm';
import { UPDATE_MY_INFO_REQUEST, UPDATE_MY_FRIENDS_INFO_REQUEST } from '../../../../../reducers/user';
import { useDateFormat } from '../../../../hooks';

const ModalEditInfo = ({ title, targetId, show, onCancel }) => {
  const { me, profile } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [gender, onChangeGender, setGender] = useInput(me?.gender || '');
  const [age, onChangeAge, setAge] = useInput(me?.age || 0);
  const [career, onChangeCareer, setCareer] = useInput(me?.career || 1);
  const [role, onChangeRole, setRole] = useInput(me?.role || 1);

  const onChangeStartDate = useCallback((data) => {
    setStartTime(format(data, 'HH:mm'));
    setStartDate(data);
  }, []);
  const onChangeEndDate = useCallback((data) => {
    setEndTime(format(data, 'HH:mm'));
    setEndDate(data);
  }, []);

  const onSubmit = useCallback(() => {
    if (targetId === 'more-info') {
      dispatch({
        type: UPDATE_MY_INFO_REQUEST,
        data: { startTime, endTime, gender, age, career, role },
      });
    } else {
      dispatch({
        type: UPDATE_MY_FRIENDS_INFO_REQUEST,
        data: { gender, age, career, role },
      });
    }
    onCancel();
  }, [startTime, endTime, gender, age, career, role]);

  useEffect(() => {
    if (targetId === 'more-info') {
      const start = [useDateFormat(new Date(), 'yyyy-MM-dd'), profile?.Userdetail?.startTime].join(' ');
      const end = [useDateFormat(new Date(), 'yyyy-MM-dd'), profile?.Userdetail?.endTime].join(' ');

      setStartDate(new Date(start));
      setEndDate(new Date(end));
      setGender(profile?.gender);
      setAge(profile?.age);
      setCareer(profile?.career);
      setRole(profile?.role);
    } else {
      setGender(profile?.Userdetail?.friendsGender);
      setAge(profile?.Userdetail?.friendsAge);
      setCareer(profile?.Userdetail?.friendsCareer);
      setRole(profile?.Userdetail?.friendsRole);
    }
  }, [targetId]);

  return (
    <Modal
      show={show}
      title={title}
      onCancel={onCancel}
      onSubmit={onSubmit}
      footer
    >
      <EditInfoForm
        targetId={targetId}
        age={age}
        onChangeAge={onChangeAge}
        startDate={startDate}
        onChangeStartDate={onChangeStartDate}
        endDate={endDate}
        onChangeEndDate={onChangeEndDate}
        career={career}
        onChangeCareer={onChangeCareer}
        gender={gender}
        onChangeGender={onChangeGender}
        role={role}
        onChangeRole={onChangeRole}
      />
    </Modal>
  );
};

ModalEditInfo.propTypes = {
  title: PropTypes.string.isRequired,
  targetId: PropTypes.string.isRequired,
  show: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ModalEditInfo;
