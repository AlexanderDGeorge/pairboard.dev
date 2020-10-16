import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import usePostContext from "../Context/usePostContext";
import { initiateLocalStream } from "../Components/Room/WebRTCFunctions";
import LocalStream from "../Components/Room/LocalStream";
import PeerConnection from "../Components/Room/PeerConnection";
import Controls from "../Components/Room/Controls";
import { UserContext } from "../Application";
import LoadingBar from "../Components/Animated/LoadingBar";

export default () => {
    const { uid, postId } = useContext(UserContext)!;
    const post = usePostContext(postId);
    const [localStream, setLocalStream] = useState<MediaStream | undefined>(
        undefined
    );

    useEffect(() => {
        (async () => {
            setLocalStream(await initiateLocalStream());
        })();
    }, []);

    if (post) {
        return (
            <RoomPage>
                <Controls post={post} localStream={localStream} />
                <Participants>
                    <LocalStream localStream={localStream} />
                    {post.participants.map((peerId, i) => {
                        if (uid === peerId) return null;
                        return (
                            <PeerConnection
                                key={i}
                                localStream={localStream}
                                peerId={peerId}
                            />
                        );
                    })}
                </Participants>
            </RoomPage>
        );
    } else {
        // [TODO]: add error 'A room associated with this post could not be found
        // redirecting...
        return <LoadingBar />;
    }
};

const RoomPage = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const Participants = styled.div`
    height: 100%;
    width: 90%;
    display: flex;
    flex-direction: column;
    align-items: right;
`;
