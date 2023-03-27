import "./VideoUpload.scss";
import axios from 'axios';
import { useState } from 'react';

export function VideoUpload() {
    const [popup, setPopup] = useState(true);
    const [subFile, setSubFile] = useState(false);
    const API_ENDPOINT = "https://gwzlvy6oc6.execute-api.us-east-1.amazonaws.com/url-generator";
    const [selectedFile, setSelectedFile] = useState();
    const [src, setSrc] = useState();

    const handleRadioCheck = (e) => {
        const val = e.target.value;
        if (val === 'softSub') {
            setSubFile(true);
        }
        else setSubFile(false);
    };

    // Handlers for S3 Connections
    const prepFileForUpload = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        setSrc(URL.createObjectURL(file));
    };

    const handleFileUpload = async () => {
        setPopup(false);
        console.log(src);
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
                                <div className="form-check" onChange={handleRadioCheck}>
                                    <input value="raw" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" defaultChecked />
                                    <label className="form-check-label" htmlFor="flexRadioDefault1">
                                        Is RAW with NO captions or subtitles
                                    </label> <br />
                                    <input value="softSub" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault2">
                                        Has soft subtitles (has a separate subtitles file)
                                    </label> <br />
                                    <input value="hardSub" className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault3" />
                                    <label className="form-check-label" htmlFor="flexRadioDefault3">
                                        Has hard subtitles (the video already has subtitles embedded)
                                    </label>
                                </div>
                                <p>Choose a video file (mp4/mov):</p>
                                <input type="file" name="file" className="form-control" id="inputGroupFile04" onChange={prepFileForUpload} />
                                <div>
                                    <button onClick={() => { handleFileUpload(); }}>Submit</button>
                                </div>
                                {subFile && (
                                    <>
                                        <p>Choose a subtitles file:</p>
                                        <div className="input-group">
                                            <input type="file" className="form-control" id="inputGroupFile04" />
                                        </div>
                                    </>
                                )}
                            </div>
                        </>)}

                    {!popup && (
                        <>
                            <video width="100%"
                                height="100%"
                                controls
                                src={src}
                            ></video>
                        </>
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