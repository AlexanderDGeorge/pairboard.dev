import { firestore, fieldValue } from "./firebase";
import { Session, NewSession } from "../types/session_types";
import { UserLite } from "../types/user_types";

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

const peerConnection = new RTCPeerConnection(configuration);

const createOffer = async () => {
    const { sdp } = await peerConnection.createOffer();
    if (sdp) localStorage.setItem("sdpoffer", sdp);
    return sdp;
};

export async function createNewSession(user: UserLite, newSession: NewSession) {
    const sessionDoc = await firestore()
        .collection("sessions")
        .add({
            ...newSession,
            createdAt: new Date(),
            offer: await createOffer(),
            offerUser: user,
        });
    firestore().collection("users").doc(user.uid).update({
        sessionId: sessionDoc.id,
    });
}

export async function updateSession(updatedSession: Session) {
    await firestore()
        .collection("sessions")
        .doc(updatedSession.id)
        .update({
            ...updateSession,
            createdAt: new Date(),
        });
}

export function deleteSession(session: Session) {
    if (session.answerUser) {
        firestore().collection("users").doc(session.answerUser.uid).update({
            sessionId: fieldValue.delete(),
        });
    }
    firestore().collection("users").doc(session.offerUser.uid).update({
        sessionId: fieldValue.delete(),
    });
    firestore().collection("sessions").doc(session.id).delete();
    localStorage.removeItem("sdpoffer");
    localStorage.removeItem("sdpanswer");
}

export async function fetchSessions() {
    const sessionsRef = firestore()
        .collection("sessions")
        .orderBy("createdAt", "desc");
    const sessionsDoc = await sessionsRef.get();
    return [...sessionsDoc.docs.map((doc) => doc.data())];
}
