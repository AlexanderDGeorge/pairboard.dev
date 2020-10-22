import React, {
    MutableRefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import styled from "styled-components";
import {
    initiateConnection,
    listenToConnectionEvents,
} from "./WebRTCFunctions";
import {
    listenForCandidates,
    listenForSignaling,
    resetRoomNotifications,
} from "../../firebase/room";
import { UserSchema } from "../../firebase/schema";
import { UserContext } from "../../Application";

interface PeerConnectionProps {
    localStream?: MediaStream;
    peerId: UserSchema["uid"];
    addConnection: Function;
}

export default (props: PeerConnectionProps) => {
    const { localStream, peerId, addConnection } = props;
    const { uid } = useContext(UserContext)!;
    const remoteStreamRef: MutableRefObject<HTMLVideoElement | null> = useRef(
        null
    );
    const [connection, setConnection] = useState<RTCPeerConnection | undefined>(
        undefined
    );

    window.connection = connection;

    useEffect(() => {
        (async () => {
            await resetRoomNotifications(peerId, uid);
            if (!remoteStreamRef.current || !localStream) return;
            const localConnection = await initiateConnection(localStream);
            setConnection(localConnection);
            listenToConnectionEvents(
                localConnection,
                peerId,
                uid,
                remoteStreamRef.current
            );
        })();
    }, [uid, peerId, localStream]);

    useEffect(() => {
        if (!connection || !localStream) return;
        listenForSignaling(connection, uid, peerId);
        listenForCandidates(connection, uid, peerId);
    }, [uid, peerId, connection, localStream]);

    useEffect(() => {
        if (!connection) return;
        addConnection(connection);
        // eslint-disable-next-line
    }, [connection]);

    return (
        <RemoteStream
            ref={remoteStreamRef}
            src="remoteStream"
            autoPlay
            playsInline
        ></RemoteStream>
    );
};

const RemoteStream = styled.video`
    min-width: 480px;
    max-width: 720px;
    transform: scaleX(-1);
`;
