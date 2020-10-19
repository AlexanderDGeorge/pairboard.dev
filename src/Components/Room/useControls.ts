import { useState, useContext, useEffect } from "react";
import { PostSchema } from "../../firebase/schema";
import { UserContext } from "../../Application";
import { leaveRoom } from "../../firebase/room";
import { closePost } from "../../firebase/post";
import { initiateScreenShare } from "./WebRTCFunctions";

export default (
    post: PostSchema,
    localStream: MediaStream | undefined,
    connections: RTCPeerConnection[]
) => {
    const { uid } = useContext(UserContext)!;
    const [screenVideo, setScreenVideo] = useState<
        MediaStreamTrack | undefined
    >(undefined);
    const [videoSource, setVideoSource] = useState<
        "webcam" | "screen" | "hidden"
    >("webcam");
    const [muted, setMuted] = useState(false);
    const [video, setVideo] = useState<MediaStreamTrack | undefined>(undefined);

    useEffect(() => {
        if (!localStream) return;
        setVideo(localStream.getVideoTracks()[0]);
    }, [localStream]);

    useEffect(() => {
        if (!localStream) return;
        switch (videoSource) {
            case "webcam":
                localStream.getVideoTracks()[0].enabled = true;
                connections.forEach((connection) => {
                    connection
                        .getSenders()
                        .find((sender) => sender.track?.kind === "video")
                        ?.replaceTrack(video || null);
                });
                break;
            case "screen":
                localStream.getVideoTracks()[0].enabled = true;
                shareScreen();
                break;
            case "hidden":
                localStream.getVideoTracks()[0].enabled = false;
                break;
        }
    }, [videoSource]);

    function toggleAudio() {
        if (!localStream) return;
        localStream.getAudioTracks()[0].enabled = muted;
        setMuted(!muted);
    }

    async function shareScreen() {
        if (!localStream) return;
        let video: MediaStreamTrack | null = null;
        if (!screenVideo) {
            let stream: MediaStream = await initiateScreenShare();
            console.log(stream);
            video = stream?.getVideoTracks()[0];
            setScreenVideo(video);
        }
        connections.forEach((connection) => {
            connection
                .getSenders()
                .find((sender) => sender.track?.kind === "video")
                ?.replaceTrack(screenVideo || video);
        });
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
        toggleAudio,
        videoSource,
        setVideoSource,
        handleLeave,
    };
};
