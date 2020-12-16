import React, { useState } from 'react';
import { PublicPostSchema } from '../../Posts/postSchema';
import Controls from './Controls';
import { initiateScreenShare } from './WebRTCFunctions';

export default function ControlsContainer(props: {
    post: PublicPostSchema;
    localStream: MediaStream;
    setClose: Function;
}) {
    const { setClose, localStream } = props;
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

    return (
        <Controls
            toggle={toggle}
            audio={audio}
            video={video}
            shareScreen={shareScreen}
            handleLeave={() => setClose(true)}
        />
    );
}
