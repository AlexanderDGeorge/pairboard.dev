import Peer from 'peerjs';
import React, { useContext, useState } from 'react';
import { CurrentDevContext } from '../Application';
import { functions } from '../firebase';
import { PostSchema } from '../Posts/postSchema';
import Controls from './Controls';

const leavePostRoom = functions.httpsCallable('leavePostRoom');

export default function ControlsContainer(props: {
    post: PostSchema;
    localStream: MediaStream;
    you: Peer;
}) {
    const { post, localStream, you } = props;
    const { profile } = useContext(CurrentDevContext)!;
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

    async function handleLeave() {
        audioTrack.stop();
        videoTrack.stop();
        you.destroy();
        await leavePostRoom({ postId: post.id, profile });
    }

    async function shareScreen() {
        // const screenTrack = await initiateScreenShare().then(
        //     (stream) => stream.getTracks()[0],
        // );
        // console.log(screenTrack);
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
