import { useState, useRef, useEffect } from "react";
import { peerConnection } from "../../util/useSessionState";

window.peerConnection = peerConnection;

export default (ref: HTMLVideoElement | null) => {
    const [videoOn, setVideoOn] = useState(false);
    const [audioOn, setAudioOn] = useState(false);
    const localStream = useRef<MediaStream | undefined>(undefined);
    const localVideo = useRef<RTCRtpSender | undefined>(undefined);
    const localAudio = useRef<RTCRtpSender | undefined>(undefined);

    const toggleVideo = () => setVideoOn(!videoOn);
    const toggleAudio = () => setAudioOn(!audioOn);

    useEffect(() => {
        (async () => {
            localStream.current = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: true,
            });
            setVideoOn(true);
            setAudioOn(true);
        })();
    }, []);

    useEffect(() => {
        if (videoOn) {
            if (localStream?.current) {
                if (ref) ref.srcObject = localStream.current;
                localStream.current.getVideoTracks().forEach((track) => {
                    localVideo.current = peerConnection.addTrack(
                        track,
                        localStream.current!
                    );
                });
            }
        } else {
            if (localVideo.current) {
                if (ref) ref.srcObject = null;
                peerConnection.removeTrack(localVideo.current);
                localVideo.current = undefined;
            }
        }
    }, [videoOn, ref]);

    useEffect(() => {
        if (audioOn) {
            if (localStream?.current) {
                localStream.current.getAudioTracks().forEach((track) => {
                    localAudio.current = peerConnection.addTrack(
                        track,
                        localStream.current!
                    );
                });
            }
        } else {
            if (localAudio.current) {
                peerConnection.removeTrack(localAudio.current);
                localAudio.current = undefined;
            }
        }
    }, [audioOn]);

    return { videoOn, audioOn, toggleVideo, toggleAudio };
};
