import React, { useContext } from 'react';
import styled from 'styled-components';
import PeerConnection from './PeerConnection';
import { CurrentDevContext } from '../Application';
import LoadingBar from '../Components/Animated/LoadingBar';
import useRoomConnection from './useRoomConnection';
import useHostDuties from './useHostDuties';
import Stream from './Stream';
import ControlsContainer from './ControlsContainer';
import { PostSchema } from '../Posts/postSchema';

export default function Shell(props: { post: PostSchema }) {
    const { post } = props;
    const { profile } = useContext(CurrentDevContext)!;
    const { room, open } = useHostDuties(post);
    const { you, localStream } = useRoomConnection(open, room);

    if (localStream && you) {
        return (
            <StyledShell>
                <ControlsContainer
                    post={post}
                    localStream={localStream}
                    you={you}
                />
                <Stream stream={localStream} occupant={profile} />
                {post.occupants.map((peer, i: number) => {
                    if (peer.username === profile.username) return null;
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
    background-color: ${(props) => props.theme.verylight};
    display: grid;
    padding: 5px;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    grid-template-rows: 1fr;
    grid-gap: 5px;
`;
