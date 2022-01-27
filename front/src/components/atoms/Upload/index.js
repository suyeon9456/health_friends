import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

import { UploadContainer, UploadIcon, UploadInput, UploadText, UploadWrap } from './style';
import Thumbnail from './Thumbnail';

const Upload = ({ id, src, name, onChange, uploadError, onAddImage, onRemove }) => {
  const uploadRef = useRef();
  const uploadImage = useCallback(() => {
    uploadRef.current.click();
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

Upload.propTypes = {
  id: PropTypes.string,
  src: PropTypes.string,
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onAddImage: PropTypes.func,
  onRemove: PropTypes.func,
  uploadError: PropTypes.bool,
};

export default Upload;
