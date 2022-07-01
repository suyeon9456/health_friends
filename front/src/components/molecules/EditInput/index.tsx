import React, { ChangeEvent, useEffect } from 'react';
import { BiEdit } from 'react-icons/bi';

import useIsState from '@/hooks/useIsState';
import { ButtonType, SizeType } from '@/../@types/constant';
import { Button, Icon, Input } from '@/components/atoms';
import { ContentText, ContentTitle, InfoButton, InfoContent } from './style';

const EditInput = ({
  title,
  value,
  content,
  isAuthorization = false,
  isSuccess,
  onChange,
  onUpdateContent,
}: {
  title: string;
  value: string;
  content?: string;
  isAuthorization?: boolean;
  isSuccess?: boolean;
  onChange: (e: ChangeEvent<Element>) => void;
  onUpdateContent: () => void;
}) => {
  const [isEditInput, onChangeIsEditInput] = useIsState(false);

  useEffect(() => {
    if (isSuccess) {
      onChangeIsEditInput();
    }
  }, [isSuccess]);
  return (
    <>
      <InfoContent>
        <ContentTitle>
          <h4>{title}</h4>
        </ContentTitle>
        {isEditInput && isAuthorization ? (
          <Input size={SizeType.SMALL} value={value} onChange={onChange} />
        ) : (
          <ContentText>{content}</ContentText>
        )}
      </InfoContent>
      <InfoButton>
        {isEditInput && isAuthorization ? (
          <div>
            <Button
              type={ButtonType.TEXT}
              size={SizeType.SMALL}
              onClick={onUpdateContent}
            >
              저장
            </Button>
            <Button
              type={ButtonType.TEXT}
              size={SizeType.SMALL}
              onClick={onChangeIsEditInput}
            >
              취소
            </Button>
          </div>
        ) : (
          <Button
            icon={<Icon icon={<BiEdit />} />}
            type={ButtonType.TEXT}
            onClick={onChangeIsEditInput}
          />
        )}
      </InfoButton>
    </>
  );
};

export default EditInput;
