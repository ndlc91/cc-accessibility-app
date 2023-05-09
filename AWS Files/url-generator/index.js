'use strict'

const AWS = require('aws-sdk')
AWS.config.update({ region: 'us-east-2' })
const s3 = new AWS.S3()
const uploadBucket = 'njnvideoupload'


// Change this value to adjust the signed URL's expiration
const URL_EXPIRATION_SECONDS = 300

// Main Lambda entry point
exports.handler = async (event) => {
  return await getUploadURL(event)
}

  

const getUploadURL = async function(event) {
  var Key;
 // Get key for transcript job from queryStringParameter
    console.log("request: " + JSON.stringify(event));
    if(event.queryStringParameters && event.queryStringParameters.Key) {
        console.log("Recieved key: " + event.queryStringParameters.Key);
        Key = event.queryStringParameters.Key + ".mp4";
    }

  // Get signed URL from S3
  const s3Params = {
    Bucket: uploadBucket,
    Key,
    Expires: URL_EXPIRATION_SECONDS,
    ContentType: 'video/mp4',
  }

  console.log('Params: ', s3Params)
  const uploadURL = await s3.getSignedUrlPromise('putObject', s3Params)

  return JSON.stringify({
    uploadURL: uploadURL,
    Key
  })
}