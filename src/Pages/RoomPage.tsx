import React from 'react';
import styled from 'styled-components';
import LoadingBar from '../Components/Animated/LoadingBar';
import { firestore } from '../firebase';
import Shell from '../Rooms/Shell';
import OldShell from '../Rooms/OldShell';
import useFirebaseQuery from '../util/useFirebaseQuery';

export default function RoomPage(props: { roomId: string }) {
    const { roomId } = props;
    const { data } = useFirebaseQuery(
        firestore().collection('posts').doc(roomId),
    );

    if (data) {
        // console.log(data);
        return (
            <StyledRoomPage>
                {/* <Shell room={data} /> */}
                <OldShell post={data} />
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
