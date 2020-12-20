import React, { useContext } from 'react';
import styled from 'styled-components';
import PeerConnection from './PeerConnection2';
import { CurrentDevContext } from '../Application';
import LoadingBar from '../Components/Animated/LoadingBar';
import useRoomConnection from './useRoomConnection';
import { RoomSchema } from './roomSchema';
import LocalStream from './LocalStream';

export default function Shell(props: { room: RoomSchema }) {
    const { room } = props;
    const { you, localStream } = useRoomConnection(room.id);
    const { uid } = useContext(CurrentDevContext)!.profile;

    if (localStream) {
        return (
            <StyledShell>
                <LocalStream localStream={localStream} />
                {room.occupants.map((peer, i: number) => {
                    if (peer.uid === uid) return null;
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
