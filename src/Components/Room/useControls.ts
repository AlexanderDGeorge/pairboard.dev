import { useState, useContext } from "react";
import { PostSchema } from "../../firebase/schema";
import { UserContext } from "../../Application";
import { leaveRoom } from "../../firebase/room";
import { closePost } from "../../firebase/post";

export default (
    post: PostSchema,
    localStream: MediaStream | undefined,
    connections: RTCPeerConnection[]
) => {
    const { uid } = useContext(UserContext)!;
    const [muted, setMuted] = useState(false);
    const [videoSource, setVideoSource] = useState<
        "webcam" | "screen" | "hidden"
    >("webcam");

    async function handleLeave() {
        if (post.participants.length > 1) {
            await leaveRoom(uid, post.id);
        } else {
            await leaveRoom(uid, post.id);
            closePost(post.id);
        }
    }

    function toggleAudio() {
        if (!localStream) return;
        localStream.getAudioTracks()[0].enabled = !muted;
        setMuted(!muted);
    }

    function toggleVideoSource() {}

    return { muted, videoSource, handleLeave, toggleAudio, toggleVideoSource };
};
