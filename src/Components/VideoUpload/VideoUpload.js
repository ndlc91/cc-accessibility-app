import "./VideoUpload.scss";
import Button from 'react-bootstrap/Button';

export function VideoUpload () {
    return (
        <>
            <div className='wrap'>
                <div className="video container"> 
                    <Button variant="secondary">
                        <i class="bi bi-upload"></i>{' '} <br></br>
                        Upload
                    </Button>
                </div>
                <div className="transcript container">
                    <h3>Transcript</h3>
                    <p>Transcript generating...</p>
                </div>

            </div>

        </>
    )
}