import { useEffect, useContext } from "react";
import { PeerConnectionContext } from "../../Pages/Session";

export default (ref: HTMLVideoElement | null) => {
    const peerConnection = useContext(PeerConnectionContext)!;

    console.log(peerConnection);

    useEffect(() => {
        (async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: false,
                    video: true,
                });
                for (const track of stream.getTracks()) {
                    peerConnection.addTrack(track, stream);
                }
                if (ref && !ref.srcObject) ref.srcObject = stream;
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [ref, peerConnection]);
};
