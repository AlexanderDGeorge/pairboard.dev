import { database, fieldValue, firestore } from "./firebase";
import { PostSchema, UserSchema } from "./schema";

export async function sendSessionDescription(
    recipientId: UserSchema["uid"],
    senderId: UserSchema["uid"],
    sessionDescription: RTCSessionDescriptionInit
) {
    await database()
        .ref(`/roomNotifications/${recipientId}/${senderId}`)
        .update({
            sessionDescription,
        });
}

export async function sendICECandidate(
    recipientId: UserSchema["uid"],
    senderId: UserSchema["uid"],
    iceCandidate: RTCIceCandidateInit
) {
    await database()
        .ref(`/roomNotifications/${recipientId}/${senderId}`)
        .update({
            iceCandidate,
        });
}

export async function resetRoomNotifications(
    recipientId: UserSchema["uid"],
    senderId: UserSchema["uid"]
) {
    await database()
        .ref(`/roomNotifications/${recipientId}/${senderId}`)
        .remove();
}

export async function initiateLocalStream() {
    // @ts-ignore
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });
    return stream;
}

export async function initiateConnection(localStream: MediaStream) {
    const configuration: RTCConfiguration = {
        iceServers: [
            {
                urls: [
                    "stun:stun1.l.google.com:19302",
                    "stun:stun2.l.google.com:19302",
                ],
            },
        ],
        iceCandidatePoolSize: 10,
    };
    const localConnection = new RTCPeerConnection(configuration);
    localStream.getTracks().forEach((track) => {
        localConnection.addTrack(track, localStream);
    });
    return localConnection;
}

export async function listenToConnectionEvents(
    connection: RTCPeerConnection,
    recipientId: UserSchema["uid"],
    senderId: UserSchema["uid"],
    remoteStreamRef: HTMLVideoElement
) {
    connection.onnegotiationneeded = async () => {
        console.log("negotiation needed");
        database()
            .ref(`/roomNotifications/${senderId}/${recipientId}`)
            .child("sessionDescription")
            .on("value", (snapshot) => {
                console.log("offer found");
                handleSessionDescription(
                    connection,
                    recipientId,
                    senderId,
                    snapshot.val()
                );
            });
    };

    connection.onicecandidate = async (iceEvent) => {
        if (iceEvent.candidate) {
            sendICECandidate(
                recipientId,
                senderId,
                iceEvent.candidate.toJSON()
            );
        }
    };

    connection.ontrack = async (trackEvent) => {
        let stream = new MediaStream();
        if (remoteStreamRef.srcObject instanceof MediaStream) {
            stream = remoteStreamRef.srcObject;
        }
        stream.addTrack(trackEvent.track);
        remoteStreamRef.srcObject = stream;
    };
}

export async function handleSessionDescription(
    connection: RTCPeerConnection,
    recipientId: UserSchema["uid"],
    senderId: UserSchema["uid"],
    offer?: RTCSessionDescriptionInit
) {
    // [TODO]: functions needs refactoring

    if (offer) {
        console.log("offer", offer);
        await connection.setRemoteDescription(offer);
        console.log(connection);
        const answer = await connection.createAnswer();
        await connection.setLocalDescription(answer);
        await sendSessionDescription(
            recipientId,
            senderId,
            connection.localDescription?.toJSON()
        );
        return;
    }
    console.log(connection);
    // @ts-ignore
    await connection.setLocalDescription();
    await sendSessionDescription(
        recipientId,
        senderId,
        connection.localDescription?.toJSON()
    );
}

export async function addCandidate(
    connection: RTCPeerConnection,
    iceCandidate: RTCIceCandidateInit
) {
    await connection.addIceCandidate(iceCandidate);
}

export async function leaveRoom(
    uid: UserSchema["uid"],
    postId: PostSchema["id"]
) {
    await firestore()
        .collection("posts")
        .doc(postId)
        .update({
            participants: fieldValue.arrayRemove(uid),
        });
    firestore().collection("users").doc(uid).update({
        postId: fieldValue.delete(),
        status: "online",
    });
    await database().ref(`roomNotifications/${uid}`).remove();
}
