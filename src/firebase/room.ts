import { database, fieldValue, firestore } from './firebase';
import { PostSchema, UserSchema } from './schema';

export async function sendSessionDescription(
    peerId: UserSchema['uid'],
    uid: UserSchema['uid'],
    sessionDescription: RTCSessionDescriptionInit,
) {
    await database().ref(`/roomNotifications/${peerId}/${uid}`).update({
        sessionDescription,
    });
}

export async function sendICECandidate(
    peerId: UserSchema['uid'],
    uid: UserSchema['uid'],
    iceCandidate: RTCIceCandidateInit,
) {
    await database().ref(`/roomNotifications/${peerId}/${uid}`).update({
        iceCandidate,
    });
}

export async function resetRoomNotifications(uid: UserSchema['uid']) {
    await database().ref(`/roomNotifications/${uid}`).remove();
}

export async function leaveRoom(
    uid: UserSchema['uid'],
    postId: PostSchema['id'],
) {
    await firestore()
        .collection('posts')
        .doc(postId)
        .update({
            participants: fieldValue.arrayRemove(uid),
        });
    firestore().collection('users').doc(uid).update({
        postId: fieldValue.delete(),
        status: 'online',
    });
    await database().ref(`roomNotifications/${uid}`).remove();
}

export function listenForCandidates(
    connection: RTCPeerConnection,
    uid: UserSchema['uid'],
    peerId: UserSchema['uid'],
) {
    database()
        .ref(`/roomNotifications/${uid}/${peerId}/iceCandidate`)
        .on('value', async (snapshot) => {
            if (!snapshot.exists()) return;
            try {
                await connection.addIceCandidate(snapshot.val());
            } catch (error) {
                console.error(error.message);
            }
        });
}
