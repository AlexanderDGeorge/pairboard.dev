import { useEffect } from "react";
import { peerConnection } from "../util/useSessionState";

export default (ref: HTMLVideoElement | null) => {
    useEffect(() => {
        const remoteStream = new MediaStream();
        function handleTrack(event: RTCTrackEvent) {
            remoteStream.addTrack(event.track);
            if (ref) ref.srcObject = remoteStream;
        }
        peerConnection.addEventListener("track", handleTrack);
        return () => {
            peerConnection.removeEventListener("track", handleTrack);
        };
    }, [ref]);
};
