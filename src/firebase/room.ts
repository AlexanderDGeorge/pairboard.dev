import { database, fieldValue, firestore } from "./firebase";
import { PostSchema, UserSchema } from "./schema";

export async function sendSessionDescription(
    peerId: UserSchema["uid"],
    uid: UserSchema["uid"],
    sessionDescription: RTCSessionDescriptionInit
) {
    await database().ref(`/roomNotifications/${peerId}/${uid}`).update({
        sessionDescription,
    });
}

export async function sendICECandidate(
    peerId: UserSchema["uid"],
    uid: UserSchema["uid"],
    iceCandidate: RTCIceCandidateInit
) {
    await database().ref(`/roomNotifications/${peerId}/${uid}`).update({
        iceCandidate,
    });
}

export async function resetRoomNotifications(
    peerId: UserSchema["uid"],
    uid: UserSchema["uid"]
) {
    await database().ref(`/roomNotifications/${peerId}/${uid}`).remove();
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

export function listenForCandidates(
    connection: RTCPeerConnection,
    uid: UserSchema["uid"],
    peerId: UserSchema["uid"]
) {
    database()
        .ref(`/roomNotifications/${uid}/${peerId}/iceCandidate`)
        .on("value", async (snapshot) => {
            if (!snapshot.exists()) return;
            connection.addIceCandidate(snapshot.val());
        });
}

export function listenForSignaling(
    connection: RTCPeerConnection,
    uid: UserSchema["uid"],
    peerId: UserSchema["uid"]
) {
    database()
        .ref(`/roomNotifications/${uid}/${peerId}/sessionDescription`)
        .on("value", async (snapshot) => {
            if (!snapshot.exists()) return;
            console.log(snapshot.val());
            // if (snapshot.val().type === 'offer' && peerId > uid)
            console.log(connection);
            if (peerId > uid) {
                await connection.setRemoteDescription(snapshot.val());
                const answer = await connection.createAnswer();
                await connection.setLocalDescription(answer);
                console.log(answer);
                sendSessionDescription(peerId, uid, answer);
            } else {
                // check if we have sent an offer
                if (snapshot.val().type === "answer") {
                    if (connection.connectionState === "disconnected") {
                        const offer = await connection.createOffer();
                        connection.setLocalDescription(offer);
                        sendSessionDescription(peerId, uid, offer);
                    }
                    await connection.setRemoteDescription(snapshot.val());
                }
            }
        });
}
