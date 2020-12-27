import React, { useContext } from 'react';
import styled from 'styled-components';
import PeerConnection from './PeerConnection2';
import { CurrentDevContext } from '../Application';
import LoadingBar from '../Components/Animated/LoadingBar';
import useRoomConnection from './useRoomConnection';
import useHostDuties from './useHostDuties';
import LocalStream from './LocalStream';
import { PostSchema } from '../Posts/postSchema';

export default function Shell(props: { post: PostSchema }) {
    const { post } = props;
    const { username } = useContext(CurrentDevContext)!.profile;
    const { room, open } = useHostDuties(post);
    const { you, localStream } = useRoomConnection(open, room);

    if (localStream && you) {
        console.log(room);
        return (
            <StyledShell>
                <LocalStream localStream={localStream} />
                {post.occupants.map((peer, i: number) => {
                    if (peer.username === username) return null;
                    return (
                        <PeerConnection
                            occupant={peer}
                            you={you}
                            localStream={localStream}
                            key={i}
                        />
                    );
                })}
            </StyledShell>
        );
    } else {
        // UI to allow camera and mic access
        return (
            <StyledShell>
                <LoadingBar />
            </StyledShell>
        );
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