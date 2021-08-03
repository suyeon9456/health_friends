import React, { useCallback, useRef } from 'react';

import { UploadContainer, UploadIcon, UploadInput, UploadText, UploadWrapper } from './style';
import Thumbnail from './Thumbnail';

const Upload = () => {
  const uploadRef = useRef();
  const uploadImage = useCallback(() => {
    uploadRef.current.click();
  }, []);
  return (
    <UploadContainer>
      {/* <UploadWrapper
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
      </UploadWrapper> */}
      <Thumbnail />
    </UploadContainer>
  );
};

export default Upload;
