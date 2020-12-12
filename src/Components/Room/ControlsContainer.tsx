import React, { useContext, useState } from 'react';
import { UserContext } from '../../Application';
import { closePost } from '../../firebase/post';
import { leaveRoom } from '../../firebase/room';
import { PostSchema } from '../../firebase/schema';
import Controls from './Controls';
import { initiateScreenShare } from './WebRTCFunctions';

export default function ControlsContainer(props: {
    post: PostSchema;
    localStream: MediaStream;
    setClose: Function;
}) {
    const { uid } = useContext(UserContext)!;
    const { post, setClose, localStream } = props;
    const audioTrack = localStream.getAudioTracks()[0];
    const videoTrack = localStream.getVideoTracks()[0];

    const [audio, setAudio] = useState(audioTrack.enabled);
    const [video, setVideo] = useState(videoTrack.enabled);

    const toggle = (track: 'audio' | 'video') => {
        if (track === 'audio') {
            audioTrack.enabled = !audio;
            setAudio(!audio);
        } else {
            videoTrack.enabled = !video;
            setVideo(!video);
        }
    };

    async function shareScreen() {
        const screenTrack = await initiateScreenShare().then(
            (stream) => stream.getTracks()[0],
        );
        console.log(screenTrack);
    }

    async function handleLeave() {
        setClose(true);
        localStream.getTracks().forEach((track) => track.stop());
        await leaveRoom(uid, post.id);
        if (post.participants.length <= 1) {
            closePost(post.id);
        }
    }

    return (
        <Controls
            toggle={toggle}
            audio={audio}
            video={video}
            shareScreen={shareScreen}
            handleLeave={handleLeave}
        />
    );
}
