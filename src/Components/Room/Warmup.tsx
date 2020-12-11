import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { initiateConnection, initiateLocalStream } from './WebRTCFunctions';
import LocalStream from './LocalStream';
import PeerConnection from './PeerConnection';
import ControlsContainer from './ControlsContainer';
import { UserContext } from '../../Application';
import { PostSchema } from '../../firebase/schema';
import LoadingBar from '../Animated/LoadingBar';

export default function Warmup(props: { post: PostSchema }) {
    const { post } = props;
    const { uid } = useContext(UserContext)!;
    const [warming, setWarming] = useState(true);
    const [pc, setPc] = useState<RTCPeerConnection | undefined>(undefined);
    const [localStream, setLocalStream] = useState<MediaStream | undefined>(
        undefined,
    );

    useEffect(() => {
        async function warmup() {
            const stream = await initiateLocalStream();
            setLocalStream(stream);
            setPc(await initiateConnection(stream));
            setWarming(false);
        }
        warmup();
    }, []);

    window.pc = pc;

    if (warming) {
        return (
            <StyledWarmup>
                <LoadingBar />
            </StyledWarmup>
        );
    } else {
        if (localStream && pc) {
            return (
                <StyledWarmup>
                    <ControlsContainer
                        post={post}
                        pc={pc}
                        localStream={localStream}
                    />
                    <LocalStream localStream={localStream} />
                    {post.participants.map((peerId, i) => {
                        if (uid === peerId) return null;
                        return (
                            <PeerConnection
                                key={i}
                                localStream={localStream}
                                pc={pc}
                                peerId={peerId}
                                peers={post.participants.length}
                            />
                        );
                    })}
                </StyledWarmup>
            );
        } else {
            return <h1>No localStream or peerConnection</h1>;
        }
    }
}

const StyledWarmup = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.dark};
`;
