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

const createAnswer = async () => {
    console.log("here");
    const answer = (await peerConnection.createAnswer()).sdp;
    console.log(answer);
    return answer;
};

export async function joinSession(user: UserLite, session: Session) {
    firestore()
        .collection("sessions")
        .doc(session.id)
        .update({
            answer: await createAnswer(),
            answerUser: user,
        });
    firestore().collection("users").doc(user.uid).update({
        sessionId: session.id,
    });
}

export async function createNewSession(user: UserLite, newSession: NewSession) {
    const sessionRef = firestore().collection("sessions").doc();
    await sessionRef.set({
        ...newSession,
        id: sessionRef.id,
        createdAt: new Date(),
        offer: (await peerConnection.createOffer()).sdp,
        offerUser: user,
    });
    firestore().collection("users").doc(user.uid).update({
        sessionId: sessionRef.id,
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
}

export async function fetchSessions() {
    const sessionsRef = firestore()
        .collection("sessions")
        .orderBy("createdAt", "desc");
    const sessionsDoc = await sessionsRef.get();
    return [...sessionsDoc.docs.map((doc) => doc.data())];
}
