import { useEffect, useContext } from "react";
import { PeerConnectionContext } from "../../Pages/Session";

export default (ref: HTMLVideoElement | null) => {
    const peerConnection = useContext(PeerConnectionContext)!;

    useEffect(() => {
        (async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: true,
                    video: true,
                });
                for (const track of stream.getTracks()) {
                    peerConnection.addTrack(track, stream);
                }
                peerConnection.ontrack = ({ track, streams }) => {
                    console.log("TRACK", track);
                    track.onunmute = () => {
                        if (ref && !ref.srcObject) ref.srcObject = streams[0];
                    };
                };
                // if (ref && !ref.srcObject) ref.srcObject = stream;
            } catch (error) {
                console.error(error.message);
            }
        })();
    }, [ref, peerConnection]);
};
