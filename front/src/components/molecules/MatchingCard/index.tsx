import React, { useCallback, useState } from 'react';

import { Button, Icon } from '@/components/atoms';
import { BiEdit, BiPin, BiRepeat, BiUser } from 'react-icons/bi';
import { ButtonType, ModalType, ShowModalType } from '@/../@types/constant';
import { compareAsc } from 'date-fns';
import GlobalCustomModal from '@/components/organisms/GlobalCustomModal';
import ModalMatchingDetail from '@/components/organisms/profile/ModalMatchingDetail';
import ModalMatchingEdit from '@/components/organisms/profile/ModalMatchingEdit';
import { useDispatch } from 'react-redux';
import { hiddenCustomModal, showCustomModal } from '@/../reducers/user';
import { useRouter } from 'next/router';
import { useMutation } from 'react-query';
import { updateFixAPI } from '@/api/schedule';
import {
  Card,
  CardBody,
  CardCover,
  CardMeta,
  MetaDescription,
  MetaDate,
  MetaTitle,
  CardActions,
  Action,
} from './style';

const MatchingCard = ({
  id,
  nickname,
  description,
  date,
  image,
  start,
  isCancel,
  isFixed,
}: {
  id: number;
  nickname: string;
  description: string;
  date: string;
  image?: string;
  start: Date;
  isCancel?: boolean;
  isFixed: boolean;
}) => {
  const router = useRouter();
  const { id: queryId } = router.query;
  const dispatch = useDispatch();
  const [isImageError, setIsImageError] = useState(false);
  const [modalType, setModalType] = useState<ShowModalType>(ModalType.VIEW);

  const mutation = useMutation((data: number) => updateFixAPI(data), {
    // onSuccess: () => queryClient.invalidateQueries(['likedFriends']),
  });

  const onClickAction = useCallback(
    ({ key }) => {
      setModalType(key);
      dispatch(showCustomModal(`${key}-${id}`));
    },
    [modalType, id]
  );

  const onFix = useCallback(
    (scheduleId) => {
      if (router.pathname !== '/myinfo') return;
      mutation.mutate(scheduleId);
    },
    [router.pathname]
  );

  const onCancle = useCallback(() => {
    dispatch(hiddenCustomModal(`${modalType}-${id}`));
  }, [modalType]);
  return (
    <>
      <Card>
        <CardCover>
          {image && !isImageError ? (
            <img
              src={image}
              alt={image}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                setIsImageError(true);
              }}
            />
          ) : (
            <div>
              <Icon icon={<BiUser />} />
            </div>
          )}
          <div className="box">
            {isCancel && <Button type={ButtonType.ERROR}>취소진행중</Button>}
          </div>
        </CardCover>
        <CardBody onClick={() => onClickAction({ key: ModalType.VIEW })}>
          <CardMeta>
            <MetaDate>{date}</MetaDate>
            <MetaTitle>{nickname}</MetaTitle>
            <MetaDescription>{description}</MetaDescription>
          </CardMeta>
        </CardBody>
        <CardActions>
          <Action
            key={ModalType.FIX}
            className={isFixed ? 'fix' : ''}
            onClick={() => onFix(id)}
          >
            <Icon icon={<BiPin />} />
          </Action>
          <Action
            key={ModalType.REMATCH}
            onClick={() => onClickAction({ key: ModalType.REMATCH })}
          >
            <Icon icon={<BiRepeat />} />
          </Action>
          <Action
            key={ModalType.EDIT}
            onClick={() => onClickAction({ key: ModalType.EDIT })}
            disabled={compareAsc(start, new Date()) < 0}
          >
            <Icon icon={<BiEdit />} />
          </Action>
        </CardActions>
      </Card>
      <GlobalCustomModal id={`${ModalType.VIEW}-${id}`}>
        <ModalMatchingDetail
          matchingId={id}
          queryId={queryId}
          onCancel={onCancle}
        />
      </GlobalCustomModal>
      <GlobalCustomModal id={`${ModalType.EDIT}-${id}`}>
        <ModalMatchingEdit
          matchingId={id}
          queryId={queryId}
          onCancel={onCancle}
          mode={modalType}
        />
      </GlobalCustomModal>
      <GlobalCustomModal id={`${ModalType.REMATCH}-${id}`}>
        <ModalMatchingEdit
          matchingId={id}
          queryId={queryId}
          onCancel={onCancle}
          mode={modalType}
        />
      </GlobalCustomModal>
    </>
  );
};

export default React.memo(MatchingCard);
