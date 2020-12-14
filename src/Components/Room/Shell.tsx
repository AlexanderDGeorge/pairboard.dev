import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { initiateLocalStream } from './WebRTCFunctions';
import LocalStream from './LocalStream';
import PeerConnection from './PeerConnection';
import ControlsContainer from './ControlsContainer';
import { UserContext } from '../../Application';
import { PostSchema } from '../../firebase/schema';
import { leaveRoom } from '../../firebase/room';
import LoadingBar from '../Animated/LoadingBar';

export default function Shell(props: { post: PostSchema }) {
    const { post } = props;
    const { uid } = useContext(UserContext)!;
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
            leaveRoom(uid, post.id);
        }
    }, [localStream, post.id, uid, close]);

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
                    {post.participants.map((peerId, i) => {
                        if (uid === peerId) return null;
                        return (
                            <PeerConnection
                                key={i}
                                localStream={localStream}
                                peerId={peerId}
                                peers={post.participants.length}
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
