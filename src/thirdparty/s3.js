import aws from "aws-sdk";
import shortid from "shortid";

const region = "ap-southeast-1";
const bucketName = "upload-image-s3-bucket";
const accessKeyId = "AKIAXASYMEYEHDSRKP7I";
const secretAccessKey = "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";

const myBucket = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const uploadFile = (file) => {
  const fileType = file.type.split("/")[1];
  // console.log(fileType);
  const imageName = `${file.name}_${shortid.generate()}.${fileType}`;
  const params = {
    Bucket: bucketName,
    ContentType: file.type,
    Key: imageName,
    Body: file,
    Expires: 60,
  };
  return new Promise((resolve, reject) => {
    myBucket.putObject(params, function checkErr(err) {
      if (err) {
        reject(err);
      } else {
        resolve(this.request.params);
      }
    });
  });
};

export const HandleUploadImage = async (files) => {
  const imageUrls = [];
  for (let file of files) {
    const imageUrl = await uploadFile(file);
    const uploadPhotos = {
      src: `https://upload-image-s3-bucket.s3.ap-southeast-1.amazonaws.com/${imageUrl.Key}`,
    };
    imageUrls.push(uploadPhotos);
  }
  return imageUrls;
};

export const HandleUploadOneImage = async (file) => {
  const imageUrl = await uploadFile(file);
  const uploadPhotos = {
    src: `https://upload-image-s3-bucket.s3.ap-southeast-1.amazonaws.com/${imageUrl.Key}`,
  };
  return uploadPhotos;
};
