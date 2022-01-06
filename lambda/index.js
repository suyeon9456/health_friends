const AWS = require('aws-sdk');
const sharp = require('sharp');

const s3 = AWS.S3();

exports.handler = async (event, context, callback) => {
  const Bucket = event.Records[0].s3.bucket.name; // health-friends-s3
  const Key = decodeURIComponent(event.Records[0].s3.object.key); // original/123456_abc.png
  console.long(Bucket, key);
  const filename = Key.split('/')[Key.split('/').length - 1]; // 파일 이름만 추출
  const ext = Key.split('.')[Key.split('.').length - 1].toLowerCase(); // 확장자
  const requiredFormat = ext === 'jpg' ? 'jpeg' : ext; // 확장자가 jpg일 경우만 jpeg로
  console.log('filename: ', filename);
  console.log('ext: ', ext);

  try {
    const s3Object = await s3.getObject({ Bucket, key }).promise();
    console.log('original파일 바이트 확인', s3Object.Body.length);
    const resizedImage = await sharp(s3Object.Body)
      .resize(400, 400, { fit: 'inside' })
      .toFormat(requiredFormat)
      .toBuffer();
    await s3.putObject({
      Bucket,
      key: `thumb/${filename}`,
      Body: resizedImage,
    }).promise();
    console.log('put: ', resizedImage.length);

    return callback(null, `thumb/${filename}`);
  } catch (error) {
    console.error(error);
    return callback(error);
  }
}
