import React, { useContext } from 'react';
import styled from 'styled-components';
import usePostContext from '../Context/usePostContext';
import { UserContext } from '../Application';
import LoadingBar from '../Components/Animated/LoadingBar';
import Warmup from '../Components/Room/Shell';

export default function RoomPage() {
    const { postId } = useContext(UserContext)!;
    const post = usePostContext(postId)!;

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
