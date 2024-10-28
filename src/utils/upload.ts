import { S3 } from 'aws-sdk';
import { PutObjectRequest } from 'aws-sdk/clients/s3';
import { extname } from 'path';
import { slug } from './slug';


export async function uploadFile(
  file: Buffer,
  filename: string,
  mimetype: string,
  prefix = mimetype.includes('video') ? 'videos' : 'images'
) {
  // let mimetype = file.type;
  let fileExtName = extname(filename);

  if(!process.env.BUCKET)
    throw new Error('mising bucket')

  const s3 = new S3();
  const params: PutObjectRequest = {
    Bucket: process.env.BUCKET,
    Key: `${prefix}/${slug(filename)}${fileExtName}`,
    Body: file, //file.buffer,
    ContentType: mimetype,
  };
  // const url = await s3.getSignedUrlPromise('putObject', params);
  try {
    return await s3.upload(params).promise();
  } catch (error) {
    throw error;
  }
}
