import React, { useContext, useState } from 'react';
import { UserContext } from '../../Application';
import { closePost } from '../../firebase/post';
import { leaveRoom } from '../../firebase/room';
import { PostSchema } from '../../firebase/schema';
import Controls from './Controls';
import { initiateScreenShare } from './WebRTCFunctions';

export default function ControlsContainer(props: {
    post: PostSchema;
    pc: RTCPeerConnection;
    localStream: MediaStream;
}) {
    const { uid } = useContext(UserContext)!;
    const { post, pc, localStream } = props;
    const audioTransceiver = pc.getTransceivers()[0];
    const videoTransceiver = pc.getTransceivers()[1];

    const [audio, setAudio] = useState(audioTransceiver.sender.track?.enabled);
    const [video, setVideo] = useState(audioTransceiver.sender.track?.enabled);

    function toggleAudio() {
        const track = audioTransceiver.sender.track;
        if (!track) {
            console.log('no track');
            return;
        }

        if (audio) {
            track.enabled = false;
            setAudio(false);
        } else {
            track.enabled = true;
            setAudio(true);
        }
    }

    function toggleVideo() {
        const track = videoTransceiver.sender.track;
        if (!track) {
            console.log('no track');
            return;
        }

        if (video) {
            track.enabled = false;
            setVideo(false);
        } else {
            track.enabled = true;
            setVideo(true);
        }
    }

    async function shareScreen() {
        const screenTrack = await initiateScreenShare().then(
            (stream) => stream.getTracks()[0],
        );
    }

    async function handleLeave() {
        localStream.getTracks().forEach((track) => track.stop());
        pc.close();
        await leaveRoom(uid, post.id);
        if (post.participants.length <= 1) {
            closePost(post.id);
        }
    }

    return (
        <Controls
            audio={audio}
            toggleAudio={toggleAudio}
            video={video}
            toggleVideo={toggleVideo}
            shareScreen={shareScreen}
            handleLeave={handleLeave}
        />
    );
}
