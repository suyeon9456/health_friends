import React, { useCallback, useRef } from 'react';

import { UploadContainer, UploadIcon, UploadInput, UploadText, UploadWrapper } from './style';

const Upload = () => {
  const uploadRef = useRef();
  const uploadImage = useCallback(() => {
    uploadRef.current.click();
  }, []);
  return (
    <UploadContainer>
      <UploadWrapper
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
      </UploadWrapper>
    </UploadContainer>
  );
};

export default Upload;
