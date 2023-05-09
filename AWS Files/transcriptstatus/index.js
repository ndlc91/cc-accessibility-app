console.log('Loading function');

const aws = require('aws-sdk');

const transcribeservice = new aws.TranscribeService();

exports.handler = async (event) => {
    return await getStatus(event);
};

async function getStatus(event) {
    global.statusCode;
    global.response;
    var returnObj;

    var key = 'test';
    
    // Get key for transcript job from queryStringParameter
    console.log("request: " + JSON.stringify(event));
    if(event.queryStringParameters && event.queryStringParameters.key) {
        console.log("Recieved key: " + event.queryStringParameters.key);
        key = event.queryStringParameters.key;
    }
    
    const params = {
        TranscriptionJobName: key, 
    };
    
    // Get Transcription Job Status for TranscriptionJobName
    global.promiseToGetStatus = new Promise(function (resolve, reject) {
            (transcribeservice.getTranscriptionJob(params, function(err, data) {
                if (err) {
                    resolve(console.log(err, err.tack));
                    global.statusCode = err.statusCode;
                    global.response = err;
                }
                else {
                    resolve(console.log(data));
                    global.statusCode = 200;
                    global.response = data.TranscriptionJob;
                }
        }));
    });
    // Use promises to ensure that GetTranscriptonJob finishes
    await global.promiseToGetStatus;
    
    // If statusCode ==  200, then the Job was found, output the status of Job
    if(global.statusCode == 200){
        var status = global.response.TranscriptionJobStatus;
        console.log(status);
        // If status === "FAILED", also add the FailureReason to the returnObj
        if(status === "FAILED"){
            var FailureReason = global.response.FailureReason;
            returnObj = {
                statusCode: global.statusCode,
                status: status,
                failureReason: FailureReason,
                key: key
            };
        }
        else{
            returnObj = {
                statusCode: global.statusCode,
                status: status, 
                key: key
            };
        }
    }
    // If statusCode != 200, then return the statusCode and the Error Message
    else{
        var error = global.response;
        returnObj = {
            statusCode: global.statusCode,
            error: error,
            key: key
        };
    }
    
    return JSON.stringify(returnObj);
}
