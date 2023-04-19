import React, { useState, useEffect } from 'react';
import axios from 'axios';
// A function to get the status of a transcription job from aws
const TranscriptJobStatusFetcher = ({ filename }) => {

    const [status, setStatus] = useState("");

    useEffect(() => {
        let interval = setInterval (() => {
            const API_ENDPOINT = `https://82odtjxlp5.execute-api.us-east-2.amazonaws.com/transcriptstatus?key=${filename}`;
            //console.log(API_ENDPOINT);
            axios.get(API_ENDPOINT)
                .then((response) => {
                    setStatus(response.data)
                    //console.log(response);
                })
                .catch((err) => {
                    console.log(err);
                })
                //console.log(status)
        }, 15000); // runs the interval every 15000 milliseconds (15 seconds)
        return() => clearInterval(interval);
    }, []);
    // returns the status after succesfully finding a job at the bottom of the transcript div
    if(status.statusCode === 200){
        if(status.status === "FAILED"){
           return <p>Status: {status.status}. {status.failureReason}</p>
        }
        else {
            return(
                <p>Status: {status.status}</p>
            )
        } 
    }
}

export default TranscriptJobStatusFetcher