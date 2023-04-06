import React, { useState, useEffect } from 'react'

const TranscriptFetcher = () => {
    useEffect(() => {
        fetch('https://njnsubtitles.s3.us-east-2.amazonaws.com/8705306.json')
            .then((response) => response.json())
            .then((response) => setJSONTranscript(response.results.transcripts[0].transcript))
    }, [])
    const [JSONTranscript, setJSONTranscript] = useState("");
    return (
        <div className="transcript-file">{JSONTranscript}</div>
    )
}

export default TranscriptFetcher