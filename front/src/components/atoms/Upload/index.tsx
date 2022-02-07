import React, { useCallback, useRef } from 'react';
import Error from './Error';

import { UploadContainer, UploadIcon, UploadInput, UploadText, UploadWrap } from './style';
import Thumbnail from './Thumbnail';

const Upload = ({ id, src, name, onChange, uploadError, onAddImage, onRemove }: {
  id: string,
  src?: string,
  name: string,
  onChange?: () => void,
  uploadError?: boolean,
  onAddImage?: () => void,
  onRemove?: () => void,
}) => {
  const uploadRef = useRef<HTMLInputElement>(null);
  const uploadImage = useCallback(() => {
    uploadRef.current?.click();
  }, []);

  if (uploadError) {
    return (
      <UploadContainer error>
        <Error name="filename.png" />
      </UploadContainer>
    );
  }
  return (
    <UploadContainer>
      {id
        ? (
          <Thumbnail
            src={src}
            onAddImage={onAddImage}
            onRemove={onRemove}
          />
        )
        : (
          <UploadWrap
            role="button"
            onClick={uploadImage}
          >
            <UploadInput
              name={name}
              type="file"
              ref={uploadRef}
              onChange={onChange}
            />
            <div>
              <UploadIcon />
              <UploadText>프로필 이미지 선택</UploadText>
            </div>
          </UploadWrap>
        )}
    </UploadContainer>
  );
};

export default Upload;
