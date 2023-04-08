import React, { useState, useEffect } from 'react'
import axios from 'axios';

const TranscriptJobStatusFetcher = ({ filename }) => {

    const [status, setStatus] = useState("");

    useEffect(() => {
        async function fetchStatus() {
            const API_ENDPOINT = `https://82odtjxlp5.execute-api.us-east-2.amazonaws.com/transcriptstatus?key=${filename}`;
            //console.log(API_ENDPOINT);

            try {
                const response = await axios({
                    method: "get",
                    url: API_ENDPOINT,
                });
                //console.log(response);

                setStatus(response.data)

            } catch (e) {
                console.log(e);
            }
        }
        fetchStatus(filename);
    }, []);


    if (status.statusCode) {
        if (status.statusCode === 200) {
            return (
                <div className="jobStatus">Transcription Status: {status.status}</div>
            )
        }
        else {
            return (
                <div className="jobStatus">Transcription Error: {JSON.stringify({ status })}</div>
            )

        }
    }
}

export default TranscriptJobStatusFetcher