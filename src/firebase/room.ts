import { DevPublicProfile } from '../Devs/devSchema';
import { database, fieldValue, firestore } from '../firebase';
import { PostSchema } from '../Posts/postSchema';

export async function sendSessionDescription(
    peerId: DevPublicProfile['uid'],
    uid: DevPublicProfile['uid'],
    sessionDescription: RTCSessionDescriptionInit,
) {
    await database().ref(`/roomNotifications/${peerId}/${uid}`).update({
        sessionDescription,
    });
    console.log('description sent');
}

export async function sendICECandidate(
    peerId: DevPublicProfile['uid'],
    uid: DevPublicProfile['uid'],
    iceCandidate: RTCIceCandidateInit,
) {
    await database().ref(`/roomNotifications/${peerId}/${uid}`).update({
        iceCandidate,
    });
}

export async function resetRoomNotifications(
    peerId: DevPublicProfile['uid'],
    uid: DevPublicProfile['uid'],
) {
    await database().ref(`/roomNotifications/${peerId}/${uid}`).remove();
}

export async function leaveRoom(
    uid: DevPublicProfile['uid'],
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
    uid: DevPublicProfile['uid'],
    peerId: DevPublicProfile['uid'],
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
