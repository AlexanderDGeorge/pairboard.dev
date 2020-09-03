import React, { useEffect, useContext } from "react";
import styled from "styled-components";
import { SessionContext, UserContext } from "../Application";
import { Session } from "../types/session_types";
import { User } from "../types/user_types";
import { peerConnection } from "../util/useSessionState";
import LocalStream from "../Components/Session/LocalStream";
import RemoteStream from "../Components/Session/RemoteStream";
import useCandidateListener from "../Components/Session/useCandidateListener";

async function setupPeerConnection(session: Session, uid: User["uid"]) {
    if (uid === session.offerUser.uid) {
        await peerConnection.setLocalDescription({
            type: "offer",
            sdp: session.offer,
        });
        await peerConnection.setRemoteDescription({
            type: "answer",
            sdp: session.answer,
        });
    } else {
        await peerConnection.setRemoteDescription({
            type: "offer",
            sdp: session.offer,
        });
        await peerConnection.setLocalDescription({
            type: "answer",
            sdp: session.answer,
        });
    }
}

export default () => {
    const session = useContext(SessionContext)!;
    const { uid } = useContext(UserContext)!;

    useEffect(() => {
        setupPeerConnection(session, uid);
        // eslint-disable-next-line
    }, []);

    useCandidateListener();

    console.log(peerConnection);

    return (
        <StyledSession>
            <LocalStream />
            <RemoteStream />
        </StyledSession>
    );
};

const StyledSession = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 5%;
`;
