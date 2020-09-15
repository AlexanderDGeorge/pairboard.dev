import React, { createContext, useContext } from "react";
import styled from "styled-components";
import LocalStream from "../Components/Session/LocalStream";
import RemoteStream from "../Components/Session/RemoteStream";
import { UserContext, SessionContext } from "../Application";
import {
    initiateConnection,
    listenToConnectionEvents,
    initiateStream,
} from "../Components/Session/connection";

export const PeerConnectionContext = createContext<
    RTCPeerConnection | undefined
>(undefined);

export default () => {
    const { uid } = useContext(UserContext)!;
    const { author } = useContext(SessionContext)!;

    const peerConnection = initiateConnection();
    initiateStream();
    listenToConnectionEvents(uid, peerConnection);

    console.log(peerConnection);

    window.peerConnection = peerConnection;

    return (
        <PeerConnectionContext.Provider value={peerConnection}>
            <StyledSession>
                <LocalStream />
                <RemoteStream />
            </StyledSession>
        </PeerConnectionContext.Provider>
    );
};

const StyledSession = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 5%;
`;
