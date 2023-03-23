import { useState } from "react";


export function VideoPlayer (filename) {
    const [src, setSrc] = useState(filename);

    return (
        <>
          <video width="100%"
                 height="100%"
                 controls
                 src={src}
                 ></video>
        </>
    )
}