import React, { useCallback } from 'react';
import { Button, Form, Upload } from '@/components/atoms';
import { ButtonType } from '@/../@types/constant';
import { originalToThumb } from '@/../@utils/regexp';
import { UseMutationResult } from 'react-query';

const FormImage = ({
  imgPath,
  uploadImage,
  addImage,
  onChangeIsUpload,
  onRemoveUploadImage,
}: {
  imgPath: string;
  uploadImage: UseMutationResult<FormData, unknown, FormData, unknown>;
  addImage: UseMutationResult<{ image: string }, unknown, string, unknown>;
  onChangeIsUpload: () => void;
  onRemoveUploadImage: () => void;
}) => {
  const onChangeImage = useCallback((e) => {
    const imageFormData = new FormData();
    [].forEach.call(e.target.files, (f) => {
      imageFormData.append('image', f);
    });
    uploadImage.mutate(imageFormData);
  }, []);

  const onAddProfileImage = useCallback(() => {
    const thumbImg = originalToThumb(imgPath);
    addImage.mutate(thumbImg);
    onChangeIsUpload();
  }, [imgPath]);
  return (
    <>
      <Form encType="multipart/form-data">
        <Upload
          id={imgPath}
          name="image"
          src={imgPath}
          onChange={onChangeImage}
          uploadError={uploadImage.isError}
          onAddImage={onAddProfileImage}
          onRemove={onRemoveUploadImage}
        />
      </Form>
      <div>
        <Button type={ButtonType.TEXT} onClick={onChangeIsUpload}>
          취소
        </Button>
      </div>
    </>
  );
};

export default FormImage;
