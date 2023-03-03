import "../VideoUpload/VideoUpload.scss";
import axios from 'axios';
import { useState } from 'react';

const S3connection = () => {
    const API_ENDPOINT = "https://gwzlvy6oc6.execute-api.us-east-1.amazonaws.com/url-generator";

    const [selectedFile, setSelectedFile] = useState();

    const changeHandler = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmission = async () => {
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
        <div>
            <input type="file" name="file" class="form-control" id="inputGroupFile04" onChange={changeHandler} />
            <div>
                <button onClick={handleSubmission}>Submit</button>
            </div>
        </div>
    )

}

<S3connection />

export default S3connection;