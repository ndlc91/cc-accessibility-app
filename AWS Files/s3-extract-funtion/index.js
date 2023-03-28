console.log('Loading function');

const aws = require('aws-sdk');

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const transcribeservice = new aws.TranscribeService();


exports.handler = async (event, context) => {
    //console.log('Received event:', JSON.stringify(event, null, 2));

    // Get the object from the event and show its content type
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, ' '));
    const objParams = {
        Bucket: bucket,
        Key: key,
    };
    const link = 's3://' + bucket + '/' + key;
    try {
        const { ContentType } = await s3.getObject(objParams).promise();
        console.log('CONTENT TYPE:', ContentType);
        console.log('LINK:', link);
    } catch (err) {
        console.log(err);
        const message = `Error getting object ${key} from bucket ${bucket}. Make sure they exist and your bucket is in the same region as this function.`;
        console.log(message);
        throw new Error(message);
    }
    // Transcription Job Paramaters
    const transParams = {
        //region: "us-east-2",
        LanguageCode: 'en-US',
        Media: {
            MediaFileUri: link,
        },
        //MediaFormat: "mp4",
        OutputBucketName: "njnsubtitles",
        Subtitles: {
            Formats: ["srt"],
            //OutputStartIndex: 1,
        },
        TranscriptionJobName: key,
    };
    // Run a new transcription job on the media file
    try {
        const { SubtitleFileUris } = await transcribeservice.startTranscriptionJob(transParams).promise();
        console.log('SubtitleFileUris:', SubtitleFileUris);
    } catch (err) {
        console.log(err);
        const message = `Error with starting transcription job for file ${key} from bucket ${bucket}.`;
        console.log(message);
        throw new Error(message);
    }
    
};
