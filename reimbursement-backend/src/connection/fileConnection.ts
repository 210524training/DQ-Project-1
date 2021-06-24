import AWS, { S3 } from 'aws-sdk';
import dotenv from 'dotenv';

dotenv.config({});
// configure the keys for accessing AWS
AWS.config.update({
  region: 'us-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

exports.sign_s3 = (req: any, res: any) => {
  const s3 = new AWS.S3(); // Create a new instance of S3
  const { fileName } = req.body;
  const { fileType } = req.body;

  const params = {
    ACL: 'public-read',
    Bucket: process.env.S3_BUCKET,
    ContentType: fileType,
    Key: fileName,
  };

  s3.getSignedUrl('putObject', params, (err, data) => {
    if(err) {
      console.log(err);
      res.json({ success: false, error: err });
    }

    const returnData = {
      signedRequest: data,
      url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`,
    };
    res.json({ success: true, data: { returnData } });
  });
};
