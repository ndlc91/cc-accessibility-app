import "./VideoUpload.scss";
import Button from 'react-bootstrap/Button';
import { useState } from 'react';

export function VideoUpload () {
    const [ popup, setPopup ] = useState(false);
    const [ upload, setUpload ] = useState(true);
    const [ subFile, setSubFile ] = useState(false);
    const [ source, setSource ] = useState();

    const handleRadioCheck = (e) => {
        const val = e.target.value;
        if (val === 'softSub'){
            setSubFile(true);
        }
        else setSubFile(false);
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        const url = URL.createObjectURL(file);
        setSource(url);
        setPopup(false);
    };

    return (
        <>
            <div className='wrap'>
                <div className="video container"> 
                    {upload && (
                    <Button variant="secondary" onClick={() => {setPopup(true); setUpload(false)}}>
                        <i class="bi bi-upload"></i>{' '} <br></br>
                        Upload
                    </Button> )}
                    {popup && ( 
                    <div className='popup container'>
                        <h6>Choose an option below indicating your video:</h6>
                        <div class="form-check" onChange={handleRadioCheck}>
                            <input value="raw" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked/>
                            <label class="form-check-label" for="flexRadioDefault1">
                                Is RAW with NO captions or subtitles
                            </label> <br/>
                            <input value="softSub" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Has soft subtitles (has a separate subtitles file)
                            </label> <br/>
                            <input value="hardSub" class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                            <label class="form-check-label" for="flexRadioDefault3">
                                Has hard subtitles (the video already has subtitles embedded)
                            </label>
                        </div>
                        <p>Choose a video file (mp4/mov):</p>
                        <div class="input-group">
                            <input type="file" class="form-control" id="inputGroupFile04" accept=".mp4, .mov"
                                   onChange={handleFileChange}/>
                        </div>
                        {subFile && (
                            <>
                                <p>Choose a subtitles file:</p>
                                <div class="input-group">
                                    <input type="file" class="form-control" id="inputGroupFile04"/>
                                </div>
                            </>
                        )}
                    </div>
                    )}

                    {source && (
                        <video
                            className="VideoInput_video"
                            width="100%"
                            height="100%"
                            controls
                            src={source}
                        />
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