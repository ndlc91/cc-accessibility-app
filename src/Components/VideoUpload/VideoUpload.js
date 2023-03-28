import "./VideoUpload.scss";
import axios from 'axios';
import React, { useState } from 'react';
import {VideoJS} from '../VideoJS/VideoJS';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export function VideoUpload() {
    const [popup, setPopup] = useState(true);
    const [isSoft, setIsSoft] = useState(false);
    const API_ENDPOINT = "https://gwzlvy6oc6.execute-api.us-east-1.amazonaws.com/url-generator";
    const [selectedFile, setSelectedFile] = useState();
    const [src, setSrc] = useState({videoFile:"", subFile:""});
    const playerRef = React.useRef(null);
    
    const videoJsOptions = {
        height: "100%",
        width: "100%",
        fluid: true,
        autoplay: false,
        controls: true,
        nativeTextTracks: false,
        responsive: true,
        sources: [{
          src: src.videoFile,
          type: 'video/mp4'
        }]

      };
    
      const handlePlayerReady = (player) => {
        playerRef.current = player;
    
        // You can handle player events here, for example:
        player.on('waiting', () => {
          videojs.log('player is waiting');
        });
    
        player.on('dispose', () => {
          videojs.log('player will dispose');
        });

        player.addTextTrack("subtitles", "Viet", "vi")
      };


    const handleRadioCheck = (e) => {
        const val = e.target.value;
        if (val === 'softSub') {
            setIsSoft(true);
        }
        else setIsSoft(false);
    };

    const changeSubFile = (e) => {
        setSrc({subFile: URL.createObjectURL(e.target.files[0])});
    };

    // Handlers for S3 Connections
    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
        setSrc({videoFile: URL.createObjectURL(event.target.files[0])});
    };

    const handleSubmission = async () => {
        console.log(src.videoFile);
        setPopup(false);
        try {
            const response = await axios({
                method: "get",
                url: API_ENDPOINT,
            });
            console.log(response);

            await axios.put(response.data.uploadURL, selectedFile);

        } catch (e) {
            console.log(e);
        }

    };

    return (
        <>
            <div className='wrap'>
                <div className="video container">
                    {popup && (
                    <>
                        <div className='popup container'>
                            <h6>Choose an option below indicating your video:</h6>
                            <div class="form-check" onChange={handleRadioCheck}>
                                <input value="raw" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                                <label class="form-check-label" for="flexRadioDefault1">
                                    Is RAW with NO captions or subtitles
                                </label> <br />
                                <input value="softSub" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                <label class="form-check-label" for="flexRadioDefault2">
                                    Has soft subtitles (has a separate subtitles file)
                                </label> <br />
                                <input value="hardSub" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                <label class="form-check-label" for="flexRadioDefault3">
                                    Has hard subtitles (the video already has subtitles embedded)
                                </label>
                            </div>
                            <p>Choose a video file (mp4/mov):</p>
                            <input type="file" class="form-control" id="inputGroupFile04" onChange={changeHandler} />

                            {isSoft && (
                                <>
                                    <p>Choose a subtitles file:</p>
                                        <input type="file" class="form-control" id="inputGroupFile03" onChange={changeSubFile}/>
                                </>
                            )}
                            <div>
                                <button onClick={() =>{handleSubmission();}}>Submit</button>
                            </div>
                        </div>
                    </>)}
                    
                    {!popup && (
                        <div className="videojs">
                            <VideoJS options={videoJsOptions} onReady={handlePlayerReady}/>
                        </div>
                    )}

                    
                </div>








                <div className="transcript container">
                    <h3>Transcript</h3>
                    <p>Transcript generating...</p>
                </div>

            </div>

        </>
    )
}