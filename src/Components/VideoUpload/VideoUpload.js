import "./VideoUpload.scss";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import 'video.js/dist/video-js.css';
import TranscriptFetcher from "../TranscriptFetcher/TranscriptFetcher";
import Form from 'react-bootstrap/Form';



export function VideoUpload() {


    const [popup, setPopup] = useState(true); // states for page rendering
    const [isSoft, setIsSoft] = useState(false); // states for page rendering
    const API_ENDPOINT = "https://gwzlvy6oc6.execute-api.us-east-1.amazonaws.com/url-generator";
    const [selectedFile, setSelectedFile] = useState();
    const [src, setSrc] = useState({ videoFile: "", subFile: "" });

    //used to rename the file, also used to fetch video and subtitle files.
    const [key, setKey] = useState();
    const [newFile, setNewFile] = useState();

    //used to fetch the transcript files for the video
    const [VTTtranscript, setVTTtranscript] = useState();

    //Subtitles Styles states
    const [fontSize, setFontSize] = useState();
    const [color, setColor] = useState();
    const [fontName, setFontName] = useState();
    const [bgColor, setBgColor] = useState({});
    const [bgAlpha, setBgAlpha] = useState("1");


    useEffect(() => {
        axios.get('https://njnsubtitles.s3.us-east-2.amazonaws.com/111619.vtt')
            .then((response) => console.log(response.data))
            .then((response) => setVTTtranscript(response.data))
    }, [])

    // Set styles for subtitles
    useEffect(() => {
        const root = document.documentElement;
        root?.style.setProperty("--font-size", fontSize);
        root?.style.setProperty("--color", color);
        root?.style.setProperty("--font-family", fontName);
        // Set BG colors RGBA
        root?.style.setProperty("--red", bgColor.red);
        root?.style.setProperty("--green", bgColor.green);
        root?.style.setProperty("--blue", bgColor.blue);
        root?.style.setProperty("--alpha", bgAlpha);


    }, [fontSize, color, fontName, bgColor, bgAlpha]);

    const handleBgChange = (e) => {
        const val = e.target.value;

        const red = parseInt(val.substring(1, 3), 16);
        const green = parseInt(val.substring(3, 5), 16);
        const blue = parseInt(val.substring(5, 7), 16);

        setBgColor({ hex: val, red: red, green: green, blue: blue, alpha: bgAlpha });
    }

    // File Options Handler

    const assignKeyValue = () => {
        const randomID = parseInt(Math.random() * 10000000);
        setKey(`${randomID}`);

    }

    const generateVideoName = (key) => {
        return (key + '.mp4');
    }

    const handleRadioCheck = (e) => {
        const val = e.target.value;
        if (val === 'softSub') {
            setIsSoft(true);
        }
        else setIsSoft(false);
    };

    // Handler for Uploading Sutitles File
    const changeSubFile = (event) => {
        const file = event.target.files[0];
        console.log(file);
        const temp = src.videoFile;
        setSrc({ videoFile: temp, subFile: URL.createObjectURL(file) });

    };

    // Handlers for S3 Connections
    const prepFileForUpload = (event) => {
        const file = event.target.files[0];
        console.log(file);
        setSelectedFile(file);
        const temp = src.subFile;
        setSrc({ videoFile: URL.createObjectURL(file), subFile: temp });

    };

    const handleFileUpload = async () => {
        setPopup(false);

        console.log(src.videoFile);

        console.log(src.subFile);
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
                    <div className="video-player">
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
                                    {isSoft && (
                                        <>
                                            <p>Choose a subtitles file:</p>
                                            <div className="input-group">
                                                <input type="file" className="form-control" id="inputGroupFile04" onChange={changeSubFile} />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </>)}

                        {!popup && (
                            <div className="video-render">
                                <video src={src.videoFile} width="100%" height="100%" controls muted>
                                    <track src={src.subFile} srclang="vi" label="Viet" kind="subtitles"></track>
                                </video>
                            </div>
                        )}
                    </div>

                    <div className="customizer">
                        <div >
                            <Form.Select className="Button" aria-label="Default select example" size="sm" onChange={(e) => setFontSize(e.target.value)}>
                                <option>Font Size</option>
                                <option value="8px">8</option>
                                <option value="12px">12</option>
                                <option value="16px">16</option>
                                <option value="18px">18</option>
                                <option value="20px">20</option>
                                <option value="24px">24</option>
                                <option value="28px">28</option>
                                <option value="32px">32</option>
                                <option value="36px">36</option>
                                <option value="40px">40</option>
                            </Form.Select>
                        </div>

                        <div >
                            <Form.Select className="Button" aria-label="Default select example" size="sm" onChange={(e) => setFontName(e.target.value)}>
                                <option>Font Name</option>
                                <option value="Arial">Arial</option>
                                <option value="Tahoma">Tahoma</option>
                                <option value="Georgia">Georgia</option>
                                <option value="Monospace">Monospace</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Helvetica">Helvetica</option>
                                <option value="Times-New-Roman">Times New Roman</option>
                                <option value="Verdana">Verdana</option>
                                <option value="Gill-Sans">Gill Sans</option>
                                <option value="Palatino">Palatino</option>
                            </Form.Select>
                        </div>

                        <div>
                            <label for="colorWell">Color:</label>
                            <input type="color" value={color} id="colorWell" onChange={(e) => setColor(e.target.value)} />
                        </div>

                        <div>
                            <label for="bg-color">Background Color:</label>
                            <input type="color" value={bgColor.hex} id="bg-color" onChange={handleBgChange} />
                        </div>

                        <div>
                            <label for="bg-opacity">Background Opacity: {bgAlpha}</label>
                            <input type="range" value={bgAlpha} id="bg-opacity" min="0.1" max="1" step="0.1" onChange={(e) => setBgAlpha(e.target.value)} />
                        </div>


                    </div>


                </div>

                <div className="transcript container">
                    <h3>Transcript</h3>
                    <TranscriptFetcher />
                </div>




            </div>

        </>
    )
}