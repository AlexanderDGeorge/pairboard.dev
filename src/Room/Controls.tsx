import React, { useContext, useState } from "react";
import styled from "styled-components";
import { leaveRoom } from "../firebase/room";
import { PostSchema } from "../firebase/schema";
import { UserContext } from "../Root";

export default (props: { post: PostSchema; localStream?: MediaStream }) => {
    const { post, localStream } = props;
    const { uid } = useContext(UserContext)!;
    const [audio, setAudio] = useState(true);
    const [video, setVideo] = useState(true);

    async function handleLeave() {
        if (post.host.uid === uid && post.participants.length > 1) {
            // have to close room or update host
            // modal with option to set new host
        } else {
            await leaveRoom(uid, post.id);
        }
    }

    function toggleAudio() {
        if (!localStream) return;
        localStream.getAudioTracks()[0].enabled = !audio;
        setAudio(!audio);
    }

    function toggleVideo() {
        if (!localStream) return;
        localStream.getVideoTracks()[0].enabled = !video;
        setVideo(!video);
    }

    return (
        <Controls>
            <Button onClick={handleLeave}>Leave Room</Button>
            <Button onClick={toggleAudio}>{audio ? "Mute" : "Unmute"}</Button>
            <Button onClick={toggleVideo}>
                {video ? "Hide Video" : "Show Video"}
            </Button>
        </Controls>
    );
};

const Controls = styled.div`
    height: 100%;
    min-width: 80px;
    padding: 50% 10px 10px 10px;
    background-color: ${(props) => props.theme.verydark};
    border-right: 5px solid ${(props) => props.theme.verydark};
    border-image: ${(props) =>
        `linear-gradient(140deg, ${props.theme.orange}, ${props.theme.yellow}, ${props.theme.green}, ${props.theme.blue}) 3`};
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
`;

const Button = styled.button`
    height: 60px;
    min-width: 100px;
    font-size: 1em;
    background-color: transparent;
    color: ${(props) => props.theme.verylight};
    transition: color 0.25s linear;
    &:hover {
        transition: color 0.25s linear;
        color: ${(props) => props.theme.white};
    }
`;
