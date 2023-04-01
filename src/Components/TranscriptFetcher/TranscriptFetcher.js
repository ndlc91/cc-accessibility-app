import React, { useState, useEffect } from 'react'

const TranscriptFetcher = () => {

    useEffect(() => {
        fetch('https://njnsubtitles.s3.us-east-2.amazonaws.com/5293333.json')
            .then((response) => response.json())
            .then((response) => setTranscript(response.results.transcripts[0].transcript))
    }, [])
    const [transcript, setTranscript] = useState("");

    return (
        <div className="transcript-file">{transcript}</div>
    )
}

export default TranscriptFetcher