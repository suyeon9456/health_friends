import React, { useCallback, useRef } from 'react';
import Error from './Error';

import { UploadContainer, UploadIcon, UploadInput, UploadText, UploadWrap } from './style';
import Thumbnail from './Thumbnail';

const Upload = () => {
  const uploadRef = useRef();
  const uploadImage = useCallback(() => {
    uploadRef.current.click();
  }, []);

  const ProfileImage = { id: 1, src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' };
  const ImageUploadError = true;

  if (ImageUploadError) {
    return (
      <UploadContainer error>
        <Error name="filename.png" />
      </UploadContainer>
    );
  }
  return (
    <UploadContainer>
      {ProfileImage?.id
        ? <Thumbnail src={ProfileImage.src} />
        : (
          <UploadWrap
            role="button"
            onClick={uploadImage}
          >
            <UploadInput
              type="file"
              ref={uploadRef}
            />
            <div>
              <UploadIcon />
              <UploadText>profile image</UploadText>
            </div>
          </UploadWrap>
        )}
    </UploadContainer>
  );
};

export default Upload;
