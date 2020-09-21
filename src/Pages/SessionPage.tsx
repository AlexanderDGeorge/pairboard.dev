import React, { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { UserContext, SessionContext } from "../Application";
import {
    initiateConnection,
    initiateStream,
    listenToConnectionEvents,
    setConnectionCandidates,
    setConnectionDescription,
} from "../Components/Session/connection";

export default function Session() {
    const [loading, setLoading] = useState(true);
    const { uid } = useContext(UserContext)!;
    const {
        id,
        peer,
        impoliteCandidates,
        impoliteDescription,
        politeCandidates,
        politeDescription,
    } = useContext(SessionContext)!;

    const polite = uid === peer.uid;

    console.log("here");

    const pc = initiateConnection();
    const localStream = initiateStream(pc);
    listenToConnectionEvents(id, polite, pc);

    useEffect(() => {
        if (!polite) return;
        if (!pc) return;
        setConnectionCandidates(pc, impoliteCandidates);
    }, [polite, pc, impoliteCandidates]);

    useEffect(() => {
        if (!polite) return;
        if (!pc) return;
        setConnectionDescription(id, polite, pc, impoliteDescription);
    }, [id, polite, pc, impoliteDescription]);

    useEffect(() => {
        if (polite) return;
        if (!pc) return;
        setConnectionCandidates(pc, politeCandidates);
    }, [polite, pc, politeCandidates]);

    useEffect(() => {
        if (!polite) return;
        if (!pc) return;
        setConnectionDescription(id, polite, pc, politeDescription);
    }, [id, polite, pc, politeDescription]);

    if (loading) {
        return <StyledSession></StyledSession>;
    } else {
        return null;
    }
}

const StyledSession = styled.div`
    min-height: 100%;
    width: 100%;
    padding: 5%;
`;
