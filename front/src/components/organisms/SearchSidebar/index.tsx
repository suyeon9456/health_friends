import React, { useCallback } from 'react';
import { BiCollapse, BiExpand } from 'react-icons/bi';
import { MdAddLocationAlt } from 'react-icons/md';

import { ButtonType, ModalStatus } from '@/../@types/constant';
import { useDispatch, useSelector } from 'react-redux';
import { changeIsFoldedGym, foldedItemSelector } from '@/../reducers/gym';
import { hiddenCustomModal, showCustomModal } from '@/../reducers/user';
import { useForm } from 'react-hook-form';
import { AddressAPI, CreateGymForm } from '@/../@types/gym';
import { Modal } from '@/components/molecules';
import { useMutation, useQueryClient } from 'react-query';
import { addGymAPI } from '@/api/gym';
import { initialGymsKey } from '@/../@utils/queryKey';
import { changeModal, useModalDispatch } from '@/../store/modalStore';
import { Button, Icon } from '../../atoms';
import { Sidebar } from './style';
import GlobalCustomModal from '../GlobalCustomModal';
import ModalCreateGym from '../ModalCreateGym';

const ADDGYM = 'ADDGYM' as const;
const SearchSidebar = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const contextDispatch = useModalDispatch();
  const { isFoldedGym } = useSelector(foldedItemSelector);

  const { handleSubmit, control, setValue, getValues } = useForm<CreateGymForm>(
    {
      defaultValues: {
        address: '',
        addressRoad: '',
        phone: '',
        latitude: '',
        longitude: '',
        name: '',
      },
    }
  );

  const gymMutation = useMutation((data: AddressAPI) => addGymAPI(data), {
    onSuccess: () => {
      void queryClient.invalidateQueries(initialGymsKey);
      dispatch(hiddenCustomModal(ADDGYM));
      contextDispatch(
        changeModal({
          status: ModalStatus.SUCCESS,
          message: '헬스장 등록에 성공하였습니다.',
        })
      );
    },
  });

  const onSubmit = useCallback((data) => {
    gymMutation.mutate(data);
  }, []);

  return (
    <>
      <Sidebar>
        <div>
          {!isFoldedGym ? (
            <Button
              icon={<Icon icon={<BiCollapse />} />}
              type={ButtonType.TEXT}
              onClick={() => dispatch(changeIsFoldedGym(true))}
            />
          ) : (
            <Button
              icon={<Icon icon={<BiExpand />} />}
              type={ButtonType.TEXT}
              onClick={() => dispatch(changeIsFoldedGym(false))}
            />
          )}
          <Button
            icon={<Icon icon={<MdAddLocationAlt />} />}
            type={ButtonType.TEXT}
            onClick={() => dispatch(showCustomModal(ADDGYM))}
          />
        </div>
      </Sidebar>
      <GlobalCustomModal id={ADDGYM}>
        <Modal
          title="헬스장 등록하기"
          onCancel={() => dispatch(hiddenCustomModal(ADDGYM))}
          onSubmit={handleSubmit(onSubmit)}
          form
          footer
        >
          <ModalCreateGym setValue={setValue} control={control} />
        </Modal>
      </GlobalCustomModal>
    </>
  );
};

export default React.memo(SearchSidebar);
