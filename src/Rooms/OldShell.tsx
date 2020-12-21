import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { initiateLocalStream } from './WebRTCFunctions';
import LocalStream from './LocalStream';
import PeerConnection from './PeerConnection';
import ControlsContainer from './ControlsContainer';
import { CurrentDevContext } from '../Application';
// import { leaveRoom } from '../../firebase/room';
import LoadingBar from '../Components/Animated/LoadingBar';
import { PostSchema } from '../Posts/postSchema';

export default function Shell(props: { post: PostSchema }) {
    const { post } = props;
    const { user } = useContext(CurrentDevContext)!;
    const [close, setClose] = useState(false);
    const [warming, setWarming] = useState(true);
    const [localStream, setLocalStream] = useState<MediaStream | undefined>(
        undefined,
    );

    useEffect(() => {
        async function warmup() {
            const stream = await initiateLocalStream();
            setLocalStream(stream);
            setWarming(false);
        }
        warmup();

        return () => {
            setClose(true);
        };
    }, []);

    useEffect(() => {
        if (close) {
            localStream?.getTracks().forEach((track) => track.stop());
            // leaveRoom(user.uid, post.id);
        }
    }, [localStream, post.id, user.uid, close]);

    if (warming) {
        return (
            <StyledShell>
                <LoadingBar />
            </StyledShell>
        );
    } else {
        if (localStream) {
            return (
                <StyledShell>
                    <ControlsContainer
                        setClose={setClose}
                        post={post}
                        localStream={localStream}
                    />
                    <LocalStream localStream={localStream} />
                    {post.occupants.map((occupant, i) => {
                        if (user.uid === occupant.uid) return null;
                        return (
                            <PeerConnection
                                key={i}
                                localStream={localStream}
                                peerId={occupant.uid}
                                peers={post.occupants.length}
                                closeConnection={close}
                            />
                        );
                    })}
                </StyledShell>
            );
        } else {
            return <h1>No localStream or peerConnection</h1>;
        }
    }
}

const StyledShell = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.dark};
`;
