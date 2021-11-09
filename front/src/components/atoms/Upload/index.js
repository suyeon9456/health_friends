import React, { useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

import { UploadContainer, UploadIcon, UploadInput, UploadText, UploadWrap } from './style';
import Thumbnail from './Thumbnail';

const Upload = ({ id, src }) => {
  const uploadRef = useRef();
  const uploadImage = useCallback(() => {
    uploadRef.current.click();
  }, []);

  // const ProfileImage = { id: 1, src: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png' };
  const ImageUploadError = false;

  if (ImageUploadError) {
    return (
      <UploadContainer error>
        <Error name="filename.png" />
      </UploadContainer>
    );
  }
  return (
    <UploadContainer>
      {id
        ? <Thumbnail src={src} />
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

Upload.propTypes = {
  id: PropTypes.number,
  src: PropTypes.string,
};

export default Upload;
