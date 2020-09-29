import React, {
    MutableRefObject,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import styled from "styled-components";
import { database } from "../firebase/firebase";
import {
    addCandidate,
    initiateConnection,
    listenToConnectionEvents,
    resetRoomNotifications,
} from "../firebase/room";
import { UserSchema } from "../firebase/schema";
import { UserContext } from "../Root";

interface PeerConnectionProps {
    localStream?: MediaStream;
    recipientId: UserSchema["uid"];
}

export default (props: PeerConnectionProps) => {
    const { localStream, recipientId } = props;
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
            await resetRoomNotifications(recipientId, uid);
            if (!remoteStreamRef.current || !localStream) return;
            const localConnection = await initiateConnection(localStream);
            setConnection(localConnection);
            listenToConnectionEvents(
                localConnection,
                recipientId,
                uid,
                remoteStreamRef.current
            );
        })();
    }, [uid, recipientId, localStream]);

    useEffect(() => {
        if (!connection || !localStream) return;
        database()
            .ref(`/roomNotifications/${uid}/${recipientId}/iceCandidate`)
            .on("value", async (snapshot) => {
                if (!snapshot.exists()) return;
                console.log(snapshot.val());
                await addCandidate(connection, snapshot.val());
            });
    }, [uid, recipientId, connection, localStream]);
    console.log(remoteStreamRef.current?.srcObject);

    return (
        <RemoteStream>
            <video
                ref={remoteStreamRef}
                src="remoteStream"
                autoPlay
                playsInline
            ></video>
        </RemoteStream>
    );
};

const RemoteStream = styled.div`
    min-height: 240px;
    min-width: 320px;
`;
