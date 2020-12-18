import React, { useContext } from 'react';
import styled from 'styled-components';
import { CurrentDevContext } from '../Application';
import LoadingBar from '../Components/Animated/LoadingBar';
import Warmup from '../Components/Room/Shell';

export default function RoomPage() {
    const post = undefined;

    if (post) {
        return (
            <StyledRoomPage>
                <Warmup post={post} />
            </StyledRoomPage>
        );
    } else {
        // [TODO]: add error 'A room associated with this post could not be found
        // redirecting...
        return <LoadingBar />;
    }
}

const StyledRoomPage = styled.div`
    height: 100%;
    width: 100%;
    background-color: ${(props) => props.theme.verylight};
`;
