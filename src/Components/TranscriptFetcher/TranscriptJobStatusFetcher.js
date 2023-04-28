import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TranscriptFetcher from "./TranscriptFetcher";

// A function to get the status of a transcription job from aws
const TranscriptJobStatusFetcher = ({ filename, changeState}) => {

    const [status, setStatus] = useState("");

    const handleStateChange = () => {
        changeState();
    }
    
    useEffect(() => {
        let interval = setInterval (() => {
            const API_ENDPOINT = `https://82odtjxlp5.execute-api.us-east-2.amazonaws.com/transcriptstatus?key=${filename}`;
            
            axios.get(API_ENDPOINT)
                .then((response) => {
                    setStatus(response.data)
                    
                })
                .catch((err) => {
                    console.log(err);
                })
                
        }, 15000); // runs the interval every 15000 milliseconds (15 seconds)
        return() => clearInterval(interval);
    }, [filename]);
    // returns the status after succesfully finding a job at the bottom of the transcript div
    if(status.statusCode === 200){
        if(status.status === "COMPLETED"){
            return (
            <>
                <TranscriptFetcher filename={filename} />
                <button onClick={() => { handleStateChange(); }}>Add captions to video</button>
            </>
            ) // COMPLETED
        }
        else if(status.status === "FAILED"){
           return <p>Status: {status.status}. {status.failureReason}</p> // FAILED
        }
        else {
            return(
                <p>Status: {status.status}</p> // IN PROGRESS
            )
        } 
    }
    else {
        return <p>Upload Video for Transcript to appear</p>
    }
}

export default TranscriptJobStatusFetcher