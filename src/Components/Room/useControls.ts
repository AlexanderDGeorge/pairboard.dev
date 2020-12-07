import { useState, useContext, useEffect } from "react";
import { PostSchema } from "../../firebase/schema";
import { UserContext } from "../../Application";
import { leaveRoom } from "../../firebase/room";
import { closePost } from "../../firebase/post";
import { initiateScreenShare } from "./WebRTCFunctions";

// [TODO]: handle stop sharing from browser

export default function useControls(
    post: PostSchema,
    localStream: MediaStream | undefined,
    connections: RTCPeerConnection[]
) {
    const { uid } = useContext(UserContext)!;
    const [muted, setMuted] = useState(false);
    const [video, setVideo] = useState(true);
    const [videoTrack, setVideoTrack] = useState<MediaStreamTrack | undefined>(undefined);
    const [screen, setScreen] = useState<MediaStreamTrack | undefined>(
        undefined
    );

    useEffect(() => {
        if (!localStream) return;
        setVideoTrack(localStream.getVideoTracks()[0]);
    }, [localStream]);

    function toggleAudio() {
        if (!localStream) return;
        localStream.getAudioTracks()[0].enabled = muted;
        setMuted(!muted);
    }

    function toggleVideo() {
        if (video) {
            turnOffVideo()
        } else {
            turnOnVideo()
        }
        setVideo(!video);
    }

    function turnOffVideo() {
        if (!localStream) return;
        localStream.getVideoTracks()[0].enabled = false;
    }

    async function turnOnVideo() {
        if (!localStream || !videoTrack) return;
        localStream.getVideoTracks()[0].enabled = true;
        connections.forEach((connection) => {
            connection.getSenders().forEach((sender) => {
                if (sender.track?.kind === "video") {
                    sender.replaceTrack(videoTrack);
                }
            });
        });
    }

    async function shareScreen(screenTrack = screen) {
        if (!localStream) return;
        if (!screenTrack) {
            screenTrack = await initiateScreenShare().then((stream) => {
                return stream.getTracks()[0];
            });
            setScreen(screenTrack);
            shareScreen(screenTrack);
        } else {
            localStream.getVideoTracks()[0].enabled = true;
            connections.forEach((connection) => {
                connection.getSenders().forEach((sender) => {
                    if (sender.track?.kind === "video" && screenTrack) {
                        sender.replaceTrack(screenTrack);
                    }
                });
            });
        }
    }

    async function handleLeave() {
        localStream?.getTracks().forEach((track) => track.stop());
        connections.forEach((connection) => {
            connection.close();
        });
        await leaveRoom(uid, post.id);
        if (post.participants.length <= 1) {
            closePost(post.id);
        }
    }

    return {
        muted,
        video,
        toggleAudio,
        toggleVideo,
        shareScreen,
        handleLeave,
    };
}
